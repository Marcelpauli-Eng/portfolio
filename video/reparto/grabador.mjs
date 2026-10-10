// Una pestaña de Chrome sin ventana con la app en un móvil (390×844, al doble de resolución), el
// screencast guardado a disco y los rótulos con su segundo. Como MotorSport19/comercial/video/grabador.mjs.
import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { conectar, esperar, WEB, PUERTO } from './cdp.mjs';

export { esperar };
export const ANCHO = 390, ALTO = 844, ESCALA = 2;

export async function grabacion({ carpeta }) {
  const DIR = new URL(`./tomas/${carpeta}/`, import.meta.url).pathname;
  rmSync(DIR, { recursive: true, force: true });
  mkdirSync(DIR, { recursive: true });
  const lib = (f) => readFileSync(new URL(f, import.meta.url), 'utf8');

  // Una sola pestaña: en Chrome sin ventana las de fondo van a cámara lenta.
  for (const p of await (await fetch(`http://127.0.0.1:${PUERTO}/json/list`)).json())
    if (p.type === 'page') await fetch(`http://127.0.0.1:${PUERTO}/json/close/` + p.id);
  const t = await conectar();
  const { cdp, js } = t;
  await cdp('Emulation.setDeviceMetricsOverride', { width: ANCHO, height: ALTO, deviceScaleFactor: ESCALA, mobile: true });
  await cdp('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp('Emulation.setFocusEmulationEnabled', { enabled: true });
  await cdp('Emulation.setTimezoneOverride', { timezoneId: 'Europe/Madrid' });
  await cdp('Page.addScriptToEvaluateOnNewDocument', { source: lib('./validar.js') + '\n' + lib('./demo-lib.js') });

  const toma = { t0: 0, fotogramas: [], rotulos: [], grabando: false };
  t.on('Page.screencastFrame', (f) => {
    cdp('Page.screencastFrameAck', { sessionId: f.sessionId });
    if (!toma.grabando) return;
    const ahora = Date.now() / 1000;
    if (!toma.t0) toma.t0 = ahora;
    const nombre = `f${String(toma.fotogramas.length).padStart(6, '0')}.jpg`;
    writeFileSync(DIR + nombre, Buffer.from(f.data, 'base64'));
    toma.fotogramas.push({ nombre, t: ahora - toma.t0 });
  });

  async function empezar() {
    toma.grabando = true;
    await cdp('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: ANCHO * ESCALA, maxHeight: ALTO * ESCALA, everyNthFrame: 1 });
    await esperar(600);
  }
  async function terminar() {
    await esperar(400);
    const fin = Date.now() / 1000 - toma.t0;
    await cdp('Page.stopScreencast');
    toma.grabando = false;
    writeFileSync(DIR + 'rotulos.json', JSON.stringify({ fin, rotulos: toma.rotulos, fotogramas: toma.fotogramas }, null, 1));
    console.log(`${toma.fotogramas.length} fotogramas, ${fin.toFixed(1)} s`);
  }

  const D = (expr) => js(`(async () => { const d = window.__demo; ${expr} })()`);
  function rotulo(campos) {
    const s = Date.now() / 1000 - toma.t0;
    toma.rotulos.push({ t: s, ...campos });
    console.log(`  ${s.toFixed(1)}  ${campos.titulo}`);
  }
  async function abrir(ruta) {
    await cdp('Page.navigate', { url: WEB + ruta });
    await esperar(2500);
  }
  async function foto(ruta) {
    const r = await cdp('Page.captureScreenshot', { format: 'png' });
    writeFileSync(ruta, Buffer.from(r.result.data, 'base64'));
  }

  return { t, cdp, js, D, rotulo, empezar, terminar, abrir, foto, cerrar: () => t.ws.close() };
}

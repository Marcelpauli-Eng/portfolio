// Pinta las escenas de escenas.html fotograma a fotograma (sin depender del reloj) o como imagen fija.
//   node renderizar.mjs anim <escena> <segundos> <carpeta>
//   node renderizar.mjs png  <escena> <salida.png>
//   node renderizar.mjs rotulos <rotulos.json> <carpeta>
// Como MotorSport19/comercial/video/renderizar.mjs.
import { mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { conectar, esperar } from './cdp.mjs';

const [modo, a, b, c] = process.argv.slice(2);
const HTML = new URL('./escenas.html', import.meta.url).href;
const t = await conectar();
const { cdp, js } = t;
await cdp('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
await cdp('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });

async function abrir(consulta) {
  await cdp('Page.navigate', { url: HTML + '?' + consulta });
  await esperar(700);
  await js(`(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); })()`);
  await js(`document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0; })`);
  await esperar(100);
}
async function foto(ruta, formato = 'png') {
  const r = await cdp('Page.captureScreenshot', formato === 'png' ? { format: 'png' } : { format: 'jpeg', quality: 94 });
  writeFileSync(ruta, Buffer.from(r.result.data, 'base64'));
}

if (modo === 'anim') {
  rmSync(c, { recursive: true, force: true });
  mkdirSync(c, { recursive: true });
  await abrir(`escena=${a}`);
  const total = Math.round(Number(b) * 30);
  for (let i = 0; i < total; i++) {
    await js(`(() => { document.getAnimations().forEach(a => { a.currentTime = ${(i * 1000) / 30}; }); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); })()`);
    await foto(`${c}/f${String(i).padStart(5, '0')}.jpg`, 'jpeg');
  }
  console.log(a, total, 'fotogramas');
} else if (modo === 'png') {
  await abrir(`escena=${a}`);
  await js(`document.getAnimations().forEach(a => a.finish())`);
  await esperar(150);
  await foto(b);
} else if (modo === 'rotulos') {
  const { rotulos } = JSON.parse(readFileSync(a, 'utf8'));
  mkdirSync(b, { recursive: true });
  for (const [i, r] of rotulos.entries()) {
    const { t: _t, ...campos } = r;
    await abrir(new URLSearchParams({ escena: 'lateral', ...campos }).toString());
    await foto(`${b}/r${String(i).padStart(2, '0')}.png`);
  }
  console.log(rotulos.length, 'rótulos');
}
t.ws.close();

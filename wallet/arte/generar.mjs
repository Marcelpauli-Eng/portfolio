// Dibuja las imágenes del pase con la marca de Automaittech (la de los vídeos: azul marino, rojo, azul boli,
// amarillo y letras Barlow) y las pasa a PNG a 1x, 2x y 3x.
//   · strip: el lema y un bloque de color por oficio, con su herramienta de la web.
//   · logo e icon: la baldosa del logo (logo-automaittech.png), reducida.
// Uso: node wallet/arte/generar.mjs   (CHROME=/ruta/a/chrome si no está en el sitio de siempre)
// Necesita red para las letras de Google Fonts.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const aqui = dirname(fileURLToPath(import.meta.url));
const pase = join(aqui, '..', 'pase');
const chrome = process.env.CHROME ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const fuente = readFileSync(join(aqui, '../../src/herramientas.ts'), 'utf8');
const h = JSON.parse(fuente.slice(fuente.indexOf('{', fuente.indexOf('=')), fuente.lastIndexOf('}') + 1));

const C = { navy: '#1B2A4A', papel: '#F9FAF6', rojo: '#C4232F', boli: '#2448B8', ama: '#F5E7A8', oro: '#F2C94C' };

// Una herramienta centrada en (x, y), de ancho w y girada r grados. El trazo se compensa con la escala
// para que mida lo mismo en todas.
function herramienta(nombre, x, y, w, r = 0) {
  const [, , vw, vh] = h[nombre].vb.split(' ').map(Number);
  const s = w / vw;
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s}) translate(${-vw / 2} ${-vh / 2})"
    fill="${C.papel}" stroke="${C.navy}" stroke-width="${(1.3 / s).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round">${h[nombre].cuerpo}</g>`;
}

// Franja (375 × 123 pt). Arriba el lema; abajo los tres oficios, cada uno en su color.
const oficios = [
  { t: 'Talleres', fondo: C.rojo, letra: C.papel, dibujo: herramienta('llave', 58, 26, 84, -14) },
  { t: 'Lampistas', fondo: C.boli, letra: C.papel, dibujo: herramienta('grifo', 60, 26, 46, 0) },
  { t: 'Transportistas', fondo: C.oro, letra: C.navy, dibujo: herramienta('camion', 60, 27, 66, -3) },
];
const ancho = 112, alto = 70, hueco = 7, x0 = 14, y0 = 44;
const bloques = oficios.map((o, i) => `
  <g transform="translate(${x0 + i * (ancho + hueco)} ${y0})">
    <rect width="${ancho}" height="${alto}" rx="10" fill="${o.fondo}"/>
    ${o.dibujo}
    <text x="10" y="${alto - 9}" fill="${o.letra}" font-family="Barlow Condensed" font-weight="700" font-size="15" letter-spacing=".3">${o.t.toUpperCase()}</text>
  </g>`).join('');
const franja = {
  w: 375, h: 123,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 123">
  <rect width="375" height="123" fill="${C.navy}"/>
  <text x="14" y="32" font-family="Barlow Condensed" font-weight="800" font-size="25.5" letter-spacing=".2"><tspan fill="${C.papel}">PROGRAMAS A MEDIDA </tspan><tspan fill="${C.ama}">PARA OFICIOS</tspan></text>
  ${bloques}
</svg>`,
};

const tmp = join(tmpdir(), 'pase-arte');
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
mkdirSync(pase, { recursive: true });
if (!existsSync(chrome)) throw new Error(`No encuentro Chromium en ${chrome}`);

const RECORTAR = 'import sys; from PIL import Image; f, w, h = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); Image.open(f).crop((0, 0, w, h)).save(f, optimize=True)';
const REDUCIR = 'import sys; from PIL import Image; o, d, n = sys.argv[1], sys.argv[2], int(sys.argv[3]); Image.open(o).resize((n, n), Image.LANCZOS).save(d, optimize=True)';
const proxy = process.env.HTTPS_PROXY ? [`--proxy-server=${process.env.HTTPS_PROXY}`] : [];

function png(nombre, { w, h: alto, svg }) {
  writeFileSync(join(aqui, `${nombre}.svg`), svg);
  const html = join(tmp, `${nombre}.html`);
  writeFileSync(html, `<!doctype html>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=block">
<style>html,body{margin:0;background:transparent}svg{display:block;width:${w}px;height:${alto}px}</style>${svg}`);
  for (const [escala, sufijo] of [[1, ''], [2, '@2x'], [3, '@3x']]) {
    const archivo = join(pase, `${nombre}${sufijo}.png`);
    execFileSync(chrome, [
      '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', ...proxy,
      '--default-background-color=00000000', '--virtual-time-budget=5000',
      `--force-device-scale-factor=${escala}`,
      // Chromium no baja de cierta altura de ventana: se pinta en una más alta y se recorta luego.
      `--window-size=${Math.max(w, 500)},${Math.max(alto, 500)}`,
      `--screenshot=${archivo}`,
      `file://${html}`,
    ], { stdio: 'ignore' });
    execFileSync('python3', ['-c', RECORTAR, archivo, String(w * escala), String(alto * escala)]);
  }
}

png('strip', franja);
// Logo (cabe en 160 × 50 pt) e icono (29 × 29 pt): la baldosa del logo.
const baldosa = join(aqui, 'logo-automaittech.png');
for (const [escala, sufijo] of [[1, ''], [2, '@2x'], [3, '@3x']]) {
  execFileSync('python3', ['-c', REDUCIR, baldosa, join(pase, `logo${sufijo}.png`), String(34 * escala)]);
  execFileSync('python3', ['-c', REDUCIR, baldosa, join(pase, `icon${sufijo}.png`), String(29 * escala)]);
}
rmSync(tmp, { recursive: true, force: true });
console.log('Imágenes del pase listas en', pase);

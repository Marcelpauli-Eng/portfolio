// Dibuja las imágenes del pase (franja, logo e icono) con los mismos dibujos y colores de la web
// y las pasa a PNG a 1x, 2x y 3x con el Chromium del sistema.
// Uso: node wallet/arte/generar.mjs   (CHROME=/ruta/a/chrome si no está en el sitio de siempre)
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

const C = { papel: '#F9FAF6', imprenta: '#1B2A4A', rojo: '#C4232F', amarilla: '#F5E7A8', boli: '#2448B8' };

// Una herramienta centrada en (x, y), de ancho w y girada r grados. El trazo se compensa
// con la escala para que mida lo mismo en todas (1,3 pt).
function herramienta(nombre, x, y, w, r = 0) {
  const [, , vw, vh] = h[nombre].vb.split(' ').map(Number);
  const s = w / vw;
  return `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s}) translate(${-vw / 2} ${-vh / 2})"
    fill="${C.papel}" stroke="${C.imprenta}" stroke-width="${(1.3 / s).toFixed(2)}" stroke-linejoin="round" stroke-linecap="round">${h[nombre].cuerpo}</g>`;
}

// La «A» del favicon.
const marca = (fondo, letra) => `
  <rect width="32" height="32" rx="7" fill="${fondo}"/>
  <rect x="11.2" y="18.6" width="9.6" height="3.4" fill="${C.rojo}"/>
  <path d="M5.5 27 12.6 8.5h6.8L26.5 27h-5.3L16 12.3 10.8 27Z" fill="${letra}"/>`;

// Franja de la tarjeta (375 × 123 pt). El texto grande del pase va encima, a la izquierda,
// así que las herramientas se quedan en el tercio derecho y el resto queda liso.
const rayas = [...Array(7)].map((_, i) =>
  `<line x1="0" x2="375" y1="${14 + i * 17}" y2="${14 + i * 17}" stroke="${C.papel}" stroke-opacity=".07" stroke-width=".8"/>`).join('');
const franja = {
  w: 375, h: 123,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 123">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset=".5" stop-color="${C.imprenta}"/><stop offset=".64" stop-color="${C.imprenta}" stop-opacity="0"/></linearGradient></defs>
  <rect width="375" height="123" fill="#22355C"/>${rayas}
  ${herramienta('llave', 310, 26, 104, -10)}
  ${herramienta('grifo', 262, 86, 46, 4)}
  ${herramienta('camion', 330, 88, 80, -3)}
  <rect width="375" height="123" fill="url(#g)"/>
</svg>`,
};

// Logo (máx. 160 × 50 pt): solo la marca; el nombre lo pone Wallet con logoText.
const logo = {
  w: 34, h: 34,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${marca(C.papel, C.imprenta)}</svg>`,
};

// Icono (29 × 29 pt): sale en la pantalla bloqueada y en los avisos.
const icono = {
  w: 29, h: 29,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${marca(C.imprenta, C.papel)}</svg>`,
};

const tmp = join(tmpdir(), 'pase-arte');
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });
mkdirSync(pase, { recursive: true });
if (!existsSync(chrome)) throw new Error(`No encuentro Chromium en ${chrome}`);

const RECORTAR = 'import sys; from PIL import Image; f, w, h = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); Image.open(f).crop((0, 0, w, h)).save(f, optimize=True)';

function png(nombre, { w, h: alto, svg }) {
  writeFileSync(join(aqui, `${nombre}.svg`), svg);
  const html = join(tmp, `${nombre}.html`);
  writeFileSync(html, `<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block;width:${w}px;height:${alto}px}</style>${svg}`);
  for (const [escala, sufijo] of [[1, ''], [2, '@2x'], [3, '@3x']]) {
    execFileSync(chrome, [
      '--headless', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
      '--default-background-color=00000000',
      `--force-device-scale-factor=${escala}`,
      // Chromium no baja de cierta altura de ventana: se pinta en una más alta y se recorta luego.
      `--window-size=${Math.max(w, 500)},${Math.max(alto, 500)}`,
      `--screenshot=${join(pase, `${nombre}${sufijo}.png`)}`,
      `file://${html}`,
    ], { stdio: 'ignore' });
    const archivo = join(pase, `${nombre}${sufijo}.png`);
    execFileSync('python3', ['-c', RECORTAR, archivo, String(w * escala), String(alto * escala)]);
  }
}

png('strip', franja);
png('logo', logo);
png('icon', icono);
rmSync(tmp, { recursive: true, force: true });
console.log('Imágenes del pase listas en', pase);

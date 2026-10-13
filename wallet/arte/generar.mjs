// Dibuja las imágenes del pase con la marca de Automaittech (azul marino, rojo, azul boli, las copias del talonario
// y letras Barlow) y las pasa a PNG a 1x, 2x y 3x.
//   · strip: «Del talonario al móvil» y un parte de trabajo con sus copias de colores.
//   · logo e icon: la baldosa del logo (logo-automaittech.png), reducida.
// Uso: node wallet/arte/generar.mjs   (CHROME=/ruta/a/chrome si no está en el sitio de siempre)
// Necesita red para las letras de Google Fonts.
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const aqui = dirname(fileURLToPath(import.meta.url));
const pase = join(aqui, '..', 'pase');
const chrome = process.env.CHROME ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const C = { navy: '#1B2A4A', papel: '#F9FAF6', rojo: '#C4232F', boli: '#2448B8', ama: '#F5E7A8', rosa: '#F4D0D6', azulc: '#DCE7F3' };

const B = 'font-family="Barlow Condensed"';
const PW = 184, PH = 92;
const copia = (dx, r, c) => `<rect x="${dx}" y="16" width="${PW}" height="${PH}" rx="3" fill="${c}" transform="rotate(${r} ${dx + PW / 2} ${16 + PH / 2})"/>`;

// Franja (375 × 123 pt): «Del talonario al móvil» y, al lado, un parte de trabajo rellenado a mano con sus copias
// rosa, azul y amarilla, como el talonario de la web. Girada, la copia rosa llega hasta x≈356 e y≈8–115:
// cabe entera, con margen.
const franja = {
  w: 375, h: 123,
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 123">
  <rect width="375" height="123" fill="${C.navy}"/>
  ${copia(168, 5, C.rosa)}${copia(164, 2.5, C.azulc)}${copia(160, 0, C.ama)}
  <g transform="translate(160 16) rotate(-2.5 ${PW / 2} ${PH / 2})">
    <rect width="${PW}" height="${PH}" rx="3" fill="${C.papel}"/>
    <g fill="#E1E4DC">${[...Array(9)].map((_, i) => `<circle cx="${14 + i * 19.5}" cy="7" r="2"/>`).join('')}</g>
    <text x="11" y="27" ${B} font-weight="700" font-size="14" fill="${C.navy}">PARTE DE TRABAJO</text>
    <text x="${PW - 11}" y="27" text-anchor="end" ${B} font-weight="700" font-size="14" fill="${C.rojo}">Nº 0098</text>
    <g stroke="${C.navy}" stroke-opacity=".25" stroke-width=".7">${[41, 56, 71, 84].map((y) => `<line x1="11" x2="${PW - 11}" y1="${y}" y2="${y}"/>`).join('')}</g>
    <text x="13" y="53" font-family="Caveat" font-size="14" fill="${C.boli}">Cambio de grifo, Bar La Plaça</text>
    <text x="13" y="68" font-family="Caveat" font-size="14" fill="${C.boli}">1,5 h · 2 latiguillos</text>
    <path d="M112 80 q7 -9 14 0 t14 0 t13 -4" fill="none" stroke="${C.boli}" stroke-width="1.3" stroke-linecap="round"/>
  </g>
  <text x="16" y="44" ${B} font-weight="700" font-size="26" fill="${C.papel}">Del talonario</text>
  <text x="16" y="72" ${B} font-weight="700" font-size="26" fill="${C.ama}">al móvil</text>
  <text x="16" y="98" font-family="Barlow" font-weight="500" font-size="10.5" fill="${C.papel}" fill-opacity=".8">Partes, órdenes y facturas</text>
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&family=Barlow:wght@500&family=Caveat&display=block">
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

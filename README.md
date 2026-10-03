# Programas para oficios

Web de Automaittech: programas a medida para talleres, lampistas, fontaneros y transportistas. En castellano (`/`) y catalán (`/ca/`).

Hecha con **Astro** (sale estática) y **GSAP** con ScrollTrigger para el movimiento. No lleva nada más.

## Arrancar en local

Hace falta Node 22 o superior.

```bash
npm install
npm run dev
```

Se abre en <http://localhost:4321>; la versión en catalán está en <http://localhost:4321/ca/>.

Para ver la versión final, tal como se publicaría:

```bash
npm run build
npm run preview
```

Lo que hay que subir al hosting es la carpeta `dist/`.

## Dónde se cambia cada cosa

| Qué | Dónde |
|---|---|
| Textos en castellano y catalán | `src/textos.ts` |
| Número de WhatsApp | `WHATSAPP` en `src/textos.ts`. Mientras esté vacío, no sale el botón y en el contacto se ve `[WHATSAPP]` |
| Capturas de los programas | `src/assets/capturas/` (Astro las pasa a AVIF/WebP) |
| Aparato y herramientas de cada oficio | `escenas` en `src/components/Pagina.astro` |
| Dibujos de las herramientas | `src/herramientas.ts` |
| Colores, tipografías y escala | `src/styles/global.css` (arriba del todo) |
| Movimiento | `src/scripts/movimiento.ts` |
| Dominio (Open Graph y URL canónica) | `SITE_URL=https://tudominio.com npm run build`, o en `astro.config.mjs` |

## Pendiente de rellenar

Los huecos se ven en la web entre corchetes:

- `[WHATSAPP]`: el número.
- `[FOTO]`: la foto de «Sobre mí».
- `[RESULTADO: …]`: un resultado real por cada programa, cuando lo haya.
- El dominio, para la imagen de Open Graph (`public/og.png`).

## El formulario

No hay servidor: al enviar, se abre el correo de quien escribe con el mensaje ya puesto, dirigido a `marcelpaulilara@gmail.com`. Cuando haya hosting, se puede apuntar a un endpoint (un Worker de Cloudflare, Formspree…) para recibirlo sin que tenga que darle a enviar en su correo.

## Diseño

El plan está en `PLAN_DISENO.md` y el inventario de proyectos en `INVENTARIO.md`.

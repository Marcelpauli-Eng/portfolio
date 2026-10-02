# Inventario: web de programas para oficios

Fase 1. No se ha borrado nada.

- Repositorio: `portfolio` (Next.js + Tailwind, plantilla de portfolio de estudiante).
- `git status` estaba limpio en `main` (1a7c9b9), así que no había nada que commitear.
- Rama creada: `web-nueva`.

## Proyectos encontrados

Todos están en `~/Developer/GitHub/`. Los he comprobado en el código y en los README.

### 1. MotorSport19: gestión de taller

`../MotorSport19` · Angular 21, Spring Boot 3.5, PostgreSQL 17 y Docker.

- **Para quién:** un taller de **motos** (19 Racing Motorsport). Ojo: es de motos, no de coches. En la web propongo poner «talleres» sin más.
- **Problema que resuelve:** las órdenes de trabajo, el almacén y la facturación del taller van en papel o en programas que no se hablan entre sí.
- **Funcionalidades, en lenguaje de cliente:**
  - Ficha de cada cliente con sus motos y todo lo que se les ha hecho.
  - Órdenes de trabajo que avanzan por estados (recibida, en diagnóstico, esperando piezas, lista para entregar) y descuentan del almacén las piezas usadas.
  - Almacén con aviso de las piezas que están por debajo del mínimo.
  - Facturas que no se pueden tocar ni borrar, numeradas sin huecos y encadenadas entre sí. Para corregir una se hace una rectificativa. Llevan un código QR de verificación.
  - Fichaje y horas de los técnicos desde una tablet, además de agenda, presupuestos e informes.
  - Si se cae internet, lo guardado se queda en cola y se envía al volver. El servidor puede estar en el propio taller, con copia nocturna cifrada en la nube.
- **Capturas** (`comercial/folleto/capturas/`): 1 de móvil (`movil-panel.png`), 2 de tablet y 14 de escritorio. También hay dos vídeos de demostración (`comercial/MotorSport19-demo.mp4` y `-demo-whatsapp.mp4`), un folleto en PDF y `capturar.mjs` para sacar más.
- ⚠️ Las capturas llevan el logo de 19 Racing Motorsport. Hay que pedirles permiso o recapturar con una marca neutra.

### 2. Web pública de 19 Racing Motorsport

`../19racingmotorsport-web` · Astro y Cloudflare Workers.

- Una web en cuatro idiomas con un formulario de cita o presupuesto (admite hasta 3 fotos). Cada solicitud **entra directamente en la bandeja de la intranet del taller** (MotorSport19).
- La presentaría dentro del caso del taller, como «la web y el programa del taller, conectados».
- Fotos reales del taller en `src/assets/photos/*.webp`. Son del cliente, así que hace falta su permiso.

### 3. Codo90: lampistas y fontaneros

`../DashboardFontaneriaLamp` (fontanería) y `../DashboardLamp` (la misma app para electricidad) · Angular PWA, Spring Boot, PostgreSQL y Docker.

- **Para quién:** lampistas y fontaneros autónomos.
- **Problema que resuelve:** las comandas van en una libreta, los partes se hacen a mano y las facturas se montan a final de mes.
- **Funcionalidades, en lenguaje de cliente:**
  - «Hoy»: lo urgente, lo atrasado y lo del día, con botones de llamar y de cómo llegar.
  - Parte de trabajo en el móvil: fotos de antes y después, materiales, horas y la firma del cliente.
  - Cada parte cerrado es ya un albarán, y la factura junta los albaranes de un cliente.
  - Calendario de comandas del mes, donde se ve lo lleno que va cada día.
  - Plano de la instalación en 3D con el presupuesto calculado. El cliente lo abre en su móvil y lo acepta desde ahí.
  - Funciona sin cobertura: guarda en el móvil y envía cuando vuelve la red.
- **Capturas** (`comercial/folleto/capturas/`): 25 en total (5 de móvil, 1 de tablet y el resto de escritorio, entre ellas el plano 3D). Además, el logo Codo90 en `comercial/marca/` y un folleto en PDF.
- ⚠️ Las facturas de Codo90 **no tienen Verifactu** (el README dice «para probar»). En este caso no se puede prometer.

### 4. Reparto: transportistas

`../Sergi-Dashboard` · Next.js PWA conectada a un Google Sheet.

- **Para quién:** transportistas y una oficina que ya trabaja con un Google Sheet.
- **Problema que resuelve:** el repartidor no sabe en qué orden hacer las entregas y la oficina no se entera de lo entregado hasta que vuelve.
- **Funcionalidades, en lenguaje de cliente:**
  - Cada transportista ve sus pedidos del día, ya ordenados por la ruta más corta.
  - Marca «Entregado» con un toque, aunque no haya cobertura: se envía solo en cuanto hay red y nunca se duplica.
  - La oficina sigue trabajando con su hoja de cálculo de siempre.
  - Facturas en PDF.
- **Capturas:** ninguna. Hay ilustraciones (`public/camion-top.webp`, `furgoneta.webp` y `repartidor.webp`) y un vídeo (`docs/video-moure-comandes.mp4`). Las capturas se pueden sacar con `DEMO_MODE=true`.
- ⚠️ El nombre de la carpeta («Sergi») hace pensar en un cliente real. Hay que confirmar si se puede nombrar.

### Verifactu: lo que hay de verdad

- **Taller:** facturas inmutables, numeración sin huecos, cadena de huellas y QR (la URL del QR aún es de ejemplo). No he encontrado envío a la AEAT. Decir «adaptado a Verifactu» sería exagerar; propongo «facturas que no se pueden manipular, con su código QR».
- **Codo90:** sin Verifactu.
- En la web, «Adaptación a Verifactu» aparece como **servicio**, no como un caso ya terminado.

### No los incluyo, porque no son de oficios

`DashboardPersonal`, `DashboardPersonal1` (máquina de clips), `appgym`, `appingles`, `skiProject-app`, `staour-web`, `dashboard-staour`, `pagina_shop`, `android-pds26_2c`, `spring-pds26_2c` y `SistemaProgramas` (está vacío).

## Archivos de la web actual que se borrarán en la Fase 3

Se quedan `.git/` y `.gitignore` y `README.md`, que reescribiré. Las carpetas sin seguimiento `.next/` y `node_modules/` también se borran, porque se regeneran. `LICENSE` es del autor de la plantilla (Sanidhya Kumar Verma) y no tuyo, así que también se va.

Archivos con seguimiento en git (128):

- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `LICENSE`
- `SECURITY.md`
- `app/apple-icon.png`
- `app/favicon.ico`
- `app/globals.css`
- `app/icon1.png`
- `app/icon2.png`
- `app/layout.tsx`
- `app/page.tsx`
- `app/provider.tsx`
- `bun.lockb`
- `cache/config.json`
- `components/band/App.js`
- `components/band/index.css`
- `components/card/CardSection.module.css`
- `components/card/CardSection.tsx`
- `components/card/assets/DAY_018_1.gif`
- `components/card/assets/DAY_018_2.gif`
- `components/card/assets/favicon.ico`
- `components/card/assets/index_dwn.gif`
- `components/card/assets/logo1.png`
- `components/card/assets/miku.gif`
- `components/card/global.css`
- `components/education.tsx`
- `components/footer.tsx`
- `components/grid.tsx`
- `components/recent-projects.tsx`
- `components/ui/3d-pin.tsx`
- `components/ui/background-gradient-animation.tsx`
- `components/ui/bento-grid.tsx`
- `components/ui/canvas-reveal-effect.tsx`
- `components/ui/floating-nav.tsx`
- `components/ui/infinite-moving-cards.tsx`
- `components/ui/magic-button.tsx`
- `components/ui/moving-borders.tsx`
- `components/ui/spotlight.tsx`
- `components/ui/text-generate-effect.tsx`
- `config/index.ts`
- `data/confetti.json`
- `data/index.ts`
- `global.d.ts`
- `lib/utils.ts`
- `next.config.mjs`
- `package-lock.json`
- `package.json`
- `postcss.config.mjs`
- `public/app.svg`
- `public/appName.svg`
- `public/arrow.svg`
- `public/assets/band-antiguo.png`
- `public/assets/band.png`
- `public/assets/card.glb`
- `public/assets/port-antiguo.png`
- `public/assets/port.png`
- `public/assets/porto.png`
- `public/assets/portofolio.png`
- `public/assets/portofolioo.png`
- `public/b1.svg`
- `public/b4.svg`
- `public/b5.svg`
- `public/behance.svg`
- `public/bg.png`
- `public/blender.svg`
- `public/brandtypescript.svg`
- `public/c.svg`
- `public/cloud.svg`
- `public/cloudName.svg`
- `public/cof.png`
- `public/dock.svg`
- `public/dockerName.svg`
- `public/exp1.svg`
- `public/exp2.svg`
- `public/exp3.svg`
- `public/exp4.svg`
- `public/fls.png`
- `public/fm.svg`
- `public/fonts/Roboto_Regular.json`
- `public/fonts/helvetica.json`
- `public/fonts/helveticaneue.woff2`
- `public/footer-grid.svg`
- `public/gcc.png`
- `public/git.svg`
- `public/graphic.png`
- `public/grid.svg`
- `public/gsap.svg`
- `public/host.svg`
- `public/hostName.svg`
- `public/illustrator.svg`
- `public/images/image1.png`
- `public/images/img10.jpg`
- `public/images/img15.gif`
- `public/images/img16.gif`
- `public/images/img17.gif`
- `public/images/img18.gif`
- `public/insta.svg`
- `public/java.svg`
- `public/kotlin.svg`
- `public/landing.png`
- `public/laravel.svg`
- `public/link.svg`
- `public/lulus.png`
- `public/mysql.svg`
- `public/next.svg`
- `public/nextjs.svg`
- `public/p1.svg`
- `public/p2.svg`
- `public/p3.svg`
- `public/p4.svg`
- `public/photoshop.svg`
- `public/php.svg`
- `public/profile.svg`
- `public/re.svg`
- `public/s.svg`
- `public/stream.svg`
- `public/streamName.svg`
- `public/tail.svg`
- `public/tailwind.svg`
- `public/tanyaai.png`
- `public/three.svg`
- `public/ts.svg`
- `public/twit.svg`
- `public/typescript.svg`
- `tailwind.config.ts`
- `tailwind.d.ts`
- `tsconfig.json`
- `yarn.lock`

## Lo que necesito de ti

1. **Marca:** ¿«Marcel Paulí» o un nombre comercial?
2. **WhatsApp:** el número.
3. **Email:** ¿`marcelpaulilara@gmail.com` (el de `config/index.ts`) u otro?
4. **Permisos:** ¿puedo nombrar a 19 Racing Motorsport y a Sergi (Reparto), y enseñar su logo y sus fotos?
5. **Foto** para «Sobre mí».
6. **Dominio**, para Open Graph y la URL canónica.
7. **Stack:** propongo Astro + GSAP. Ya lo usas en `19racingmotorsport-web`, genera una web estática (buena nota en Lighthouse), convierte las imágenes a WebP/AVIF y gestiona es/ca sin añadir nada más.

# Plan de diseño: del talonario al móvil

La versión visual está en el lienzo de diseño. Este archivo es la versión en texto.

## La idea

Todos mis clientes tienen el mismo objeto en la furgoneta o en el mostrador: **el talonario de partes y albaranes**. Hoja blanca, copia amarilla y copia rosa, el número impreso en rojo y lo de dentro escrito con boli azul. La web toma de ahí sus colores, su tipografía y su único momento de animación: una hoja del talonario se rellena, se arranca y se convierte en el mismo parte dentro del móvil. Es exactamente lo que hacen mis programas.

## Paleta

| Nombre | Hex | Uso |
|---|---|---|
| Papel | `#F9FAF6` | Fondo de la página |
| Azul imprenta | `#1B2A4A` | Textos y lo que va impreso en los formularios |
| Boli | `#2448B8` | Botones, enlaces y lo que «se escribe a mano» |
| Rojo numerador | `#C4232F` | Solo números: el del parte y los pasos de «Cómo trabajo» |
| Copia amarilla | `#F5E7A8` | Fondo de la sección de proyectos |
| Copia rosa | `#F4D0D6` | Fondo del contacto («la copia que te quedas tú») |

Para el texto secundario uso `#3A4866`, que sale del azul imprenta. Contrastes sobre papel: imprenta 13:1, boli 7,6:1 y rojo 5,5:1. El rojo sobre amarillo da 4,6:1, así que ahí solo va en tamaño grande. Todo pasa AA.

## Tipografías

- **Archivo** (variable, con eje de anchura). Ancha a 125 % y peso 800 para los titulares; estrecha a 75 % y peso 600 para lo «impreso»: etiquetas de formulario, números y el «Nº 0098». Una sola familia hace de membrete y de formulario.
- **Atkinson Hyperlegible Next** para el texto. La diseñó el Braille Institute para leerse bien con poca vista. Mis clientes no tienen 25 años y leerán el móvil en la furgoneta. En cursiva y en azul boli, es «lo que se escribe a mano».

### Escala (px, móvil / escritorio)

| Uso | Móvil | Escritorio | Letra |
|---|---|---|---|
| Titular | 36 | 60 | Archivo ancha 800, interlineado 1,02 |
| Sección | 28 | 45 | Archivo ancha 800 |
| Bloque | 22 | 25 | Archivo 700 |
| Entradilla | 20 | 22 | Atkinson 400, interlineado 1,5 |
| Texto | 18 | 19 | Atkinson 400, interlineado 1,55, máximo 68 caracteres por línea |
| Etiqueta | 15 | 15 | Archivo estrecha 600 |

Todo el texto va en minúsculas normales, sin etiquetas en mayúsculas.

## Orden de las secciones

1. **Hero**: qué hago y para quién.
2. **Proyectos**: la prueba de lo que digo, justo después de la promesa.
3. **Servicios**.
4. **Cómo trabajo**: es el único sitio con números, porque es un proceso.
5. **Sobre mí**.
6. **Contacto**.

## Wireframes

### Hero en escritorio (1440)

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Marcel Paulí          Proyectos  Servicios  Cómo trabajo  Contacto  ES CA │
├─────────────────────────────────────┬────────────────────────────────────┤
│                                     │     ┌────────────────┐             │
│  Programas para                     │    ╱ Parte de trabajo╱  Nº 0098    │
│  oficios que te                     │   ╱ Cliente  _______╱  ┌────────┐  │
│  ahorran faena.                     │  ╱ Trabajo  _______╱   │ móvil: │  │
│                                     │ ╱ Notas    _______╱    │ el     │  │
│  Hago programas a medida para…      │╱ Firma  ~~~~~     ╱    │ mismo  │  │
│                                     │└────────────────┘      │ parte  │  │
│  [Pide una demo] [◯ WhatsApp]       │ (copias amarilla y     └────────┘  │
│  Soy Marcel Paulí… Llinars…         │  rosa asoman debajo)               │
└─────────────────────────────────────┴────────────────────────────────────┘
  columnas 1–6: texto a la izquierda,     columnas 7–12: hoja girada −5°
  centrado en vertical                    y móvil delante
```

### Hero en móvil (360–390)

```
┌──────────────────────┐
│ Marcel Paulí   ≡ Menú│
│                      │
│ Programas para       │  ← titular a la izquierda,
│ oficios que te       │    tres líneas, como en escritorio
│ ahorran faena.       │
│ Hago programas…      │
│ [   Pide una demo  ] │  ← botones a todo el ancho, 52 px
│ [ ◯ WhatsApp       ] │
│   ╱hoja╱   ┌─────┐   │  ← la composición asoma
│  ╱    ╱    │móvil│   │    e invita a bajar
└──────────────────────┘
```

### Proyectos en escritorio: reels

Cada oficio se enseña en el aparato en el que de verdad se usa, rodeado de sus herramientas, dibujadas a línea en azul imprenta:

| Oficio | Aparato | Herramientas |
|---|---|---|
| Talleres (MotorSport19) | Tablet: el técnico ficha y lleva la orden junto a la moto | Llave combinada, bujía y piñón |
| Lampistas y fontaneros (Codo90) | Ordenador: panel, plano 3D y presupuesto | Llave grifa, grifo y codo de 90° |
| Transportistas (Reparto) | Móvil: las entregas del día | Camión, caja y la ruta con sus paradas numeradas en rojo |

El parte de Codo90 en el móvil ya sale en el hero, así que aquí el lampista se ve en el ordenador.

```
┌────────────────────────────── fondo copia amarilla ─────────────────────────┐
│ Un programa para cada oficio  │              ▬▬ ▬▬ ▭▭                       │
│ (Talleres)(Lampistas y…)(Tr.) │   bujía ↘   ┌──────────────┐    ↙ piñón     │
│                               │             │              │                │
│ MotorSport19, para talleres   │             │    tablet    │  fija          │
│ El problema …                 │   llave ↗   │              │                │
│ Lo que hace el programa …     │             └──────────────┘                │
│ Resultado: [RESULTADO]        │ [Fichar]  [Orden de trabajo]  [Almacén]     │
└───────────────────────────────┴─────────────────────────────────────────────┘
  columnas 1–5: el caso,          columnas 6–12: el aparato centrado y apoyado
  a la izquierda                  abajo, las herramientas detrás y a los lados,
                                  y las pantallas en fila debajo
```

Cada golpe de scroll pasa a la pantalla siguiente. Al acabar las de un oficio, empiezan las del siguiente y cambia la pestaña. Las pestañas y la fila de pantallas también se pueden tocar para saltar.

### Proyectos en móvil

```
┌──────────────────────┐
│(Talleres)(Lampistas…→│  ← pestañas con scroll horizontal
│ Codo90, para …       │
│ ▬▬ ▬▬ ▭▭ ▭▭          │  ← progreso, como en los stories
│     ┌────────┐       │
│     │pantalla│ fijo  │
│     └────────┘       │
│ Parte de trabajo     │  ← qué hace esta pantalla
│ Fotos de antes…      │
└──────────────────────┘
```

El problema, la solución y el resultado de cada oficio van en un bloque de texto normal justo antes de su reel.

## Movimiento

Uso GSAP y ScrollTrigger. Solo se animan `transform` y `opacity`.

1. **Entrada del hero (1,6 s, una sola vez):**
   - 0,0 s: aparece la hoja en blanco.
   - 0,3 s: se rellenan las líneas en azul boli, con un escalonado de 80 ms.
   - 0,8 s: cae el «Nº 0098» como un sello (escala de 1,3 a 1 con rebote) y la firma se descubre con una máscara que se desplaza.
   - 1,2 s: la hoja se arranca (gira y se aparta) y el móvil sube con el mismo parte, con `back.out(1.6)`.
2. **Reels:** la sección queda fijada (`pin`) con `snap` en cada pantalla. La pantalla nueva entra desde abajo (`yPercent` de 100 a 0) en 0,45 s con un rebote corto, y la barra de progreso avanza con `scaleX`. Al cambiar de oficio, el aparato se encoge y se desvanece (`scale` y `opacity`, 0,25 s), entra el siguiente con rebote y sus herramientas llegan desde los lados (`x` y `rotate`).
3. **Respuesta a lo que haces:** los botones se hunden 2 px al pulsarlos. Al enviar el formulario cae un sello rojo, «Recibido», y el botón pasa a decir «Mensaje enviado».
4. **Reducir movimiento:** con `gsap.matchMedia()`, si se pide menos movimiento se ve directamente la composición final. Los reels pasan a ser una lista normal de pantallas, sin fijar.

## Revisión: lo que cambié por parecer de cualquier freelance

- **Hero:** el primer impulso era un titular grande con un móvil sobre un degradado, que es lo que lleva cualquier web de software. Lo cambié por la hoja del talonario que se convierte en el parte del móvil. Sale de un objeto que mis clientes tienen en las manos todos los días, y explica el producto sin texto.
- **Paleta:** pensé primero en azul marino con naranja de alta visibilidad, de «obra». Es la plantilla típica de construcción y no encaja con un taller ni con un transportista. Ahora los colores salen del papel autocopiativo, que comparten los tres oficios. Además, el azul es el mismo de Codo90 y del taller, así que la web y los programas se ven de la misma familia.
- **Servicios:** iba a hacer 4 tarjetas iguales con icono. Las cambio por filas tipo «Si hoy apuntas en una libreta… / Te hago…», escritas desde el problema del cliente y no desde la tecnología.
- **Números:** solo en «Cómo trabajo», en rojo y como los del talonario. Ni en servicios ni en proyectos.
- **Logos de tecnologías:** los quito (la web vieja tenía 30). Al cliente le da igual. Como mucho, una línea en «Sobre mí».
- **Tipografía:** nada de Inter ni de Space Grotesk. La letra de texto la elijo por legibilidad para gente mayor, no por moda.

## Placeholders visibles que quedarán en la web

`[RESULTADO]` en cada caso, `[TESTIMONIO]`, `[WHATSAPP]`, `[FOTO]` y la captura de Reparto hasta que la saque.

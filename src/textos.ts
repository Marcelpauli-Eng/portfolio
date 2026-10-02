export type Lang = 'es' | 'ca';

export const EMAIL = 'marcelpaulilara@gmail.com';
// [WHATSAPP]: tu número con prefijo y sin espacios ni «+», p. ej. 34600111222. Vacío = no hay botón de WhatsApp.
export const WHATSAPP = '';

const es = {
  meta: {
    title: 'Programas para oficios: talleres, lampistas y transportistas | Marcel Paulí',
    description:
      'Programas a medida para talleres, lampistas, fontaneros y transportistas de Catalunya. Órdenes, partes, albaranes y facturas desde el móvil, también sin cobertura.',
  },
  nav: { proyectos: 'Programas', servicios: 'Servicios', como: 'Cómo trabajo', contacto: 'Contacto', menu: 'Menú', saltar: 'Saltar al contenido', principal: 'Principal' },
  hero: {
    h1: 'Programas para oficios que te ahorran faena.',
    p: 'Para talleres, lampistas y transportistas: órdenes, partes y facturas en el móvil. También sin cobertura.',
    demo: 'Pide una demo',
    whatsapp: 'Escríbeme por WhatsApp',
    hojaAlt: 'Hoja de un talonario de partes de trabajo rellenada a mano, al lado del mismo parte en el móvil',
    movilAlt: 'El parte de trabajo de la comanda 98 en la app Codo90 del móvil',
  },
  hoja: { titulo: 'Parte de trabajo', fecha: 'Fecha', cliente: 'Cliente', telefono: 'Teléfono', direccion: 'Dirección', trabajo: 'Trabajo', notas: 'Notas', firma: 'Firma del cliente' },
  problemas: {
    h2: '¿Te suena?',
    libreta: 'Esta semana',
    libretaAlt: 'Una libreta saliendo de un móvil con cuatro frases tachadas: «¿Esta hora la cobramos?», «Luego lo paso a limpio», «¿Y la factura de marzo?» y «¿Lo has entregado ya?»',
    items: [
      { frase: '¿Esta hora la cobramos?', coste: 'Trabajo que no se cobra' },
      { frase: 'Luego lo paso a limpio.', coste: 'El trabajo, hecho dos veces' },
      { frase: '¿Y la factura de marzo?', coste: 'Tiempo buscando papeles' },
      { frase: '¿Lo has entregado ya?', coste: 'El teléfono, sonando todo el día' },
    ],
    remate: 'Con un programa, esta libreta se queda en el cajón.',
  },
  tiempo: {
    h2: '¿Cuántas horas te comen los papeles?',
    intro: 'Mueve las barras con tus números.',
    ticket: 'Tu semana de papeles',
    campos: [
      { id: 'limpio', t: 'Pasar a limpio', ud: 'min al día', min: 0, max: 90, paso: 5, valor: 20 },
      { id: 'buscar', t: 'Buscar papeles', ud: 'min al día', min: 0, max: 60, paso: 5, valor: 10 },
      { id: 'facturas', t: 'Hacer facturas', ud: 'h al mes', min: 0, max: 12, paso: 0.5, valor: 2 },
      { id: 'dias', t: 'Días de trabajo', ud: 'a la semana', min: 3, max: 7, paso: 1, valor: 5 },
    ],
    total: 'Recuperas',
    semana: 'a la semana',
    mes: 'al mes',
    anyo: 'jornadas de 8 h al año',
    nota: 'Orientativo, con 46 semanas de trabajo al año.',
  },
  proyectos: {
    h2: 'Un programa para cada oficio',
    intro: 'Desliza para ver los tres.',
    programas: 'Programas',
    anterior: 'Programa anterior',
    siguiente: 'Programa siguiente',
    de: 'de',
    pantallas: 'Pantallas',
    pista: 'Toca la pantalla para ver la siguiente.',
    hace: 'Lo que hace',
    antes: 'Antes',
    ahora: 'Ahora',
    mas: '¿Lo quieres ver con tus datos?',
  },
  servicios: {
    h2: 'Lo que te hago',
    items: [
      { icono: 'medida', t: 'Un programa a medida', d: 'Hecho a tu forma de trabajar.' },
      { icono: 'verifactu', t: 'Facturas con Verifactu', d: 'Listas antes de que sea obligatorio.' },
      { icono: 'movil', t: 'Una app para el móvil', d: 'Funciona sin cobertura.' },
      { icono: 'soporte', t: 'Instalación y soporte', d: 'Paso tus datos y te enseño a usarlo.' },
    ],
  },
  proceso: {
    h2: 'Cómo trabajo',
    pasos: [
      { t: 'Hablamos', d: 'En tu taller o en la obra.' },
      { t: 'Te enseño una demo', d: 'Con tu forma de trabajar.' },
      { t: 'Lo ajustamos', d: 'Tú decides qué sobra.' },
      { t: 'Lo pongo en marcha', d: 'Con tus datos dentro.' },
      { t: 'Sigo ahí', d: 'Me escribes y lo miramos.' },
    ],
  },
  contacto: {
    h2: '¿Lo quieres ver con tus datos?',
    p: 'Escríbeme y te enseño una demo de tu programa.',
    whatsapp: 'WhatsApp',
    correo: 'Correo',
    whatsappFalta: '[WHATSAPP]',
    dondeValor: 'Llinars del Vallès (Barcelona)',
    nombre: 'Nombre',
    oficio: 'Tu oficio',
    oficios: ['Taller', 'Lampista o fontanero', 'Transportista', 'Otro'],
    contacto: 'Teléfono o email',
    mensaje: 'Qué te gustaría dejar de hacer a mano (opcional)',
    enviar: 'Enviar mensaje',
    asunto: 'Programa para mi oficio',
    sello: 'Listo',
    hecho: 'Se ha abierto tu correo con el mensaje escrito. Solo falta darle a enviar.',
  },
  pie: {
    lema: 'Programas a medida para talleres, lampistas, fontaneros y transportistas.',
    derechos: '© 2026 Marcel Paulí',
  },
};

const ca: typeof es = {
  meta: {
    title: 'Programes per a oficis: tallers, lampistes i transportistes | Marcel Paulí',
    description:
      'Programes a mida per a tallers, lampistes, fontaners i transportistes de Catalunya. Ordres, parts, albarans i factures des del mòbil, també sense cobertura.',
  },
  nav: { proyectos: 'Programes', servicios: 'Serveis', como: 'Com treballo', contacto: 'Contacte', menu: 'Menú', saltar: 'Salta al contingut', principal: 'Principal' },
  hero: {
    h1: 'Programes per a oficis que t’estalvien feina.',
    p: 'Per a tallers, lampistes i transportistes: ordres, parts i factures al mòbil. També sense cobertura.',
    demo: 'Demana una demo',
    whatsapp: 'Escriu-me per WhatsApp',
    hojaAlt: 'Full d’un talonari de parts de treball omplert a mà, al costat del mateix part al mòbil',
    movilAlt: 'El part de treball de la comanda 98 a l’app Codo90 del mòbil',
  },
  hoja: { titulo: 'Part de treball', fecha: 'Data', cliente: 'Client', telefono: 'Telèfon', direccion: 'Adreça', trabajo: 'Feina', notas: 'Notes', firma: 'Signatura del client' },
  problemas: {
    h2: 'Et sona?',
    libreta: 'Aquesta setmana',
    libretaAlt: 'Una llibreta sortint d’un mòbil amb quatre frases ratllades: «Aquesta hora la cobrem?», «Després ho passo en net», «I la factura de març?» i «Ja ho has lliurat?»',
    items: [
      { frase: 'Aquesta hora la cobrem?', coste: 'Feina que no es cobra' },
      { frase: 'Després ho passo en net.', coste: 'La feina, feta dos cops' },
      { frase: 'I la factura de març?', coste: 'Temps buscant papers' },
      { frase: 'Ja ho has lliurat?', coste: 'El telèfon, sonant tot el dia' },
    ],
    remate: 'Amb un programa, aquesta llibreta es queda al calaix.',
  },
  tiempo: {
    h2: 'Quantes hores et mengen els papers?',
    intro: 'Mou les barres amb els teus números.',
    ticket: 'La teva setmana de papers',
    campos: [
      { id: 'limpio', t: 'Passar en net', ud: 'min al dia', min: 0, max: 90, paso: 5, valor: 20 },
      { id: 'buscar', t: 'Buscar papers', ud: 'min al dia', min: 0, max: 60, paso: 5, valor: 10 },
      { id: 'facturas', t: 'Fer factures', ud: 'h al mes', min: 0, max: 12, paso: 0.5, valor: 2 },
      { id: 'dias', t: 'Dies de feina', ud: 'a la setmana', min: 3, max: 7, paso: 1, valor: 5 },
    ],
    total: 'Recuperes',
    semana: 'a la setmana',
    mes: 'al mes',
    anyo: 'jornades de 8 h a l’any',
    nota: 'Orientatiu, amb 46 setmanes de feina a l’any.',
  },
  proyectos: {
    h2: 'Un programa per a cada ofici',
    intro: 'Llisca per veure’ls tots tres.',
    programas: 'Programes',
    anterior: 'Programa anterior',
    siguiente: 'Programa següent',
    de: 'de',
    pantallas: 'Pantalles',
    pista: 'Toca la pantalla per veure la següent.',
    hace: 'Què fa',
    antes: 'Abans',
    ahora: 'Ara',
    mas: 'Ho vols veure amb les teves dades?',
  },
  servicios: {
    h2: 'El que et faig',
    items: [
      { icono: 'medida', t: 'Un programa a mida', d: 'Fet a la teva manera de treballar.' },
      { icono: 'verifactu', t: 'Factures amb Verifactu', d: 'A punt abans que sigui obligatori.' },
      { icono: 'movil', t: 'Una app per al mòbil', d: 'Funciona sense cobertura.' },
      { icono: 'soporte', t: 'Instal·lació i suport', d: 'Passo les teves dades i t’ensenyo a fer-lo servir.' },
    ],
  },
  proceso: {
    h2: 'Com treballo',
    pasos: [
      { t: 'En parlem', d: 'Al teu taller o a l’obra.' },
      { t: 'T’ensenyo una demo', d: 'Amb la teva manera de treballar.' },
      { t: 'L’ajustem', d: 'Tu decideixes què sobra.' },
      { t: 'El poso en marxa', d: 'Amb les teves dades a dins.' },
      { t: 'Hi continuo sent', d: 'M’escrius i ho mirem.' },
    ],
  },
  contacto: {
    h2: 'Ho vols veure amb les teves dades?',
    p: 'Escriu-me i t’ensenyo una demo del teu programa.',
    whatsapp: 'WhatsApp',
    correo: 'Correu',
    whatsappFalta: '[WHATSAPP]',
    dondeValor: 'Llinars del Vallès (Barcelona)',
    nombre: 'Nom',
    oficio: 'El teu ofici',
    oficios: ['Taller', 'Lampista o fontaner', 'Transportista', 'Un altre'],
    contacto: 'Telèfon o correu',
    mensaje: 'Què t’agradaria deixar de fer a mà (opcional)',
    enviar: 'Envia el missatge',
    asunto: 'Programa per al meu ofici',
    sello: 'Llest',
    hecho: 'S’ha obert el teu correu amb el missatge escrit. Només cal que l’enviïs.',
  },
  pie: {
    lema: 'Programes a mida per a tallers, lampistes, fontaners i transportistes.',
    derechos: '© 2026 Marcel Paulí',
  },
};

export const textos = { es, ca };

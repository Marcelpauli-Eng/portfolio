// Las fichas de cada programa, en corto. Sacadas de sus folletos comerciales y de sus README.
import type { Lang } from './textos';

export type Programa = {
  id: string;
  tab: string;
  nombre: string;
  para: string;
  lema: string;
  datos: string[];
  pantallas: { img: string; t: string; alt: string }[];
  pasos: string[];
  cifras: { n: string; t: string }[];
  cta: string;
  // Folleto: se diseña en folletos/<pdf>.html y se imprime con «npm run folletos». Sin folleto, no hay botón.
  folleto?: { pdf: string; info: string };
};

const es: Programa[] = [
  {
    id: 'talleres',
    tab: 'Talleres',
    nombre: 'SportMotor',
    para: 'Talleres de coches, motos y furgonetas',
    lema: 'Todo tu taller, en un solo programa.',
    datos: ['Ordenador, tablet y móvil', 'Sigue sin internet', 'Registro de jornada', 'Facturas con QR'],
    pantallas: [
      { img: 'taller-orden', t: 'Orden de trabajo', alt: 'Orden de trabajo de una moto en la tablet, con sus pasos' },
      { img: 'taller-fichar', t: 'Fichar la entrada', alt: 'Pantalla para fichar la entrada en la tablet del taller' },
    ],
    pasos: ['Cita', 'Entrada', 'Diagnóstico', 'Presupuesto', 'Reparación', 'Entrega', 'Factura'],
    cifras: [
      { n: '0', t: 'huecos en tus facturas' },
      { n: '48', t: 'permisos para decidir quién ve qué' },
      { n: '4 años', t: 'de fichajes guardados' },
    ],
    cta: 'Quiero verlo en mi taller',
    folleto: { pdf: 'SportMotor-Folleto.pdf', info: 'PDF · 11 páginas' },
  },
  {
    id: 'lampistas',
    tab: 'Lampistas y fontaneros',
    nombre: 'Codo90',
    para: 'Lampistas y fontaneros autónomos',
    lema: 'Tu día entero, de la llamada a la factura.',
    datos: ['Funciona sin cobertura', 'Partes con firma', 'Albaranes y facturas', 'Planos en 3D'],
    pantallas: [
      { img: 'codo90-panel', t: 'Panel', alt: 'Panel de Codo90 en el ordenador con el calendario de comandas' },
      { img: 'codo90-plano', t: 'Plano en 3D', alt: 'Plano 3D de un baño y una cocina con las tuberías y sus medidas' },
      { img: 'codo90-presupuesto', t: 'Presupuesto', alt: 'Presupuesto calculado a partir del plano 3D' },
    ],
    pasos: ['Aviso', 'Día', 'Ruta', 'Trabajo', 'Firma', 'Albarán', 'Factura'],
    cifras: [
      { n: '0', t: 'partes por pasar a limpio' },
      { n: '48', t: 'servicios listos de salida' },
      { n: '104', t: 'piezas para dibujar tus planos' },
    ],
    cta: 'Quiero verlo en mi furgoneta',
    folleto: { pdf: 'Codo90-Folleto.pdf', info: 'PDF · 12 páginas' },
  },
  {
    id: 'transportistas',
    tab: 'Transportistas',
    nombre: 'Reparto',
    para: 'Transportistas y repartidores',
    lema: 'Las entregas del día, en orden y sin papel.',
    datos: ['Funciona sin cobertura', 'La ruta más corta', 'Con vuestra hoja de cálculo', 'Facturas en PDF'],
    pantallas: [
      { img: 'reparto-hoy', t: 'Ruta de hoy', alt: 'Resumen del día en Reparto: cinco paradas por repartir' },
      { img: 'reparto-paradas', t: 'Paradas en orden', alt: 'Lista de paradas en orden, con botones de entregado e incidencia' },
      { img: 'reparto-cobro', t: 'Entregado', alt: 'Pantalla para marcar una entrega y apuntar lo cobrado' },
      { img: 'reparto-facturas', t: 'Por facturar', alt: 'Importe pendiente de facturar con el botón para generar la factura' },
    ],
    pasos: ['Pedido', 'Día', 'Ruta', 'Entrega', 'Cobro', 'Factura'],
    cifras: [
      { n: '1', t: 'toque para marcar una entrega' },
      { n: '1 año', t: 'de sesión: se entra una vez' },
      { n: '2', t: 'empresas en el mismo calendario' },
    ],
    cta: 'Quiero verlo en mi furgoneta',
    folleto: { pdf: 'Reparto-Folleto.pdf', info: 'PDF · 11 páginas' },
  },
];

const ca: Programa[] = [
  {
    id: 'talleres',
    tab: 'Tallers',
    nombre: 'SportMotor',
    para: 'Tallers de cotxes, motos i furgonetes',
    lema: 'Tot el teu taller, en un sol programa.',
    datos: ['Ordinador, tauleta i mòbil', 'Funciona sense internet', 'Registre de jornada', 'Factures amb QR'],
    pantallas: [
      { img: 'taller-orden', t: 'Ordre de treball', alt: 'Ordre de treball d’una moto a la tauleta, amb els seus passos' },
      { img: 'taller-fichar', t: 'Fitxar l’entrada', alt: 'Pantalla per fitxar l’entrada a la tauleta del taller' },
    ],
    pasos: ['Cita', 'Entrada', 'Diagnosi', 'Pressupost', 'Reparació', 'Lliurament', 'Factura'],
    cifras: [
      { n: '0', t: 'salts a les teves factures' },
      { n: '48', t: 'permisos per decidir qui veu què' },
      { n: '4 anys', t: 'de fitxatges guardats' },
    ],
    cta: 'Vull veure-ho al meu taller',
    folleto: { pdf: 'SportMotor-Folleto.pdf', info: 'PDF · 11 pàgines' },
  },
  {
    id: 'lampistas',
    tab: 'Lampistes i fontaners',
    nombre: 'Codo90',
    para: 'Lampistes i fontaners autònoms',
    lema: 'Tot el teu dia, de la trucada a la factura.',
    datos: ['Funciona sense cobertura', 'Parts amb signatura', 'Albarans i factures', 'Plànols en 3D'],
    pantallas: [
      { img: 'codo90-panel', t: 'Tauler', alt: 'Tauler de Codo90 a l’ordinador amb el calendari de comandes' },
      { img: 'codo90-plano', t: 'Plànol en 3D', alt: 'Plànol 3D d’un bany i una cuina amb les canonades i les seves mides' },
      { img: 'codo90-presupuesto', t: 'Pressupost', alt: 'Pressupost calculat a partir del plànol 3D' },
    ],
    pasos: ['Avís', 'Dia', 'Ruta', 'Feina', 'Signatura', 'Albarà', 'Factura'],
    cifras: [
      { n: '0', t: 'parts per passar en net' },
      { n: '48', t: 'serveis a punt de sortida' },
      { n: '104', t: 'peces per dibuixar els teus plànols' },
    ],
    cta: 'Vull veure-ho a la meva furgoneta',
    folleto: { pdf: 'Codo90-Folleto.pdf', info: 'PDF · 12 pàgines' },
  },
  {
    id: 'transportistas',
    tab: 'Transportistes',
    nombre: 'Reparto',
    para: 'Transportistes i repartidors',
    lema: 'Els lliuraments del dia, en ordre i sense paper.',
    datos: ['Funciona sense cobertura', 'La ruta més curta', 'Amb el vostre full de càlcul', 'Factures en PDF'],
    pantallas: [
      { img: 'reparto-hoy', t: 'Ruta d’avui', alt: 'Resum del dia a Reparto: cinc parades per repartir' },
      { img: 'reparto-paradas', t: 'Parades en ordre', alt: 'Llista de parades en ordre, amb botons de lliurat i incidència' },
      { img: 'reparto-cobro', t: 'Lliurat', alt: 'Pantalla per marcar un lliurament i apuntar el que s’ha cobrat' },
      { img: 'reparto-facturas', t: 'Per facturar', alt: 'Import pendent de facturar amb el botó per generar la factura' },
    ],
    pasos: ['Comanda', 'Dia', 'Ruta', 'Lliurament', 'Cobrament', 'Factura'],
    cifras: [
      { n: '1', t: 'toc per marcar un lliurament' },
      { n: '1 any', t: 'de sessió: s’hi entra un cop' },
      { n: '2', t: 'empreses al mateix calendari' },
    ],
    cta: 'Vull veure-ho a la meva furgoneta',
    folleto: { pdf: 'Reparto-Folleto.pdf', info: 'PDF · 11 pàgines' },
  },
];

export const programas: Record<Lang, Programa[]> = { es, ca };

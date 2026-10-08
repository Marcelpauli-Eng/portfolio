// Un día con Reparto en el móvil del transportista, en diez pasos. node guion.mjs (ver montar.py)
// La demo tiene que estar recién arrancada: sin entregas marcadas, para que la de Bar Elèctric salga de cero.
import { grabacion } from './grabador.mjs';

const g = await grabacion({ carpeta: 'app' });
const { D, cdp } = g;
const TOTAL = 10;
let n = 0;
const paso = (ceja, titulo, texto) => g.rotulo({ paso: ++n, total: TOTAL, ceja, titulo, texto });
// El n-ésimo botón visible con ese texto: hay uno por parada.
const boton = (texto, i = 0) => `[...document.querySelectorAll('button')].filter(b => b.offsetParent && b.textContent.trim() === '${texto}')[${i}]`;

await cdp('Network.enable');
await cdp('Network.clearBrowserCookies');
await g.abrir('/login');
await g.empezar();

paso('Acceso', 'Cada transportista, con su código', 'Entra una vez con su código y su PIN, y la sesión le dura un año.');
await D(`d.colocar(195, 640); await d.e(900);`);
await D(`await d.escribir('input[placeholder="Código de transportista"]', 'demo', { ms: 130 });`);
await D(`await d.escribir('input[type=password]', '1234', { ms: 130 }); await d.e(300);`);
await D(`await d.clic('button[type=submit]', { despues: 300 }); await d.esperarA('texto:Generar ruta'); await d.esperarA('texto:Actualizado ahora mismo'); await d.e(1200);`);

paso('El día', 'Lo que toca hoy, de un vistazo', 'Paradas por repartir, entregas hechas y lo cobrado, en la primera pantalla.');
await D(`await d.mover('texto:per repartir', 900); await d.e(1500);`);
await D(`await d.mover('texto:Cobrat avui', 900); await d.e(1800);`);

paso('La ruta', 'Las paradas, en el orden más corto', 'La ruta ordena el día para hacer menos kilómetros. Cada parada lleva su número.');
await D(`await d.desplazar(0, 700); await d.mover('texto:Ruta d\\'avui', 900); await d.e(1600);`);
await D(`await d.mover('texto:Pendents', 900); await d.e(400); await d.desplazar(scrollY + 260, 900); await d.e(1800);`);

paso('La parada', 'Todo lo de cada parada', 'Dirección, albarán y lo que ha pedido el cliente. Y un botón para llamarle.');
await D(`await d.mover('texto:Entregar en recepción, preguntar por Marta', 900); await d.e(1800);`);
await D(`await d.mover('a[aria-label="Trucar"]', 800); await d.e(1600);`);

paso('Navegar', 'Te lleva tu app de mapas', 'Google Maps, Waze o Apple Maps: eliges una y te lleva a la puerta.');
await D(`await d.clic(${boton('Navegar')}, { despues: 400 }); await d.esperarA('texto:Seleccionar aplicació'); await d.e(2600);`);
await D(`await d.clic('button[aria-label="Tancar"]', { despues: 900 });`);

paso('Avisos al cliente', 'Validar avisa al cliente', 'Eliges el paso del pedido y le llega un mensaje: en camino, llegamos en 10 minutos, entregado.');
await D(`await d.mover('texto:Bar Elèctric', 900); await d.e(500);`);
await D(`await d.clic([...document.querySelectorAll('[data-validar]')][1], { despues: 600 }); await d.e(2400);`);
await D(`await d.mover('texto:Hola, Bar Elèctric', 800); await d.e(1600);`);
await D(`await d.clic('[data-enviar]', { despues: 2800 });`);

paso('La entrega', 'Entregado, en la puerta', 'Un toque y apuntas lo cobrado. Sin cobertura se guarda y se envía al volver la señal.');
await D(`await d.clic(${boton('Entregat', 1)}, { despues: 700 });`);
await D(`await d.escribir('input[inputmode="decimal"]', '56,50', { ms: 160 }); await d.e(600);`);
await D(`const p = document.querySelector('input[inputmode="decimal"]').closest('.hairline'); await d.clic([...p.querySelectorAll('button')].find(b => b.textContent.trim() === 'Entregat'), { despues: 1500 });`);
await D(`await d.desplazar(0, 1000); await d.mover('texto:Cobrat avui', 900); await d.e(2200);`);

paso('El calendario', 'Los próximos días, planificados', 'Repartes los pedidos pendientes entre los días que vienen.');
await D(`await d.clic(${boton('Calendari')}, { despues: 2200 }); await d.e(1600);`);

paso('La factura', 'La factura sale sola', 'Junta las entregas con su IVA e IRPF y le pone el número que toca.');
await D(`await d.clic(${boton('Factures')}, { despues: 1800 });`);
await D(`await d.clic(${boton('Generar factura')}, { despues: 900 }); await d.esperarA('texto:Base imposable'); await d.e(1200);`);
await D(`await d.mover('texto:Total', 900); await d.e(1600);`);
await D(`await d.mover('texto:Emetre factura', 900); await d.e(1800);`);

paso('Informes', 'Tus números del mes', 'Entregas por día, facturación y lo que queda por cobrar.');
await D(`await d.clic('button[aria-label="Tancar"]', { despues: 900 });`);
await D(`await d.clic(${boton('Informes')}, { despues: 2200 }); await d.desplazar(scrollY + 300, 1200); await d.e(2400);`);

await g.terminar();
g.cerrar();

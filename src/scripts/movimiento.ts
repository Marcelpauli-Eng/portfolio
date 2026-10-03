import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ahorro } from '../ahorro';

gsap.registerPlugin(ScrollTrigger);

const raiz = document.documentElement;
const listo = () => raiz.classList.add('listo');
const animado = () => raiz.classList.contains('mov');

// ---------- Hero: la hoja se rellena, se arranca y sube el móvil con el mismo parte ----------
function entradaHero() {
  const escena = document.querySelector<HTMLElement>('.hero-escena');
  if (!escena) return listo();
  const hoja = escena.querySelector('.hoja');
  const copias = escena.querySelectorAll('.copia');
  const movil = escena.querySelector('.hero-movil');

  gsap.timeline({ defaults: { ease: 'power2.out' } })
    .set(hoja, { rotation: 0, xPercent: 18, y: 16, opacity: 0 })
    .set(copias, { rotation: 0, xPercent: 18, opacity: 0 })
    .set(escena.querySelectorAll('.valor'), { opacity: 0, x: -8 })
    .set(escena.querySelector('.numero'), { opacity: 0, scale: 1.5 })
    .set(escena.querySelector('.firma-tapa'), { xPercent: 0 })
    .set(movil, { yPercent: 25, opacity: 0 })
    .add(listo)
    .to(hoja, { opacity: 1, y: 0, duration: 0.3 })
    .to(escena.querySelectorAll('.valor'), { opacity: 1, x: 0, duration: 0.25, stagger: 0.08 }, 0.3)
    .to(escena.querySelector('.numero'), { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(3)' }, 0.8)
    .to(escena.querySelector('.firma-tapa'), { xPercent: 101, duration: 0.4, ease: 'power1.inOut' }, 0.85)
    .to(hoja, { rotation: -5, xPercent: 0, duration: 0.5, ease: 'power3.inOut' }, 1.2)
    .to(copias, { rotation: (i: number) => (i === 0 ? -8 : -6.5), xPercent: 0, opacity: 1, duration: 0.5, ease: 'power3.inOut' }, 1.2)
    .to(movil, { yPercent: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 1.3);
}

// ---------- Las pantallas de cada aparato ----------
type Aparato = {
  pista: HTMLElement;
  pantallas: HTMLElement[];
  items: HTMLElement[];
  botones: HTMLButtonElement[];
  segmentos: HTMLElement[];
  actual: number;
};

function marcar(a: Aparato, k: number, suave: boolean) {
  a.actual = k;
  a.items.forEach((li, i) => li.toggleAttribute('data-activa', i === k));
  a.botones.forEach((b, i) => (i === k ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
  a.segmentos.forEach((s, i) => gsap.to(s, { scaleX: i <= k ? 1 : 0, duration: suave ? 0.3 : 0, overwrite: true }));
}

function irA(a: Aparato, k: number) {
  if (k === a.actual) return;
  if (!animado()) {
    a.pista.scrollTo({ left: k * a.pista.clientWidth });
    return marcar(a, k, false);
  }
  a.pantallas.forEach((p, i) => {
    const y = i <= k ? 0 : 100;
    if (gsap.getProperty(p, 'yPercent') !== y) {
      gsap.to(p, { yPercent: y, duration: 0.45, ease: y === 0 ? 'back.out(1.4)' : 'power2.in', overwrite: true });
    }
  });
  marcar(a, k, true);
}

const aparatos: Aparato[] = [...document.querySelectorAll<HTMLElement>('.programa')].map((el) => {
  const a: Aparato = {
    pista: el.querySelector<HTMLElement>('.pista')!,
    pantallas: [...el.querySelectorAll<HTMLElement>('.pista > li')],
    items: [...el.querySelectorAll<HTMLElement>('.lista > li')],
    botones: [...el.querySelectorAll<HTMLButtonElement>('.lista button')],
    segmentos: [...el.querySelectorAll<HTMLElement>('.progreso i')],
    actual: 0,
  };
  marcar(a, 0, false);
  a.botones.forEach((b, i) => b.addEventListener('click', () => irA(a, i)));
  // Como en los stories: tocar la pantalla pasa a la siguiente.
  el.querySelector('.pantalla')?.addEventListener('click', () => irA(a, (a.actual + 1) % a.pantallas.length));
  // Sin animación se pasa deslizando: la lista y la barra siguen a la pantalla visible.
  a.pista.addEventListener(
    'scroll',
    () => {
      if (animado()) return;
      const k = Math.round(a.pista.scrollLeft / a.pista.clientWidth);
      if (k !== a.actual) marcar(a, k, true);
    },
    { passive: true },
  );
  return a;
});

// Las pantallas apiladas quedan recortadas y la carga diferida no las ve: se piden antes de llegar.
const cargar = (el: Element) => el.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));

// ---------- Carrusel de programas ----------
const carrusel = document.querySelector<HTMLElement>('.carrusel');
if (carrusel) {
  const seccion = carrusel.closest<HTMLElement>('.programas')!;
  const tabs = [...carrusel.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const paneles = [...carrusel.querySelectorAll<HTMLElement>('.programa')];
  const fondos = [...seccion.querySelectorAll<HTMLElement>('.fondo')];
  const contador = carrusel.querySelector('.contador-n');
  let actual = 0;

  const mostrar = (destino: number, dir: number, foco = false) => {
    const k = (destino + paneles.length) % paneles.length;
    if (k === actual) return;
    tabs.forEach((tb, i) => {
      tb.setAttribute('aria-selected', String(i === k));
      tb.tabIndex = i === k ? 0 : -1;
    });
    if (foco) tabs[k].focus({ preventScroll: true });
    // La pestaña elegida se centra en su tira, solo de lado: scrollIntoView también movía la página en vertical.
    const tira = tabs[k].parentElement!;
    const caja = tira.getBoundingClientRect();
    const pestana = tabs[k].getBoundingClientRect();
    tira.scrollBy({ left: pestana.left - caja.left - (caja.width - pestana.width) / 2, behavior: animado() ? 'smooth' : 'auto' });
    fondos.forEach((f, i) => f.classList.toggle('activo', i === k));
    seccion.dataset.activo = paneles[k].id;
    paneles[actual].classList.remove('activo');
    const nuevo = paneles[k];
    nuevo.classList.add('activo');
    cargar(nuevo);
    if (contador) contador.textContent = String(k + 1);
    actual = k;
    // Las medidas de la ficha nueva cambian (los pasos en móvil se miden con ella). La página se queda a la misma altura.
    ScrollTrigger.refresh();


    if (animado()) {
      gsap.fromTo(nuevo, { x: dir * 48, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform,opacity' });
      gsap.from(nuevo.querySelectorAll<HTMLElement>('.herr'), {
        x: (_i: number, el: HTMLElement) => Number(el.dataset.lado) * 90,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.4)',
        stagger: 0.07,
        delay: 0.1,
        clearProps: 'transform,opacity',
      });
    }
  };

  tabs.forEach((tb, i) => tb.addEventListener('click', () => mostrar(i, i > actual ? 1 : -1)));
  carrusel.querySelector('[role="tablist"]')?.addEventListener('keydown', (e) => {
    const tecla = (e as KeyboardEvent).key;
    const destinos: Record<string, number> = { ArrowRight: actual + 1, ArrowLeft: actual - 1, Home: 0, End: tabs.length - 1 };
    if (!(tecla in destinos)) return;
    e.preventDefault();
    mostrar(destinos[tecla], destinos[tecla] > actual ? 1 : -1, true);
  });
  carrusel.querySelectorAll<HTMLButtonElement>('.flecha').forEach((b) =>
    b.addEventListener('click', () => {
      const d = Number(b.dataset.dir);
      mostrar(actual + d, d);
    }),
  );

  // Deslizar con el dedo de lado cambia de programa (fuera del aparato y de las tablas, que tienen su propio scroll).
  let x0 = 0;
  let y0 = 0;
  let vale = false;
  const pista = carrusel.querySelector<HTMLElement>('.carrusel-pista')!;
  pista.addEventListener(
    'touchstart',
    (e) => {
      vale = !(e.target as Element).closest('.pista, .comparativa-caja, input, textarea');
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    },
    { passive: true },
  );
  pista.addEventListener(
    'touchend',
    (e) => {
      if (!vale) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) mostrar(actual - Math.sign(dx), -Math.sign(dx));
    },
    { passive: true },
  );

  ScrollTrigger.create({ trigger: seccion, start: 'top bottom+=600', once: true, onEnter: () => cargar(paneles[actual]) });
}

// ---------- Cuánto tiempo te devuelve ----------
const ticket = document.querySelector<HTMLFormElement>('.ticket--ahorro');
if (ticket) {
  const lang = ticket.dataset.lang ?? 'es';
  const num = new Intl.NumberFormat(lang === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 1 });
  const reglas = [...ticket.querySelectorAll<HTMLInputElement>('input[type="range"]')];
  const salida = (n: string) => ticket.querySelector<HTMLElement>(`[data-salida="${n}"]`)!;
  ticket.addEventListener('input', () => {
    reglas.forEach((r) => (ticket.querySelector(`#v-${r.name}`)!.textContent = `${num.format(Number(r.value))} ${r.dataset.ud}`));
    const c = ahorro(Object.fromEntries(reglas.map((r) => [r.name, Number(r.value)])), lang);
    salida('semana').textContent = c.semana;
    salida('mes').textContent = c.mes;
    salida('anyo').textContent = c.anyo;
  });
  // Al soltar el control, la cifra se marca como un sello.
  ticket.addEventListener('change', () => {
    if (animado()) gsap.fromTo(salida('semana'), { scale: 1.12 }, { scale: 1, duration: 0.35, ease: 'back.out(3)' });
  });
}

// ---------- Movimiento, solo si no se ha pedido reducirlo ----------
let heroHecho = false;
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: reduce)', () => listo());
mm.add('(prefers-reduced-motion: no-preference)', () => {
  raiz.classList.add('mov');
  if (heroHecho) listo();
  else {
    heroHecho = true;
    entradaHero();
  }

  aparatos.forEach((a) => {
    a.pista.scrollLeft = 0;
    gsap.set(a.pantallas, { yPercent: (i: number) => (i === 0 ? 0 : 100), zIndex: (i: number) => i + 1 });
    marcar(a, 0, false);
  });

  // La tablilla se endereza al bajar y los avisos de la mañana se van marcando como hechos.
  const tabla = document.querySelector('.tabla');
  if (tabla) {
    gsap
      .timeline({ scrollTrigger: { trigger: '.tabla-escena', start: 'top 85%', end: 'bottom 70%', scrub: true } })
      .fromTo(tabla, { y: 60, rotation: 3 }, { y: 0, rotation: -2, ease: 'none', duration: 1 })
      .fromTo('.aviso-estado--hecho', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(3)', duration: 0.25, stagger: 0.35 }, '-=0.3');
  }

  return () => {
    raiz.classList.remove('mov');
    aparatos.forEach((a) => marcar(a, 0, false));
  };
});
// En el móvil, los pasos del 1 al 7 avanzan de lado mientras se baja.
mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
  document.querySelectorAll<HTMLElement>('.flujo-caja').forEach((caja) => {
    const fila = caja.querySelector<HTMLElement>('.flujo')!;
    const pasos = [...fila.children] as HTMLElement[];
    let actualPaso = -1;
    const marcarPaso = (k: number) => {
      if (k === actualPaso) return;
      actualPaso = k;
      pasos.forEach((li, i) => {
        li.classList.toggle('hecho', i < k);
        li.classList.toggle('actual', i === k);
      });
    };
    marcarPaso(0);
    gsap.to(fila, {
      x: () => -Math.max(0, fila.scrollWidth - caja.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: caja,
        start: 'top 75%',
        end: 'top 25%',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (st) => marcarPaso(Math.round(st.progress * (pasos.length - 1))),
      },
    });
  });
  return () => document.querySelectorAll('.flujo li').forEach((li) => li.classList.remove('hecho', 'actual'));
});
document.fonts?.ready.then(() => ScrollTrigger.refresh());

// ---------- Formulario: FormSubmit lo reenvía al correo y cae el sello ----------
const form = document.querySelector<HTMLFormElement>('form.parte');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { email, asunto, hecho, error } = form.dataset;
  const boton = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const aviso = form.querySelector('.hecho')!;
  boton.disabled = true;
  try {
    const r = await fetch(`https://formsubmit.co/ajax/${email}`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    if (String((await r.json()).success) !== 'true') throw new Error();
    form.classList.add('enviado');
    aviso.textContent = hecho ?? '';
    form.reset();
  } catch {
    // Que no se pierda el mensaje: se abre el correo de quien escribe con él ya puesto.
    const lineas = [...form.querySelectorAll<HTMLInputElement>('[id][name]')].map(
      (campo) => `${form.querySelector(`label[for="${campo.id}"]`)?.textContent}: ${campo.value}`,
    );
    aviso.textContent = error ?? '';
    location.href = `mailto:${email}?subject=${encodeURIComponent(asunto ?? '')}&body=${encodeURIComponent(lineas.join('\n'))}`;
  } finally {
    boton.disabled = false;
  }
});

// Se inyecta en la app para grabar la demo: el dedo, los toques, el tecleo y el desplazamiento.
// Sale de MotorSport19/comercial/video/demo-lib.js, recortado a lo que usa este vídeo y con el
// tecleo arreglado para React (un `el.value = …` a secas no lo ve React).
(() => {
  if (window.__demo) return;
  const e = (ms) => new Promise((r) => setTimeout(r, ms));
  const suave = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const cuadro = () => new Promise((r) => requestAnimationFrame(r));

  function montar() {
    if (document.getElementById('demo-cursor')) return;
    const st = document.createElement('style');
    st.textContent = `
      #demo-cursor { position: fixed; left: 0; top: 0; width: 38px; height: 38px; border-radius: 50%; z-index: 2147483647; pointer-events: none;
        background: rgba(27,42,74,.24); border: 2px solid rgba(255,255,255,.95); filter: drop-shadow(0 2px 6px rgba(0,0,0,.35)); will-change: transform; }
      .demo-onda { position: fixed; width: 46px; height: 46px; margin: -23px 0 0 -23px; border-radius: 50%; pointer-events: none; z-index: 2147483646;
        background: rgba(36,72,184,.28); border: 2px solid #2448B8; animation: demo-onda .55s ease-out forwards; }
      @keyframes demo-onda { from { transform: scale(.2); opacity: 1 } to { transform: scale(1.4); opacity: 0 } }
    `;
    document.head.appendChild(st);
    const cursor = document.createElement('div');
    cursor.id = 'demo-cursor';
    document.body.appendChild(cursor);
    colocar(pos.x, pos.y);
  }

  const pos = { x: 300, y: 600 };
  function colocar(x, y) {
    pos.x = x; pos.y = y;
    const c = document.getElementById('demo-cursor');
    if (c) c.style.transform = `translate(${x - 19}px, ${y - 19}px)`;
  }

  function buscar(q) {
    if (q instanceof Element) return q;
    const vis = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    if (typeof q === 'string' && /^[#.\[a-z]/i.test(q) && !q.startsWith('texto:')) {
      try { const el = [...document.querySelectorAll(q)].find(vis); if (el) return el; } catch {}
    }
    const txt = String(q).replace(/^texto:/, '').toLowerCase();
    const todos = [...document.querySelectorAll('button, a, [role=button], label, h1, h2, h3, h4, p, strong, span, div')].filter(vis);
    const de = (el) => el.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
    // Entre varios que encajan, manda el control (botón o enlace); si no hay, el más interior.
    const mejor = (lista) => lista.find((el) => el.matches('button, a, [role=button]')) ?? lista.at(-1);
    const exactos = todos.filter((el) => de(el) === txt || el.getAttribute('aria-label')?.toLowerCase() === txt);
    if (exactos.length) return mejor(exactos);
    const parciales = todos.filter((el) => de(el).includes(txt));
    const minimo = Math.min(...parciales.map((el) => el.textContent.length));
    return parciales.length ? mejor(parciales.filter((el) => el.textContent.length <= minimo + 40)) : undefined;
  }
  async function esperarA(q, ms = 15000) {
    for (let t = 0; t < ms; t += 150) { const el = buscar(q); if (el) return el; await e(150); }
    throw new Error('No aparece: ' + q);
  }

  async function desplazar(y, ms = 900) {
    const y0 = scrollY, y1 = Math.max(0, Math.min(y, document.scrollingElement.scrollHeight - innerHeight));
    const t0 = performance.now();
    for (;;) {
      await cuadro();
      const k = Math.min(1, (performance.now() - t0) / ms);
      scrollTo(0, y0 + (y1 - y0) * suave(k));
      if (k === 1) break;
    }
  }

  async function mover(q, ms = 700, dx = 0, dy = 0) {
    montar();
    const el = await esperarA(q);
    const r = el.getBoundingClientRect();
    // Fuera de la vista (o tapado por la barra de abajo): se desplaza con suavidad hasta él.
    // Lo que va en una hoja o una barra fija ya está a la vista: desplazar solo movería lo de debajo.
    const fijo = (n) => { for (; n; n = n.parentElement) if (getComputedStyle(n).position === 'fixed') return true; return false; };
    if (!fijo(el) && (r.top < 110 || r.bottom > innerHeight - 110)) await desplazar(scrollY + r.top - innerHeight * 0.4, 800);
    const r2 = el.getBoundingClientRect();
    const x = r2.left + r2.width / 2 + dx, y = r2.top + r2.height / 2 + dy;
    const x0 = pos.x, y0 = pos.y;
    const dur = Math.max(250, Math.min(ms, 250 + Math.hypot(x - x0, y - y0) * 0.9));
    const t0 = performance.now();
    for (;;) {
      await cuadro();
      const k = Math.min(1, (performance.now() - t0) / dur);
      const s = suave(k);
      colocar(x0 + (x - x0) * s, y0 + (y - y0) * s);
      if (k === 1) break;
    }
    return el;
  }

  function onda() {
    const o = document.createElement('div');
    o.className = 'demo-onda';
    o.style.left = pos.x + 'px'; o.style.top = pos.y + 'px';
    document.body.appendChild(o);
    setTimeout(() => o.remove(), 700);
  }

  async function clic(q, { antes = 200, despues = 350, dx = 0, dy = 0 } = {}) {
    const el = await mover(q, 700, dx, dy);
    await e(antes);
    onda();
    await e(90);
    if (el.matches('input, textarea')) el.focus();
    el.click();
    await e(despues);
    return el;
  }

  // React guarda el valor anterior del campo: hay que pasar por el setter nativo para que vea el cambio.
  const fijarValor = (el, v) => Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set.call(el, v);
  async function escribir(q, texto, { ms = 90 } = {}) {
    const el = await clic(q, { despues: 200 });
    fijarValor(el, '');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    for (const ch of texto) {
      fijarValor(el, el.value + ch);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      await e(ms + Math.random() * ms * 0.5);
    }
    return el;
  }

  window.__demo = { e, montar, colocar, mover, clic, escribir, desplazar, esperarA, buscar, pos };
  if (document.body) montar(); else addEventListener('DOMContentLoaded', montar);
})();

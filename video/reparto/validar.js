// El botón «Validar» de cada parada, que la app todavía no tiene, pintado encima de la demo para la grabación.
// Validar abre una hoja con los pasos del pedido; al enviar, el aviso queda apuntado bajo el albarán.
// También limpia la demo para la cámara: sin la banda de «Modo demo», con Jordi Puig de transportista y,
// sobre todo, sin los datos reales de facturación que trae la demo (nombre, DNI y dirección del emisor y su cliente).
(() => {
  if (window.__reparto) return;

  const CAMBIOS = [
    ['Transportista de prueba', 'Jordi Puig'],
    ['SAINT GOBAIN IDAPLAC SL', 'Distribucions Llobregat SL'],
    ['SERGIO MARCIAL ORTIZ', 'JORDI PUIG SERRA'],
    ['44993210N', '00000000T'],
    ['GRANOLLERS 18', 'CARRER MAJOR 1'],
    ['SANT PERE DE VILAMAJOR', 'BARCELONA'],
    ['938451529', '000 000 000'],
    ['B62465141', 'B00000000'],
    ['C/ Albert Einstein, 25', 'C/ de la Indústria, 1'],
    ['Cornellà del Llobregat', 'Barcelona'],
    [/^Demo( ·|$)/, 'Octubre$1'],
  ];
  const PASOS = ['Comanda rebuda', 'Ha sortit de fàbrica', 'En camí', 'Arribem en 10 minuts', 'Lliurat'];
  const MENSAJES = [
    (c, a) => `Hola, ${c}. Hemos recibido tu pedido ${a}. Te avisaremos en cada paso.`,
    (c, a) => `Tu pedido ${a} ha salido de fábrica.`,
    (c, a) => `Hola, ${c}. Tu pedido ${a} ya está en camino. Llegada prevista: entre las 11:15 y las 11:45.`,
    () => 'Estamos a 10 minutos. ¿Hay alguien para recibirlo?',
    (c) => `Pedido entregado. ¡Gracias, ${c}!`,
  ];
  // Las horas de los avisos ya mandados a cada cliente.
  const avisos = { 'ALB-1042': ['07:40', '08:02', '10:42'], 'ALB-1043': ['07:58', '08:05'], 'ALB-1044': ['07:58'] };

  const ENVIAR = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>';
  const CHECK = (px, color = 'currentColor', grosor = 3) => `<svg width="${px}" height="${px}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${grosor}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>`;

  const css = document.createElement('style');
  css.textContent = `
    .avis-demo, nextjs-portal { display: none !important; }
    [data-hoja] .velo { position: absolute; inset: 0; background: rgba(0,0,0,.38); opacity: 0; transition: opacity .3s; }
    [data-hoja] .panel { position: relative; transform: translateY(100%); transition: transform .38s cubic-bezier(.2,.8,.2,1); }
    [data-hoja].visible .velo { opacity: 1; } [data-hoja].visible .panel { transform: none; }
    [data-aviso-enviado] { position: fixed; left: 50%; bottom: 96px; z-index: 300; transform: translate(-50%, 20px); opacity: 0;
      transition: opacity .25s, transform .3s cubic-bezier(.2,.8,.2,1); display: flex; align-items: center; gap: 8px; white-space: nowrap;
      padding: 12px 18px; border-radius: 999px; background: #17171c; color: #fff; font-size: 15px; font-weight: 500; box-shadow: 0 10px 30px rgba(0,0,0,.25); }
    [data-aviso-enviado].visible { opacity: 1; transform: translate(-50%, 0); }
  `;

  const hojasDeTexto = (raiz = document.body) => {
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    const nodos = [];
    while (w.nextNode()) nodos.push(w.currentNode);
    return nodos;
  };
  const albDe = (tarjeta) => [...tarjeta.querySelectorAll('p, span, div')].find((e) => !e.children.length && /^ALB-\d+$/.test(e.textContent.trim()));
  const tarjetaDe = (el) => { let t = el; while (t && !albDe(t)) t = t.parentElement; return t; };
  const nombreDe = (tarjeta) => [...tarjeta.querySelectorAll('p, h2, h3, span, div')].find((e) => !e.children.length
    && Number(getComputedStyle(e).fontWeight) >= 600 && e.textContent.trim().length > 2 && !/^\d+$/.test(e.textContent.trim()))?.textContent.trim();

  function aplicar() {
    if (!css.isConnected) document.head.appendChild(css);
    for (const n of hojasDeTexto()) {
      for (const [de, a] of CAMBIOS) {
        const v = n.nodeValue;
        const nuevo = typeof de === 'string' ? v.split(de).join(a) : v.replace(de, a);
        if (nuevo !== v) n.nodeValue = nuevo;
      }
    }
    document.querySelectorAll('button[aria-label="Navegar"]').forEach((nav) => {
      const fila = nav.parentElement;
      if (fila.querySelector('[data-validar]')) return;
      const v = nav.cloneNode(true);
      v.dataset.validar = '';
      v.setAttribute('aria-label', 'Validar');
      v.innerHTML = ENVIAR + 'Validar';
      v.style.background = 'var(--warning-surface)';
      v.style.flexBasis = '100%';
      v.addEventListener('click', () => abrir(tarjetaDe(v)));
      fila.appendChild(v);
    });
    for (const alb of document.querySelectorAll('p, span, div')) {
      if (alb.children.length || !/^ALB-\d+$/.test(alb.textContent.trim())) continue;
      // Solo en las tarjetas de las paradas (las que tienen «Navegar»), no en la factura ni en el historial.
      let t = alb; for (let k = 0; k < 6 && t && !t.querySelector('button[aria-label="Navegar"]'); k++) t = t.parentElement;
      if (!t?.querySelector('button[aria-label="Navegar"]')) continue;
      const horas = avisos[alb.textContent.trim()];
      if (!horas) continue;
      const texto = `Avisat: ${PASOS[horas.length - 1]} · ${horas.at(-1)}`;
      let p = alb.nextElementSibling;
      if (p?.dataset?.avis === undefined) {
        p = document.createElement('p');
        p.dataset.avis = '';
        p.style.cssText = 'display:flex;align-items:center;gap:4px;margin-top:4px;font-size:12px;line-height:16px;font-weight:500;color:var(--success)';
        alb.after(p);
      }
      if (p.textContent !== texto) p.innerHTML = CHECK(12) + texto;
    }
  }

  function abrir(tarjeta) {
    if (!tarjeta) return;
    const alb = albDe(tarjeta).textContent.trim();
    const cliente = nombreDe(tarjeta) ?? '';
    const horas = (avisos[alb] ??= []);
    const siguiente = Math.min(horas.length, PASOS.length - 1);
    const entregat = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Entregat');
    const incid = [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Incidència');

    const circulo = (i) => i < horas.length
      ? `<span style="flex:none;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--success)">${CHECK(13, '#fff', 3.4)}</span>`
      : i === siguiente
        ? '<span style="flex:none;display:grid;place-items:center;width:22px;height:22px;border-radius:50%;border:2px solid var(--primary);box-sizing:border-box"><span style="width:10px;height:10px;border-radius:50%;background:var(--primary)"></span></span>'
        : '<span style="flex:none;width:22px;height:22px;border-radius:50%;border:2px solid #d1d1d6;box-sizing:border-box"></span>';
    const filas = PASOS.map((paso, i) => {
      const elegido = i === siguiente;
      const estilo = i === 0 ? 'border-top:0;' : '';
      const marca = elegido ? 'background:#fff;box-shadow:inset 0 0 0 1.5px var(--primary);border-radius:14px;border-top-color:transparent;' : '';
      const texto = i > siguiente ? 'color:var(--muted-foreground);' : elegido ? 'font-weight:600;' : '';
      const derecha = i < horas.length ? horas[i] : elegido ? '<b style="color:var(--primary);font-weight:600">Ara</b>' : '';
      return `<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-top:1px solid #e5e5ea;${estilo}${marca}">${circulo(i)}<span style="flex:1;font-size:15px;line-height:20px;${texto}">${paso}</span><span style="font-size:13px;color:var(--muted-foreground);font-variant-numeric:tabular-nums">${derecha}</span></div>`;
    }).join('');
    const etq = (t) => `<p style="margin:18px 0 8px;font-size:11px;font-weight:500;letter-spacing:.04em;text-transform:uppercase;color:var(--muted-foreground)">${t}</p>`;

    const hoja = document.createElement('div');
    hoja.dataset.hoja = '';
    hoja.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;flex-direction:column;justify-content:flex-end';
    hoja.innerHTML = `<div class="velo"></div><div class="panel" style="background:#fff;border-radius:20px 20px 0 0;padding:10px 20px 26px;box-shadow:0 -12px 40px rgba(0,0,0,.18)">
      <div style="width:36px;height:5px;border-radius:3px;background:#d1d1d6;margin:0 auto 14px"></div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><div>
        <h3 style="margin:0;font-size:19px;line-height:24px;font-weight:600;letter-spacing:-.01em">Validar i avisar el client</h3>
        <p style="margin:2px 0 0;font-size:14px;color:var(--muted-foreground)">${cliente} · ${alb}</p></div>
        <span style="flex:none;display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--muted)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b8b95" stroke-width="2.6" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg></span></div>
      ${etq('Pas de la comanda')}<div style="border-radius:14px;background:var(--muted);overflow:hidden">${filas}</div>
      ${etq('Missatge al client · castellà')}
      <div style="border-radius:16px;background:var(--muted);padding:12px 14px;font-size:15px;line-height:21px">${MENSAJES[siguiente](cliente, alb)}<br><span style="color:var(--muted-foreground)">— Transports Puig</span></div>
      <p style="margin:8px 2px 0;font-size:12.5px;color:var(--muted-foreground)">S’envia per WhatsApp i SMS al telèfon del client</p>
      <div data-botones style="display:flex;gap:4px;margin-top:16px"></div></div>`;
    const enviar = entregat.cloneNode(true);
    enviar.innerHTML = ENVIAR + 'Validar i enviar';
    enviar.dataset.enviar = '';
    const cancelar = incid.cloneNode(true);
    cancelar.textContent = 'Cancel·lar';
    hoja.querySelector('[data-botones]').append(enviar, cancelar);
    document.body.appendChild(hoja);
    requestAnimationFrame(() => requestAnimationFrame(() => hoja.classList.add('visible')));

    const cerrar = () => { hoja.classList.remove('visible'); setTimeout(() => hoja.remove(), 400); };
    cancelar.addEventListener('click', cerrar);
    hoja.querySelector('.velo').addEventListener('click', cerrar);
    enviar.addEventListener('click', () => {
      horas.push('ara');
      cerrar();
      aplicar();
      const t = document.createElement('div');
      t.dataset.avisoEnviado = '';
      t.innerHTML = CHECK(16, '#4ade80', 3) + `Avís enviat a ${cliente}`;
      document.body.appendChild(t);
      requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('visible')));
      setTimeout(() => { t.classList.remove('visible'); setTimeout(() => t.remove(), 400); }, 2600);
    });
  }

  // La app repinta las tarjetas cada vez que sincroniza: se vuelve a aplicar después de cada cambio.
  let pendiente = false;
  const obs = new MutationObserver(() => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { obs.disconnect(); aplicar(); obs.observe(document.body, { childList: true, subtree: true, characterData: true }); pendiente = false; });
  });
  const empezar = () => { aplicar(); obs.observe(document.body, { childList: true, subtree: true, characterData: true }); };
  if (document.body) empezar(); else addEventListener('DOMContentLoaded', empezar);
  window.__reparto = { aplicar, abrir };
})();

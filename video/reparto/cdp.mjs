// Cliente mínimo del protocolo DevTools, como el de MotorSport19/comercial/video/cdp.mjs.
// Chrome tiene que estar abierto sin ventana con --remote-debugging-port=9336 (ver montar.py).
export const WEB = 'http://localhost:4340';
export const PUERTO = 9336;
export const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

export async function conectar() {
  const destino = await (await fetch(`http://127.0.0.1:${PUERTO}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(destino.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pendientes = new Map();
  const oyentes = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pendientes.has(m.id)) { pendientes.get(m.id)(m); pendientes.delete(m.id); }
    else if (m.method && oyentes.has(m.method)) oyentes.get(m.method)(m.params);
  });
  const cdp = (method, params = {}) => new Promise((r) => { const n = ++id; pendientes.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
  const js = async (expression) => {
    const r = await cdp('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 600));
    return r.result?.result?.value;
  };
  await cdp('Page.enable');
  await cdp('Runtime.enable');
  return { cdp, js, ws, on: (ev, fn) => oyentes.set(ev, fn) };
}

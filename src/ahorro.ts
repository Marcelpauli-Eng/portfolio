// Tiempo de papeleo que se recupera, a partir de los minutos que da cada uno.
// Semana = (pasar a limpio + buscar datos) × días + facturas del mes repartidas en 4 semanas.
export function ahorro(v: Record<string, number>, lang: string) {
  const semana = (v.limpio + v.buscar) * v.dias + (v.facturas * 60) / 4;
  const num = new Intl.NumberFormat(lang === 'ca' ? 'ca-ES' : 'es-ES', { maximumFractionDigits: 1 });
  const horas = (min: number) => (min < 60 ? `${Math.round(min)} min` : `${num.format(Math.round(min / 6) / 10)} h`);
  return {
    semana: horas(semana),
    mes: horas(semana * 4),
    // ponytail: 46 semanas de trabajo al año, fijo; si hace falta, que sea otro control.
    anyo: num.format(Math.round((semana * 46) / 60 / 8)),
  };
}

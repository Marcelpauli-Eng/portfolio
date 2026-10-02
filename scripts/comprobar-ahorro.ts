// Comprueba la cuenta del ahorro: npm test
import assert from 'node:assert';
import { ahorro } from '../src/ahorro.ts';

// Los números del folleto de Codo90: 20 + 10 min al día, 5 días y 2 h de facturas al mes → ≈ 3 h a la semana, 12 h al mes.
assert.deepEqual(ahorro({ limpio: 20, buscar: 10, dias: 5, facturas: 2 }, 'es'), { semana: '3 h', mes: '12 h', anyo: '17' });
// Menos de una hora se cuenta en minutos; los decimales, con coma.
assert.deepEqual(ahorro({ limpio: 5, buscar: 0, dias: 5, facturas: 0 }, 'ca'), { semana: '25 min', mes: '1,7 h', anyo: '2' });
// (25 + 10) × 6 + 3,5 h / 4 = 262,5 min.
assert.equal(ahorro({ limpio: 25, buscar: 10, dias: 6, facturas: 3.5 }, 'es').semana, '4,4 h');
console.log('ahorro: bien');

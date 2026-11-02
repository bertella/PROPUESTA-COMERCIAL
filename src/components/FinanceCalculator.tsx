import React, { useState } from 'react';
import { DollarSign, TrendingDown, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const FinanceCalculator: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'01' | '02' | '03'>('01');

  const modalities = [
    {
      id: '01',
      name: '01 · CONTADO',
      subtitle: 'Pago único de contado',
      totalPrice: 300000,
      initial: 300000,
      financed: 0,
      months: 0,
      monthly: 0,
      savings: 30000,
      badge: 'Mayor Ahorro ($30.000 USD)',
      desc: 'Pago total al momento de concretar la operación. Máxima bonificación directa sobre el precio del inmueble.'
    },
    {
      id: '02',
      name: '02 · FINANCIACIÓN CORTA',
      subtitle: 'Anticipo intermedio + 12 cuotas',
      totalPrice: 330000,
      initial: 270000,
      financed: 60000,
      months: 12,
      monthly: 5000,
      badge: 'Cuota mensual más baja (USD 5.000)',
      desc: 'Entrega inicial de USD 270.000 y saldo de USD 60.000 en 12 cuotas fijas directas sin interés.'
    },
    {
      id: '03',
      name: '03 · FINANCIACIÓN FLEXIBLE',
      subtitle: 'Menor anticipo inicial · Sin interés',
      totalPrice: 330000,
      initial: 250000,
      financed: 80000,
      months: 12,
      monthly: 6666.67,
      badge: 'Sin Interés · Anticipo USD 250.000',
      desc: 'Entrega inicial reducida de USD 250.000 y saldo de USD 80.000 en 12 cuotas fijas de USD 6.666,67 sin interés financiero directo.'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Herramienta de análisis</span>
          <h3 className="text-xl font-bold tracking-tight text-white mt-1">Comparador Financiero y Flujo de Fondos</h3>
          <p className="text-sm text-slate-400">Analice el impacto en liquidez y cuotas de cada modalidad propuesta.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          {modalities.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedPlan(m.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPlan === m.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Plan {m.id}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of comparison cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {modalities.map((item) => {
          const isSelected = selectedPlan === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedPlan(item.id as any)}
              className={`cursor-pointer rounded-xl p-5 border transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {item.badge && (
                <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit mb-3 ${
                  item.id === '01' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {item.badge}
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold text-slate-200">{item.name}</h4>
                <div className="text-2xl font-black font-mono-num text-white mt-2">
                  USD {item.totalPrice.toLocaleString('es-AR')}
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Desembolso Inicial:</span>
                  <span className="font-bold font-mono-num text-white">USD {item.initial.toLocaleString('es-AR')}</span>
                </div>
                {item.financed > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Saldo Financiado:</span>
                      <span className="font-semibold font-mono-num text-amber-300">USD {item.financed.toLocaleString('es-AR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">12 Cuotas fijas de:</span>
                      <span className="font-bold font-mono-num text-emerald-400">USD {item.monthly.toLocaleString('es-AR', { maximumFractionDigits: 2 })}</span>
                    </div>
                  </>
                )}
                {item.savings && (
                  <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                    <span>Bonificación s/ lista:</span>
                    <span>- USD {item.savings.toLocaleString('es-AR')}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Breakdown schedule */}
      <div className="mt-6 bg-slate-950/80 rounded-xl p-5 border border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          Cronograma de pagos proyectado (Modalidad {selectedPlan})
        </h4>

        {selectedPlan === '01' ? (
          <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-lg flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-200">Pago único total: USD 300.000 al concretar la operación.</p>
              <p className="text-xs text-slate-300 mt-0.5">Sin cuotas mensuales posteriores. Posesión y escrituración según pautas contractuales acordadas.</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center text-xs">
              <div className="col-span-2 sm:col-span-4 md:col-span-6 p-3 bg-slate-800 rounded-lg mb-1 flex justify-between items-center px-4">
                <span className="font-medium text-slate-300">Boleto / Anticipo inicial:</span>
                <span className="text-base font-bold font-mono-num text-amber-300">
                  USD {selectedPlan === '02' ? '270.000' : '250.000'}
                </span>
              </div>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Mes {i + 1}</div>
                  <div className="font-mono-num font-bold text-white text-xs mt-1">
                    USD {selectedPlan === '02' ? '5.000' : '6.666,67'}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
              <span>* Cuotas mensuales correlativas y consecutivas sin interés financiero.</span>
              <span className="font-mono-num text-slate-300">Total financiado: USD {selectedPlan === '02' ? '60.000' : '80.000'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

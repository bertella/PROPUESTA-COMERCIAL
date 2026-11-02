import React from 'react';
import { ProposalConfig } from '../types';
import { Building2, ShieldCheck, Calendar, MapPin, CheckCircle2, FileText, Phone, Mail, Award } from 'lucide-react';

interface Props {
  config: ProposalConfig;
  className?: string;
  id?: string;
}

export const ProposalDocument: React.FC<Props> = ({ config, className = '', id = 'proposal-document' }) => {
  const isMinimal = config.theme === 'minimal';
  const isNavy = config.theme === 'navy';

  // Theme palettes
  const themeColors = {
    minimal: {
      accentText: 'text-zinc-900',
      accentBg: 'bg-zinc-900',
      accentBorder: 'border-zinc-800',
      cardBg: 'bg-zinc-50/70',
      cardBorder: 'border-zinc-200',
      highlightBorder: 'border-zinc-900',
      badge: 'bg-zinc-900 text-white',
      badgeSecondary: 'bg-zinc-100 text-zinc-700 border-zinc-300',
      headerBg: 'bg-zinc-900 text-white',
      accentSubtle: 'text-zinc-500',
    },
    navy: {
      accentText: 'text-sky-900',
      accentBg: 'bg-sky-950',
      accentBorder: 'border-sky-800',
      cardBg: 'bg-slate-50',
      cardBorder: 'border-slate-200',
      highlightBorder: 'border-sky-700',
      badge: 'bg-sky-900 text-white',
      badgeSecondary: 'bg-sky-50 text-sky-800 border-sky-200',
      headerBg: 'bg-slate-900 text-white',
      accentSubtle: 'text-slate-500',
    },
    executive: {
      accentText: 'text-amber-800',
      accentBg: 'bg-[#18181b]',
      accentBorder: 'border-amber-700/40',
      cardBg: 'bg-[#fafaf9]',
      cardBorder: 'border-stone-200',
      highlightBorder: 'border-amber-600',
      badge: 'bg-[#18181b] text-amber-300 border border-amber-600/30',
      badgeSecondary: 'bg-amber-50 text-amber-900 border-amber-200',
      headerBg: 'bg-[#141416] text-white',
      accentSubtle: 'text-amber-900/70',
    }
  }[config.theme];

  return (
    <div
      id={id}
      className={`print-page bg-white text-slate-800 relative mx-auto overflow-hidden select-text flex flex-col justify-between ${className}`}
      style={{
        width: '794px',
        minHeight: '1123px',
        height: '1123px',
        boxSizing: 'border-box',
        padding: '36px 42px 32px 42px',
      }}
    >
      {/* Top subtle decorative header line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 no-print" />

      {/* HEADER SECTION */}
      <div>
        <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2.5 h-2.5 bg-amber-600 rounded-full"></span>
              <p className="text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase">
                PROPUESTA COMERCIAL · OPERACIÓN INMOBILIARIA
              </p>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-serif-luxury uppercase">
              SANTA ANA 3845
            </h1>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Depósito comercial · Córdoba, Argentina</span>
            </div>
          </div>

          {/* Document metadata & reference */}
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono-num font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              <FileText className="w-3 h-3 text-amber-600" />
              REF: {config.referenceCode || 'INM-STA-3845'}
            </div>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <div className="flex items-center justify-end gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>
                  Fecha:{' '}
                  {config.issueDate ? (
                    <strong className="text-slate-700">{config.issueDate}</strong>
                  ) : (
                    <span className="inline-block w-28 border-b border-slate-400 align-baseline ml-1">&nbsp;</span>
                  )}
                </span>
              </div>
              <div>Validez: <strong className="text-slate-700">{config.validityDays}</strong></div>
            </div>
          </div>
        </div>

        {/* Recipient Bar if specified */}
        {config.recipientName && (
          <div className="mb-4 bg-slate-50/90 border-l-2 border-amber-600 px-3.5 py-2 rounded-r flex justify-between items-center text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Destinatario / Proponente</span>
              <span className="font-bold text-slate-800 text-sm">{config.recipientName}</span>
              {config.recipientCompany && <span className="text-slate-500 ml-1.5 text-xs">({config.recipientCompany})</span>}
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                <ShieldCheck className="w-3 h-3" /> Dictamen Comercial Exclusivo
              </span>
            </div>
          </div>
        )}

        {/* INTRO TEXT */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm font-bold tracking-wider uppercase text-slate-800 font-serif-luxury">
              Propuesta de adquisición
            </h2>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            Se presentan tres modalidades alternativas de operación para la adquisición del inmueble, contemplando diferentes posibilidades de pago.
          </p>
        </div>

        {/* 3 MODALITIES CARDS */}
        <div className="grid grid-cols-3 gap-3.5 mb-4">
          {/* 01 · CONTADO */}
          <div className="relative rounded-lg border-2 border-slate-900 bg-white p-4 shadow-sm flex flex-col justify-between">
            <div className="absolute -top-2.5 left-4 bg-slate-900 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded tracking-widest shadow-sm">
              MODALIDAD PREFERENCIAL
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-1">
                01 · CONTADO
              </div>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-0.5">
                Pago único
              </div>
              
              <div className="mt-4 mb-3 pt-3 border-t border-slate-100">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Precio Final</div>
                <div className="text-2xl font-black text-slate-900 font-mono-num tracking-tight mt-0.5">
                  USD 300.000
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded p-2.5 mt-2">
                <p className="text-[11px] font-medium text-amber-950 leading-snug">
                  Pago total al momento de concretar la operación.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>Posesión inmediata</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>

          {/* 02 · FINANCIACIÓN CORTA */}
          <div className="rounded-lg border border-slate-300 bg-slate-50/70 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                02 · FINANCIACIÓN CORTA
              </div>
              <div className="mt-2 mb-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Valor Operación</div>
                <div className="text-xl font-black text-slate-900 font-mono-num tracking-tight">
                  USD 330.000
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[11px] text-slate-500">Entrega inicial</span>
                  <span className="font-bold text-slate-900 font-mono-num text-[11px]">USD 270.000</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-dashed border-slate-200">
                  <span className="text-[11px] text-slate-500">Saldo financiado</span>
                  <span className="font-semibold text-slate-800 font-mono-num text-[11px]">USD 60.000</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-dashed border-slate-200">
                  <span className="text-[11px] text-slate-500">Plazo</span>
                  <span className="font-semibold text-slate-800 text-[11px]">12 meses</span>
                </div>
              </div>

              <div className="bg-slate-100 border border-slate-200/90 rounded p-2 mt-3">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Cuota mensual (sin interés)</div>
                <div className="text-base font-extrabold text-slate-900 font-mono-num">
                  USD 5.000
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-slate-200/70">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">Sin interés directo</span>
              <span className="font-mono-num font-bold text-slate-700">12 cuotas fijas</span>
            </div>
          </div>

          {/* 03 · FINANCIACIÓN FLEXIBLE */}
          <div className="rounded-lg border border-slate-300 bg-slate-50/70 p-4 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold tracking-wider text-slate-600 uppercase">
                03 · FINANCIACIÓN FLEXIBLE
              </div>
              <div className="mt-2 mb-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Valor Operación</div>
                <div className="text-xl font-black text-slate-900 font-mono-num tracking-tight">
                  USD 330.000
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[11px] text-slate-500">Entrega inicial</span>
                  <span className="font-bold text-slate-900 font-mono-num text-[11px]">USD 250.000</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-dashed border-slate-200">
                  <span className="text-[11px] text-slate-500">Saldo financiado</span>
                  <span className="font-semibold text-slate-800 font-mono-num text-[11px]">USD 80.000</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-t border-dashed border-slate-200">
                  <span className="text-[11px] text-slate-500">Plazo</span>
                  <span className="font-semibold text-slate-800 text-[11px]">12 meses</span>
                </div>
              </div>

              <div className="bg-slate-100 border border-slate-200/90 rounded p-2 mt-3">
                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Cuota mensual (sin interés)</div>
                <div className="text-base font-extrabold text-slate-900 font-mono-num">
                  USD 6.666,67
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 text-[10px] text-slate-500 flex items-center justify-between border-t border-slate-200/70">
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">Sin interés directo</span>
              <span className="font-mono-num font-bold text-slate-700">12 cuotas fijas</span>
            </div>
          </div>
        </div>

        {/* COMPARISON BAR (Optional visual aid for decision making) */}
        {config.includeComparisonBar && (
          <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex justify-between items-center">
              <span>Esquema comparativo de desembolso inicial vs. saldo financiado</span>
              <span className="font-mono-num text-slate-400">Total USD 300k / USD 330k</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center text-[10px]">
                <span className="w-24 text-slate-600 font-medium truncate">01. Contado</span>
                <div className="flex-1 bg-slate-200 rounded-full h-3 flex overflow-hidden">
                  <div className="bg-slate-800 h-full w-full flex items-center justify-center text-white text-[8px] font-bold">
                    100% Contado (USD 300.000)
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[10px]">
                <span className="w-24 text-slate-600 font-medium truncate">02. Fin. Corta</span>
                <div className="flex-1 bg-slate-200 rounded-full h-3 flex overflow-hidden">
                  <div className="bg-slate-700 h-full w-[81.8%] flex items-center justify-center text-white text-[8px] font-bold">
                    Anticipo 82% (USD 270.000)
                  </div>
                  <div className="bg-amber-500 h-full w-[18.2%] flex items-center justify-center text-white text-[8px] font-bold">
                    18%
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[10px]">
                <span className="w-24 text-slate-600 font-medium truncate">03. Fin. Flexible</span>
                <div className="flex-1 bg-slate-200 rounded-full h-3 flex overflow-hidden">
                  <div className="bg-slate-700 h-full w-[75.7%] flex items-center justify-center text-white text-[8px] font-bold">
                    Anticipo 76% (USD 250.000)
                  </div>
                  <div className="bg-amber-600 h-full w-[24.3%] flex items-center justify-center text-white text-[8px] font-bold">
                    24%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONDICIONES GENERALES */}
        <div className="mb-4 bg-slate-50 border border-slate-200/90 rounded-lg p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-serif-luxury">
              Condiciones generales
            </h3>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
          <ul className="text-xs text-slate-700 space-y-1.5 font-normal">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold leading-none mt-0.5">•</span>
              <span><strong>Valores expresados en dólares estadounidenses</strong> (USD).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold leading-none mt-0.5">•</span>
              <span><strong>Financiación directa en cuotas mensuales</strong> sin interés financiero.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold leading-none mt-0.5">•</span>
              <span>Las condiciones definitivas de pago, garantías, posesión y escrituración estarán sujetas a <strong>instrumentación contractual</strong>.</span>
            </li>
          </ul>
        </div>

        {/* SIGNATURE SECTION (Optional toggleable) */}
        {config.includeSignatures && (
          <div className="mb-4 pt-3 border-t border-slate-200 grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="h-10 border-b border-dashed border-slate-300 mb-1" />
              <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                Por la Parte Vendedora / Constructora
              </div>
              <div className="text-[10px] text-slate-500">
                {config.advisorName} {config.advisorLicense && `· ${config.advisorLicense}`}
              </div>
            </div>
            <div className="text-center">
              <div className="h-10 border-b border-dashed border-slate-300 mb-1" />
              <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                Por la Parte Proponente / Compradora
              </div>
              <div className="text-[10px] text-slate-500">
                {config.recipientName || 'Firma, Aclaración y DNI / CUIT'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER & BROKER CONTACT */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex justify-between items-center text-[10px] text-slate-600 mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              <Building2 className="w-3.5 h-3.5 text-amber-600" />
              <span>{config.advisorName || 'Constructora & Desarrollos'}</span>
            </div>
            {config.advisorLicense && (
              <span className="text-slate-500">| {config.advisorLicense}</span>
            )}
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            {config.advisorPhone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                {config.advisorPhone}
              </span>
            )}
            {config.advisorEmail && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                {config.advisorEmail}
              </span>
            )}
          </div>
        </div>

        {/* The Exact Footer Stamp Requested */}
        <div className="bg-slate-900 text-white rounded py-2 px-3 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-300/90">
            SANTA ANA 3845 · PROPUESTA SUJETA A ACEPTACIÓN Y FORMALIZACIÓN
          </p>
        </div>
      </div>
    </div>
  );
};

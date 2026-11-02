/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Download, 
  Printer, 
  Copy, 
  Share2, 
  Sliders, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Check, 
  Building2, 
  FileSpreadsheet, 
  Info,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

import { ProposalConfig } from './types';
import { ProposalDocument } from './components/ProposalDocument';
import { FinanceCalculator } from './components/FinanceCalculator';
import { CustomizerModal } from './components/CustomizerModal';
import { PropertyInfoModal } from './components/PropertyInfoModal';
import { downloadProposalPdf, printProposalDocument, copyProposalTextToClipboard } from './utils/pdfGenerator';

const RAW_PROPOSAL_TEXT = `PROPUESTA COMERCIAL · OPERACIÓN INMOBILIARIA
SANTA ANA 3845
Depósito comercial · Córdoba, Argentina

Propuesta de adquisición

Se presentan tres modalidades alternativas de operación para la adquisición del inmueble, contemplando diferentes posibilidades de pago.

01 · CONTADO
Pago único
USD 300.000
Pago total al momento de concretar la operación.

02 · FINANCIACIÓN CORTA
USD 330.000
Entrega inicial
USD 270.000
Saldo financiado
USD 60.000
Plazo
12 meses
Cuota mensual
USD 5.000

03 · FINANCIACIÓN FLEXIBLE
USD 330.000
Entrega inicial
USD 250.000
Saldo financiado
USD 80.000
Plazo
12 meses
Cuota mensual
USD 6.666,67

Condiciones generales
- Valores expresados en dólares estadounidenses.
- Financiación directa en cuotas mensuales sin interés financiero.
- Las condiciones definitivas de pago, garantías, posesión y escrituración estarán sujetas a instrumentación contractual.

SANTA ANA 3845 · PROPUESTA SUJETA A ACEPTACIÓN Y FORMALIZACIÓN`;

const DEFAULT_CONFIG: ProposalConfig = {
  recipientName: '',
  recipientCompany: '',
  issueDate: '', // En blanco según instrucción
  validityDays: '15 días corridos',
  referenceCode: 'STA-3845-PROP',
  advisorName: 'Constructora & Desarrollos',
  advisorTitle: 'Desarrollo & Construcción',
  advisorPhone: '+54 9 351 555-8900',
  advisorEmail: 'operaciones@santaana3845.com.ar',
  advisorLicense: 'Registro Profesional / Mat.',
  includeSignatures: true,
  includeComparisonBar: true,
  theme: 'executive',
};

export default function App() {
  const [config, setConfig] = useState<ProposalConfig>(() => {
    const saved = localStorage.getItem('proposal_config_santa_ana');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.issueDate === '2 de Noviembre de 2026') {
          parsed.issueDate = '';
        }
        if (parsed.advisorName === 'Inmobiliaria & Operaciones Comerciales') {
          parsed.advisorName = 'Constructora & Desarrollos';
        }
        return { ...DEFAULT_CONFIG, ...parsed, issueDate: '' };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<'document' | 'calculator'>('document');
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('proposal_config_santa_ana', JSON.stringify(config));
  }, [config]);

  // Adjust default zoom on smaller screens
  useEffect(() => {
    if (window.innerWidth < 768) {
      setZoomLevel(0.46);
    } else if (window.innerWidth < 1024) {
      setZoomLevel(0.7);
    } else {
      setZoomLevel(0.88);
    }
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadProposalPdf('proposal-document', 'Propuesta_Comercial_Santa_Ana_3845.pdf');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error('Error generating PDF:', err);
      // Fallback to native print if html2canvas/jspdf encounters any unexpected canvas restriction
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = async () => {
    const ok = await copyProposalTextToClipboard(RAW_PROPOSAL_TEXT);
    if (ok) {
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 3000);
    }
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`*PROPUESTA COMERCIAL · SANTA ANA 3845*\nDepósito comercial · Córdoba, Argentina\n\nModalidades de adquisición disponibles:\n1️⃣ *Contado:* USD 300.000\n2️⃣ *Financiación Corta:* USD 330.000 (Anticipo USD 270.000 + 12 cuotas de USD 5.000 s/interés)\n3️⃣ *Financiación Flexible:* USD 330.000 (Anticipo USD 250.000 + 12 cuotas de USD 6.666,67 s/interés)\n\nCondiciones: Valores en USD, financiación directa sin interés. Sujeto a aceptación y formalización.`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* TOP NOTIFICATION BAR IF COPIED */}
      {showCopiedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold animate-bounce no-print">
          <Check className="w-4 h-4" />
          ¡Texto de la propuesta comercial copiado al portapapeles!
        </div>
      )}

      {/* NAVIGATION & ACTION HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Branding / Title */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white tracking-wide">
                    Santa Ana 3845
                  </h1>
                  <span className="text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-semibold">
                    Propuesta PDF
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Depósito comercial · Córdoba, Argentina
                </p>
              </div>
            </div>

            {/* Middle View Selector Tabs */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('document')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'document'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hoja A4 Oficial
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'calculator'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Comparador Financiero
              </button>
              <button
                onClick={() => setIsPropertyModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                title="Ver Ficha Inmueble"
              >
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Ficha</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Personalizar datos de la propuesta"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Personalizar</span>
              </button>

              <button
                onClick={handleCopyText}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Copiar texto para WhatsApp / Email"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Copiar</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30 transition-colors"
                title="Compartir por WhatsApp"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              <button
                onClick={printProposalDocument}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Imprimir documento nativo"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Imprimir</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Generando PDF...' : 'Descargar PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        {activeTab === 'document' ? (
          <div className="flex-1 flex flex-col">
            {/* Viewport Zoom & Quick Status Bar */}
            <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center justify-between text-xs text-slate-400 no-print">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Hoja A4 Oficial (210 × 297 mm) · Lista para impresión y firma</span>
                {config.recipientName && (
                  <span className="hidden md:inline text-slate-500">
                    · Preparada para: <strong className="text-slate-300">{config.recipientName}</strong>
                  </span>
                )}
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.1).toFixed(1))))}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] px-1.5 text-slate-300">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.4, Number((z + 0.1).toFixed(1))))}
                  className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(0.88)}
                  className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Ajustar al visor"
                >
                  Ajustar
                </button>
              </div>
            </div>

            {/* Document Preview Canvas Area */}
            <div className="flex-1 py-8 px-4 flex justify-center items-start overflow-auto bg-slate-950/90">
              <div
                className="transition-transform duration-150 origin-top"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'top center',
                  marginBottom: `${(1123 * zoomLevel) - 1123 + 60}px`,
                }}
              >
                <div className="shadow-2xl ring-1 ring-slate-800 rounded-lg overflow-hidden bg-white">
                  <ProposalDocument config={config} id="proposal-document" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
            <FinanceCalculator />
          </div>
        )}
      </main>

      {/* FLOATING ACTION TOOLBAR ON BOTTOM-RIGHT */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2 no-print">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Generando...' : 'Descargar PDF A4'}</span>
        </button>
      </div>

      {/* MODALS */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onChange={setConfig}
        onReset={() => setConfig(DEFAULT_CONFIG)}
      />

      <PropertyInfoModal
        isOpen={isPropertyModalOpen}
        onClose={() => setIsPropertyModalOpen(false)}
      />
    </div>
  );
}

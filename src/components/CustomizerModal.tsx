import React from 'react';
import { ProposalConfig, DocumentTheme } from '../types';
import { X, Check, Sliders, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: ProposalConfig;
  onChange: (newConfig: ProposalConfig) => void;
  onReset: () => void;
}

export const CustomizerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onChange,
  onReset,
}) => {
  if (!isOpen) return null;

  const handleChange = (field: keyof ProposalConfig, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base text-white">Personalizar Documento PDF</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Estilo visual del documento */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Estilo Visual de la Hoja
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'executive', label: 'Ejecutivo Ámbar', desc: 'Tonos bronce y grafito' },
                { id: 'minimal', label: 'Minimalista B&N', desc: 'Editorial sobrio' },
                { id: 'navy', label: 'Corporativo Navy', desc: 'Bancario institucional' },
              ].map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleChange('theme', theme.id as DocumentTheme)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    config.theme === theme.id
                      ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{theme.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{theme.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Destinatario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Destinatario / Cliente Proponente
              </label>
              <input
                type="text"
                value={config.recipientName}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                placeholder="Ej. Ing. Ricardo Morales"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Empresa / Razón Social (Opcional)
              </label>
              <input
                type="text"
                value={config.recipientCompany || ''}
                onChange={(e) => handleChange('recipientCompany', e.target.value)}
                placeholder="Ej. Logística Andina S.A."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Fechas y Referencia */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Fecha de Emisión
              </label>
              <input
                type="text"
                value={config.issueDate}
                onChange={(e) => handleChange('issueDate', e.target.value)}
                placeholder="En blanco (completar a mano)"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500">Dejar en blanco para firmar/fechar luego</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Validez de la oferta
              </label>
              <input
                type="text"
                value={config.validityDays}
                onChange={(e) => handleChange('validityDays', e.target.value)}
                placeholder="15 días corridos"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Código Referencia
              </label>
              <input
                type="text"
                value={config.referenceCode}
                onChange={(e) => handleChange('referenceCode', e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Datos de la Constructora */}
          <div className="border-t border-slate-800 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Datos de la Constructora / Empresa
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Nombre Constructora o Empresa</label>
                <input
                  type="text"
                  value={config.advisorName}
                  onChange={(e) => handleChange('advisorName', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Matrícula Profesional / CPI</label>
                <input
                  type="text"
                  value={config.advisorLicense}
                  onChange={(e) => handleChange('advisorLicense', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Teléfono de Contacto</label>
                <input
                  type="text"
                  value={config.advisorPhone}
                  onChange={(e) => handleChange('advisorPhone', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Correo Electrónico</label>
                <input
                  type="text"
                  value={config.advisorEmail}
                  onChange={(e) => handleChange('advisorEmail', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="border-t border-slate-800 pt-4 space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeComparisonBar}
                onChange={(e) => handleChange('includeComparisonBar', e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
              />
              <span className="text-xs text-slate-300">
                Mostrar barra comparativa gráfica de anticipos y saldos
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeSignatures}
                onChange={(e) => handleChange('includeSignatures', e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-700 focus:ring-amber-500"
              />
              <span className="text-xs text-slate-300">
                Incluir renglón de firmas de conformidad (Proponente y Vendedora)
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Restablecer valores originales
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            Aplicar y Ver Hoja
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, MapPin, Building, Truck, ShieldCheck, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyInfoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm no-print">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-100">
        <div className="flex justify-between items-start pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Ficha Inmueble</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Santa Ana 3845</h3>
            <p className="text-xs text-slate-400">Depósito comercial · Ciudad de Córdoba</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 my-5 text-xs text-slate-300">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Ubicación y Conectividad:</strong>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Emplazado sobre el corredor comercial de Av. Santa Ana, con excelente acceso a Av. Circunvalación Agustín Tosco, permitiendo conexión directa hacia cualquier punto de la ciudad y rutas nacionales.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Aptitud Operativa:</strong>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Ideal para centro de almacenamiento, logística liviana, distribución mayorista, showroom o taller industrial no contaminante. Portón de acceso vehicular para carga y descarga.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Estado Dominial & Documental:</strong>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  Títulos en regla, planos y situación dominial verificada para instrumentar boleto de compraventa y posterior escrituración tras cumplimiento de condiciones.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};

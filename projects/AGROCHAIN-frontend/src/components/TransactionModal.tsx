import React from 'react'
import { Loader2, ShieldCheck, X } from 'lucide-react'

interface TransactionModalProps {
  isOpen: boolean
  statusMessage: string
  onClose?: () => void
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  statusMessage,
  onClose,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-emerald-100 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            title="Dismiss Modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">Algorand Transaction Pending</h3>

        <p className="text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed font-mono">
          {statusMessage || 'Processing transaction on Algorand Blockchain...'}
        </p>

        <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 py-2 px-3 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Check Pera Wallet on Mobile</span>
        </div>
      </div>
    </div>
  )
}

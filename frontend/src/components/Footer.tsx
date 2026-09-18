import React from 'react'
import { Sprout, ShieldCheck, Cpu } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold text-lg mb-3">
              <Sprout className="w-6 h-6 text-emerald-400" />
              <span>AgroChain Direct</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-4">
              Farm Fresh. Direct Prices. Blockchain Verified. Connecting agricultural producers directly with consumers on the Algorand AVM blockchain.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Algorand LocalNet / TestNet</span>
              </span>
              <span className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>ARC4 Smart Contract</span>
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-emerald-400 cursor-pointer">Direct Marketplace</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Farmer Registration</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Order Transparency</span></li>
              <li><span className="hover:text-emerald-400 cursor-pointer">Algorand Explorer</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Notice</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              AgroChain Direct is a Web3 digital direct marketplace designed to reduce unnecessary intermediary involvement and improve farm-gate price realization.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AgroChain Direct. Built with Algorand Python & AlgoKit.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Smart Contract Spec</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

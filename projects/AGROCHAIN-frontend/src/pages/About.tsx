import React from 'react'
import { Sprout, ShieldCheck, Cpu, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react'

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Mission Card */}
      <div className="bg-gradient-to-tr from-emerald-900 via-emerald-800 to-green-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>AgroChain Direct Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">Direct Farmer Access. Transparent Pricing.</h1>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
            AgroChain Direct addresses the traditional agricultural supply chain imbalance by empowering farmers to list crops directly to consumers via Algorand smart contracts, ensuring price transparency and tamper-resistant transaction records.
          </p>
        </div>
      </div>

      {/* Core Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="font-bold text-lg text-slate-900">Price Transparency</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminates hidden commission markups and opaque pricing by publishing direct selling prices on an open blockchain registry.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="font-bold text-lg text-slate-900">Direct Farmer Access</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Enables registered farmers to reach customers directly, improving farm-gate realization and building consumer trust.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="font-bold text-lg text-slate-900">Tamper-Resistant Settlement</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Utilizes Algorand AVM smart contracts and atomic payment transactions to guarantee non-custodial, peer-to-peer settlement.
          </p>
        </div>
      </div>

      {/* Tech Stack Architecture */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-black text-slate-900">Technology Architecture</h2>
          <p className="text-xs text-slate-500">
            Powered by modern Web3 standards and Algorand developer tooling.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-emerald-700">Algorand Python (Puya)</span>
            <p className="text-[11px] text-slate-500">ARC4 Smart Contract ABI</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-emerald-700">AlgoKit</span>
            <p className="text-[11px] text-slate-500">LocalNet & App Client Linker</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-emerald-700">@txnlab/use-wallet</span>
            <p className="text-[11px] text-slate-500">Pera, Defly, Exodus & KMD</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-xs font-bold text-emerald-700">React + TypeScript</span>
            <p className="text-[11px] text-slate-500">Vite & Modern Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

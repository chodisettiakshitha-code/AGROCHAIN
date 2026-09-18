import React from 'react'
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  TrendingDown,
  Coins,
  CheckCircle2,
  Users,
  Search,
  Receipt,
  FileCheck,
} from 'lucide-react'

interface LandingProps {
  onExplore: () => void
  onSell: () => void
}

export const Landing: React.FC<LandingProps> = ({ onExplore, onSell }) => {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/50 rounded-full filter blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-100/40 rounded-full filter blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>Web3 Direct Agricultural Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                Buy Directly From <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy">Farmers.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                AgroChain Direct connects farmers and customers through a transparent blockchain-powered marketplace, helping create direct pricing and trusted agricultural transactions.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onExplore}
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onSell}
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-2xl border border-slate-200 shadow-sm transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  <span>Sell Your Produce</span>
                </button>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-slate-900">0%</p>
                  <p className="text-xs text-slate-500 font-medium">Middleman Fees</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Algorand Verified</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900">Direct</p>
                  <p className="text-xs text-slate-500 font-medium">Farmer Realization</p>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 overflow-hidden group">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh Organic Produce"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    Fresh Harvest · Tomatoes
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shadow">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified On-Chain
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-lg">Fresh Farm Tomatoes</h3>
                    <span className="text-xl font-extrabold text-emerald-700">₹20 / kg</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Farmer: Ramesh Verma (Vijayawada)</span>
                    <span className="font-mono text-emerald-800 font-semibold">0.25 ALGO</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-600">Blockchain Status</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Live Contract State
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-12 bg-emerald-950 text-white rounded-3xl mx-4 sm:mx-8 px-6 sm:px-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-800/20 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
              Simplified Web3 Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How AgroChain Direct Works</h2>
            <p className="text-sm text-emerald-200">
              Four straightforward steps connecting agricultural producers directly to consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-emerald-900/60 border border-emerald-800 p-6 rounded-2xl space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow">
                01
              </div>
              <h3 className="font-bold text-lg text-white">Farmer Lists Produce</h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Farmer adds product details, available quantity, and direct selling price to the smart contract.
              </p>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-800 p-6 rounded-2xl space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow">
                02
              </div>
              <h3 className="font-bold text-lg text-white">Customer Discovers</h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Customers browse available fresh produce with full price and location transparency.
              </p>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-800 p-6 rounded-2xl space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow">
                03
              </div>
              <h3 className="font-bold text-lg text-white">Blockchain Purchase</h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Customer connects wallet and executes an atomic payment transaction directly to the farmer.
              </p>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-800 p-6 rounded-2xl space-y-4 hover:border-emerald-500 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow">
                04
              </div>
              <h3 className="font-bold text-lg text-white">Transparent Record</h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                The transaction is permanently recorded on the Algorand blockchain and order status is updated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRICE COMPARISON SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Economic Transparency
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
              Where Does Your Money Go?
            </h2>
            <p className="text-sm text-slate-600">
              A side-by-side comparison between traditional supply chain markups and the AgroChain Direct model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Traditional Supply Chain */}
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                <h3 className="font-bold text-rose-900 text-base flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-600" />
                  Traditional Supply Chain
                </h3>
                <span className="text-xs font-bold bg-rose-200 text-rose-900 px-2.5 py-1 rounded-full">
                  Customer Pays ₹30/kg
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-2 rounded bg-white border border-rose-100">
                  <span className="text-slate-600">Farmer Realization</span>
                  <span className="font-bold text-slate-900">₹20 / kg</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-rose-100">
                  <span className="text-slate-600">Intermediary & Trader Commission</span>
                  <span className="font-semibold text-rose-700">+₹4</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-rose-100">
                  <span className="text-slate-600">Distributor Logistics</span>
                  <span className="font-semibold text-rose-700">+₹3</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white border border-rose-100">
                  <span className="text-slate-600">Retailer Markup</span>
                  <span className="font-semibold text-rose-700">+₹3</span>
                </div>
              </div>
            </div>

            {/* AgroChain Direct Model */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <h3 className="font-bold text-emerald-900 text-base flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  AgroChain Direct Model
                </h3>
                <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2.5 py-1 rounded-full">
                  Customer Pays ₹20/kg
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-2.5 rounded-lg bg-white border border-emerald-200 font-bold">
                  <span className="text-slate-700">Farmer Direct Price</span>
                  <span className="text-emerald-700 text-sm">₹20 / kg</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/60 border border-emerald-100">
                  <span className="text-slate-600">Intermediary Commission</span>
                  <span className="font-semibold text-emerald-600">₹0</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-white/60 border border-emerald-100">
                  <span className="text-slate-600">Retailer Markup</span>
                  <span className="font-semibold text-emerald-600">₹0</span>
                </div>
                <div className="p-3 bg-emerald-700 text-white rounded-xl flex justify-between items-center text-xs">
                  <span>Consumer Saving: <strong>₹10 / kg</strong></span>
                  <span>Direct Farmer Access: <strong>100%</strong></span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-start space-x-2">
            <span className="font-bold text-slate-700 uppercase">Note:</span>
            <p>
              This breakdown is an <strong>illustrative example</strong> demonstrating potential price efficiency achieved by removing non-essential intermediaries. It does not constitute a universal claim regarding government regulated or APMC commodity pricing.
            </p>
          </div>
        </div>
      </section>

      {/* 4. WHY BLOCKCHAIN? TRANSPARENCY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Why Algorand Blockchain?</h2>
          <p className="text-sm text-slate-600">
            Building agricultural trust through immutable technology and instant settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Transparent</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every farmer registration, product listing, and purchase transaction is publicly verifiable on the Algorand blockchain ledger.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Tamper Resistant</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Smart contract box state ensures order history, product quantities, and price terms cannot be altered or retroactively manipulated.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Direct Payments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customers transfer funds directly to the farmer wallet address in under 3 seconds with minimal microAlgo network fees.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

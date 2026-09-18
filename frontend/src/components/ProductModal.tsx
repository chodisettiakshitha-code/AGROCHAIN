import React, { useState } from 'react'
import { Product } from '../types/agrochain'
import { useWallet } from '@txnlab/use-wallet-react'
import { X, ShieldCheck, MapPin, Calendar, Plus, Minus, ShoppingCart, Lock, Zap, CheckCircle2, Sparkles } from 'lucide-react'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  onPurchase: (product: Product, quantity: number) => Promise<void>
  onConnectWallet: () => void
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onPurchase,
  onConnectWallet,
}) => {
  const { activeAddress } = useWallet()
  const [quantity, setQuantity] = useState<number>(1)
  const [purchasing, setPurchasing] = useState<boolean>(false)

  if (!product) return null

  const isAvailable = product.status === 'Available' && product.quantity > 0
  const isFarmerOwner = activeAddress === product.farmer
  const totalPriceINR = product.pricePerUnit * quantity
  const totalPriceAlgo = (product.pricePerUnitAlgo * quantity).toFixed(2)

  const handleBuy = async () => {
    setPurchasing(true)
    try {
      await onPurchase(product, quantity)
      onClose()
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md text-slate-500 hover:text-slate-800 p-2 rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Media Column */}
          <div className="relative h-64 md:h-full bg-slate-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
              }}
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/90 text-white backdrop-blur-md shadow">
                {product.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-500/90 text-white backdrop-blur-md shadow flex items-center gap-1">
                <Zap className="w-3 h-3" />
                x402 Protocol Active
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/85 backdrop-blur-md rounded-2xl text-white text-xs space-y-1">
              <p className="flex items-center gap-1.5 font-medium text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>x402 Micropayment & Algorand Contract Verified</span>
              </p>
              <p className="font-mono text-[10px] text-slate-300 truncate">
                Farmer Wallet: {product.farmer}
              </p>
            </div>
          </div>

          {/* Details & Purchase Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {product.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Harvested: {product.harvestDate}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{product.name}</h2>

              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* x402 Micropayment Protocol & 3 Agri-AI Endpoints Challenge Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-amber-200/80 mb-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 font-bold text-amber-900">
                    <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>x402 Micropayment & 3 Agri-AI Endpoints</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 border border-emerald-300">
                    402 PAID $\rightarrow$ 200 OK
                  </span>
                </div>
                
                <div className="text-[11px] text-slate-700 space-y-1 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 font-mono">
                  <div className="flex justify-between items-center font-sans font-bold text-slate-800 border-b border-slate-100 pb-1 mb-1">
                    <span className="flex items-center gap-1 text-emerald-700">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Auto-Executes 4 x402 API Calls:
                    </span>
                    <span className="text-[10px] text-amber-700 font-extrabold">{totalPriceAlgo} ALGO</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">1. Purchase Settlement:</span>
                    <span className="text-emerald-700 font-bold">POST /purchase-product</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">2. AI Crop & Soil Advisory:</span>
                    <span className="text-emerald-700 font-bold">POST /agri-advisory</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">3. Price Forecast Engine:</span>
                    <span className="text-emerald-700 font-bold">GET /crop-price-forecast</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-500">4. Organic Quality Cert:</span>
                    <span className="text-emerald-700 font-bold">GET /quality-verification</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 mb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-semibold text-emerald-800">Unit Price</span>
                  <span className="text-base font-bold text-slate-900">
                    ₹{product.pricePerUnit} / {product.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Blockchain Rate</span>
                  <span className="font-semibold text-emerald-700">
                    {product.pricePerUnitAlgo.toFixed(2)} ALGO / {product.unit}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              {isAvailable && !isFarmerOwner && (
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Select Quantity ({product.unit})
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-slate-800 text-sm">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.quantity, q + 1))}
                        disabled={quantity >= product.quantity}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-slate-500">
                      Max available: <strong className="text-slate-800">{product.quantity} {product.unit}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Section */}
            <div>
              <div className="p-4 rounded-2xl bg-slate-900 text-white mb-4 shadow-inner">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-400">Total Purchase Amount</span>
                  <span className="text-2xl font-black text-emerald-400">₹{totalPriceINR}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Zap className="w-3.5 h-3.5 fill-amber-300" />
                    x402 Micropayment Challenge
                  </span>
                  <span className="font-mono text-emerald-300 font-semibold">{totalPriceAlgo} ALGO</span>
                </div>
              </div>

              {!activeAddress ? (
                <button
                  onClick={() => {
                    onClose()
                    onConnectWallet()
                  }}
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Connect Wallet to Pay via x402</span>
                </button>
              ) : isFarmerOwner ? (
                <div className="p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-xs text-center font-medium">
                  You are the owner of this listing.
                </div>
              ) : (
                <button
                  onClick={handleBuy}
                  disabled={!isAvailable || purchasing}
                  className={`w-full py-3.5 px-4 font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 ${
                    isAvailable && !purchasing
                      ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200 hover:scale-[1.01]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {purchasing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Settling x402 Micropayment on Algorand...</span>
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 fill-white" />
                      <span>Pay & Settle via x402 Protocol</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

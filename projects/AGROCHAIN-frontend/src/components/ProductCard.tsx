import React from 'react'
import { Product } from '../types/agrochain'
import { MapPin, Calendar, ShieldCheck, Tag, ShoppingCart, Info, AlertCircle, Zap } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onSelect: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const isAvailable = product.status === 'Available' && product.quantity > 0
  const isRegisteredOnChain = Boolean(product.isRegistered || product.onChainProductId)

  const formatAddr = (addr: string) => {
    if (!addr) return 'Farmer'
    if (addr.length < 10) return addr
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[75%]">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-800/90 backdrop-blur-md text-white shadow-sm flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {product.category}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/90 text-white backdrop-blur-md shadow-sm flex items-center gap-1">
            <Zap className="w-3 h-3 fill-amber-200" />
            x402 Endpoint
          </span>
        </div>

        <div className="absolute top-3 right-3">
          {isRegisteredOnChain ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-emerald-800 border border-emerald-300 shadow-sm flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Blockchain Verified
            </span>
          ) : (
            <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-amber-500/90 text-white shadow-sm flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Sample Demo
            </span>
          )}
        </div>

        {/* Status Pill */}
        <div className="absolute bottom-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
              isAvailable
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {isAvailable ? `${product.quantity} ${product.unit} left` : 'Sold Out'}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="flex items-center gap-1 font-medium text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {product.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Harvest: {product.harvestDate}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
              🌱
            </div>
            <div className="text-xs">
              <p className="font-semibold text-slate-700">{product.farmerName || 'Farmer'}</p>
              <p className="font-mono text-slate-400 text-[10px]">{formatAddr(product.farmer)}</p>
            </div>
          </div>
        </div>

        {/* Footer Price & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <span className="text-2xl font-extrabold text-slate-900">₹{product.pricePerUnit}</span>
              <span className="text-xs font-semibold text-slate-500"> / {product.unit}</span>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                ~{product.pricePerUnitAlgo.toFixed(2)} ALGO
              </span>
              <span className="text-[10px] text-amber-700 font-mono font-medium flex items-center gap-0.5 mt-0.5">
                <Zap className="w-2.5 h-2.5 fill-amber-500" />
                x402: POST /purchase-product
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(product)}
              className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-colors hover:bg-slate-50"
            >
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Details</span>
            </button>
            <button
              onClick={() => onSelect(product)}
              disabled={!isAvailable}
              className={`flex items-center justify-center space-x-1 py-2 px-3 rounded-xl font-semibold text-xs transition-all shadow-sm ${
                isAvailable
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 hover:shadow'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

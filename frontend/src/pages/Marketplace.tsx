import React, { useState } from 'react'
import { Product, CATEGORIES, ProductCategory } from '../types/agrochain'
import { ProductCard } from '../components/ProductCard'
import { ProductModal } from '../components/ProductModal'
import { Search, Filter, Sprout, ShoppingBag } from 'lucide-react'

interface MarketplaceProps {
  products: Product[]
  onPurchaseProduct: (product: Product, quantity: number) => Promise<void>
  onConnectWallet: () => void
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  products,
  onPurchaseProduct,
  onConnectWallet,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.farmerName && p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>x402 Protocol Payment-Protected Produce Endpoints</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
            Fresh Agricultural Produce Endpoints
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Browse verified crops directly listed by registered farmers. Each listing operates as a payment-protected <strong>x402 Endpoint</strong> (<code>POST /purchase-product</code>). Purchasing triggers an HTTP 402 challenge, settled instantly via Algorand TestNet ALGO micro-payments.
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Category Pills */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search produce name, farmer, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm bg-white shadow-sm"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> available listings
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Produce Found</h3>
          <p className="text-xs text-slate-500">
            No products match category &quot;{selectedCategory}&quot; or search query &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All')
              setSearchQuery('')
            }}
            className="px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold text-xs rounded-xl border border-emerald-200"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Detail & Purchase Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onPurchase={onPurchaseProduct}
        onConnectWallet={onConnectWallet}
      />
    </div>
  )
}

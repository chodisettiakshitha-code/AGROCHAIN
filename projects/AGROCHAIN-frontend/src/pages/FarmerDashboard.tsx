import React, { useState } from 'react'
import { Product, Order, FarmerInfo } from '../types/agrochain'
import { useWallet } from '@txnlab/use-wallet-react'
import { AddProductModal } from '../components/AddProductModal'
import { FARMER_WALLET_ADDRESS } from '../config/agrochain'
import {
  Sprout,
  PlusCircle,
  Package,
  TrendingUp,
  ShoppingBag,
  CheckCircle2,
  UserCheck,
  ShieldCheck,
  Lock,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react'

interface FarmerDashboardProps {
  products: Product[]
  orders: Order[]
  farmerInfo: FarmerInfo | null
  isFarmer: boolean
  onRegisterFarmer: (name: string) => Promise<boolean>
  onCreateProduct: (
    productData: Omit<Product, 'id' | 'farmer' | 'status' | 'createdAt' | 'pricePerUnitAlgo'>
  ) => Promise<boolean>
  onUpdateOrderStatus: (
    orderId: number,
    newStatus: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  ) => Promise<boolean>
  onConnectWallet: () => void
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  products,
  orders,
  farmerInfo,
  isFarmer,
  onRegisterFarmer,
  onCreateProduct,
  onUpdateOrderStatus,
  onConnectWallet,
}) => {
  const { activeAddress } = useWallet()
  const [registerName, setRegisterName] = useState('')
  const [registering, setRegistering] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')

  // Farmer wallet check: active connected wallet matches FARMER_WALLET_ADDRESS
  const isFarmerWallet = Boolean(
    activeAddress && activeAddress.toLowerCase() === FARMER_WALLET_ADDRESS.toLowerCase()
  )

  // Filter products and orders belonging to Farmer wallet
  const farmerProducts = products.filter(
    (p) => p.farmer.toLowerCase() === FARMER_WALLET_ADDRESS.toLowerCase()
  )

  const farmerOrders = orders.filter(
    (o) => o.farmer.toLowerCase() === FARMER_WALLET_ADDRESS.toLowerCase()
  )

  // Metrics calculations
  const totalProducts = farmerProducts.length
  const activeListings = farmerProducts.filter((p) => p.status === 'Available').length
  const totalSalesCount = farmerOrders.length
  const totalRevenueAlgo = farmerOrders.reduce((sum, o) => sum + o.totalAmountAlgo, 0)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registerName.trim()) return
    setRegistering(true)
    try {
      await onRegisterFarmer(registerName.trim())
    } finally {
      setRegistering(false)
    }
  }

  const getExplorerUrl = (txId: string) => {
    if (import.meta.env.VITE_ALGOD_NETWORK === 'testnet') {
      return `https://testnet.explorer.perawallet.app/tx/${txId}`
    }
    return `https://lora.algokit.io/localnet/transaction/${txId}`
  }

  if (!activeAddress) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Connect Farmer Pera Wallet</h2>
        <p className="text-sm text-slate-600">
          Please connect your team farmer Pera Wallet address to access the Farmer Dashboard and add produce listings.
        </p>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 text-left space-y-1">
          <p><strong>Configured Farmer Address:</strong></p>
          <p className="break-all text-emerald-800 font-bold">{FARMER_WALLET_ADDRESS}</p>
        </div>
        <button
          onClick={onConnectWallet}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md shadow-emerald-200 text-sm transition-all"
        >
          Connect Pera Wallet
        </button>
      </div>
    )
  }

  if (!isFarmerWallet) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-amber-200 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Farmer Permissions Required</h2>
        <p className="text-sm text-slate-700 font-semibold">
          Connected wallet is not the registered farmer wallet.
        </p>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 text-left space-y-1">
          <p><strong>Your Connected Wallet (Buyer):</strong></p>
          <p className="break-all text-blue-800 font-bold">{activeAddress}</p>
          <p className="mt-2"><strong>Required Farmer Wallet Address:</strong></p>
          <p className="break-all text-emerald-800 font-bold">{FARMER_WALLET_ADDRESS}</p>
        </div>
        <p className="text-xs text-slate-500">
          To add products or manage farmer sales, please switch your Pera Wallet account to the registered team farmer wallet.
        </p>
        <button
          onClick={onConnectWallet}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-sm transition-all shadow-md shadow-emerald-200"
        >
          Switch Pera Wallet Account
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Add Product Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-amber-200">
            🌾
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-amber-600 text-white">
                Farmer Dashboard
              </span>
              <h1 className="text-2xl font-black text-slate-900">Crop & Sales Management</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Farmer Wallet
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1 break-all">
              Farmer Address: <strong>{activeAddress}</strong>
            </p>
          </div>
        </div>

        {/* ALWAYS SHOW ADD PRODUCT BUTTON WHEN FARMER WALLET IS CONNECTED */}
        <button
          onClick={() => setOpenAddModal(true)}
          className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 text-sm transition-all flex items-center justify-center space-x-2 active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Registration Banner if not yet registered on smart contract */}
      {!isFarmer && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Farmer Contract Profile</h3>
              <p className="text-xs text-slate-600">
                Register your farmer profile on Algorand Smart Contract App #{import.meta.env.VITE_AGROCHAIN_APP_ID || '769080579'}.
              </p>
            </div>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="text"
              required
              placeholder="Enter Farmer Name (e.g. Ramesh Verma)"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm bg-white"
            />
            <button
              type="submit"
              disabled={registering}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-all disabled:opacity-50"
            >
              {registering ? 'Registering...' : 'Register Profile On-Chain'}
            </button>
          </form>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Total Listed</span>
            <Package className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{totalProducts}</p>
          <p className="text-[11px] text-slate-400">Total product listings created</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Active Listings</span>
            <Sprout className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-700">{activeListings}</p>
          <p className="text-[11px] text-slate-400">Products currently available</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Total Sales Count</span>
            <ShoppingBag className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-slate-900">{totalSalesCount}</p>
          <p className="text-[11px] text-slate-400">Purchases received from buyers</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Direct Revenue</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-emerald-700">{totalRevenueAlgo.toFixed(2)} ALGO</p>
          <p className="text-[11px] text-slate-400">Transferred directly to farmer wallet</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'products'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          My Listed Products ({farmerProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'orders'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Received Customer Orders ({farmerOrders.length})
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'products' ? (
        farmerProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerProducts.map((p) => (
              <div key={p.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {p.category}
                      </span>
                      {p.isRegistered ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified On-Chain
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                          Sample Produce
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mt-1.5">{p.name}</h4>
                  </div>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                      p.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>Product ID: <strong className="font-mono">{p.onChainProductId || p.id}</strong></p>
                  <p>Stock: <strong>{p.quantity} {p.unit}</strong></p>
                  <p>Price: <strong>₹{p.pricePerUnit}/{p.unit}</strong> (~{p.pricePerUnitAlgo.toFixed(2)} ALGO)</p>
                  <p>Location: {p.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-sm text-slate-500 font-medium">You haven&apos;t listed any produce yet with this farmer wallet.</p>
            <button
              onClick={() => setOpenAddModal(true)}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all inline-flex items-center space-x-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        )
      ) : (
        farmerOrders.length > 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Customer Wallet</th>
                    <th className="p-4">Quantity</th>
                    <th className="p-4">Payment Realized</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Real Tx ID</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {farmerOrders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-800">#AGC-{o.orderId}</td>
                      <td className="p-4 font-semibold text-slate-900">{o.productName || `Product #${o.productId}`}</td>
                      <td className="p-4 font-mono text-slate-600">{o.customer.substring(0, 8)}...</td>
                      <td className="p-4 font-medium">{o.quantity} units</td>
                      <td className="p-4">
                        <div className="font-bold text-emerald-700">{o.totalAmountAlgo.toFixed(2)} ALGO</div>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-mono border border-amber-200 inline-block mt-0.5">
                          ⚡ x402 Paid
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            o.status === 'PAID'
                              ? 'bg-amber-100 text-amber-800'
                              : o.status === 'CONFIRMED'
                              ? 'bg-blue-100 text-blue-800'
                              : o.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[10px]">
                        {o.txId ? (
                          <a
                            href={getExplorerUrl(o.txId)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                          >
                            {o.txId.substring(0, 8)}... <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-slate-400">On-Chain</span>
                        )}
                      </td>
                      <td className="p-4">
                        {o.status === 'PAID' && (
                          <button
                            onClick={() => onUpdateOrderStatus(o.orderId, 'CONFIRMED')}
                            className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                          >
                            Confirm Order
                          </button>
                        )}
                        {o.status === 'CONFIRMED' && (
                          <button
                            onClick={() => onUpdateOrderStatus(o.orderId, 'COMPLETED')}
                            className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700"
                          >
                            Mark Completed
                          </button>
                        )}
                        {o.status === 'COMPLETED' && (
                          <span className="text-emerald-600 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm font-medium">
            No customer orders received for this farmer wallet yet.
          </div>
        )
      )}

      {/* Add Product Form Modal */}
      <AddProductModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSubmit={onCreateProduct}
      />
    </div>
  )
}

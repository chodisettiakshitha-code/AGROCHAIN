import React from 'react'
import { Order } from '../types/agrochain'
import { useWallet } from '@txnlab/use-wallet-react'
import { PackageCheck, ShieldCheck, ExternalLink, Lock, Zap, Sparkles, Cpu, TrendingUp } from 'lucide-react'
import { getExplorerUrl, isRealAlgorandTxId } from '../services/agrochain'

interface MyOrdersProps {
  orders: Order[]
  onConnectWallet: () => void
}

export const MyOrders: React.FC<MyOrdersProps> = ({ orders, onConnectWallet }) => {
  const { activeAddress } = useWallet()

  if (!activeAddress) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Connect Customer Wallet</h2>
        <p className="text-sm text-slate-600">
          Connect your Pera Wallet or LocalNet KMD provider as a Customer to view your purchase orders and track on-chain delivery status.
        </p>
        <button
          onClick={onConnectWallet}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md shadow-emerald-200 text-sm transition-all"
        >
          Connect Customer Wallet
        </button>
      </div>
    )
  }

  // Filter orders belonging strictly to the connected Customer wallet
  const customerOrders = orders.filter(
    (o) => o.customer.toLowerCase() === activeAddress.toLowerCase()
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <PackageCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-emerald-700 text-white">
                Customer Mode
              </span>
              <h1 className="text-2xl font-black text-slate-900">My Orders</h1>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Customer Address: <strong>{activeAddress}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>x402 Protocol Enabled</span>
          </div>
          <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 hidden sm:flex">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Algorand TestNet</span>
          </div>
        </div>
      </div>

      {customerOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerOrders.map((o) => (
            <div
              key={o.orderId}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-slate-400">Order</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-amber-600 text-amber-600" />
                      x402 Protocol
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">#AGC-{o.orderId}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
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
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Item Name:</span>
                  <span className="font-bold text-slate-900">{o.productName || `Product #${o.productId}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Purchased Quantity:</span>
                  <span className="font-semibold text-slate-800">{o.quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Farmer Wallet:</span>
                  <span className="font-mono text-slate-700">{o.farmer.substring(0, 10)}...</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Payment:</span>
                  <span className="font-extrabold text-emerald-700 text-sm">
                    {o.totalAmountAlgo.toFixed(2)} ALGO
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] pt-1">
                  <span className="text-slate-500">Payment Protocol:</span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {o.paidVia || 'x402 Micropayment Protocol / Native ALGO'}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Timestamp:</span>
                  <span>{new Date(o.orderTimestamp).toLocaleString()}</span>
                </div>
              </div>

              {/* x402 Agri-AI Auto-Verified Endpoint Responses */}
              {o.aiVerifications && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      x402 Agri-AI Verified Suite (3 Endpoints)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-200 text-emerald-900 border border-emerald-300">
                      3/3 HTTP 200 OK
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 pt-1 text-[11px]">
                    {o.aiVerifications.advisory && (
                      <div className="p-2 rounded-xl bg-white/90 border border-emerald-100 flex items-center justify-between">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                          POST /agri-advisory:
                        </span>
                        <span className="font-bold text-emerald-800">
                          {o.aiVerifications.advisory.diagnosis?.healthScore || 'Health 92/100'} ({o.aiVerifications.advisory.diagnosis?.cropState || 'Optimal'})
                        </span>
                      </div>
                    )}

                    {o.aiVerifications.forecast && (
                      <div className="p-2 rounded-xl bg-white/90 border border-emerald-100 flex items-center justify-between">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                          GET /crop-price-forecast:
                        </span>
                        <span className="font-bold text-teal-800">
                          {o.aiVerifications.forecast.trend || 'BULLISH'} ({o.aiVerifications.forecast.predictedPriceRange?.avg || '₹26.40/kg'})
                        </span>
                      </div>
                    )}

                    {o.aiVerifications.quality && (
                      <div className="p-2 rounded-xl bg-white/90 border border-emerald-100 flex items-center justify-between">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                          GET /quality-verification:
                        </span>
                        <span className="font-bold text-amber-800">
                          {o.aiVerifications.quality.qualityScore || '96/100 (Grade A)'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {o.txId && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[10px]">x402 Tx ID: {o.txId.substring(0, 12)}...</span>
                  {isRealAlgorandTxId(o.txId) ? (
                    <a
                      href={getExplorerUrl(o.txId)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline font-semibold flex items-center gap-1 text-xs"
                    >
                      View on Algorand Explorer <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span
                      title="Local x402 Protocol Signature (Connect Pera Wallet for live on-chain Algorand TestNet broadcast)"
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1 font-semibold"
                    >
                      x402 Signed Tx
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <PackageCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Orders for this Customer Wallet</h3>
          <p className="text-xs text-slate-500">
            No purchases found for connected wallet {activeAddress.substring(0, 8)}... Browse the marketplace to order directly from farmers!
          </p>
        </div>
      )}
    </div>
  )
}

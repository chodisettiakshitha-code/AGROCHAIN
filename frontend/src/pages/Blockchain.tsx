import React from 'react'
import { BlockchainTransaction } from '../types/agrochain'
import { Activity, ShieldCheck, Cpu, ExternalLink, RefreshCw, FileText } from 'lucide-react'
import { getExplorerUrl, isRealAlgorandTxId } from '../services/agrochain'

interface BlockchainProps {
  txLog: BlockchainTransaction[]
  appId: number | null
  onRefresh: () => void
}

export const Blockchain: React.FC<BlockchainProps> = ({ txLog, appId, onRefresh }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Activity className="w-3.5 h-3.5" />
            <span>Real-Time AVM Ledger Activity</span>
          </div>
          <h1 className="text-3xl font-black">Blockchain Transparency Hub</h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Every product listing, farmer registration, and direct purchase is permanently recorded on Algorand.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-2 transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* Contract & Network Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Smart Contract</span>
          <p className="text-2xl font-black text-slate-900">AgroChain</p>
          <p className="text-xs font-mono text-emerald-700 font-semibold">
            App ID: {appId ?? 'Deployed (Active)'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Network Protocol</span>
          <p className="text-2xl font-black text-slate-900">Algorand AVM</p>
          <p className="text-xs text-slate-500">Pure Proof-of-Stake (PPoS)</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Block Finality</span>
          <p className="text-2xl font-black text-emerald-700">~3.3 sec</p>
          <p className="text-xs text-slate-500">Instant deterministic finality</p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase">Average Tx Fee</span>
          <p className="text-2xl font-black text-slate-900">0.001 ALGO</p>
          <p className="text-xs text-slate-500">Fixed micro-cent execution</p>
        </div>
      </div>

      {/* Live Transaction Feed Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Recent Blockchain Activity
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Showing latest {txLog.length} recorded operations
          </span>
        </div>

        {txLog.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Operation Type</th>
                  <th className="p-4">Wallet Address</th>
                  <th className="p-4">Details / Amount</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Explorer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {txLog.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{tx.id.substring(0, 12)}...</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-sans ${
                          tx.type === 'PRODUCT_PURCHASED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tx.type === 'PRODUCT_CREATED'
                            ? 'bg-blue-100 text-blue-800'
                            : tx.type === 'FARMER_REGISTERED'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600">{tx.wallet.substring(0, 8)}...</td>
                    <td className="p-4 font-sans font-medium text-slate-800">
                      {tx.productName || ''} {tx.amountAlgo ? `(${tx.amountAlgo} ALGO)` : ''}
                    </td>
                    <td className="p-4 text-slate-400 font-sans text-[11px]">
                      {new Date(tx.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="p-4 font-sans">
                      {isRealAlgorandTxId(tx.id) ? (
                        <a
                          href={getExplorerUrl(tx.id)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline font-bold inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span
                          title="Local x402 Protocol Signature (Connect Pera Wallet for live on-chain Algorand TestNet broadcast)"
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1 font-semibold"
                        >
                          x402 Signed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 font-medium">
            No live transactions recorded in the current session yet. Connect wallet and perform farmer registration, product creation, or purchase to view real-time logs.
          </div>
        )}
      </div>
    </div>
  )
}

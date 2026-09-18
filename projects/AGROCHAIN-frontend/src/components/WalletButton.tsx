import React from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { Wallet, LogOut, CheckCircle2, ExternalLink, ShieldCheck, X, UserCheck, RefreshCw } from 'lucide-react'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { wallets, activeAddress, activeWallet, activeAccount } = useWallet()

  if (!isOpen) return null

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 8)}...${addr.substring(addr.length - 8)}`
  }

  const isLocalnet = import.meta.env.VITE_ALGOD_NETWORK === 'localnet'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Algorand Wallet</h3>
            <p className="text-xs text-slate-500">Connect Pera Wallet or LocalNet KMD Provider</p>
          </div>
        </div>

        {activeAddress ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Connected Wallet
                </span>
                <span className="text-xs bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-md font-mono font-semibold">
                  {activeWallet?.metadata.name || 'Algorand'}
                </span>
              </div>

              <div className="font-mono text-xs font-semibold text-slate-900 bg-white p-3 rounded-xl border border-emerald-100 flex items-center justify-between shadow-sm">
                <span>{formatAddress(activeAddress)}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(activeAddress)}
                  className="text-xs text-emerald-700 hover:underline font-sans font-bold"
                >
                  Copy
                </button>
              </div>

              {/* Account Switcher if multiple accounts available in wallet */}
              {activeWallet && activeWallet.accounts && activeWallet.accounts.length > 1 && (
                <div className="pt-2 border-t border-emerald-200/60">
                  <label className="block text-[11px] font-semibold text-emerald-900 uppercase mb-1.5">
                    Select Active Account (Farmer vs Customer)
                  </label>
                  <div className="space-y-1.5">
                    {activeWallet.accounts.map((acc, idx) => {
                      const isSelected = acc.address === activeAddress
                      return (
                        <button
                          key={acc.address}
                          onClick={() => {
                            activeWallet.setActiveAccount(acc.address)
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-emerald-700 text-white font-bold'
                              : 'bg-white text-slate-700 border border-emerald-100 hover:bg-emerald-100/50'
                          }`}
                        >
                          <span>Account #{idx + 1}: {formatAddress(acc.address)}</span>
                          {isSelected && <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  activeWallet?.disconnect()
                  onClose()
                }}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-sm font-bold border border-rose-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 mb-2">
              <span className="font-bold text-slate-800">Active Network:</span>{' '}
              <strong className="text-emerald-700 font-mono">{import.meta.env.VITE_ALGOD_NETWORK || 'localnet'}</strong>
              {isLocalnet && (
                <p className="mt-1 text-[11px] text-slate-500">
                  For LocalNet testing, select <strong>KMD</strong> (includes pre-funded accounts). For TestNet, select <strong>Pera Wallet</strong>.
                </p>
              )}
            </div>

            {wallets?.map((w) => (
              <button
                key={w.id}
                onClick={async () => {
                  try {
                    await w.connect()
                    onClose()
                  } catch (e) {
                    console.error('Wallet connection error:', e)
                  }
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/50 transition-all group shadow-sm hover:shadow"
              >
                <div className="flex items-center space-x-3">
                  {w.metadata.icon ? (
                    <img src={w.metadata.icon} alt={w.metadata.name} className="w-8 h-8 rounded-xl" />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                      {w.metadata.name.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <span className="font-bold text-slate-900 text-sm group-hover:text-emerald-800 block">
                      {w.metadata.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      {w.id === 'pera' ? 'Mobile QR & Pera Web' : w.id === 'kmd' ? 'LocalNet Sandbox Provider' : 'Algorand Web3'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-xs text-emerald-700 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                  Connect <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Private keys & seed phrases are never stored or exposed</span>
        </div>
      </div>
    </div>
  )
}

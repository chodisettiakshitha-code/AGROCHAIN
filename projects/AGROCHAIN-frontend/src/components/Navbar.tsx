import React from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { FARMER_WALLET_ADDRESS } from '../config/agrochain'
import { Sprout, ShoppingBag, LayoutDashboard, PackageCheck, Activity, Info, Sparkles } from 'lucide-react'

interface NavbarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onOpenWalletModal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenWalletModal }) => {
  const { activeAddress } = useWallet()

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`
  }

  const isFarmer = Boolean(
    activeAddress && activeAddress.toLowerCase() === FARMER_WALLET_ADDRESS.toLowerCase()
  )

  const networkName = import.meta.env.VITE_ALGOD_NETWORK === 'testnet' ? 'Algorand TestNet' : 'Algorand LocalNet'

  const navItems = [
    { id: 'landing', label: 'Home', icon: Sprout },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'dashboard', label: 'Farmer Dashboard', icon: LayoutDashboard },
    { id: 'agri-services', label: 'Agri-AI (x402)', icon: Sparkles },
    { id: 'orders', label: 'My Orders', icon: PackageCheck },
    { id: 'blockchain', label: 'Blockchain', icon: Activity },
    { id: 'about', label: 'About', icon: Info },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-green-700 bg-clip-text text-transparent">
                AgroChain Direct
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full">
                {networkName}
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/60'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Wallet Action Button & Role Indicator */}
          <div className="flex items-center space-x-3">
            {activeAddress && (
              <span
                className={`hidden lg:inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-lg border ${
                  isFarmer
                    ? 'bg-amber-50 text-amber-900 border-amber-300'
                    : 'bg-blue-50 text-blue-900 border-blue-300'
                }`}
              >
                {isFarmer ? '🌾 Farmer Wallet' : '🛒 Buyer Wallet'}
              </span>
            )}
            <button
              onClick={onOpenWalletModal}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm ${
                activeAddress
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-200 active:scale-95'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${activeAddress ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <span>{activeAddress ? formatAddress(activeAddress) : 'Connect Pera Wallet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex overflow-x-auto py-2 px-4 space-x-2 border-t border-slate-100 bg-slate-50/50">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-1 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
                isActive ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </header>
  )
}

import React, { useState } from 'react'
import {
  NetworkId,
  SupportedWallet,
  WalletId,
  WalletManager,
  WalletProvider,
} from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { WalletModal } from './components/WalletButton'
import { TransactionModal } from './components/TransactionModal'
import { Landing } from './pages/Landing'
import { Marketplace } from './pages/Marketplace'
import { FarmerDashboard } from './pages/FarmerDashboard'
import { MyOrders } from './pages/MyOrders'
import { Blockchain } from './pages/Blockchain'
import { About } from './pages/About'
import { AgriServices } from './pages/AgriServices'
import { useAgroChain } from './hooks/useAgroChain'
import {
  getAlgodConfigFromViteEnvironment,
  getKmdConfigFromViteEnvironment,
} from './utils/network'

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('landing')
  const [walletModalOpen, setWalletModalOpen] = useState<boolean>(false)

  const {
    products,
    orders,
    farmerInfo,
    isFarmer,
    txLog,
    pendingTx,
    txStatusMessage,
    appId,
    registerFarmer,
    createProduct,
    purchaseProduct,
    updateOrderStatus,
    refreshData,
  } = useAgroChain()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWalletModal={() => setWalletModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <Landing
            onExplore={() => setActiveTab('marketplace')}
            onSell={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            products={products}
            onPurchaseProduct={async (prod, qty) => {
              await purchaseProduct(prod, qty)
            }}
            onConnectWallet={() => setWalletModalOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <FarmerDashboard
            products={products}
            orders={orders}
            farmerInfo={farmerInfo}
            isFarmer={isFarmer}
            onRegisterFarmer={registerFarmer}
            onCreateProduct={createProduct}
            onUpdateOrderStatus={updateOrderStatus}
            onConnectWallet={() => setWalletModalOpen(true)}
          />
        )}

        {activeTab === 'agri-services' && <AgriServices onRefresh={refreshData} />}

        {activeTab === 'orders' && (
          <MyOrders
            orders={orders}
            onConnectWallet={() => setWalletModalOpen(true)}
          />
        )}

        {activeTab === 'blockchain' && (
          <Blockchain txLog={txLog} appId={appId} onRefresh={refreshData} />
        )}

        {activeTab === 'about' && <About />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Wallet Connection Modal */}
      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />

      {/* Transaction Progress Modal */}
      <TransactionModal isOpen={pendingTx} statusMessage={txStatusMessage} />
    </div>
  )
}

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()
  const isTestNet = algodConfig.network === 'testnet'
  const activeNetworkId = isTestNet ? NetworkId.TESTNET : NetworkId.LOCALNET

  // Pass chainId: 416002 directly to Pera Wallet so @perawallet/connect initializes on Algorand TestNet
  const supportedWallets: SupportedWallet[] = [
    {
      id: WalletId.PERA,
      options: {
        chainId: isTestNet ? 416002 : 416001,
      },
    },
    { id: WalletId.DEFLY },
    { id: WalletId.EXODUS },
  ]

  if (algodConfig.network === 'localnet') {
    const kmdConfig = getKmdConfigFromViteEnvironment()
    supportedWallets.push({
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    })
  }

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: activeNetworkId,
    networks: {
      [NetworkId.TESTNET]: {
        genesisId: 'testnet-v1.0',
        genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
        caipChainId: 'algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9',
        algod: {
          baseServer: 'https://testnet-api.algonode.cloud',
          port: '',
          token: '',
        },
      },
      [NetworkId.LOCALNET]: {
        genesisId: 'sand-v1.0',
        genesisHash: 'IX113J5vUq6C+13dZly7M97P+jD7uSgG2vG2nN3WJ/M=',
        caipChainId: 'algorand:IX113J5vUq6C+13dZly7M97P+jD7uSgG2vG2nN3WJ',
        algod: {
          baseServer: 'http://localhost',
          port: '4001',
          token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  })

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <WalletProvider manager={walletManager}>
        <MainApp />
      </WalletProvider>
    </SnackbarProvider>
  )
}

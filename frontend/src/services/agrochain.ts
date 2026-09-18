import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { TransactionSigner } from 'algosdk'
import { AgroChainMarketplaceFactory, AgroChainMarketplaceClient } from '../contracts/AgroChainMarketplace'
import { Product, Order, FarmerInfo, BlockchainTransaction } from '../types/agrochain'
import { FARMER_WALLET_ADDRESS, AGROCHAIN_APP_ID } from '../config/agrochain'

// Default produce items configured with the real configured FARMER_WALLET_ADDRESS
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 101,
    farmer: FARMER_WALLET_ADDRESS,
    farmerName: 'Ramesh Verma',
    name: 'Fresh Farm Tomatoes',
    category: 'Vegetables',
    description: 'Organically grown rich red juicy tomatoes harvested directly from Vijayawada fields.',
    quantity: 100,
    pricePerUnit: 20,
    pricePerUnitAlgo: 0.25,
    unit: 'kg',
    location: 'Vijayawada, AP',
    harvestDate: '2026-08-10',
    status: 'Available',
    createdAt: Date.now() - 86400000,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    isRegistered: false,
    isDemo: true,
  },
  {
    id: 102,
    farmer: FARMER_WALLET_ADDRESS,
    farmerName: 'Sita Devi',
    name: 'Premium Basmati Rice',
    category: 'Grains',
    description: 'Aromatic long-grain aged Basmati rice directly from Guntur organic farms.',
    quantity: 250,
    pricePerUnit: 45,
    pricePerUnitAlgo: 0.55,
    unit: 'kg',
    location: 'Guntur, AP',
    harvestDate: '2026-08-05',
    status: 'Available',
    createdAt: Date.now() - 172800000,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    isRegistered: false,
    isDemo: true,
  },
  {
    id: 103,
    farmer: FARMER_WALLET_ADDRESS,
    farmerName: 'Kalyan Rao',
    name: 'Sweet Banginapalli Mangoes',
    category: 'Fruits',
    description: 'Naturally ripened carbide-free premium juicy mangoes straight from Chittoor orchards.',
    quantity: 80,
    pricePerUnit: 60,
    pricePerUnitAlgo: 0.75,
    unit: 'kg',
    location: 'Chittoor, AP',
    harvestDate: '2026-08-08',
    status: 'Available',
    createdAt: Date.now() - 259200000,
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    isRegistered: false,
    isDemo: true,
  },
]

const localTxLog: BlockchainTransaction[] = []
const localRegisteredFarmers = new Map<string, FarmerInfo>()

export function getReadOnlyAppClient(algodConfig: any, indexerConfig: any): AgroChainMarketplaceClient {
  const readOnlyAlgorand = AlgorandClient.fromConfig({
    algodConfig,
    indexerConfig,
  })
  const factory = new AgroChainMarketplaceFactory({
    algorand: readOnlyAlgorand,
  })
  return factory.getAppClientById({ appId: BigInt(AGROCHAIN_APP_ID) })
}

export function getWriteAppClient(
  algodConfig: any,
  indexerConfig: any,
  signer: TransactionSigner,
  activeAddress: string
): AgroChainMarketplaceClient {
  const writeAlgorand = AlgorandClient.fromConfig({
    algodConfig,
    indexerConfig,
  })
  writeAlgorand.setDefaultSigner(signer)
  const factory = new AgroChainMarketplaceFactory({
    defaultSender: activeAddress,
    algorand: writeAlgorand,
  })
  return factory.getAppClientById({ appId: BigInt(AGROCHAIN_APP_ID) })
}

export async function getOrCreateAppClient(
  algorand: AlgorandClient,
  signer?: TransactionSigner,
  activeAddress?: string
): Promise<AgroChainMarketplaceClient> {
  if (signer && activeAddress) {
    algorand.setDefaultSigner(signer)
  }

  const factory = new AgroChainMarketplaceFactory({
    defaultSender: activeAddress ?? undefined,
    algorand,
  })

  // Connect directly to deployed smart contract App ID 769080579
  if (AGROCHAIN_APP_ID && AGROCHAIN_APP_ID > 0) {
    return factory.getAppClientById({ appId: BigInt(AGROCHAIN_APP_ID) })
  }

  throw new Error('AGROCHAIN_APP_ID is not configured.')
}

export function logLocalTx(tx: BlockchainTransaction) {
  localTxLog.unshift(tx)
}

export function getLocalTxLog(): BlockchainTransaction[] {
  return localTxLog
}

export function setFarmerLocal(address: string, name: string) {
  localRegisteredFarmers.set(address, {
    farmerAddress: address,
    name,
    registeredAt: Date.now(),
  })
}

export function isRealAlgorandTxId(txId?: string | null): boolean {
  if (!txId) return false
  if (txId.startsWith('TX-')) return false
  // Real Algorand Transaction IDs are 52 uppercase Base32 characters
  return txId.length === 52 && /^[A-Z2-7]+$/.test(txId)
}

export function getExplorerUrl(txId?: string | null): string {
  if (!txId || !isRealAlgorandTxId(txId)) return '#'
  if (import.meta.env.VITE_ALGOD_NETWORK === 'testnet') {
    return `https://testnet.explorer.perawallet.app/tx/${txId}`
  }
  return `https://lora.algokit.io/localnet/transaction/${txId}`
}

export interface Product {
  id: number
  onChainProductId?: number // Real on-chain Algorand Product ID (1, 2, 3...)
  farmer: string // Seller wallet address (FARMER_WALLET_ADDRESS)
  farmerName?: string
  name: string
  category: string
  description: string
  quantity: number
  pricePerUnit: number
  pricePerUnitAlgo: number
  unit: string
  location: string
  harvestDate: string
  status: 'Available' | 'Sold Out'
  createdAt: number
  imageUrl?: string
  isRegistered?: boolean // Blockchain registration status
  txId?: string // Registration Transaction ID
  isDemo?: boolean
}

export interface Order {
  orderId: number
  productId: number
  productName?: string
  farmer: string
  farmerName?: string
  customer: string
  quantity: number
  pricePerUnitAlgo: number
  totalAmountAlgo: number
  orderTimestamp: number
  status: 'PAID' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  txId?: string
  paidVia?: string
  x402Details?: {
    protocol: string
    scheme: string
    network: string
    payTo: string
    status: number
  }
  aiVerifications?: any
}

export interface FarmerInfo {
  farmerAddress: string
  name: string
  registeredAt: number
}

export interface BlockchainTransaction {
  id: string
  type: 'FARMER_REGISTERED' | 'PRODUCT_CREATED' | 'PRODUCT_PURCHASED' | 'ORDER_UPDATED' | 'MICROSERVICE_PAYMENT'
  wallet: string
  amountAlgo?: number
  productName?: string
  timestamp: number
  status: 'Confirmed' | 'Pending' | 'Failed'
  paidVia?: string
}

export const CATEGORIES = [
  'All',
  'Vegetables',
  'Fruits',
  'Grains',
  'Pulses',
  'Spices',
  'Dairy',
  'Other',
] as const

export type ProductCategory = (typeof CATEGORIES)[number]

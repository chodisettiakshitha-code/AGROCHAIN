// AgroChain Direct Configuration File
// REAL Fixed Farmer Public Pera Wallet Address (Team Member 1)

export const FARMER_WALLET_ADDRESS = (
  import.meta.env.VITE_FARMER_WALLET_ADDRESS ||
  'TKHGRAZDF6DR726TVGK7WGNGTTY4PQ2HUEC7S73LZDV3GFAT3IYI6YFFHI'
).trim()

export const AGROCHAIN_APP_ID = Number(import.meta.env.VITE_AGROCHAIN_APP_ID || 769080579)

export const ALGORAND_NETWORK = import.meta.env.VITE_ALGOD_NETWORK || 'testnet'

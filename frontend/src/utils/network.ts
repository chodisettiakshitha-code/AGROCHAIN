import { AlgoViteClientConfig, AlgoViteKMDConfig } from '../types/network'

export function getAlgodConfigFromViteEnvironment(): AlgoViteClientConfig {
  const server = import.meta.env.VITE_ALGOD_SERVER || 'https://testnet-api.algonode.cloud'

  return {
    server: server.trim(),
    port: import.meta.env.VITE_ALGOD_PORT ?? '',
    token: import.meta.env.VITE_ALGOD_TOKEN ?? '',
    network: import.meta.env.VITE_ALGOD_NETWORK || 'testnet',
  }
}

export function getIndexerConfigFromViteEnvironment(): AlgoViteClientConfig {
  const server = import.meta.env.VITE_INDEXER_SERVER || 'https://testnet-idx.algonode.cloud'

  return {
    server: server.trim(),
    port: import.meta.env.VITE_INDEXER_PORT ?? '',
    token: import.meta.env.VITE_INDEXER_TOKEN ?? '',
    network: import.meta.env.VITE_ALGOD_NETWORK || 'testnet',
  }
}

export function getKmdConfigFromViteEnvironment(): AlgoViteKMDConfig {
  const server = import.meta.env.VITE_KMD_SERVER || 'http://localhost'
  return {
    server: server.trim(),
    port: import.meta.env.VITE_KMD_PORT || '4002',
    token: import.meta.env.VITE_KMD_TOKEN || '',
    wallet: import.meta.env.VITE_KMD_WALLET || 'unencrypted-default-wallet',
    password: import.meta.env.VITE_KMD_PASSWORD || '',
  }
}

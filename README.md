# AgroChain - Decentralized Agricultural Marketplace on Algorand

AgroChain directly connects farmers and consumers using Algorand blockchain and provides pay-per-use AI agricultural microservices via the x402 protocol.

## Architecture

```
AGROCHAIN/
├── frontend/     # React + Vite + Algorand dApp UI & Pera Wallet integration
├── backend/      # x402 Resource Server & AI Agricultural Microservices
└── contracts/    # Algorand Smart Contracts (Python / Algorand Python SDK)
```

## Running the Application

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

### 2. Backend (x402 Resource Server)
```bash
cd backend
npm install
npm run dev
```
Runs at `http://localhost:4021`

### 3. Smart Contracts
```bash
cd contracts
poetry install
poetry run python -m smart_contracts
```

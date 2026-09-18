/**
 * AgroChain x402 Endpoints Configuration
 *
 * This file defines the 3 payment-protected endpoints for AgroChain
 * using native Algorand (ALGO) coin micropayments.
 */

import { ALGORAND_TESTNET_CAIP2 } from '@x402/avm';
import { declareDiscoveryExtension } from '@x402-avm/extensions';

// Type definition for endpoints
export interface EndpointConfig {
  [key: string]: {
    accepts: Array<{
      scheme: 'exact';
      price: string | { amount: string; asset: string };
      network: string;
      payTo: string;
      extra: { asset: number };
    }>;
    description: string;
    extensions?: Record<string, unknown>;
  };
}

export function createPaymentConfig(avmAddress: string): EndpointConfig {
  return {
    // ════════════════════════════════════════════════════════════════════
    // 3 AGROCHAIN ALGORAND (ALGO) ENDPOINTS
    // ════════════════════════════════════════════════════════════════════

    /**
     * ENDPOINT 1: AI Crop & Soil Health Advisory
     * Payment: 0.25 ALGO (250,000 microAlgos)
     */
    'POST /agri-advisory': {
      accepts: [
        {
          scheme: 'exact',
          price: '0.25 ALGO',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: 0 },
        },
      ],
      description: 'AgroChain AI Crop & Soil Advisory - Pay 0.25 ALGO',
      extensions: declareDiscoveryExtension({
        bodyType: 'json',
        input: { crop: 'Tomatoes', location: 'Vijayawada, AP', soilType: 'Red Loam' },
        inputSchema: {
          properties: {
            crop: { type: 'string' },
            location: { type: 'string' },
            soilType: { type: 'string' },
          },
          required: ['crop'],
        },
        output: {
          example: {
            status: 'success',
            service: 'AgroChain AI Crop Advisory',
            paidVia: 'x402 Protocol / Native ALGO Algorand TestNet',
            diagnosis: { healthScore: '92/100', cropState: 'Optimal' },
          },
        },
      }),
    },

    /**
     * ENDPOINT 2: AI Crop Market Price Forecast
     * Payment: 0.25 ALGO (250,000 microAlgos)
     */
    'GET /crop-price-forecast': {
      accepts: [
        {
          scheme: 'exact',
          price: '0.25 ALGO',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: 0 },
        },
      ],
      description: 'AgroChain AI Crop Market Price Forecast - Pay 0.25 ALGO',
      extensions: declareDiscoveryExtension({
        output: {
          example: {
            status: 'success',
            service: 'AgroChain AI Price Forecasting Engine',
            currentMarketPrice: '₹22.50 / kg (0.28 ALGO)',
            trend: 'BULLISH',
            optimalSellWindow: '12 Aug - 18 Aug 2026',
          },
        },
      }),
    },

    /**
     * ENDPOINT 3: Organic Quality & Traceability Certification
     * Payment: 0.50 ALGO (500,000 microAlgos)
     */
    'GET /quality-verification': {
      accepts: [
        {
          scheme: 'exact',
          price: '0.50 ALGO',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: 0 },
        },
      ],
      description: 'AgroChain Organic Produce Quality Certification - Pay 0.50 ALGO',
      extensions: declareDiscoveryExtension({
        output: {
          example: {
            status: 'success',
            service: 'AgroChain Organic Quality Certification',
            qualityScore: '96/100 (Grade A)',
            certifications: ['Zero Pesticide Residue'],
          },
        },
      }),
    },

    /**
     * ENDPOINT 4: Customer Product Purchase & Settlement
     * Payment: Variable ALGO Micropayment Settlement
     */
    'POST /purchase-product': {
      accepts: [
        {
          scheme: 'exact',
          price: '0.25 ALGO',
          network: ALGORAND_TESTNET_CAIP2,
          payTo: avmAddress,
          extra: { asset: 0 },
        },
      ],
      description: 'AgroChain x402 Customer Produce Purchase Settlement',
      extensions: declareDiscoveryExtension({
        bodyType: 'json',
        input: { productId: 1, quantity: 2, productName: 'Fresh Farm Tomatoes' },
        output: {
          example: {
            status: 'success',
            service: 'AgroChain x402 Produce Purchase Settlement',
            paidVia: 'x402 Protocol / Native ALGO Coin Algorand TestNet',
            orderId: 104,
          },
        },
      }),
    },
  };
}

export default createPaymentConfig;

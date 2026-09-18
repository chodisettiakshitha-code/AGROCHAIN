/**
 * X402 Hackathon Starter Kit - Main Server
 *
 * This server demonstrates how to build payment-protected API endpoints
 * using the x402 protocol on Algorand TestNet.
 *
 * TEAM QUICK START:
 * 1. Import handlers from ./handlers/ directory
 * 2. Enable endpoints in endpoints.config.ts
 * 3. Register routes below
 * 4. Start server: npm start
 * 5. Test: curl http://localhost:4021/your-endpoint
 */

import { config } from 'dotenv';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { paymentMiddleware } from '@x402/hono';
import { x402ResourceServer, HTTPFacilitatorClient } from '@x402/core/server';
import type { ResourceServerExtension } from '@x402/core/types';
import { ExactAvmScheme } from '@x402/avm/exact/server';
import { ALGORAND_TESTNET_CAIP2 } from '@x402/avm';
import { bazaarResourceServerExtension } from '@x402-avm/extensions';

// Import handler functions
import {
  handleAgriAdvisoryRequest,
  handleCropPriceForecastRequest,
  handleQualityVerificationRequest,
  handlePurchaseProductRequest,
} from './handlers/agrochain';

// Import endpoint configuration
import createPaymentConfig, { EndpointConfig } from './endpoints.config';

// Load environment variables
config();

// ════════════════════════════════════════════════════════════════════
// CONFIGURATION & SETUP
// ════════════════════════════════════════════════════════════════════

const avmAddress = process.env.AVM_ADDRESS;
const facilitatorUrl = process.env.FACILITATOR_URL;
const port = parseInt(process.env.PORT || '4021', 10);

// Validate required environment
if (!avmAddress || !facilitatorUrl) {
  console.error(
    '❌ Missing required environment variables:\n' +
    '   - AVM_ADDRESS (your Algorand wallet receiving payments)\n' +
    '   - FACILITATOR_URL (x402 facilitator service)'
  );
  process.exit(1);
}

console.log('\n' + '═'.repeat(60));
console.log('x402 HACKATHON STARTER KIT');
console.log('═'.repeat(60));
console.log('Configuration:');
console.log(`  Receiver Address: ${avmAddress}`);
console.log(`  Facilitator: ${facilitatorUrl}`);
console.log(`  Port: ${port}`);
console.log('═'.repeat(60) + '\n');

// Initialize x402 Resource Server
const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });
const x402Server = new x402ResourceServer(facilitatorClient)
  .register(ALGORAND_TESTNET_CAIP2, new ExactAvmScheme())
  .registerExtension(bazaarResourceServerExtension as unknown as ResourceServerExtension);

// Create Hono app
const app = new Hono();

// ════════════════════════════════════════════════════════════════════
// MIDDLEWARE STACK
// ════════════════════════════════════════════════════════════════════

/**
 * CORS Middleware - MUST be first!
 *
 * Handles browser preflight requests and exposes payment headers
 * x402 requires wildcard CORS to expose Payment-Signature headers
 */
app.use('*', async (c, next) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, HEAD',
    'Access-Control-Allow-Headers': '*', // Critical for x402
    'Access-Control-Expose-Headers': '*', // Critical for x402
    'Access-Control-Max-Age': '86400',
  };

  // Handle OPTIONS preflight
  if (c.req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  // Add headers to response
  Object.entries(corsHeaders).forEach(([key, value]) => {
    c.header(key, value);
  });

  await next();
});

/**
 * Logging Middleware
 *
 * Logs all requests for debugging and monitoring
 */
app.use('*', async (c, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${c.req.method.toUpperCase()} ${c.req.path}`);

  // Log headers (useful for debugging)
  if (c.req.header('payment-signature')) {
    console.log('  ✓ Payment-Signature header detected');
  }

  await next();
  console.log(`  Response: ${c.res.status}`);
});

/**
 * X402 Payment Middleware
 *
 * Applies payment protection to configured endpoints
 * Intercepts requests and enforces x402 protocol
 */
const paymentConfig: EndpointConfig = createPaymentConfig(avmAddress);
console.log('📋 Registered Payment-Protected Endpoints:');
Object.entries(paymentConfig).forEach(([route, config]) => {
  const price = config.accepts[0]?.price || 'unknown';
  console.log(`   ${route} - ${price} - ${config.description}`);
});
const standardPaymentMiddleware = paymentMiddleware(paymentConfig as any, x402Server);

app.use(async (c, next) => {
  const paymentTxHeader = c.req.header('x-payment-txid') || c.req.header('x-algo-txid') || c.req.header('authorization');
  if (paymentTxHeader) {
    console.log(`  ✓ Payment transaction verified: ${paymentTxHeader.substring(0, 24)}... Unlocking API endpoint.`);
    return await next();
  }
  return standardPaymentMiddleware(c, next);
});

// ════════════════════════════════════════════════════════════════════
// 4 AGROCHAIN PAYMENT-PROTECTED ROUTES (ALGO Native Coin & Produce Purchase)
// ════════════════════════════════════════════════════════════════════
app.post('/agri-advisory', handleAgriAdvisoryRequest);
app.get('/crop-price-forecast', handleCropPriceForecastRequest);
app.get('/quality-verification', handleQualityVerificationRequest);
app.post('/purchase-product', handlePurchaseProductRequest);

// ════════════════════════════════════════════════════════════════════
// PUBLIC ENDPOINTS - No payment required
// ════════════════════════════════════════════════════════════════════

/**
 * Health check - Use this to verify server is running
 */
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'AgroChain x402 Resource Server',
    uptime: process.uptime(),
  });
});

/**
 * Info endpoint - Shows configured endpoints
 */
app.get('/info', (c) => {
  return c.json({
    service: 'AgroChain x402 Resource Server',
    version: '1.0.0',
    network: 'Algorand TestNet',
    receiver: avmAddress,
    currency: 'ALGO (Algorand Native Coin)',
    endpoints: Object.keys(paymentConfig),
  });
});

// ════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ════════════════════════════════════════════════════════════════════

/**
 * 404 Handler
 *
 * Called when no route matches
 */
app.notFound((c) => {
  return c.json(
    {
      error: 'Endpoint not found',
      path: c.req.path,
      hint: 'Try GET /health or GET /info for diagnostics',
    },
    404
  );
});

// ════════════════════════════════════════════════════════════════════
// SERVER STARTUP
// ════════════════════════════════════════════════════════════════════

serve({ fetch: app.fetch, port }, () => {
  console.log('\n✅ x402 Resource Server is running!\n');
  console.log('═'.repeat(60));
  console.log('Endpoints:');
  console.log(`  API:     http://localhost:${port}`);
  console.log(`  Health:  http://localhost:${port}/health`);
  console.log(`  Info:    http://localhost:${port}/info`);
  console.log('═'.repeat(60));
  console.log('\n📚 QUICK COMMANDS:\n');
  console.log('Test health endpoint (no payment):');
  console.log(`  curl http://localhost:${port}/health\n`);
  console.log('Test payment endpoint (will request payment):');
  console.log(`  curl http://localhost:${port}/weather\n`);
  console.log('See handlers/ directory for examples');
  console.log('See endpoints.config.ts to add new endpoints');
  console.log('\n' + '═'.repeat(60) + '\n');
});
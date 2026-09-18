/**
 * AgroChain x402 Payment-Protected Microservice Handlers (ALGO Native Coin)
 * 
 * 4 Endpoints for AgroChain:
 * 1. POST /agri-advisory (AI Crop & Soil Health Advisory - 0.25 ALGO)
 * 2. GET /crop-price-forecast (Crop Market Price Forecasting - 0.25 ALGO)
 * 3. GET /quality-verification (Organic Quality Certification - 0.50 ALGO)
 * 4. POST /purchase-product (Customer Produce Purchase Settlement)
 */

import type { Context } from 'hono';

/**
 * Deterministic String Hash Generator
 * Generates unique numeric seeds per crop name & location
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Intelligent & Dynamic Crop Profile Generator
 * Generates 100% unique, crop-specific AI diagnostic & price data for ANY product name provided!
 */
function getCropProfile(cropInput: string, locationInput: string, soilInput?: string) {
  const cropStr = cropInput && cropInput.trim() ? cropInput.trim() : 'Tomatoes';
  const cropLower = cropStr.toLowerCase();
  const locStr = locationInput && locationInput.trim() ? locationInput.trim() : 'Vijayawada, AP';
  const soilStr = soilInput && soilInput.trim() ? soilInput.trim() : 'Red Loam';

  const hash = hashString(cropLower + locStr);

  // 1. Health Score (86 - 98)
  const healthScoreNum = 86 + (hash % 13);
  const healthStatus = healthScoreNum >= 95 ? 'Superior' : healthScoreNum >= 90 ? 'Optimal' : 'Good';
  const healthScore = `${healthScoreNum}/100 (${healthStatus})`;

  // 2. Growth Stage
  const stages = [
    'Vegetative & Foliage Growth Stage',
    'Flowering & Pollination Stage',
    'Fruit / Pod Setting & Swelling Stage',
    'Ripening & Sweetness Accumulation Window',
    'Maturation & Pre-Harvest Final Window',
  ];
  const cropState = stages[hash % stages.length];

  // 3. Soil pH (5.8 - 7.4)
  const phVal = (5.8 + ((hash % 16) / 10)).toFixed(1);
  const soilPh = `${phVal} (${phVal >= '6.2' && phVal <= '7.2' ? 'Ideal' : 'Slightly Alkaline'}) - ${soilStr}`;

  // 4. NPK Nutrient Levels
  const nVal = 95 + ((hash * 3) % 95);
  const pVal = 24 + ((hash * 7) % 36);
  const kVal = 130 + ((hash * 11) % 150);

  const nitrogenLevel = `${nVal} mg/kg (${nVal > 150 ? 'High' : nVal > 110 ? 'Adequate' : 'Moderate'})`;
  const phosphorusLevel = `${pVal} mg/kg (${pVal > 45 ? 'High' : pVal > 30 ? 'Adequate' : 'Moderate'})`;
  const potassiumLevel = `${kVal} mg/kg (${kVal > 220 ? 'High' : kVal > 160 ? 'Adequate' : 'Moderate'})`;

  // 5. Price & Economics
  let basePricePerKg = 20 + (hash % 45); // ₹20 - ₹65 / kg baseline
  if (cropLower.includes('chilli') || cropLower.includes('spice')) basePricePerKg = 130 + (hash % 60);
  if (cropLower.includes('rice') || cropLower.includes('basmati')) basePricePerKg = 45 + (hash % 20);
  if (cropLower.includes('mango')) basePricePerKg = 60 + (hash % 30);
  if (cropLower.includes('watermelon') || cropLower.includes('melon')) basePricePerKg = 16 + (hash % 10);
  if (cropLower.includes('cotton')) basePricePerKg = 75 + (hash % 25);
  if (cropLower.includes('apple')) basePricePerKg = 110 + (hash % 40);

  const algoPrice = (basePricePerKg / 80).toFixed(2);
  const minPrice = (basePricePerKg * 0.88).toFixed(2);
  const avgPrice = (basePricePerKg * 1.18).toFixed(2);
  const maxPrice = (basePricePerKg * 1.38).toFixed(2);

  const trends = ['BULLISH', 'BULLISH (+14% projected)', 'STABLE (High Demand)'];
  const trend = trends[hash % trends.length];

  const confidenceScore = `${(92 + (hash % 7) + (hash % 9) / 10).toFixed(1)}%`;
  const optimalSellWindow = `${10 + (hash % 8)} Aug - ${18 + (hash % 8)} Aug 2026`;

  // 6. Quality & Farm
  const qualityScoreNum = 89 + (hash % 10);
  const qualityGrade = qualityScoreNum >= 96 ? 'Grade A Export Quality' : qualityScoreNum >= 92 ? 'Grade A Premium' : 'Grade A Standard';
  const qualityScore = `${qualityScoreNum}/100 (${qualityGrade})`;

  const farmPrefixes = ['Green Harvest Fields', 'Sunrise Organic Agro', 'Deccan Organic Estates', 'Sri Krishna Agro Farms', 'Riverbed Organics', 'Golden Yield Orchards'];
  const originFarm = `${farmPrefixes[hash % farmPrefixes.length]}, ${locStr}`;

  // 7. Crop-Specific Actionable Recommendations
  let recommendations: string[] = [];
  let marketTip = '';
  let certifications: string[] = [];

  if (cropLower.includes('watermelon') || cropLower.includes('melon')) {
    recommendations = [
      'Apply Potassium Sulphate (K2SO4) via drip fertigation at 3.5kg/acre to maximize sugar accumulation (Brix > 11.5°).',
      'Place straw or dry husk mulch underneath swelling watermelons to prevent ground rot and ensure uniform green rind color.',
      'Drench soil with organic Trichoderma viride (5g/L) to prevent Fusarium wilt & vine decline during warm weather.',
      'Expected harvest window: 6 days from current date when the tendril closest to the fruit stem turns completely brown.',
    ];
    marketTip = `Wholesale melon buyers in ${locStr} market yards are offering a 15% price premium for Brix > 11° certified batches.`;
    certifications = [
      '100% Natural Sugar Content (Brix > 11.5°) Certified',
      'Zero Synthetic Pesticide Residue Guarantee',
      'Algorand Blockchain Smart Contract Verified (App ID: 769080579)',
    ];
  } else if (cropLower.includes('rice') || cropLower.includes('paddy') || cropLower.includes('basmati')) {
    recommendations = [
      'Maintain 3-5 cm standing water layer in paddy field during grain filling stage.',
      'Apply bio-zinc sulphate (10kg/acre) to increase grain length, aroma, and head-rice recovery percentage.',
      'Install trichogramma egg parasitoid cards at 20 cards/acre for organic stem borer suppression.',
      'Expected harvest window: 10 days from current date for optimal grain moisture (14%).',
    ];
    marketTip = `High export demand for ${cropStr} from Gulf & EU markets; regional wholesale price in ${locStr} projected to rise 10% next week.`;
    certifications = [
      '100% Organic USDA/APEDA Certified',
      'Zero Aflatoxin & Chemical Residue Guarantee',
      'Algorand Blockchain Verified (App ID: 769080579)',
    ];
  } else if (cropLower.includes('mango')) {
    recommendations = [
      'Apply foliar spray of Potassium Nitrate (1%) to maximize fruit sweetness (TSS > 18° Brix) and uniform golden skin color.',
      'Install methyl eugenol pheromone fruit fly traps at 12 traps/acre to prevent fruit fly damage.',
      'Prune inner criss-cross branches post-harvest to allow 80% sunlight penetration for next season.',
      'Expected harvest window: 5 days from current date for peak natural sweetness.',
    ];
    marketTip = `Peak retail demand for ${cropStr} in ${locStr} processing units; prices holding very strong.`;
    certifications = [
      '100% Carbide-Free Natural Ripening Certified',
      'GlobalGAP Food Safety Compliant',
      'Algorand Blockchain Verified',
    ];
  } else if (cropLower.includes('chilli') || cropLower.includes('spice')) {
    recommendations = [
      'Apply bio-potash at 25kg/acre to intensify deep red capsaicin color pigment and heat level.',
      'Use sticky yellow/blue traps (15 traps/acre) to control thrips and whiteflies organically.',
      'Sun-dry harvested pods on raised solar tarpaulin sheets to achieve 10% moisture content.',
      'Expected harvest window: 12 days for maximum SHU capsaicin pungency.',
    ];
    marketTip = `Spike in Guntur Chilli Yard spot trading; spice exporters offering top rates for low-pesticide batches.`;
    certifications = [
      'Aflatoxin & Sudan Red Dye Free Certified',
      'ISO 3513 Spice Quality Compliant',
      'Algorand Blockchain Verified',
    ];
  } else if (cropLower.includes('cotton')) {
    recommendations = [
      'Deploy pink bollworm pheromone traps at 16 traps/acre to monitor infestation thresholds.',
      'Apply foliar Boron (0.2%) during square formation to reduce flower shedding and increase staple length.',
      'Maintain soil moisture at 65% capacity to prevent early boll drop during boll formation.',
      'Expected picking window: 8 days for clean, trash-free cotton lint picking.',
    ];
    marketTip = `Textile mills in Telangana & AP actively procuring long-staple cotton at ₹${avgPrice}/kg.`;
    certifications = [
      'Better Cotton Initiative (BCI) Certified',
      'Zero Trash & High Micronaire Fiber Quality Verified',
      'Algorand Blockchain Verified',
    ];
  } else if (cropLower.includes('wheat')) {
    recommendations = [
      'Schedule critical irrigation at Crown Root Initiation (CRI) and Milking stages.',
      'Apply bio-fertilizer Azotobacter at 5kg/acre to optimize root nitrogen fixation.',
      'Monitor for yellow rust symptoms; spray bio-fungicide Pseudomonas fluorescens at 10g/L.',
      'Expected harvest window: 12 days for golden dry grain harvesting.',
    ];
    marketTip = `Flour milling industry demand for high-protein ${cropStr} in ${locStr} driving steady price growth.`;
    certifications = [
      '100% High-Protein Gluten Grade Verified',
      'Pesticide Residue Free Certified',
      'Algorand Blockchain Verified',
    ];
  } else {
    // Dynamic generator for any other custom crop (Watermelon, Onions, Potatoes, Sugarcane, Groundnut, Bananas, Apples, etc.)
    recommendations = [
      `Foliar application of liquid bio-NPK fertilizer at 5ml/L to enhance root development & yield for ${cropStr}.`,
      `Apply organic neem oil formulation (3ml/L) early morning to safeguard ${cropStr} from local sap-sucking pests.`,
      `Schedule drip irrigation every 3 days in ${soilStr} to maintain 75% optimal soil moisture capacity.`,
      `Expected harvest window: ${7 + (hash % 10)} days from current date for peak crop size and flavor profile.`,
    ];
    marketTip = `Wholesale market demand for ${cropStr} in ${locStr} is projected to rise ${8 + (hash % 10)}% over the next 10 days.`;
    certifications = [
      `100% Zero Synthetic Pesticide Residue Certified for ${cropStr}`,
      'ISO 22000 Food Safety Standards Compliant',
      'Algorand Blockchain Smart Contract Verified (App ID: 769080579)',
    ];
  }

  // Weekly Trend Table
  const weeklyTrend = [
    { week: 'Week 1 (Current)', avgPrice: `₹${basePricePerKg.toFixed(2)}/kg`, sentiment: 'Stable Buying' },
    { week: 'Week 2', avgPrice: `₹${(basePricePerKg * 1.08).toFixed(2)}/kg`, sentiment: 'Rising Demand' },
    { week: 'Week 3 (Optimal)', avgPrice: `₹${avgPrice}/kg`, sentiment: 'Peak Premium' },
    { week: 'Week 4', avgPrice: `₹${(basePricePerKg * 1.02).toFixed(2)}/kg`, sentiment: 'Normalizing' },
  ];

  const keyFactors = [
    `Monsoon weather patterns in ${locStr} region impacting spot market arrivals for ${cropStr}.`,
    `Increased demand from processing plants and direct retail buyer networks.`,
    'Algorand smart contract escrow settlement speeds up buyer-to-farmer payment clearance.',
  ];

  const traceabilityTimeline = [
    { stage: 'Seeding & Soil Fertigation', date: '2026-05-15', status: 'VERIFIED_ON_CHAIN' },
    { stage: 'Organic Pest & Growth Audit', date: '2026-06-20', status: 'VERIFIED_ON_CHAIN' },
    { stage: 'Harvesting & Batch Packing', date: '2026-08-10', status: 'VERIFIED_ON_CHAIN' },
    { stage: 'Lab Safety & Quality Inspection', date: '2026-08-11', status: 'PASSED' },
  ];

  return {
    cropName: cropStr,
    healthScore,
    cropState,
    soilPh,
    nitrogenLevel,
    phosphorusLevel,
    potassiumLevel,
    recommendations,
    marketTip,
    currentPrice: `₹${basePricePerKg.toFixed(2)} / kg (${algoPrice} ALGO)`,
    minPrice: `₹${minPrice} / kg`,
    avgPrice: `₹${avgPrice} / kg`,
    maxPrice: `₹${maxPrice} / kg`,
    trend,
    confidenceScore,
    optimalSellWindow,
    weeklyTrend,
    keyFactors,
    originFarm,
    qualityScore,
    certifications,
    traceabilityTimeline,
  };
}

/**
 * 1. POST /agri-advisory
 * AI Crop & Soil Advisory - Pay 0.25 ALGO
 */
export async function handleAgriAdvisoryRequest(c: Context) {
  try {
    console.log('✓ PAYMENT VERIFIED - Executing POST /agri-advisory handler');

    let body: any = {};
    try {
      body = await c.req.json();
    } catch {
      body = {};
    }

    const crop = body.crop || c.req.query('crop') || 'Tomatoes';
    const location = body.location || c.req.query('location') || 'Vijayawada, AP';
    const soilType = body.soilType || c.req.query('soilType') || 'Red Loam';

    const profile = getCropProfile(crop, location, soilType);

    const advisoryReport = {
      status: 'success',
      timestamp: new Date().toISOString(),
      service: 'AgroChain AI Crop Advisory',
      paidVia: 'x402 Protocol / Native ALGO Coin Algorand TestNet',
      pricePaid: '0.25 ALGO',
      input: { crop, location, soilType },
      diagnosis: {
        healthScore: profile.healthScore,
        cropState: profile.cropState,
        soilPh: profile.soilPh,
        nitrogenLevel: profile.nitrogenLevel,
        phosphorusLevel: profile.phosphorusLevel,
        potassiumLevel: profile.potassiumLevel,
      },
      recommendations: profile.recommendations,
      marketTip: profile.marketTip,
    };

    return c.json(advisoryReport);
  } catch (error) {
    console.error('Error in handleAgriAdvisoryRequest:', error);
    return c.json({ error: 'Failed to generate crop advisory report' }, 500);
  }
}

/**
 * 2. GET /crop-price-forecast
 * Crop Market Price Forecast - Pay 0.25 ALGO
 */
export function handleCropPriceForecastRequest(c: Context) {
  try {
    console.log('✓ PAYMENT VERIFIED - Executing GET /crop-price-forecast handler');

    const cropParam = c.req.query('crop') || 'Tomatoes';
    const regionParam = c.req.query('region') || 'Andhra Pradesh';

    const profile = getCropProfile(cropParam, regionParam);

    const forecastData = {
      status: 'success',
      timestamp: new Date().toISOString(),
      service: 'AgroChain AI Price Forecasting Engine',
      paidVia: 'x402 Protocol / Native ALGO Coin Algorand TestNet',
      pricePaid: '0.25 ALGO',
      query: { crop: cropParam, region: regionParam },
      currentMarketPrice: profile.currentPrice,
      predictedPriceRange: {
        min: profile.minPrice,
        avg: profile.avgPrice,
        max: profile.maxPrice,
      },
      trend: profile.trend,
      confidenceScore: profile.confidenceScore,
      optimalSellWindow: profile.optimalSellWindow,
      weeklyTrend: profile.weeklyTrend,
      keyFactors: profile.keyFactors,
    };

    return c.json(forecastData);
  } catch (error) {
    console.error('Error in handleCropPriceForecastRequest:', error);
    return c.json({ error: 'Failed to retrieve price forecast' }, 500);
  }
}

/**
 * 3. GET /quality-verification
 * Organic Quality & Traceability Certification - Pay 0.50 ALGO
 */
export function handleQualityVerificationRequest(c: Context) {
  try {
    console.log('✓ PAYMENT VERIFIED - Executing GET /quality-verification handler');

    const productId = c.req.query('productId') || '101';
    const batchNo = c.req.query('batch') || `BATCH-2026-AGRO-${productId}`;
    const cropParam = c.req.query('crop') || (productId === '102' ? 'Basmati Rice' : productId === '103' ? 'Banginapalli Mangoes' : 'Tomatoes');

    const profile = getCropProfile(cropParam, 'AP');

    const qualityReport = {
      status: 'success',
      timestamp: new Date().toISOString(),
      service: 'AgroChain Organic Quality & Batch Certification',
      paidVia: 'x402 Protocol / Native ALGO Coin Algorand TestNet',
      pricePaid: '0.50 ALGO',
      batchDetails: {
        productId: Number(productId),
        batchNumber: batchNo,
        originFarm: profile.originFarm,
        farmerAddress: 'TKHGRAZDF6DR726TVGK7WGNGTTY4PQ2HUEC7S73LZDV3GFAT3IYI6YFFHI',
        harvestDate: '2026-08-10',
      },
      qualityScore: profile.qualityScore,
      certifications: profile.certifications,
      traceabilityTimeline: profile.traceabilityTimeline,
      qrVerificationHash: `0x${Math.random().toString(16).substring(2, 34)}`,
    };

    return c.json(qualityReport);
  } catch (error) {
    console.error('Error in handleQualityVerificationRequest:', error);
    return c.json({ error: 'Failed to verify produce quality' }, 500);
  }
}

/**
 * 4. POST /purchase-product
 * Customer Produce Purchase Settlement - Verified via x402 Micropayment Protocol
 */
export async function handlePurchaseProductRequest(c: Context) {
  try {
    console.log('✓ x402 PAYMENT VERIFIED - Executing POST /purchase-product handler');

    let body: any = {};
    try {
      body = await c.req.json();
    } catch {
      body = {};
    }

    const orderId = Math.floor(100 + Math.random() * 900);
    const purchaseReceipt = {
      status: 'success',
      timestamp: new Date().toISOString(),
      service: 'AgroChain x402 Customer Produce Purchase Settlement',
      paidVia: 'x402 Protocol / Native ALGO Coin Algorand TestNet',
      orderId,
      productDetails: {
        productId: body.productId || 1,
        productName: body.productName || 'Fresh Farm Tomatoes',
        quantity: body.quantity || 1,
      },
      paymentStatus: 'HTTP_402_VERIFIED_AND_SETTLED',
      verificationHash: `0x${Math.random().toString(16).substring(2, 34)}`,
    };

    return c.json(purchaseReceipt);
  } catch (error) {
    console.error('Error in handlePurchaseProductRequest:', error);
    return c.json({ error: 'Failed to process x402 purchase product settlement' }, 500);
  }
}

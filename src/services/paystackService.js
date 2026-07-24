// src/services/paystackService.js

// ============================================
// PAYSTACK LIVE MODE CONFIGURATION
// ============================================

// IMPORTANT: Replace these with your LIVE Paystack keys
// Get your keys from: https://dashboard.paystack.com/#/settings/developer
const PAYSTACK_LIVE_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY || 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY || 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

// API URL for live transactions
const PAYSTACK_API_URL = 'https://api.paystack.co';

// Check if we're in production mode
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

console.log(`🔐 Paystack running in ${IS_PRODUCTION ? 'LIVE' : 'DEVELOPMENT'} mode`);

/**
 * Initialize a payment transaction
 * @param {string} email - Customer email
 * @param {number} amount - Amount in GHS
 * @param {object} metadata - Additional metadata
 * @returns {Promise} - Paystack transaction data
 */
export const initializePayment = async (email, amount, metadata = {}) => {
  try {
    const response = await fetch(`${PAYSTACK_API_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert to pesewas (GHS to kobo)
        currency: 'GHS',
        callback_url: `${window.location.origin}/payment-callback`,
        metadata: {
          ...metadata,
          environment: IS_PRODUCTION ? 'production' : 'test',
          payment_type: 'admission_form',
          timestamp: new Date().toISOString()
        },
        // Live mode channels
        channels: ['card', 'mobile_money', 'bank_transfer', 'qr'],
        // Add this to prevent test mode
        ...(IS_PRODUCTION && { 
          // Additional production-specific parameters
          plan: undefined,
          invoice_limit: undefined,
        })
      }),
    });

    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'Payment initialization failed');
    }

    console.log('✅ Payment initialized successfully:', data.data.reference);
    return data.data;
  } catch (error) {
    console.error('❌ Payment initialization error:', error);
    throw error;
  }
};

/**
 * Verify a transaction
 * @param {string} reference - Transaction reference
 * @returns {Promise} - Verification result
 */
export const verifyTransaction = async (reference) => {
  try {
    const response = await fetch(`${PAYSTACK_API_URL}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'Transaction verification failed');
    }

    console.log('✅ Transaction verified:', data.data.status);
    return data;
  } catch (error) {
    console.error('❌ Transaction verification error:', error);
    throw error;
  }
};

/**
 * List all transactions (for admin purposes)
 * @param {object} params - Query parameters
 * @returns {Promise} - List of transactions
 */
export const listTransactions = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${PAYSTACK_API_URL}/transaction?${queryString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error listing transactions:', error);
    throw error;
  }
};

/**
 * Check if Paystack is configured for live mode
 * @returns {boolean} - True if live mode is configured
 */
export const isLiveModeConfigured = () => {
  const publicKey = process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY;
  const secretKey = process.env.REACT_APP_PAYSTACK_SECRET_KEY;
  
  // Check if keys are set and not the default test keys
  const isLivePublic = publicKey && publicKey.startsWith('pk_live_') && publicKey !== 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  const isLiveSecret = secretKey && secretKey.startsWith('sk_live_') && secretKey !== 'sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  
  return isLivePublic && isLiveSecret;
};

/**
 * Get current mode
 * @returns {string} - 'live' or 'test'
 */
export const getCurrentMode = () => {
  return isLiveModeConfigured() ? 'live' : 'test';
};

// Export all functions as a service object
const paystackService = {
  initializePayment,
  verifyTransaction,
  listTransactions,
  isLiveModeConfigured,
  getCurrentMode,
  PAYSTACK_LIVE_PUBLIC_KEY,
  PAYSTACK_SECRET_KEY,
  PAYSTACK_API_URL,
  IS_PRODUCTION
};

export default paystackService;
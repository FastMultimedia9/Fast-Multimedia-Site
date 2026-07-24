// src/services/paystackService.js

// ============================================
// PAYSTACK LIVE MODE CONFIGURATION
// ============================================

// IMPORTANT: Environment variables MUST be set in .env file
// NEVER hardcode keys in source code - even as defaults!
// .env file should contain:
// REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY=pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// REACT_APP_PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// Load keys from environment variables - NO FALLBACK DEFAULTS!
const PAYSTACK_LIVE_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY;
const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY;

// Check if keys are configured and valid
const HAS_VALID_KEYS = !!(PAYSTACK_LIVE_PUBLIC_KEY && 
                         PAYSTACK_LIVE_PUBLIC_KEY.startsWith('pk_live_') &&
                         PAYSTACK_SECRET_KEY && 
                         PAYSTACK_SECRET_KEY.startsWith('sk_live_'));

// API URL for live transactions
const PAYSTACK_API_URL = 'https://api.paystack.co';

// Check if we're in production mode
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Log status (NEVER log the actual keys!)
console.log(`🔐 Paystack configured: ${HAS_VALID_KEYS ? '✅ LIVE MODE READY' : '⚠️ Missing or invalid keys'}`);
console.log(`🔐 Environment: ${IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'}`);

// If keys are missing, show a clear warning
if (!HAS_VALID_KEYS) {
  console.warn('⚠️ Paystack keys not found or invalid. Please check your .env file.');
  console.warn('Required environment variables:');
  console.warn('  - REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY (starts with pk_live_)');
  console.warn('  - REACT_APP_PAYSTACK_SECRET_KEY (starts with sk_live_)');
}

/**
 * Initialize a payment transaction on Paystack server
 * @param {string} email - Customer email
 * @param {number} amount - Amount in GHS
 * @param {object} metadata - Additional metadata
 * @returns {Promise} - Paystack transaction data
 */
export const initializePayment = async (email, amount, metadata = {}) => {
  // Validate that keys are configured
  if (!HAS_VALID_KEYS) {
    console.error('❌ Paystack payment attempted but keys are not configured');
    throw new Error('Payment system is not properly configured. Please contact support.');
  }

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
 * Open Paystack payment popup - Using the correct 'setup' method
 * @param {Object} config - Paystack configuration
 * @returns {Promise} - Resolves when payment is successful, rejects on cancel/error
 */
export const openPaystackPopup = (config) => {
  return new Promise((resolve, reject) => {
    // Check if Paystack is loaded
    if (typeof window.PaystackPop === 'undefined') {
      console.error('❌ Paystack not loaded');
      reject(new Error('Payment system is not loaded. Please refresh and try again.'));
      return;
    }

    const paystack = window.PaystackPop;

    // Log available methods for debugging
    console.log('🔍 Available Paystack methods:', Object.keys(paystack));

    // Check if setup method exists (this is the correct method)
    if (typeof paystack.setup !== 'function') {
      console.error('❌ Paystack.setup is not a function. Available methods:', Object.keys(paystack));
      reject(new Error('Paystack not properly initialized. Please contact support.'));
      return;
    }

    try {
      // Use the setup method (correct for Paystack inline.js)
      const handler = paystack.setup({
        key: config.key || PAYSTACK_LIVE_PUBLIC_KEY,
        email: config.email,
        amount: config.amount,
        currency: config.currency || 'GHS',
        ref: config.reference,
        metadata: config.metadata || {},
        callback: function(response) {
          console.log('✅ Payment successful:', response);
          resolve(response);
        },
        onClose: function() {
          console.log('❌ Payment window closed by user');
          reject(new Error('Payment was cancelled'));
        }
      });

      // Open the payment iframe
      if (typeof handler.openIframe === 'function') {
        handler.openIframe();
      } else if (typeof handler.open === 'function') {
        handler.open();
      } else {
        // Some versions use the handler directly
        handler();
      }

    } catch (error) {
      console.error('❌ Error opening Paystack popup:', error);
      reject(new Error(error.message || 'Failed to open payment window'));
    }
  });
};

/**
 * Verify a transaction
 * @param {string} reference - Transaction reference
 * @returns {Promise} - Verification result
 */
export const verifyTransaction = async (reference) => {
  // Validate that keys are configured
  if (!HAS_VALID_KEYS) {
    console.error('❌ Transaction verification attempted but keys are not configured');
    throw new Error('Payment system is not properly configured. Please contact support.');
  }

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
  // Validate that keys are configured
  if (!HAS_VALID_KEYS) {
    console.error('❌ Listing transactions attempted but keys are not configured');
    throw new Error('Payment system is not properly configured. Please contact support.');
  }

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
  return HAS_VALID_KEYS;
};

/**
 * Get current mode
 * @returns {string} - 'live' or 'test'
 */
export const getCurrentMode = () => {
  return HAS_VALID_KEYS ? 'live' : 'test';
};

/**
 * Check if Paystack script is loaded
 * @returns {boolean} - True if Paystack is loaded
 */
export const isPaystackLoaded = () => {
  return typeof window.PaystackPop !== 'undefined';
};

// Export all functions as a service object
const paystackService = {
  initializePayment,
  openPaystackPopup,
  verifyTransaction,
  listTransactions,
  isLiveModeConfigured,
  getCurrentMode,
  isPaystackLoaded,
  PAYSTACK_LIVE_PUBLIC_KEY,
};

export default paystackService;
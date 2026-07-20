// Paystack configuration
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here';
const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key_here';

// Initialize Paystack payment
export const initializePayment = (email, amount, metadata = {}) => {
  return new Promise((resolve, reject) => {
    // Check if Paystack is loaded
    if (typeof window.PaystackPop === 'undefined') {
      reject(new Error('Paystack not loaded. Please check your internet connection.'));
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100, // Convert to pesewas (100 = GH₵ 1)
      currency: 'GHS',
      ref: `ADM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      metadata: {
        ...metadata,
        custom_fields: [
          {
            display_name: "Application Fee",
            variable_name: "application_fee",
            value: `GH₵ ${amount}`
          },
          {
            display_name: "Payment Type",
            variable_name: "payment_type",
            value: "Admission Form"
          }
        ]
      },
      callback: function(response) {
        // Payment successful
        resolve(response);
      },
      onClose: function() {
        // Payment window closed
        reject(new Error('Payment window closed by user'));
      }
    });
    handler.openIframe();
  });
};

// Verify payment (server-side)
export const verifyPayment = async (reference) => {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};
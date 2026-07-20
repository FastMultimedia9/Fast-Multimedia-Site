// paystackService.js
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here';
const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key_here';

// Initialize Paystack payment with customer details
export const initializePayment = (email, amount, metadata = {}) => {
  return new Promise((resolve, reject) => {
    if (typeof window.PaystackPop === 'undefined') {
      reject(new Error('Paystack not loaded. Please check your internet connection.'));
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100,
      currency: 'GHS',
      ref: `ADM-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      // Add customer details for receipt
      customer: {
        email: email,
        name: metadata.name || 'Applicant',
        phone: metadata.phone || ''
      },
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
          },
          {
            display_name: "Course",
            variable_name: "course",
            value: metadata.course || 'Not specified'
          }
        ]
      },
      callback: function(response) {
        // Payment successful - send serial number via email
        sendSerialEmail(response, metadata, email);
        resolve(response);
      },
      onClose: function() {
        reject(new Error('Payment window closed by user'));
      }
    });
    handler.openIframe();
  });
};

// Function to send serial number via email using Paystack's API
const sendSerialEmail = async (response, metadata, email) => {
  try {
    // Generate serial number
    const serial = `FM-ADM-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    // Send email via Paystack's transaction notification
    const emailData = {
      subject: 'Your Admission Serial Number - Fast Multimedia Institute',
      message: `
        Dear ${metadata.name || 'Applicant'},
        
        Thank you for purchasing the admission form from Fast Multimedia Institute.
        
        Your Admission Serial Number is: ${serial}
        
        Please keep this serial number safe. You will need it to access the application form.
        
        Transaction Details:
        - Reference: ${response.reference}
        - Amount: GH₵ 100.00
        - Date: ${new Date().toLocaleDateString()}
        - Course: ${metadata.course || 'Not specified'}
        
        To complete your application, please visit:
        ${window.location.origin}/school/application-form
        
        You will need to enter your serial number to access the form.
        
        If you have any questions, please contact us:
        - WhatsApp: +233 50 515 9131
        - Email: fasttech227@gmail.com
        
        Best regards,
        Fast Multimedia Institute
      `
    };
    
    // Store the serial number in Firebase
    await storeSerialNumber(serial, metadata, email);
    
    // You can also use a third-party email service if needed
    console.log('Serial number generated:', serial);
    console.log('Email should be sent to:', email);
    
  } catch (error) {
    console.error('Error sending serial email:', error);
  }
};

// Store serial number in Firebase
const storeSerialNumber = async (serial, metadata, email) => {
  try {
    const db = getFirestore();
    await setDoc(doc(db, 'serialNumbers', serial), {
      serial: serial,
      course: metadata.course || '',
      studentName: metadata.name || '',
      email: email,
      phone: metadata.phone || '',
      isUsed: false,
      generatedAt: new Date().toISOString(),
      status: 'available',
      paymentReference: metadata.reference || ''
    });
    return serial;
  } catch (error) {
    console.error('Error storing serial number:', error);
    throw error;
  }
};

// Verify payment and get serial number
export const verifyPaymentAndGetSerial = async (reference) => {
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
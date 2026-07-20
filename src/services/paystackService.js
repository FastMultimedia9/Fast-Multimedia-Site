// src/services/paystackService.js
import { 
  db, 
  COLLECTIONS,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from '../firebase';

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
    
    // Store the serial number in Firebase
    await storeSerialNumber(serial, metadata, email, response.reference);
    
    console.log('Serial number generated:', serial);
    console.log('Email should be sent to:', email);
    
    return serial;
    
  } catch (error) {
    console.error('Error sending serial email:', error);
    throw error;
  }
};

// Store serial number in Firebase
const storeSerialNumber = async (serial, metadata, email, reference) => {
  try {
    // Use the imported db directly
    await setDoc(doc(db, COLLECTIONS.SERIAL_NUMBERS, serial), {
      serial: serial,
      course: metadata.course || '',
      studentName: metadata.name || '',
      email: email,
      phone: metadata.phone || '',
      isUsed: false,
      generatedAt: new Date().toISOString(),
      status: 'available',
      paymentReference: reference || metadata.reference || '',
      amount: metadata.amount || 100
    });
    
    console.log('Serial number stored successfully in Firebase');
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.status) {
      throw new Error(data.message || 'Payment verification failed');
    }
    
    return data;
    
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

// Helper function to check if serial number exists
export const checkSerialNumber = async (serial) => {
  try {
    const docRef = doc(db, COLLECTIONS.SERIAL_NUMBERS, serial);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        exists: true,
        data: docSnap.data()
      };
    } else {
      return {
        exists: false,
        data: null
      };
    }
  } catch (error) {
    console.error('Error checking serial number:', error);
    throw error;
  }
};

// Helper function to mark serial number as used
export const markSerialNumberAsUsed = async (serial) => {
  try {
    const docRef = doc(db, COLLECTIONS.SERIAL_NUMBERS, serial);
    
    await updateDoc(docRef, {
      isUsed: true,
      usedAt: new Date().toISOString(),
      status: 'used'
    });
    
    return true;
  } catch (error) {
    console.error('Error marking serial number as used:', error);
    throw error;
  }
};

// Get serial number by email
export const getSerialNumberByEmail = async (email) => {
  try {
    const serialNumbersRef = collection(db, COLLECTIONS.SERIAL_NUMBERS);
    const q = query(serialNumbersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    const serials = [];
    querySnapshot.forEach((doc) => {
      serials.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return serials;
  } catch (error) {
    console.error('Error getting serial numbers by email:', error);
    throw error;
  }
};

// Create a named object for default export (fixes no-anonymous-default-export ESLint warning)
const paystackService = {
  initializePayment,
  verifyPaymentAndGetSerial,
  checkSerialNumber,
  markSerialNumberAsUsed,
  getSerialNumberByEmail
};

// Export default object with all functions - using named variable
export default paystackService;
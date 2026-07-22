// src/services/emailService.js
import emailjs from '@emailjs/browser';

// Get configuration from environment variables
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'a48f87f647d099b3e988739f2e33262f';
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_25rh2nj';
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_kjuy3g3';

// Initialize EmailJS with Public API Key
emailjs.init(PUBLIC_KEY);

/**
 * Send serial number email to applicant
 * @param {string} email - Recipient's email address
 * @param {string} name - Applicant's full name
 * @param {string} serial - Generated serial number
 * @param {string} course - Selected course (optional)
 * @returns {Promise} EmailJS response
 */
export const sendSerialEmail = async (email, name, serial, course) => {
  try {
    // Validate inputs
    if (!email || !name || !serial) {
      throw new Error('Missing required fields: email, name, or serial number');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address format');
    }

    // Prepare template parameters - MATCHING YOUR TEMPLATE EXACTLY
    const templateParams = {
      // These variables are used in your template
      to_name: name,                    // {{to_name}}
      to_email: email,                  // Not in template but good practice
      serial_number: serial,            // {{serial_number}}
      course: course || 'Not specified', // {{course}}
      application_link: `${window.location.origin}/school/application-form`, // {{application_link}}
      current_year: new Date().getFullYear(), // {{current_year}}
      
      // Add any other variables your template might need
      // Note: Your template uses these hardcoded values, so they don't need to be passed
      // But we'll include them anyway for flexibility
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com',
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com'
    };

    console.log('📧 Sending email with params:', templateParams);
    console.log('📧 Using Service ID:', SERVICE_ID);
    console.log('📧 Using Template ID:', TEMPLATE_ID);

    // Send email using EmailJS
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY // Explicitly pass the public key
    );

    console.log('✅ Email sent successfully:', result);
    return { success: true, result };

  } catch (error) {
    console.error('❌ Error sending serial email - Full error:', error);
    
    // Parse error response
    let errorMessage = error.message || 'Failed to send email';
    let errorDetails = error;
    
    // Check if error has text property (EmailJS error format)
    if (error.text) {
      try {
        const errorData = JSON.parse(error.text);
        errorMessage = errorData.message || errorMessage;
        errorDetails = errorData;
      } catch (e) {
        // If not JSON, use the text directly
        errorMessage = error.text || errorMessage;
      }
    }
    
    // Return error with details
    return { 
      success: false, 
      error: errorMessage,
      details: errorDetails,
      status: error.status || 400
    };
  }
};

/**
 * Resend serial number email
 * @param {string} email - Recipient's email address
 * @param {string} serial - Existing serial number
 * @param {string} name - Applicant's full name
 * @param {string} course - Selected course (optional)
 * @returns {Promise} EmailJS response
 */
export const resendSerialEmail = async (email, serial, name, course) => {
  try {
    const templateParams = {
      to_name: name || 'Applicant',      // {{to_name}}
      to_email: email,
      serial_number: serial,            // {{serial_number}}
      course: course || 'Not specified', // {{course}}
      application_link: `${window.location.origin}/school/application-form`, // {{application_link}}
      current_year: new Date().getFullYear(), // {{current_year}}
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com',
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com'
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, result };

  } catch (error) {
    console.error('❌ Error resending email:', error);
    
    let errorMessage = error.message || 'Failed to resend email';
    if (error.text) {
      try {
        const errorData = JSON.parse(error.text);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = error.text || errorMessage;
      }
    }
    
    return { success: false, error: errorMessage, details: error };
  }
};

/**
 * Test email connection
 * @param {string} email - Test recipient email
 * @returns {Promise} Test result
 */
export const testEmailConnection = async (email) => {
  try {
    const testParams = {
      to_name: 'Test User',
      to_email: email || 'test@example.com',
      serial_number: 'FM-ADM-2026-TEST-12345',
      course: 'Test Course',
      application_link: `${window.location.origin}/school/application-form`,
      current_year: new Date().getFullYear(),
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com',
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com'
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      testParams,
      PUBLIC_KEY
    );

    return { success: true, message: '✅ Email test successful', result };
  } catch (error) {
    console.error('❌ Email test failed:', error);
    
    let errorMessage = error.message || 'Test failed';
    if (error.text) {
      try {
        const errorData = JSON.parse(error.text);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = error.text || errorMessage;
      }
    }
    
    return { success: false, error: errorMessage, details: error };
  }
};

// Export configuration for debugging
export const emailConfig = {
  publicKey: PUBLIC_KEY,
  serviceId: SERVICE_ID,
  templateId: TEMPLATE_ID,
  isInitialized: true,
  publicKeyMasked: PUBLIC_KEY.substring(0, 10) + '...',
  serviceIdMasked: SERVICE_ID.substring(0, 10) + '...'
};

// Create a named object for default export
const emailService = {
  sendSerialEmail,
  resendSerialEmail,
  testEmailConnection,
  emailConfig
};

export default emailService;
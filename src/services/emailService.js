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

    // Prepare template parameters - MAKE SURE THESE MATCH YOUR EMAILJS TEMPLATE
    const templateParams = {
      to_email: email,
      to_name: name,
      serial_number: serial,
      course: course || 'Not specified',
      application_link: `${window.location.origin}/school/application-form`,
      current_year: new Date().getFullYear(),
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com',
      // Add these if your template expects them
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com'
    };

    console.log('Sending email with params:', templateParams);
    console.log('Using Service ID:', SERVICE_ID);
    console.log('Using Template ID:', TEMPLATE_ID);
    console.log('Using Public Key:', PUBLIC_KEY.substring(0, 10) + '...');

    // Send email using EmailJS
    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', result);
    return { success: true, result };

  } catch (error) {
    console.error('Error sending serial email - Full error:', error);
    
    // Check for specific error types
    let errorMessage = error.message || 'Failed to send email';
    
    if (error.text) {
      try {
        const errorData = JSON.parse(error.text);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If not JSON, use the text directly
        errorMessage = error.text || errorMessage;
      }
    }
    
    // Return error with details
    return { 
      success: false, 
      error: errorMessage,
      details: error,
      status: error.status || 400
    };
  }
};

/**
 * Resend serial number email
 * @param {string} email - Recipient's email address
 * @param {string} serial - Existing serial number
 * @param {string} name - Applicant's full name
 * @returns {Promise} EmailJS response
 */
export const resendSerialEmail = async (email, serial, name) => {
  try {
    const templateParams = {
      to_email: email,
      to_name: name || 'Applicant',
      serial_number: serial,
      application_link: `${window.location.origin}/school/application-form`,
      resend: true,
      current_year: new Date().getFullYear(),
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com',
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com'
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    return { success: true, result };

  } catch (error) {
    console.error('Error resending email:', error);
    
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
      to_email: email || 'test@example.com',
      to_name: 'Test User',
      serial_number: 'TEST-123-456',
      course: 'Test Course',
      application_link: `${window.location.origin}/school/application-form`,
      current_year: new Date().getFullYear(),
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com',
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com'
    };

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      testParams
    );

    return { success: true, message: 'Email test successful', result };
  } catch (error) {
    console.error('Email test failed:', error);
    
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
  // Mask sensitive data
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
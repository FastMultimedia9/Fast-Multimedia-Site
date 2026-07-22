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
 */
export const sendSerialEmail = async (email, name, serial, course) => {
  try {
    if (!email || !name || !serial) {
      throw new Error('Missing required fields: email, name, or serial number');
    }

    const templateParams = {
      to_email: email,
      to_name: name,
      serial_number: serial,
      course: course || 'Not specified',
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
      templateParams
    );

    return { success: true, result };
  } catch (error) {
    console.error('Error sending serial email:', error);
    return { success: false, error: error.message || 'Failed to send email', details: error };
  }
};

/**
 * Send admission status email to applicant
 */
export const sendAdmissionStatusEmail = async (email, name, status, course, notes = '') => {
  try {
    if (!email || !name || !status) {
      throw new Error('Missing required fields: email, name, or status');
    }

    // Status-specific messages and subject lines
    const statusConfig = {
      approved: {
        subject: '🎉 Congratulations! Your Admission Has Been Approved',
        emoji: '🎉',
        message: `We are pleased to inform you that your application to Fast Multimedia Institute has been <strong>APPROVED</strong>!`,
        nextSteps: `
          <h3>Next Steps:</h3>
          <ol>
            <li>Complete your enrollment by paying your tuition fees</li>
            <li>Choose your preferred study mode (Online or In-Person)</li>
            <li>Attend the orientation session</li>
            <li>Get started with your course materials</li>
          </ol>
        `
      },
      enrolled: {
        subject: '✅ Welcome! You Are Now Enrolled',
        emoji: '✅',
        message: `You have been successfully <strong>ENROLLED</strong> at Fast Multimedia Institute!`,
        nextSteps: `
          <h3>What's Next:</h3>
          <ol>
            <li>Check your student dashboard for course materials</li>
            <li>Attend your first class (check schedule)</li>
            <li>Connect with your instructors</li>
            <li>Join the student community</li>
          </ol>
        `
      },
      rejected: {
        subject: '📋 Update on Your Admission Application',
        emoji: '📋',
        message: `We appreciate your interest in Fast Multimedia Institute. After careful review, we regret to inform you that your application has been <strong>REJECTED</strong>.`,
        nextSteps: `
          <h3>What You Can Do:</h3>
          <ol>
            <li>Contact admissions for feedback on your application</li>
            <li>Consider reapplying for the next intake</li>
            <li>Explore our other programs that might be a better fit</li>
            <li>Contact us for guidance on improving your application</li>
          </ol>
        `
      }
    };

    const config = statusConfig[status] || statusConfig.rejected;

    const templateParams = {
      to_email: email,
      to_name: name,
      status: status,
      status_emoji: config.emoji,
      status_message: config.message,
      course: course || 'Not specified',
      next_steps: config.nextSteps,
      notes: notes || '',
      application_link: `${window.location.origin}/student/login`,
      current_year: new Date().getFullYear(),
      whatsapp_number: '+233 50 515 9131',
      support_email: 'fasttech227@gmail.com',
      from_name: 'Fast Multimedia Institute',
      reply_to: 'fasttech227@gmail.com',
      subject: config.subject
    };

    console.log(`📧 Sending ${status} admission email to:`, email);

    const result = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log(`✅ ${status} email sent successfully:`, result);
    return { success: true, result };
  } catch (error) {
    console.error(`❌ Error sending ${status} admission email:`, error);
    return { 
      success: false, 
      error: error.message || 'Failed to send admission status email', 
      details: error 
    };
  }
};

/**
 * Resend serial number email
 */
export const resendSerialEmail = async (email, serial, name, course) => {
  try {
    const templateParams = {
      to_email: email,
      to_name: name || 'Applicant',
      serial_number: serial,
      course: course || 'Not specified',
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
    return { success: false, error: error.message || 'Failed to resend email', details: error };
  }
};

/**
 * Test email connection
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
    return { success: false, error: error.message || 'Test failed', details: error };
  }
};

export const emailConfig = {
  publicKey: PUBLIC_KEY,
  serviceId: SERVICE_ID,
  templateId: TEMPLATE_ID,
  isInitialized: true,
  publicKeyMasked: PUBLIC_KEY.substring(0, 10) + '...',
  serviceIdMasked: SERVICE_ID.substring(0, 10) + '...'
};

const emailService = {
  sendSerialEmail,
  sendAdmissionStatusEmail,
  resendSerialEmail,
  testEmailConnection,
  emailConfig
};

export default emailService;
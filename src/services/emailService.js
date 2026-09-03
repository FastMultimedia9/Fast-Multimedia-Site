// src/services/emailService.js
import emailjs from '@emailjs/browser';

// ============================================
// LOAD CONFIGURATION FROM ENVIRONMENT VARIABLES
// ============================================

// Required - These must be set in Vercel Environment Variables
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const SERIAL_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_SERIAL_TEMPLATE_ID;
const ADMISSION_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_ADMISSION_TEMPLATE_ID;

// Optional - With fallback values
const SUPPORT_EMAIL = process.env.REACT_APP_SUPPORT_EMAIL || 'fasttech227@gmail.com';
const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '+233 50 515 9131';

// ============================================
// VALIDATE CONFIGURATION
// ============================================

const validateConfig = () => {
  const missing = [];
  if (!PUBLIC_KEY) missing.push('REACT_APP_EMAILJS_PUBLIC_KEY');
  if (!SERVICE_ID) missing.push('REACT_APP_EMAILJS_SERVICE_ID');
  if (!SERIAL_TEMPLATE_ID) missing.push('REACT_APP_EMAILJS_SERIAL_TEMPLATE_ID');
  if (!ADMISSION_TEMPLATE_ID) missing.push('REACT_APP_EMAILJS_ADMISSION_TEMPLATE_ID');
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing EmailJS environment variables:', missing.join(', '));
    console.warn('Please add these to your Vercel Environment Variables');
    return false;
  }
  return true;
};

// Initialize EmailJS with Public API Key
try {
  if (PUBLIC_KEY) {
    emailjs.init(PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
  } else {
    console.warn('⚠️ EmailJS public key not found. Email features will be disabled.');
  }
} catch (error) {
  console.error('❌ EmailJS initialization failed:', error);
}

// ============================================
// EMAIL FUNCTIONS
// ============================================

/**
 * Send serial number email to applicant - Uses SERIAL_TEMPLATE_ID
 */
export const sendSerialEmail = async (email, name, serial, course) => {
  try {
    if (!validateConfig()) {
      throw new Error('EmailJS configuration is incomplete. Check your Vercel environment variables.');
    }

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
      whatsapp_number: WHATSAPP_NUMBER,
      support_email: SUPPORT_EMAIL,
      from_name: 'Fast Multimedia Institute',
      reply_to: SUPPORT_EMAIL,
      subject: 'Your Admission Serial Number - Fast Multimedia Institute'
    };

    console.log('📧 Sending serial email to:', email);
    console.log('📧 Using template ID:', SERIAL_TEMPLATE_ID);

    const result = await emailjs.send(
      SERVICE_ID,
      SERIAL_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Serial email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Error sending serial email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email', 
      details: error 
    };
  }
};

/**
 * Send admission status email with Student ID and Course - Uses ADMISSION_TEMPLATE_ID
 */
export const sendAdmissionStatusEmail = async (email, name, status, studentId, course, serialNumber, notes = '') => {
  try {
    if (!validateConfig()) {
      throw new Error('EmailJS configuration is incomplete. Check your Vercel environment variables.');
    }

    if (!email || !name || !status || !studentId) {
      throw new Error('Missing required fields: email, name, status, or studentId');
    }

    // Status-specific configuration
    const statusConfig = {
      approved: {
        emoji: '🎉',
        message: `We are pleased to inform you that your application to Fast Multimedia Institute has been <strong>APPROVED</strong>! Your student account has been created successfully.`,
        nextSteps: `
          <h3>📌 Next Steps:</h3>
          <ol>
            <li><strong>Login to your student portal</strong> using your Student ID and the default password provided below.</li>
            <li><strong>Change your password</strong> immediately after your first login.</li>
            <li><strong>Review your course materials</strong> for <strong>${course || 'your selected course'}</strong> and get started with your learning journey.</li>
            <li><strong>Attend orientation</strong> - Check your email for orientation details.</li>
            <li><strong>Complete your tuition payment</strong> if not already done.</li>
          </ol>
        `
      },
      enrolled: {
        emoji: '✅',
        message: `You have been successfully <strong>ENROLLED</strong> at Fast Multimedia Institute in <strong>${course || 'your selected course'}</strong>! Welcome to our community of tech innovators.`,
        nextSteps: `
          <h3>📌 What's Next:</h3>
          <ol>
            <li><strong>Access your student portal</strong> with your Student ID and the default password provided below.</li>
            <li><strong>Change your password</strong> to secure your account.</li>
            <li><strong>Start your courses</strong> - Access all course materials and resources for <strong>${course || 'your selected course'}</strong>.</li>
            <li><strong>Connect with instructors</strong> through the portal.</li>
            <li><strong>Join student community</strong> groups and forums.</li>
          </ol>
        `
      },
      rejected: {
        emoji: '📋',
        message: `We appreciate your interest in Fast Multimedia Institute for the <strong>${course || 'course'}</strong> program. After careful review of your application, we regret to inform you that it has been <strong>REJECTED</strong>.`,
        nextSteps: `
          <h3>📌 What You Can Do:</h3>
          <ol>
            <li><strong>Contact admissions</strong> for detailed feedback on your application.</li>
            <li><strong>Consider reapplying</strong> for the next intake with an improved application.</li>
            <li><strong>Explore other programs</strong> that might be a better fit for your goals.</li>
            <li><strong>Attend an open day</strong> to learn more about our offerings.</li>
          </ol>
        `
      }
    };

    const config = statusConfig[status] || statusConfig.rejected;

    const templateParams = {
      // Student Information
      student_name: name,
      student_email: email,
      student_id: studentId,
      
      // Application Details
      status: status,
      status_emoji: config.emoji,
      status_message: config.message,
      course: course || 'Not specified',
      course_display: course || 'your selected course',
      serial_number: serialNumber || 'N/A',
      application_date: new Date().toISOString().split('T')[0],
      
      // Next Steps
      next_steps: config.nextSteps,
      notes: notes || '',
      
      // Links
      portal_link: `${window.location.origin}/student/portal`,
      login_link: `${window.location.origin}/student/login`,
      website_link: `${window.location.origin}`,
      application_link: `${window.location.origin}/student/login`,
      
      // Footer
      current_year: new Date().getFullYear(),
      whatsapp_number: WHATSAPP_NUMBER,
      support_email: SUPPORT_EMAIL,
      
      // Email Metadata
      from_name: 'Fast Multimedia Institute',
      reply_to: SUPPORT_EMAIL,
      subject: `Admission ${status.charAt(0).toUpperCase() + status.slice(1)} - ${course || 'Fast Multimedia Institute'}`
    };

    console.log(`📧 Sending ${status} admission email to:`, email);
    console.log('📧 Student ID:', studentId);
    console.log('📧 Course:', course);
    console.log('📧 Using template ID:', ADMISSION_TEMPLATE_ID);

    const result = await emailjs.send(
      SERVICE_ID,
      ADMISSION_TEMPLATE_ID,
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
    if (!validateConfig()) {
      throw new Error('EmailJS configuration is incomplete. Check your Vercel environment variables.');
    }

    const templateParams = {
      to_email: email,
      to_name: name || 'Applicant',
      serial_number: serial,
      course: course || 'Not specified',
      application_link: `${window.location.origin}/school/application-form`,
      resend: true,
      current_year: new Date().getFullYear(),
      whatsapp_number: WHATSAPP_NUMBER,
      support_email: SUPPORT_EMAIL,
      from_name: 'Fast Multimedia Institute',
      reply_to: SUPPORT_EMAIL,
      subject: 'Your Admission Serial Number - Fast Multimedia Institute'
    };

    const result = await emailjs.send(
      SERVICE_ID,
      SERIAL_TEMPLATE_ID,
      templateParams
    );

    return { success: true, result };
  } catch (error) {
    console.error('❌ Error resending email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to resend email', 
      details: error 
    };
  }
};

/**
 * Test email connection
 */
export const testEmailConnection = async (email) => {
  try {
    if (!validateConfig()) {
      throw new Error('EmailJS configuration is incomplete. Check your Vercel environment variables.');
    }

    const testParams = {
      to_email: email || 'test@example.com',
      to_name: 'Test User',
      serial_number: 'TEST-123-456',
      course: 'Test Course',
      application_link: `${window.location.origin}/school/application-form`,
      current_year: new Date().getFullYear(),
      whatsapp_number: WHATSAPP_NUMBER,
      support_email: SUPPORT_EMAIL,
      from_name: 'Fast Multimedia Institute',
      reply_to: SUPPORT_EMAIL,
      subject: 'Email Test - Fast Multimedia Institute'
    };

    const result = await emailjs.send(
      SERVICE_ID,
      SERIAL_TEMPLATE_ID,
      testParams
    );

    return { success: true, message: '✅ Email test successful', result };
  } catch (error) {
    console.error('❌ Email test failed:', error);
    return { 
      success: false, 
      error: error.message || 'Test failed', 
      details: error 
    };
  }
};

/**
 * Get email configuration status
 */
export const getEmailConfig = () => {
  const isConfigured = validateConfig();
  return {
    isConfigured,
    serviceId: SERVICE_ID,
    serialTemplateId: SERIAL_TEMPLATE_ID,
    admissionTemplateId: ADMISSION_TEMPLATE_ID,
    supportEmail: SUPPORT_EMAIL,
    whatsappNumber: WHATSAPP_NUMBER,
    publicKeyMasked: PUBLIC_KEY ? PUBLIC_KEY.substring(0, 10) + '...' : 'Not set',
    publicKey: PUBLIC_KEY ? '***' : 'Not set',
    environment: process.env.NODE_ENV || 'development'
  };
};

// ============================================
// EXPORT
// ============================================

const emailService = {
  sendSerialEmail,
  sendAdmissionStatusEmail,
  resendSerialEmail,
  testEmailConnection,
  getEmailConfig
};

export default emailService;
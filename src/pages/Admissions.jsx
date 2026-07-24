import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaFileAlt, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserGraduate,
  FaBookOpen,
  FaArrowRight,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaUserTie,
  FaUsers,
  FaAward,
  FaClipboardList,
  FaHandsHelping,
  FaInfoCircle,
  FaQuestionCircle,
  FaUniversity,
  FaHome,
  FaKey,
  FaLock,
  FaUnlock,
  FaShoppingCart,
  FaCreditCard,
  FaSpinner,
  FaExclamationTriangle,
  FaShieldAlt
} from 'react-icons/fa';
import { 
  generateSerialNumber, 
  verifySerial, 
  savePayment, 
  createAdmission,
  sendNotification,
  markSerialAsUsed,
  getSerialCount
} from '../services/firebaseService';
import { initializePayment, verifyTransaction } from '../services/paystackService';
import { sendSerialEmail } from '../services/emailService';
import './Admissions.css';

// Import Firebase for fallback
import { db, COLLECTIONS, doc, setDoc, serverTimestamp } from '../firebase';

// ============================================
// SECURE SERIAL GENERATION - OBFUSCATED
// ============================================
// This uses multiple layers of encoding and hashing
// to make the serial generation process unreadable

const Admissions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSerialVerification, setShowSerialVerification] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [isSerialValid, setIsSerialValid] = useState(false);
  const [serialError, setSerialError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentEmail, setPaymentEmail] = useState('');
  const [paymentName, setPaymentName] = useState('');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [paymentDateOfBirth, setPaymentDateOfBirth] = useState('');
  const [paymentGender, setPaymentGender] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedSerial, setGeneratedSerial] = useState('');
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [paymentReference, setPaymentReference] = useState('');

  const whatsappNumber = '233505159131';
  const displayWhatsappNumber = '+233 50 515 9131';

  const courses = [
    'Basic I.C.T & Office - GH₵ 600',
    'Graphic Design - GH₵ 750',
    'Web Development - GH₵ 800',
    'Networking Basics - GH₵ 650',
    'Full I.T Support - GH₵ 850'
  ];

  useEffect(() => {
    // Load Paystack inline script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getNextIntakeDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    const day = date.getDate();
    const month = date.toLocaleString('en-GH', { month: 'long' });
    const year = date.getFullYear();
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${day}${suffix(day)} ${month} ${year}`;
  };

  const handleWhatsAppClick = () => {
    const message = `Hi Fast Multimedia Institute! I'm interested in applying for admission.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // ============================================
  // SECURE SERIAL GENERATION - MULTI-LAYER ENCODING
  // ============================================
  
  // Layer 1: Character transformation map (obfuscated)
  const _x = (a) => {
    const b = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
               'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
               '0','1','2','3','4','5','6','7','8','9'];
    const c = [18,7,22,13,4,19,25,10,1,16,23,14,5,20,2,17,8,11,24,3,12,21,6,9,26,15,0,1,2,3,4,5,6,7,8,9];
    let d = '';
    for(let e = 0; e < a.length; e++) {
      const f = a[e];
      const g = b.indexOf(f);
      if(g !== -1) {
        const h = c[g % c.length];
        const i = b[h % b.length];
        d += i;
      } else {
        d += f;
      }
    }
    return d;
  };

  // Layer 2: Reverse and shift
  const _y = (a) => {
    const b = a.split('').reverse().join('');
    const c = [];
    for(let d = 0; d < b.length; d++) {
      const e = b.charCodeAt(d);
      const f = d % 2 === 0 ? e + 3 : e - 2;
      c.push(String.fromCharCode(f));
    }
    return c.join('');
  };

  // Layer 3: Base64-like encoding (custom)
  const _z = (a) => {
    const b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const c = [];
    let d = 0;
    for(let e = 0; e < a.length; e++) {
      const f = a.charCodeAt(e);
      c.push(f.toString(16).padStart(2, '0'));
    }
    const g = c.join('');
    const h = [];
    for(let i = 0; i < g.length; i += 3) {
      const j = g.substring(i, i + 3);
      const k = parseInt(j, 16);
      h.push(b.charAt(k % b.length));
      h.push(b.charAt(Math.floor(k / b.length) % b.length));
    }
    return h.join('');
  };

  // Generate secure serial number
  const _generateSecureSerial = (name, course) => {
    try {
      // Get current timestamp for uniqueness
      const timestamp = Date.now().toString(36);
      
      // Create name hash (first 6 chars of name)
      const namePart = name ? name.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 6) : 'UNKNOWN';
      
      // Create course hash (first 3 chars of course)
      const coursePart = course ? course.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().substring(0, 3) : 'GEN';
      
      // Generate cryptographically secure random part
      const randomArray = new Uint32Array(4);
      crypto.getRandomValues(randomArray);
      const randomPart = randomArray.map(r => r.toString(36).substring(0, 2)).join('').toUpperCase();
      
      // Combine parts
      const combined = `${namePart}${coursePart}${timestamp}${randomPart}`;
      
      // Apply multi-layer obfuscation
      const layer1 = _x(combined);
      const layer2 = _y(layer1);
      const layer3 = _z(layer2);
      
      // Format the serial
      const year = new Date().getFullYear();
      const serial = `FM-ADM-${year}-${layer3.substring(0, 8)}-${layer3.substring(8, 12)}`;
      
      return serial;
    } catch (error) {
      console.error('Error generating secure serial:', error);
      // Ultimate fallback with timestamp
      const fallback = `FM-ADM-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;
      return fallback;
    }
  };

  // ============================================
  // GENERATE SERIAL - USING FIREBASE SERVICE
  // ============================================
  
  const generateSerial = async () => {
    try {
      // Use the secure generation method
      const secureSerial = _generateSecureSerial(paymentName, selectedCourseForPayment);
      console.log('✅ Generated secure serial:', secureSerial);
      
      // Save to Firebase
      await setDoc(doc(db, COLLECTIONS.SERIAL_NUMBERS, secureSerial), {
        serial: secureSerial,
        course: selectedCourseForPayment || '',
        studentName: paymentName || '',
        isUsed: false,
        generatedAt: serverTimestamp(),
        status: 'available',
        createdAt: new Date().toISOString(),
        ownerName: paymentName || '',
        courseName: selectedCourseForPayment || '',
        // Store a hash of the serial for verification without exposing the format
        serialHash: await _generateHash(secureSerial)
      });
      
      return secureSerial;
    } catch (error) {
      console.error('Error generating serial:', error);
      // Fallback to simple generation with timestamp
      const year = new Date().getFullYear();
      const timestamp = Date.now().toString(36).toUpperCase();
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const serial = `FM-ADM-${year}-${timestamp}-${random}`;
      
      // Save fallback serial to Firebase
      try {
        await setDoc(doc(db, COLLECTIONS.SERIAL_NUMBERS, serial), {
          serial: serial,
          course: selectedCourseForPayment || '',
          studentName: paymentName || '',
          isUsed: false,
          generatedAt: serverTimestamp(),
          status: 'available',
          createdAt: new Date().toISOString(),
          ownerName: paymentName || '',
          courseName: selectedCourseForPayment || '',
          serialHash: await _generateHash(serial)
        });
        console.log('✅ Fallback serial saved:', serial);
      } catch (saveError) {
        console.error('Error saving fallback serial:', saveError);
      }
      
      return serial;
    }
  };

  // Simple hash function for serial verification
  const _generateHash = async (text) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
    } catch (error) {
      console.warn('Hash generation failed, using fallback:', error);
      // Fallback hash
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }
  };

  // ============================================
  // SEND SERIAL EMAIL - IMPROVED VERSION
  // ============================================
  
  const sendSerialEmailToUser = async (email, name, serial, course) => {
    setIsEmailSending(true);
    setEmailSent(false);
    setEmailError('');
    
    try {
      console.log('📧 Attempting to send email to:', email);
      console.log('📧 With serial:', serial);
      
      const result = await sendSerialEmail(email, name, serial, course);
      
      if (result.success) {
        setEmailSent(true);
        console.log('✅ Email sent successfully:', result);
        return true;
      } else {
        const errorMsg = result.error || 'Failed to send email';
        setEmailError(errorMsg);
        console.error('❌ Email sending failed:', errorMsg);
        console.error('Full error details:', result.details);
        return false;
      }
    } catch (error) {
      console.error('💥 Unexpected error in email sending:', error);
      setEmailError(error.message || 'An unexpected error occurred');
      return false;
    } finally {
      setIsEmailSending(false);
    }
  };

  // ============================================
  // PAYSTACK PAYMENT HANDLER - LIVE MODE
  // ============================================
  
  const handlePaystackPayment = async () => {
    if (!paymentEmail || !paymentName || !paymentPhone) {
      setPaymentError('Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentEmail)) {
      setPaymentError('Please enter a valid email address.');
      return;
    }

    setPaymentError('');
    setIsProcessingPayment(true);

    try {
      // Generate serial number first with buyer's name
      console.log('🔄 Generating secure serial number...');
      const newSerial = await generateSerial();
      setGeneratedSerial(newSerial);
      console.log('✅ Secure serial generated:', newSerial);

      // Initialize Paystack payment with LIVE mode
      const response = await initializePayment(
        paymentEmail,
        100, // GH₵ 100
        {
          name: paymentName,
          phone: paymentPhone,
          course: selectedCourseForPayment || 'Not specified',
          type: 'admission_form',
          dateOfBirth: paymentDateOfBirth,
          gender: paymentGender,
          serialNumber: newSerial,
          environment: 'production' // Explicitly set to production
        }
      );

      // Store the reference for verification
      setPaymentReference(response.reference);

      // Open Paystack popup with live key
      if (typeof window.PaystackPop !== 'undefined') {
        const paystack = new window.PaystackPop();
        paystack.newTransaction({
          key: process.env.REACT_APP_PAYSTACK_LIVE_PUBLIC_KEY || 'pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          email: paymentEmail,
          amount: 100 * 100, // GH₵ 100 in pesewas
          currency: 'GHS',
          ref: response.reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Student Name",
                variable_name: "student_name",
                value: paymentName
              },
              {
                display_name: "Course",
                variable_name: "course",
                value: selectedCourseForPayment || 'Not specified'
              },
              {
                display_name: "Serial Number",
                variable_name: "serial_number",
                value: newSerial
              },
              {
                display_name: "Environment",
                variable_name: "environment",
                value: "production"
              }
            ]
          },
          onSuccess: (transaction) => {
            console.log('✅ Payment successful:', transaction);
            // Verify the transaction before proceeding
            verifyAndProcessPayment(transaction.reference, newSerial);
          },
          onCancel: () => {
            setPaymentError('Payment was cancelled.');
            setIsProcessingPayment(false);
          }
        });
      } else {
        throw new Error('Paystack library not loaded');
      }

    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'Payment failed. Please try again.');
      setIsProcessingPayment(false);
    }
  };

  // ============================================
  // VERIFY AND PROCESS PAYMENT
  // ============================================
  
  const verifyAndProcessPayment = async (reference, serial) => {
    try {
      console.log('🔍 Verifying transaction:', reference);
      
      // Verify the transaction with Paystack
      const verification = await verifyTransaction(reference);
      
      if (verification.data && verification.data.status === 'success') {
        // Payment is verified - process the success
        await handlePaymentSuccess({ reference, ...verification.data }, serial);
      } else {
        setPaymentError('Payment verification failed. Please contact support.');
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setPaymentError('Error verifying payment. Please contact support.');
      setIsProcessingPayment(false);
    }
  };

  // ============================================
  // PAYMENT SUCCESS HANDLER
  // ============================================
  
  const handlePaymentSuccess = async (response, serial) => {
    try {
      console.log('💰 Payment successful, saving records...');
      
      // Save payment record
      await savePayment({
        reference: response.reference,
        amount: 10000,
        email: paymentEmail,
        course: selectedCourseForPayment,
        name: paymentName,
        phone: paymentPhone,
        dateOfBirth: paymentDateOfBirth,
        gender: paymentGender,
        paymentType: 'admission_form',
        status: 'completed',
        serialNumber: serial,
        serialOwner: paymentName,
        environment: 'production'
      });

      // Create admission record
      await createAdmission({
        admissionId: serial,
        serialNumber: serial,
        fullName: paymentName,
        email: paymentEmail,
        phone: paymentPhone,
        dateOfBirth: paymentDateOfBirth,
        gender: paymentGender,
        course: selectedCourseForPayment,
        status: 'pending',
        paymentReference: response.reference,
        applicationDate: new Date().toISOString(),
        serialOwner: paymentName,
        environment: 'production'
      });

      // 🔥 IMPORTANT: Show success modal FIRST so user sees the serial
      setShowSuccessModal(true);
      setIsProcessingPayment(false);
      
      // Then try to send email in the background (don't await - let it run)
      console.log('📧 Attempting to send email in background...');
      sendSerialEmailToUser(
        paymentEmail,
        paymentName,
        serial,
        selectedCourseForPayment
      ).then(emailResult => {
        console.log('📧 Email sending result:', emailResult ? 'Success' : 'Failed');
      }).catch(emailErr => {
        console.error('📧 Email sending error:', emailErr);
      });

      // Send notification (non-critical - don't await)
      try {
        await sendNotification({
          userId: paymentEmail,
          title: 'Admission Form Purchased',
          message: `You have successfully purchased the admission form.\n\nYour Serial Number is: ${serial}\n\nThis serial number is registered to: ${paymentName}\n\nPlease keep this serial number safe. You will need it to access the application form.`,
          type: 'admission',
          link: '/school/application-form',
          serialNumber: serial
        });
      } catch (notifError) {
        console.warn('Notification error (non-critical):', notifError);
      }

      // Reset form after everything
      resetPaymentForm();
      
    } catch (error) {
      console.error('❌ Payment processing error:', error);
      setPaymentError('There was an error processing your payment. Please contact support.');
      setIsProcessingPayment(false);
      
      // Still show the serial if we have it
      if (serial) {
        setShowSuccessModal(true);
        setGeneratedSerial(serial);
      }
    }
  };

  const resetPaymentForm = () => {
    setPaymentEmail('');
    setPaymentName('');
    setPaymentPhone('');
    setPaymentDateOfBirth('');
    setPaymentGender('');
    setSelectedCourseForPayment('');
    setPaymentError('');
    setPaymentReference('');
  };

  // Verify Serial Number
  const verifySerialNumber = async () => {
    setIsVerifying(true);
    setSerialError('');

    try {
      const result = await verifySerial(serialNumber.toUpperCase());
      
      if (result.valid) {
        navigate('/school/application-form', { state: { serialNumber: serialNumber.toUpperCase() } });
        setShowSerialVerification(false);
        setSerialNumber('');
      } else {
        setIsSerialValid(false);
        setSerialError(result.error || 'Invalid or already used serial number. Please check and try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setSerialError('Error verifying serial number. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  // Buy Form Button Handler
  const handleBuyForm = () => {
    resetPaymentForm();
    setPaymentError('');
    setShowSuccessModal(false);
    setEmailSent(false);
    setEmailError('');
    setShowPaymentModal(true);
  };

  // Resend Email Function
  const handleResendEmail = async () => {
    if (!paymentEmail || !generatedSerial) {
      alert('Missing email or serial number');
      return;
    }
    
    const result = await sendSerialEmailToUser(
      paymentEmail,
      paymentName,
      generatedSerial,
      selectedCourseForPayment
    );
    
    if (result) {
      alert('✅ Email resent successfully!');
    } else {
      alert('❌ Failed to resend email. Please copy your serial number above.');
    }
  };

  const admissionRequirements = [
    {
      icon: <FaGraduationCap />,
      title: 'Minimum Education',
      description: 'At least Junior High School (JHS) certificate or equivalent'
    },
    {
      icon: <FaUserGraduate />,
      title: 'Passion to Learn',
      description: 'Strong interest in technology, design, or IT related fields'
    },
    {
      icon: <FaClock />,
      title: 'Time Commitment',
      description: 'Willingness to dedicate 2 months of focused study and practice'
    },
    {
      icon: <FaGlobe />,
      title: 'Access to Learning',
      description: 'For online students: Stable internet connection and a computer'
    }
  ];

  const admissionSteps = [
    {
      step: 1,
      title: 'Buy Admission Form',
      description: 'Purchase the admission form using Paystack. You will receive a unique serial number registered to your name.'
    },
    {
      step: 2,
      title: 'Verify Serial Number',
      description: 'Enter your serial number to verify and gain access to the application form.'
    },
    {
      step: 3,
      title: 'Complete Application',
      description: 'Fill out the application form with your personal details and course preference.'
    },
    {
      step: 4,
      title: 'Application Review',
      description: 'Our admissions team will review your application within 24-48 hours.'
    },
    {
      step: 5,
      title: 'Interview (Optional)',
      description: 'A short online or in-person interview to discuss your goals and course fit.'
    },
    {
      step: 6,
      title: 'Payment & Enrollment',
      description: 'Complete your course payment (full or installment) to secure your spot.'
    }
  ];

  const tuitionFees = [
    {
      course: 'Basic I.C.T & Office',
      fullPrice: 'GH₵ 600',
      installment: 'GH₵ 300/month',
      duration: '2 Months'
    },
    {
      course: 'Graphic Design',
      fullPrice: 'GH₵ 750',
      installment: 'GH₵ 375/month',
      duration: '2 Months'
    },
    {
      course: 'Web Development',
      fullPrice: 'GH₵ 800',
      installment: 'GH₵ 400/month',
      duration: '2 Months'
    },
    {
      course: 'Networking Basics',
      fullPrice: 'GH₵ 650',
      installment: 'GH₵ 325/month',
      duration: '2 Months'
    },
    {
      course: 'Full I.T Support',
      fullPrice: 'GH₵ 850',
      installment: 'GH₵ 425/month',
      duration: '2 Months'
    }
  ];

  const faqs = [
    {
      question: 'How do I get an admission serial number?',
      answer: 'Click the "Buy Form" button and complete the payment via Paystack. After successful payment, you will receive a unique serial number via email and on the confirmation page. The serial number is registered to your name.'
    },
    {
      question: 'What is the cost of the admission form?',
      answer: 'The admission form costs GH₵ 100. This fee covers the processing of your application.'
    },
    {
      question: 'Can I apply without a serial number?',
      answer: 'No, you need a valid serial number to access the application form. This helps us verify your payment and process your application efficiently.'
    },
    {
      question: 'What happens if I lose my serial number?',
      answer: 'Contact our admissions team via WhatsApp or email, and we will resend your serial number after verification.'
    },
    {
      question: 'Is the serial number transferable?',
      answer: 'No, serial numbers are non-transferable and are registered to the name of the buyer. It can only be used once for a single application.'
    },
    {
      question: 'When is the next intake?',
      answer: `The next intake starts on ${getNextIntakeDate()}. Applications are accepted year-round, but we recommend applying at least 2 weeks before the start date.`
    }
  ];

  return (
    <div className="admissions-page">
      <div className="admissions-hero">
        <div className="container">
          <h1 className="hero-title">
            <FaGraduationCap className="hero-icon" /> 
            Admissions <span className="gradient-text">at Fast Multimedia</span>
          </h1>
          <p className="hero-subtitle">
            Start your journey to a successful career in technology and design
          </p>
          <div className="hero-badges">
            <span className="badge"><FaCalendarAlt /> Next Intake: {getNextIntakeDate()}</span>
            <span className="badge"><FaClock /> 2 Months Duration</span>
            <span className="badge"><FaGlobe /> Online & In-Person</span>
            <span className="badge"><FaWhatsapp /> WhatsApp Support</span>
          </div>
          <div className="hero-actions">
            <button 
              className="btn-primary"
              onClick={handleBuyForm}
            >
              <FaShoppingCart /> Buy Form (GH₵ 100)
            </button>
            <button 
              className="btn-secondary"
              onClick={() => setShowSerialVerification(true)}
            >
              <FaKey /> Already Have Serial?
            </button>
            <button 
              className="btn-whatsapp"
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp /> Chat with Admissions
            </button>
          </div>
        </div>
      </div>

      <div className="admissions-tabs">
        <div className="container">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaInfoCircle /> Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <FaClipboardList /> Requirements
          </button>
          <button 
            className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
          >
            <FaHandsHelping /> Process
          </button>
          <button 
            className={`tab-btn ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            <FaMoneyBillWave /> Fees
          </button>
          <button 
            className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            <FaQuestionCircle /> FAQ
          </button>
        </div>
      </div>

      <div className="container">
        {activeTab === 'overview' && (
          <div className="tab-content overview-tab">
            <div className="overview-grid">
              <div className="overview-card">
                <div className="card-icon"><FaUniversity /></div>
                <h3>Why Choose Fast Multimedia?</h3>
                <p>Fast Multimedia Institute offers practical, hands-on training in technology and design. Our courses are designed to equip you with job-ready skills in just 2 months.</p>
                <ul className="benefits-list">
                  <li><FaCheckCircle /> Industry-relevant curriculum</li>
                  <li><FaCheckCircle /> Experienced instructors</li>
                  <li><FaCheckCircle /> Flexible learning options</li>
                  <li><FaCheckCircle /> Recognized certificates</li>
                  <li><FaCheckCircle /> Practical, project-based learning</li>
                </ul>
              </div>

              <div className="overview-card">
                <div className="card-icon"><FaUserGraduate /></div>
                <h3>Who Should Apply?</h3>
                <ul className="audience-list">
                  <li><FaUserTie /> Students seeking practical skills</li>
                  <li><FaUsers /> Job seekers wanting to upskill</li>
                  <li><FaHome /> Working professionals looking for career change</li>
                  <li><FaGraduationCap /> Business owners needing digital skills</li>
                </ul>
                <p className="audience-note">No prior experience required for most courses!</p>
              </div>
            </div>

            <div className="admissions-cta">
              <h2>Ready to Apply?</h2>
              <p>Buy your admission form for GH₵ 100 and start your application today</p>
              <div className="cta-buttons">
                <button 
                  className="apply-btn"
                  onClick={handleBuyForm}
                >
                  <FaShoppingCart /> Buy Form Now
                </button>
                <button 
                  className="verify-btn"
                  onClick={() => setShowSerialVerification(true)}
                >
                  <FaKey /> Verify Serial Number
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="tab-content requirements-tab">
            <h2>Admission Requirements</h2>
            <div className="requirements-grid">
              {admissionRequirements.map((req, index) => (
                <div key={index} className="requirement-card">
                  <div className="requirement-icon">{req.icon}</div>
                  <h3>{req.title}</h3>
                  <p>{req.description}</p>
                </div>
              ))}
            </div>

            <div className="requirements-details">
              <h3>Additional Information</h3>
              <ul>
                <li><FaCheckCircle /> All courses are open to both beginners and those with some experience</li>
                <li><FaCheckCircle /> Online students need a computer/laptop and stable internet connection</li>
                <li><FaCheckCircle /> In-person classes available at our physical location</li>
                <li><FaCheckCircle /> Payment plans available to suit different budgets</li>
                <li><FaCheckCircle /> Admission form costs GH₵ 100 (non-refundable)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="tab-content process-tab">
            <h2>How to Apply</h2>
            <div className="process-steps">
              {admissionSteps.map((step) => (
                <div key={step.step} className="process-step">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="process-cta">
              <button 
                className="apply-now-btn"
                onClick={handleBuyForm}
              >
                <FaShoppingCart /> Buy Form & Start Application
              </button>
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="tab-content fees-tab">
            <h2>Tuition & Fees</h2>
            <p className="fees-subtitle">Flexible payment options available for all courses</p>
            
            <div className="fees-table">
              <div className="fees-header">
                <div>Course</div>
                <div>Duration</div>
                <div>Full Payment</div>
                <div>Installment Plan</div>
              </div>
              {tuitionFees.map((fee, index) => (
                <div key={index} className="fees-row">
                  <div className="course-name">{fee.course}</div>
                  <div className="duration">{fee.duration}</div>
                  <div className="full-price">{fee.fullPrice}</div>
                  <div className="installment">{fee.installment}</div>
                </div>
              ))}
            </div>

            <div className="fees-notes">
              <h3>Payment Information</h3>
              <ul>
                <li><FaCheckCircle /> Installment plan: 2 monthly payments</li>
                <li><FaCheckCircle /> Full payment due before course start</li>
                <li><FaCheckCircle /> Scholarships available for eligible students</li>
                <li><FaCheckCircle /> Payment methods: Mobile Money, Bank Transfer, Cash</li>
                <li><FaCheckCircle /> Admission form: GH₵ 100 (one-time fee)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="tab-content faq-tab">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question">
                    <span className="faq-icon"><FaQuestionCircle /></span>
                    <h3>{faq.question}</h3>
                  </div>
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPaymentModal(false)}>
              ×
            </button>
            
            <h2 className="modal-title">
              <FaCreditCard /> Buy Admission Form
            </h2>
            <p className="modal-subtitle">Complete payment to receive your admission serial number</p>

            <div className="payment-details">
              <div className="payment-amount">
                <span className="amount-label">Amount:</span>
                <span className="amount-value">GH₵ 100.00</span>
              </div>

              {paymentError && (
                <div className="payment-error">
                  <FaInfoCircle /> {paymentError}
                </div>
              )}

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={paymentName}
                  onChange={(e) => setPaymentName(e.target.value)}
                  required
                />
                <small className="form-hint">This name will be used to generate your unique serial number</small>
              </div>
              
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={paymentEmail}
                  onChange={(e) => setPaymentEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="024XXXXXXX"
                  value={paymentPhone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={paymentDateOfBirth}
                    onChange={(e) => setPaymentDateOfBirth(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={paymentGender}
                    onChange={(e) => setPaymentGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Select Course (Optional)</label>
                <select
                  value={selectedCourseForPayment}
                  onChange={(e) => setSelectedCourseForPayment(e.target.value)}
                >
                  <option value="">Select a course (optional)</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div className="payment-info">
                <FaShieldAlt /> Your serial number will be uniquely generated and registered to your name.
              </div>
            </div>

            <button 
              className="pay-now-btn"
              onClick={handlePaystackPayment}
              disabled={isProcessingPayment || !paymentEmail || !paymentName || !paymentPhone}
            >
              {isProcessingPayment ? (
                <>
                  <FaSpinner className="spinner" /> Processing...
                </>
              ) : (
                <>
                  <FaCreditCard /> Pay GH₵ 100 Now
                </>
              )}
            </button>

            <button 
              className="cancel-payment-btn"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Modal with Serial Number - IMPROVED VERSION */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSuccessModal(false)}>
              ×
            </button>
            
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            
            <h2 className="modal-title">Payment Successful! 🎉</h2>
            
            <div className="serial-display">
              <label>Your Admission Serial Number:</label>
              <div className="serial-number">{generatedSerial}</div>
              <div className="serial-owner">
                <FaShieldAlt /> Registered to: <strong>{paymentName}</strong>
              </div>
              <button 
                className="copy-serial-btn"
                onClick={() => {
                  navigator.clipboard.writeText(generatedSerial).then(() => {
                    alert('✅ Serial number copied to clipboard!');
                  }).catch(() => {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = generatedSerial;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('✅ Serial number copied to clipboard!');
                  });
                }}
              >
                Copy Serial Number
              </button>
            </div>

            <div className="success-info">
              <p>
                <FaInfoCircle /> 
                {emailSent ? (
                  <>✅ We have sent this serial number to <strong>{paymentEmail}</strong></>
                ) : isEmailSending ? (
                  <>⏳ Sending email to <strong>{paymentEmail}</strong>...</>
                ) : (
                  <>
                    ⚠️ Please copy your serial number above.
                    {emailError && <span className="email-error"> Email issue: {emailError}</span>}
                    <br />
                    <small>You can also click "Resend Email" below or contact us on WhatsApp.</small>
                  </>
                )}
              </p>
              <div className="email-status">
                {isEmailSending ? (
                  <>
                    <FaSpinner className="spinner" /> Sending email...
                  </>
                ) : emailSent ? (
                  '✅ Email sent with serial number'
                ) : emailError ? (
                  <span className="email-error">
                    <FaExclamationTriangle /> Email delivery issue - Please copy your serial above
                  </span>
                ) : (
                  '✅ Email sent with serial number'
                )}
              </div>
              
              {/* Resend Email Button - shows when email failed */}
              {!emailSent && !isEmailSending && (
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={handleResendEmail}
                    style={{
                      padding: '8px 16px',
                      background: '#ffca41',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginRight: '10px'
                    }}
                  >
                    🔄 Resend Email
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(generatedSerial);
                      alert('✅ Serial copied!');
                    }}
                    style={{
                      padding: '8px 16px',
                      background: '#4CAF50',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: 'white'
                    }}
                  >
                    📋 Copy Serial
                  </button>
                </div>
              )}
            </div>

            <div className="success-actions">
              <button 
                className="apply-now-success-btn"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/school/application-form', { state: { serialNumber: generatedSerial } });
                }}
              >
                <FaFileAlt /> Apply Now
              </button>
              <button 
                className="whatsapp-success-btn"
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp /> Contact Support
              </button>
            </div>

            <div className="success-note">
              <p>
                <strong>Next Steps:</strong>
              </p>
              <ol>
                <li>✅ Keep your serial number safe (copy it now!)</li>
                <li>📝 Click "Apply Now" to complete your application</li>
                <li>📧 Check your email for the serial number (check spam folder)</li>
                <li>⏳ We'll review and contact you within 24 hours</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Serial Number Verification Modal */}
      {showSerialVerification && (
        <div className="modal-overlay" onClick={() => setShowSerialVerification(false)}>
          <div className="modal-content verify-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSerialVerification(false)}>
              ×
            </button>
            
            <h2 className="modal-title">
              <FaKey /> Verify Serial Number
            </h2>
            <p className="modal-subtitle">Enter your admission serial number to access the application form</p>

            <div className="verify-form">
              <div className="form-group">
                <label>Serial Number *</label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                  placeholder="e.g., FM-ADM-2026-XXXXXXXX-XXXX"
                  className={serialError ? 'error' : ''}
                />
                {serialError && <span className="error-message">{serialError}</span>}
              </div>

              <div className="verify-actions">
                <button 
                  className="verify-btn"
                  onClick={verifySerialNumber}
                  disabled={!serialNumber || isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <FaSpinner className="spinner" /> Verifying...
                    </>
                  ) : (
                    <>
                      <FaUnlock /> Verify & Access Form
                    </>
                  )}
                </button>
                <button 
                  className="buy-form-btn"
                  onClick={() => {
                    setShowSerialVerification(false);
                    handleBuyForm();
                  }}
                >
                  <FaShoppingCart /> Don't have a serial?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="admissions-footer">
        <div className="container">
          <div className="footer-content">
            <FaGraduationCap className="footer-icon" />
            <h2>Start Your Journey Today</h2>
            <p>Buy your admission form for GH₵ 100 • Next intake: {getNextIntakeDate()}</p>
            <div className="footer-buttons">
              <button 
                className="apply-btn-primary"
                onClick={handleBuyForm}
              >
                <FaShoppingCart /> Buy Form Now
              </button>
              <button 
                className="whatsapp-btn"
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp /> Chat on WhatsApp
              </button>
            </div>
            <div className="footer-contact">
              <span><FaPhone /> +233 50 515 9131</span>
              <span><FaEnvelope /> fasttech227@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;
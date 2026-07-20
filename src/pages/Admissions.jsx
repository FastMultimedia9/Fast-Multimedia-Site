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
  FaCreditCard
} from 'react-icons/fa';
import { 
  generateSerialNumber, 
  verifySerial, 
  savePayment, 
  createAdmission,
  sendNotification 
} from '../services/firebaseService';
import { initializePayment } from '../services/paystackService';
import './Admissions.css';

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
    // Load Paystack script
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

  // Paystack Payment Handler
  const handlePaystackPayment = async () => {
    if (!paymentEmail || !paymentName || !paymentPhone) {
      alert('Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    setIsProcessingPayment(true);

    try {
      const response = await initializePayment(
        paymentEmail,
        100, // GH₵ 100
        {
          name: paymentName,
          phone: paymentPhone,
          course: selectedCourseForPayment || 'Not specified',
          type: 'admission_form',
          dateOfBirth: paymentDateOfBirth,
          gender: paymentGender
        }
      );

      // Payment successful
      await handlePaymentSuccess(response);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment was cancelled or failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      // Save payment record
      await savePayment({
        reference: response.reference,
        amount: 10000, // GH₵ 100 in pesewas
        email: paymentEmail,
        course: selectedCourseForPayment,
        name: paymentName,
        phone: paymentPhone,
        dateOfBirth: paymentDateOfBirth,
        gender: paymentGender,
        paymentType: 'admission_form',
        status: 'completed'
      });

      // Generate new serial number
      const newSerial = await generateSerialNumber(selectedCourseForPayment, paymentName);
      
      // Create admission record
      await createAdmission({
        admissionId: newSerial,
        serialNumber: newSerial,
        fullName: paymentName,
        email: paymentEmail,
        phone: paymentPhone,
        dateOfBirth: paymentDateOfBirth,
        gender: paymentGender,
        course: selectedCourseForPayment,
        status: 'pending',
        paymentReference: response.reference,
        applicationDate: new Date().toISOString()
      });

      // Send notification
      await sendNotification({
        userId: paymentEmail,
        title: 'Admission Form Purchased',
        message: `You have successfully purchased the admission form. Your serial number is: ${newSerial}`,
        type: 'admission',
        link: '/school/application-form'
      });

      // Show success message with serial number
      alert(`✅ Payment Successful!\n\nYour Admission Serial Number is: ${newSerial}\n\nPlease keep this serial number safe. You will need it to access the application form.\n\nWe have also sent you an email with this information.`);
      
      // Navigate to application form with serial number
      navigate('/school/application-form', { state: { serialNumber: newSerial } });
      setShowPaymentModal(false);
      resetPaymentForm();
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('There was an error processing your payment. Please contact support.');
    }
  };

  const resetPaymentForm = () => {
    setPaymentEmail('');
    setPaymentName('');
    setPaymentPhone('');
    setPaymentDateOfBirth('');
    setPaymentGender('');
    setSelectedCourseForPayment('');
  };

  // Verify Serial Number
  const verifySerialNumber = async () => {
    setIsVerifying(true);
    setSerialError('');

    try {
      const result = await verifySerial(serialNumber.toUpperCase());
      
      if (result.valid) {
        // Navigate to application form
        navigate('/school/application-form', { state: { serialNumber: serialNumber.toUpperCase() } });
        setShowSerialVerification(false);
        setSerialNumber('');
      } else {
        setIsSerialValid(false);
        setSerialError('Invalid or already used serial number. Please check and try again.');
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
    setShowPaymentModal(true);
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
      description: 'Purchase the admission form using Paystack. You will receive a unique serial number.'
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
      answer: 'Click the "Buy Form" button and complete the payment via Paystack. After successful payment, you will receive a unique serial number via email and on the confirmation page.'
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
      answer: 'No, serial numbers are non-transferable and can only be used once for a single application.'
    },
    {
      question: 'When is the next intake?',
      answer: `The next intake starts on ${getNextIntakeDate()}. Applications are accepted year-round, but we recommend applying at least 2 weeks before the start date.`
    }
  ];

  return (
    <div className="admissions-page">
      {/* Hero Section */}
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

      {/* Tabs */}
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
        {/* Overview Tab */}
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

        {/* Requirements Tab */}
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

        {/* Process Tab */}
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

        {/* Fees Tab */}
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

        {/* FAQ Tab */}
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

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={paymentName}
                  onChange={(e) => setPaymentName(e.target.value)}
                  required
                />
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
                <FaInfoCircle /> You will receive a unique serial number via email after successful payment.
              </div>
            </div>

            <button 
              className="pay-now-btn"
              onClick={handlePaystackPayment}
              disabled={isProcessingPayment || !paymentEmail || !paymentName || !paymentPhone}
            >
              {isProcessingPayment ? (
                'Processing...'
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
                  placeholder="e.g., FM-ADM-2026-001"
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
                  {isVerifying ? 'Verifying...' : <><FaUnlock /> Verify & Access Form</>}
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

      {/* Footer CTA */}
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
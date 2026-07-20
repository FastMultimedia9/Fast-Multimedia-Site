import React, { useState } from 'react';
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
  FaFilePdf,
  FaPrint,
  FaDownload,
  FaInfoCircle,
  FaQuestionCircle,
  FaUniversity,
  FaHome
} from 'react-icons/fa';
import './Admissions.css';

const Admissions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    course: '',
    educationLevel: '',
    previousSchool: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = '233505159131';

  const courses = [
    'Basic I.C.T & Office',
    'Graphic Design',
    'Web Development',
    'Networking Basics',
    'Full I.T Support'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `ADMISSION APPLICATION\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDate of Birth: ${formData.dateOfBirth}\nGender: ${formData.gender}\nNationality: ${formData.nationality}\nAddress: ${formData.address}\nCourse: ${formData.course}\nEducation Level: ${formData.educationLevel}\nPrevious School: ${formData.previousSchool}\nMessage: ${formData.message || 'No additional message'}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      alert(`✅ Thank you ${formData.fullName}!\n\nYour admission application has been submitted successfully.\n\nWe will contact you within 24 hours via WhatsApp or email.\n\n📅 Next intake: ${getNextIntakeDate()}\n📧 Check your email for confirmation.`);
      
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        address: '',
        course: '',
        educationLevel: '',
        previousSchool: '',
        message: ''
      });
      setShowApplicationForm(false);
    } catch (error) {
      alert('Your application has been received. We will contact you within 24 hours.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      title: 'Choose Your Course',
      description: 'Select from our 5 professional courses: Basic ICT, Graphic Design, Web Development, Networking, or IT Support'
    },
    {
      step: 2,
      title: 'Submit Application',
      description: 'Fill out the application form with your personal details and course preference'
    },
    {
      step: 3,
      title: 'Application Review',
      description: 'Our admissions team will review your application within 24-48 hours'
    },
    {
      step: 4,
      title: 'Interview (Optional)',
      description: 'A short online or in-person interview to discuss your goals and course fit'
    },
    {
      step: 5,
      title: 'Payment & Enrollment',
      description: 'Complete your payment (full or installment) to secure your spot'
    },
    {
      step: 6,
      title: 'Start Learning',
      description: 'Join our next intake and begin your 2-month learning journey!'
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
      question: 'When is the next intake?',
      answer: `The next intake starts on ${getNextIntakeDate()}. Applications are accepted year-round, but we recommend applying at least 2 weeks before the start date.`
    },
    {
      question: 'Can I apply online?',
      answer: 'Yes! You can apply online using the application form below. You can also contact us via WhatsApp or email for assistance with your application.'
    },
    {
      question: 'What are the payment options?',
      answer: 'We offer both full payment and installment plans. Full payment is due before the course starts, while installment plans allow you to pay in 2 monthly installments.'
    },
    {
      question: 'Is there a certificate?',
      answer: 'Yes, all students receive a certificate upon successful completion of their course. Our certificates are recognized by employers in Ghana and beyond.'
    },
    {
      question: 'What if I miss a class?',
      answer: 'We provide recorded sessions and materials for online students. In-person students can schedule catch-up sessions with instructors.'
    },
    {
      question: 'Can I switch courses after starting?',
      answer: 'Yes, you can switch courses within the first week of the program. Any additional costs will be calculated based on the new course.'
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
              onClick={() => setShowApplicationForm(true)}
            >
              Apply Now <FaArrowRight />
            </button>
            <button 
              className="btn-secondary"
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
              <p>Join our next intake starting {getNextIntakeDate()}</p>
              <button 
                className="apply-btn"
                onClick={() => setShowApplicationForm(true)}
              >
                <FaFileAlt /> Apply Now
              </button>
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
                onClick={() => setShowApplicationForm(true)}
              >
                Start Your Application <FaArrowRight />
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

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="modal-overlay" onClick={() => setShowApplicationForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowApplicationForm(false)}>
                ×
              </button>
              
              <h2 className="modal-title">
                <FaFileAlt /> Application Form
              </h2>
              <p className="modal-subtitle">Fill in your details to apply for admission</p>

              <form className="application-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="024XXXXXXX"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nationality</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    placeholder="e.g., Ghanaian"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Your home address"
                  />
                </div>

                <div className="form-group">
                  <label>Select Course *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Highest Education Level</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Education Level</option>
                    <option value="JHS">JHS</option>
                    <option value="SHS">SHS</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Degree">Degree</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Previous School (if any)</label>
                  <input
                    type="text"
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleInputChange}
                    placeholder="Name of previous school"
                  />
                </div>

                <div className="form-group">
                  <label>Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any additional information or questions"
                  />
                </div>

                <div className="form-note">
                  <FaInfoCircle /> We'll contact you via WhatsApp within 24 hours
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="admissions-footer">
        <div className="container">
          <div className="footer-content">
            <FaGraduationCap className="footer-icon" />
            <h2>Start Your Journey Today</h2>
            <p>Next intake: {getNextIntakeDate()} • Limited seats available</p>
            <div className="footer-buttons">
              <button 
                className="apply-btn-primary"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply Now <FaArrowRight />
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
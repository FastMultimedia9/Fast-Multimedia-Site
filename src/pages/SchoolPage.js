import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaGraduationCap, FaLaptop, FaPalette, FaCode, FaNetworkWired, FaHeadset,
  FaUsers, FaClock, FaCalendarAlt, FaCertificate,
  FaStar, FaBookOpen, FaRocket, FaPhone, FaEnvelope, 
  FaMoneyBillWave, FaCheckCircle, FaArrowRight,
  FaUserGraduate, FaBriefcase, FaBuilding, FaUserTie,
  FaGlobe, FaWhatsapp, FaAward, FaTools, FaEye, FaHeart
} from 'react-icons/fa';
import './SchoolPage.css';

const SchoolPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [selectedCourseForForm, setSelectedCourseForForm] = useState('');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('Full Payment');
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('full');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const whatsappNumber = '233505159131';
  const displayWhatsappNumber = '+233 50 515 9131';

  const getStartDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    const day = date.getDate();
    const month = date.toLocaleString('en-GH', { month: 'long' });
    const year = date.getFullYear();
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const startDate = getStartDate();

  const courses = [
    {
      id: 'basic-ict',
      title: 'Basic I.C.T & Office',
      category: 'Technology',
      level: 'Beginner',
      duration: '2 Months',
      price: 600,
      fullPrice: 'GH₵ 600',
      installmentPrice: 'GH₵ 300/month',
      actualPrice: 600,
      monthlyInstallment: 300,
      description: 'Learn essential computer skills, Microsoft Office, and internet fundamentals.',
      longDescription: 'Master the fundamental computer skills needed for modern workplaces. This comprehensive course covers computer basics, Microsoft Office applications, internet navigation, email management, and essential digital literacy skills.',
      icon: <FaLaptop />,
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Computer hardware and software fundamentals',
        'Windows operating system navigation',
        'Microsoft Word - document creation and formatting',
        'Microsoft Excel - spreadsheets and basic formulas',
        'Microsoft PowerPoint - presentations and slideshows'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'No prior computer experience required - complete beginners welcome!',
      certificate: 'Certificate in Basic I.C.T & Office Skills',
      students: 412,
      rating: 4.9,
      targetAudience: 'Students, Job Seekers, Workers, Business Owners',
      deliveryMode: 'Online & In-Person'
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      category: 'Design',
      level: 'Beginner to Intermediate',
      duration: '2 Months',
      price: 750,
      fullPrice: 'GH₵ 750',
      installmentPrice: 'GH₵ 375/month',
      actualPrice: 750,
      monthlyInstallment: 375,
      description: 'Learn Photoshop, Illustrator, InDesign and master visual communication.',
      longDescription: 'Unlock your creative potential with our Graphic Design course. You will learn industry-standard software and design principles that will enable you to create stunning visual content for print and digital media.',
      icon: <FaPalette />,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Adobe Photoshop: Photo editing and manipulation',
        'Adobe Illustrator: Vector graphics and logo design',
        'Adobe InDesign: Layout design for print',
        'Color theory and typography fundamentals',
        'Brand identity and logo design principles'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Passion for design, no prior experience needed',
      certificate: 'Certificate in Graphic Design',
      students: 389,
      rating: 4.8,
      targetAudience: 'Students, Job Seekers, Workers, Business Owners',
      deliveryMode: 'Online & In-Person'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      category: 'Technology',
      level: 'Beginner to Advanced',
      duration: '2 Months',
      price: 800,
      fullPrice: 'GH₵ 800',
      installmentPrice: 'GH₵ 400/month',
      actualPrice: 800,
      monthlyInstallment: 400,
      description: 'Master HTML, CSS, JavaScript, and build modern websites.',
      longDescription: 'Learn to build professional, responsive websites from scratch. This comprehensive web development course takes you from absolute beginner to a confident web developer.',
      icon: <FaCode />,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'HTML5 - Structure and semantics',
        'CSS3 - Styling and responsive design',
        'JavaScript - Interactivity and DOM manipulation',
        'Responsive web design principles',
        'Website hosting and deployment'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Basic computer knowledge, no prior coding experience required',
      certificate: 'Certificate in Web Development',
      students: 356,
      rating: 4.9,
      targetAudience: 'Students, Job Seekers, Workers, Business Owners',
      deliveryMode: 'Online & In-Person'
    },
    {
      id: 'networking-basics',
      title: 'Networking Basics',
      category: 'Technology',
      level: 'Beginner to Intermediate',
      duration: '2 Months',
      price: 650,
      fullPrice: 'GH₵ 650',
      installmentPrice: 'GH₵ 325/month',
      actualPrice: 650,
      monthlyInstallment: 325,
      description: 'Learn computer networking fundamentals, setup, and configuration.',
      longDescription: 'Master the essentials of computer networking. This course covers network fundamentals, IP addressing, network setup, troubleshooting, and security basics.',
      icon: <FaNetworkWired />,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Network fundamentals and OSI model',
        'IP addressing and subnetting',
        'Network topologies and devices',
        'Router and switch configuration',
        'Network troubleshooting techniques'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Basic computer knowledge, interest in networking',
      certificate: 'Certificate in Networking Basics',
      students: 278,
      rating: 4.7,
      targetAudience: 'Students, Job Seekers, IT Beginners, System Administrators',
      deliveryMode: 'Online & In-Person'
    },
    {
      id: 'full-it-support',
      title: 'Full I.T Support',
      category: 'Technology',
      level: 'Intermediate to Advanced',
      duration: '2 Months',
      price: 850,
      fullPrice: 'GH₵ 850',
      installmentPrice: 'GH₵ 425/month',
      actualPrice: 850,
      monthlyInstallment: 425,
      description: 'Comprehensive IT support training for help desk and system administration.',
      longDescription: 'Become a complete IT support professional. This intensive course covers hardware, software, networking, security, and customer service skills needed for IT support roles.',
      icon: <FaHeadset />,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Computer hardware assembly and maintenance',
        'Operating systems installation and management',
        'Software installation and troubleshooting',
        'Network setup and configuration',
        'IT security fundamentals'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Basic computer knowledge, interest in IT support',
      certificate: 'Certificate in Full I.T Support',
      students: 345,
      rating: 4.8,
      targetAudience: 'IT Beginners, Career Changers, Help Desk Aspirants, System Administrators',
      deliveryMode: 'Online & In-Person'
    }
  ];

  const categories = ['all', 'Technology', 'Design'];

  useEffect(() => {
    const savedCourseId = localStorage.getItem('selectedCourse');
    if (savedCourseId) {
      const course = courses.find(c => c.id === savedCourseId);
      if (course) {
        setSelectedCourse(course);
        setActiveTab('details');
      }
      localStorage.removeItem('selectedCourse');
    }
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    
    const courseValue = selectedCourseForForm || (selectedCourse?.title || 'Not specified');
    const paymentValue = selectedPaymentOption;
    
    setIsSubmitting(true);

    try {
      const message = `ENROLLMENT REQUEST\n\nName: ${enquiryName}\nEmail: ${enquiryEmail}\nPhone: ${enquiryPhone}\nCourse: ${courseValue}\nPayment Option: ${paymentValue}\n\nStart Date: ${startDate}\nDuration: 2 Months\nDelivery: Online & In-Person\n\nMessage: ${enquiryMessage || 'No additional message'}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      alert(`✅ Thank you ${enquiryName}!\n\nYour enrollment request for ${courseValue} has been prepared!\n\nWe will contact you via WhatsApp shortly.\n\n📅 Start Date: ${startDate}\n⏱️ Duration: 2 Months\n💻 Delivery: Online & In-Person`);
      resetSingleForm();
    } catch (error) {
      alert('Your enrollment request has been saved. We will contact you within 24 hours.');
      resetSingleForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSingleForm = () => {
    setEnquiryName('');
    setEnquiryEmail('');
    setEnquiryPhone('');
    setEnquiryMessage('');
    setSelectedCourseForForm('');
    setSelectedPaymentOption('Full Payment');
    setShowEnquiryForm(false);
  };

  const getPriceDisplay = () => {
    if (selectedPaymentPlan === 'installment') {
      return selectedCourse?.installmentPrice;
    }
    return selectedCourse?.fullPrice;
  };

  const handleWhatsAppClick = () => {
    const message = `Hi Fast Multimedia Institute! I'm interested in learning more about your courses.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="school-page">
      <div className="school-hero">
        <div className="container">
          <h1 className="school-hero-title">
            Welcome to <span className="gradient-text">Fast Multimedia</span> Institute
          </h1>
          <p className="school-hero-subtitle">
            2 Months Online & In-Person Courses • Certificate Awarded
          </p>
          <div className="school-hero-badge">
            <span className="hero-badge"><FaCalendarAlt /> Start Date: {startDate}</span>
            <span className="hero-badge"><FaGlobe /> Online & In-Person</span>
            <span className="hero-badge"><FaCertificate /> Certificate Included</span>
            <span className="hero-badge"><FaWhatsapp /> WhatsApp Support</span>
          </div>
          <div className="school-hero-stats">
            <div className="hero-stat">
              <div className="stat-number">5</div>
              <div className="stat-label">Professional Courses</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">2</div>
              <div className="stat-label">Months Duration</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">Online & In-Person</div>
              <div className="stat-label">Flexible Learning</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Student Support</div>
            </div>
          </div>
          <button className="whatsapp-hero-btn" onClick={handleWhatsAppClick}>
            <FaWhatsapp /> Chat with us on WhatsApp
          </button>
        </div>
      </div>

      <div className="school-tabs">
        <div className="container">
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <FaBookOpen /> Our Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <FaGraduationCap /> About School
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <FaEnvelope /> Enroll Now
          </button>
        </div>
      </div>

      <div className="container">
        {activeTab === 'courses' && (
          <>
            <div className="category-filter">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All Courses' : cat}
                  {cat !== 'all' && (
                    <span className="filter-count">
                      {courses.filter(c => c.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="courses-grid">
              {courses.filter(c => selectedCategory === 'all' || c.category === selectedCategory).map(course => (
                <div 
                  key={course.id} 
                  className="course-card"
                  onClick={() => {
                    setSelectedCourse(course);
                    setActiveTab('details');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="course-card-image">
                    <img src={course.image} alt={course.title} />
                    <div className="course-category">{course.category}</div>
                    <div className="course-badge">2 Months</div>
                  </div>
                  <div className="course-card-content">
                    <div className="course-icon">{course.icon}</div>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span className="course-duration"><FaClock /> {course.duration}</span>
                      <span className="course-level"><FaUserGraduate /> {course.level}</span>
                    </div>
                    <div className="course-meta">
                      <span className="course-delivery"><FaGlobe /> {course.deliveryMode}</span>
                    </div>
                    <div className="course-footer">
                      <div>
                        <span className="course-price">{course.fullPrice}</span>
                        <span className="installment-note">or {course.installmentPrice}/month</span>
                      </div>
                      <button className="view-details-btn">
                        View Details <FaArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="open-to-all">
              <div className="open-to-all-content">
                <span className="open-icon"><FaUsers /></span>
                <h3>Open To:</h3>
                <div className="audience-tags">
                  <span className="audience-tag"><FaUserGraduate /> Students</span>
                  <span className="audience-tag"><FaBriefcase /> Job Seekers</span>
                  <span className="audience-tag"><FaUserTie /> Workers</span>
                  <span className="audience-tag"><FaBuilding /> Business Owners</span>
                </div>
              </div>
            </div>

            <div className="whatsapp-cta">
              <div className="whatsapp-cta-content">
                <FaWhatsapp className="whatsapp-cta-icon" />
                <div>
                  <h3>Have Questions?</h3>
                  <p>Chat with us directly on WhatsApp for quick responses</p>
                </div>
                <button className="whatsapp-cta-btn" onClick={handleWhatsAppClick}>
                  <FaWhatsapp /> Chat Now
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'details' && selectedCourse && (
          <div className="course-details">
            <button className="back-btn" onClick={() => setActiveTab('courses')}>
              <FaArrowRight /> Back to All Courses
            </button>
            
            <div className="details-grid">
              <div className="details-image">
                <img src={selectedCourse.image} alt={selectedCourse.title} />
                <div className="course-badge">{selectedCourse.category}</div>
                <div className="duration-badge">2 Months Course</div>
              </div>
              <div className="details-info">
                <h1 className="details-title">{selectedCourse.title}</h1>
                <div className="details-rating">
                  <span className="stars"><FaStar /></span>
                  <span className="rating-value">{selectedCourse.rating}</span>
                  <span className="students">({selectedCourse.students}+ students)</span>
                </div>
                <p className="details-long-desc">{selectedCourse.longDescription}</p>
                
                <div className="details-delivery">
                  <FaGlobe /> {selectedCourse.deliveryMode}
                </div>
                
                <div className="payment-selector">
                  <h3>Payment Options</h3>
                  <div className="payment-buttons">
                    <button 
                      className={`payment-btn ${selectedPaymentPlan === 'full' ? 'active' : ''}`}
                      onClick={() => setSelectedPaymentPlan('full')}
                    >
                      Full Payment: {selectedCourse.fullPrice}
                    </button>
                    <button 
                      className={`payment-btn ${selectedPaymentPlan === 'installment' ? 'active' : ''}`}
                      onClick={() => setSelectedPaymentPlan('installment')}
                    >
                      Installment: {selectedCourse.installmentPrice}/month
                    </button>
                  </div>
                </div>

                <div className="details-meta-grid">
                  <div className="meta-item">
                    <span className="meta-icon"><FaClock /></span>
                    <div>
                      <div className="meta-label">Duration</div>
                      <div className="meta-value">{selectedCourse.duration}</div>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon"><FaUserGraduate /></span>
                    <div>
                      <div className="meta-label">Level</div>
                      <div className="meta-value">{selectedCourse.level}</div>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon"><FaMoneyBillWave /></span>
                    <div>
                      <div className="meta-label">Price</div>
                      <div className="meta-value">{getPriceDisplay()}</div>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon"><FaCertificate /></span>
                    <div>
                      <div className="meta-label">Certificate</div>
                      <div className="meta-value">Included</div>
                    </div>
                  </div>
                </div>

                <button 
                  className="enquire-btn"
                  onClick={() => {
                    setSelectedCourseForForm(selectedCourse.title);
                    setShowEnquiryForm(true);
                  }}
                >
                  Enroll Now - {getPriceDisplay()}
                </button>
              </div>
            </div>

            <div className="details-sections">
              <div className="details-section">
                <h2><FaCheckCircle /> What You'll Learn</h2>
                <ul className="features-list">
                  {selectedCourse.features.map((feature, idx) => (
                    <li key={idx}><FaCheckCircle className="feature-icon" /> {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="details-section">
                <h2><FaCalendarAlt /> Course Format</h2>
                <p className="schedule-info">{selectedCourse.schedule}</p>
                <div className="format-highlight">
                  <span><FaGlobe /> Online & In-Person</span>
                  <span><FaCalendarAlt /> Start Date: {startDate}</span>
                  <span><FaCertificate /> Certificate Awarded Upon Completion</span>
                  <span><FaWhatsapp /> WhatsApp Support Available</span>
                </div>
              </div>

              <div className="details-section">
                <h2><FaUsers /> Who Is This For?</h2>
                <p>{selectedCourse.targetAudience}</p>
                <div className="audience-badges">
                  <span><FaUserGraduate /> Students</span>
                  <span><FaBriefcase /> Job Seekers</span>
                  <span><FaUserTie /> Workers</span>
                  <span><FaBuilding /> Business Owners</span>
                </div>
              </div>

              <div className="details-section">
                <h2><FaTools /> Prerequisites</h2>
                <p>{selectedCourse.prerequisites}</p>
              </div>

              <div className="details-section">
                <h2><FaAward /> Certificate</h2>
                <p>{selectedCourse.certificate}</p>
                <p className="certificate-note"><FaCheckCircle /> Officially recognized certificate upon successful completion</p>
              </div>
            </div>

            <div className="enquiry-section">
              <h2>Ready to Enroll?</h2>
              <p>Start Date: {startDate} | 2 Months | Online & In-Person</p>
              {!showEnquiryForm ? (
                <button 
                  className="enquire-btn"
                  onClick={() => {
                    setSelectedCourseForForm(selectedCourse.title);
                    setShowEnquiryForm(true);
                  }}
                >
                  Enroll Now - {getPriceDisplay()}
                </button>
              ) : (
                <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address *"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    required
                  />
                  <select 
                    value={selectedCourseForForm}
                    onChange={(e) => setSelectedCourseForForm(e.target.value)}
                    required
                  >
                    <option value="">Select Course *</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.title}>{course.title} - {course.fullPrice}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedPaymentOption}
                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                  >
                    <option>Full Payment</option>
                    <option>Installment Plan (2 months)</option>
                  </select>
                  <textarea
                    placeholder="Additional Information (Occupation, Experience Level, etc.)"
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    rows="3"
                  />
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Enrollment →'}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowEnquiryForm(false)}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-school">
            <div className="about-hero">
              <h1><FaGraduationCap /> About Fast Multimedia School</h1>
              <p>Quality Online & In-Person Education Since 2010</p>
            </div>
            
            <div className="about-grid">
              <div className="about-card">
                <div className="about-icon"><FaRocket /></div>
                <h3>Our Mission</h3>
                <p>To provide accessible, high-quality education through both online and in-person learning that empowers individuals with practical skills for career advancement and business growth.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><FaEye /></div>
                <h3>Our Vision</h3>
                <p>To become Ghana's leading institution for technology and creative education, producing globally competitive graduates through flexible learning options.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><FaHeart /></div>
                <h3>Our Values</h3>
                <p>Excellence, Accessibility, Practical Learning, Student Success, and Continuous Improvement.</p>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number">2010</div>
                <div className="stat-label">Year Established</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Graduates</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Expert Instructors</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">Online & In-Person</div>
                <div className="stat-label">Flexible Learning</div>
              </div>
            </div>

            <div className="delivery-modes">
              <h2><FaGlobe /> Learning Options</h2>
              <div className="delivery-grid">
                <div className="delivery-card">
                  <span className="delivery-icon"><FaGlobe /></span>
                  <h3>Online Learning</h3>
                  <p>Learn from anywhere with our comprehensive online platform. Access course materials, join live sessions, and get support remotely.</p>
                </div>
                <div className="delivery-card">
                  <span className="delivery-icon"><FaBuilding /></span>
                  <h3>In-Person Learning</h3>
                  <p>Join us at our physical location for hands-on training, direct interaction with instructors, and collaborative learning experiences.</p>
                </div>
              </div>
            </div>

            <div className="course-info">
              <h2><FaBookOpen /> Course Information</h2>
              <div className="info-grid">
                <div className="info-card">
                  <span className="info-icon"><FaClock /></span>
                  <h3>Duration</h3>
                  <p>2 Months per course</p>
                </div>
                <div className="info-card">
                  <span className="info-icon"><FaGlobe /></span>
                  <h3>Format</h3>
                  <p>Online & In-Person</p>
                </div>
                <div className="info-card">
                  <span className="info-icon"><FaCalendarAlt /></span>
                  <h3>Start Date</h3>
                  <p>{startDate}</p>
                </div>
                <div className="info-card">
                  <span className="info-icon"><FaCertificate /></span>
                  <h3>Certificate</h3>
                  <p>Awarded upon completion</p>
                </div>
                <div className="info-card">
                  <span className="info-icon"><FaWhatsapp /></span>
                  <h3>Support</h3>
                  <p>24/7 WhatsApp Support</p>
                </div>
              </div>
            </div>

            <div className="target-audience">
              <h2><FaUsers /> Open To:</h2>
              <div className="audience-grid">
                <div className="audience-card"><FaUserGraduate /> Students</div>
                <div className="audience-card"><FaBriefcase /> Job Seekers</div>
                <div className="audience-card"><FaUserTie /> Workers</div>
                <div className="audience-card"><FaBuilding /> Business Owners</div>
              </div>
            </div>

            <div className="contact-buttons">
              <button className="whatsapp-about-btn" onClick={handleWhatsAppClick}>
                <FaWhatsapp /> Contact us on WhatsApp
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-school">
            <div className="contact-header">
              <h1><FaEnvelope /> Enroll Now</h1>
              <p>Start your learning journey with us today</p>
              <div className="enrollment-dates">
                <span><FaCalendarAlt /> Start Date: {startDate}</span>
                <span><FaClock /> Duration: 2 Months</span>
                <span><FaGlobe /> Online & In-Person</span>
                <span><FaCertificate /> Certificate Included</span>
                <span><FaWhatsapp /> WhatsApp Support</span>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon"><FaGlobe /></div>
                  <div>
                    <h3>Location</h3>
                    <p>Online & In-Person - Learn from Anywhere</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaPhone /></div>
                  <div>
                    <h3>Call Us</h3>
                    <p>+233 50 515 9131<br />+233 24 615 2416</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaWhatsapp /></div>
                  <div>
                    <h3>WhatsApp</h3>
                    <p>{displayWhatsappNumber}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaEnvelope /></div>
                  <div>
                    <h3>Email Us</h3>
                    <p>fasttech227@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaMoneyBillWave /></div>
                  <div>
                    <h3>Payment Options</h3>
                    <p>Full Payment or Installment Plans Available</p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h2>Course Enrollment</h2>
                
                <form onSubmit={handleEnquirySubmit}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    required
                  />
                  
                  <select 
                    value={selectedCourseForForm}
                    onChange={(e) => setSelectedCourseForForm(e.target.value)}
                    required
                  >
                    <option value="">Select Course *</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.title}>{course.title} - {course.fullPrice}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedPaymentOption}
                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                  >
                    <option>Full Payment</option>
                    <option>Installment Plan (2 months)</option>
                  </select>
                  
                  <textarea
                    placeholder="Additional Information (Occupation, Experience Level, etc.)"
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    rows="4"
                  />
                  <button 
                    type="submit" 
                    className="send-btn" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Submit Enrollment →'}
                  </button>
                </form>
                <p className="form-note"><FaWhatsapp /> We'll contact you via WhatsApp within 24 hours with payment instructions and course access details.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="school-footer">
        <div className="container">
          <h2><FaRocket /> Start Your Learning Journey Today</h2>
          <p>2 Months • Online & In-Person • Certificate Awarded • Start Date: {startDate}</p>
          <div className="footer-buttons">
            <button 
              className="footer-btn primary"
              onClick={() => {
                setActiveTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FaBookOpen /> Explore Courses
            </button>
            <button 
              className="footer-btn secondary"
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FaEnvelope /> Enroll Now
            </button>
            <button 
              className="footer-btn whatsapp"
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp /> Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SchoolPage.css';

// EmailJS configuration with your credentials
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_25rh2nj',
  TEMPLATE_ID: 'template_87npzah',
  PUBLIC_KEY: 'AcgFnLKbIOhoFEWXN'
};

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
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);

  // Complete courses data with updated information
  const courses = [
    {
      id: 'basic-ict',
      title: 'Basic I.C.T & Office',
      category: 'Technology',
      level: 'Beginner',
      duration: '3 Months',
      price: 'GH₵ 600',
      fullPrice: 'GH₵ 600',
      installmentPrice: 'GH₵ 220/month',
      description: 'Learn essential computer skills, Microsoft Office, and internet fundamentals.',
      longDescription: 'Master the fundamental computer skills needed for modern workplaces. This comprehensive course covers computer basics, Microsoft Office applications, internet navigation, email management, and essential digital literacy skills. Perfect for beginners, students, job seekers, and professionals looking to enhance their office productivity. 100% online delivery with flexible learning schedules.',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Computer hardware and software fundamentals',
        'Windows operating system navigation',
        'Microsoft Word - document creation and formatting',
        'Microsoft Excel - spreadsheets and basic formulas',
        'Microsoft PowerPoint - presentations and slideshows',
        'Internet browsing and online research skills',
        'Email management (Gmail, Outlook)',
        'File management and organization',
        'Basic troubleshooting and computer maintenance',
        'Internet safety and cybersecurity awareness'
      ],
      schedule: '100% Online - Self-paced with live support | Start Date: 1st May 2026',
      prerequisites: 'No prior computer experience required - complete beginners welcome!',
      certificate: 'Certificate in Basic I.C.T & Office Skills',
      instructor: 'Adwoa Mensah - Certified ICT Trainer with 7+ years experience',
      students: 412,
      rating: 4.9,
      targetAudience: 'Students, Job Seekers, Workers, Business Owners'
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      category: 'Design',
      level: 'Beginner to Intermediate',
      duration: '3 Months',
      price: 'GH₵ 750',
      fullPrice: 'GH₵ 750',
      installmentPrice: 'GH₵ 275/month',
      description: 'Learn Photoshop, Illustrator, InDesign and master visual communication.',
      longDescription: 'Unlock your creative potential with our Graphic Design course. You will learn industry-standard software and design principles that will enable you to create stunning visual content for print and digital media. Perfect for aspiring designers, business owners, and creative professionals. 100% online with practical projects and portfolio development.',
      icon: '🎨',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Adobe Photoshop: Photo editing and manipulation',
        'Adobe Illustrator: Vector graphics and logo design',
        'Adobe InDesign: Layout design for print',
        'Color theory and typography fundamentals',
        'Brand identity and logo design principles',
        'Print production and file preparation',
        'Digital illustration techniques',
        'Portfolio development',
        'Social media graphics design',
        'Business card and flyer design'
      ],
      schedule: '100% Online - Self-paced with live support | Start Date: 1st May 2026',
      prerequisites: 'Passion for design, no prior experience needed',
      certificate: 'Certificate in Graphic Design',
      instructor: 'Abena Osei - Creative Director with 10+ years in branding',
      students: 389,
      rating: 4.8,
      targetAudience: 'Students, Job Seekers, Workers, Business Owners'
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      category: 'Technology',
      level: 'Beginner to Advanced',
      duration: '3 Months',
      price: 'GH₵ 800',
      fullPrice: 'GH₵ 800',
      installmentPrice: 'GH₵ 290/month',
      description: 'Master HTML, CSS, JavaScript, and build modern websites.',
      longDescription: 'Learn to build professional, responsive websites from scratch. This comprehensive web development course takes you from absolute beginner to a confident web developer. You will learn frontend technologies, understand how websites work, and build real-world projects. 100% online with hands-on coding exercises and live project work.',
      icon: '💻',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'HTML5 - Structure and semantics',
        'CSS3 - Styling and responsive design',
        'JavaScript - Interactivity and DOM manipulation',
        'Responsive web design principles',
        'Website hosting and deployment',
        'Basic SEO fundamentals',
        'Form validation and handling',
        'Modern CSS frameworks (Bootstrap/Tailwind)',
        'Version control with Git basics',
        'Portfolio website project'
      ],
      schedule: '100% Online - Self-paced with live support | Start Date: 1st May 2026',
      prerequisites: 'Basic computer knowledge, no prior coding experience required',
      certificate: 'Certificate in Web Development',
      instructor: 'John Mensah - Senior Full Stack Developer with 8+ years experience',
      students: 356,
      rating: 4.9,
      targetAudience: 'Students, Job Seekers, Workers, Business Owners'
    }
  ];

  // Bundle discount information
  const bundleDiscounts = [
    { courses: 'Any 2 Courses', discount: '10% OFF', price: 'Save up to GH₵ 140' },
    { courses: 'All 3 Courses', discount: '15% OFF', price: 'Save up to GH₵ 322' }
  ];

  // Categories for filtering
  const categories = ['all', 'Technology', 'Design'];

  // Load EmailJS script
  useEffect(() => {
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        setEmailjsLoaded(true);
        console.log('EmailJS loaded successfully');
      }
    };
    script.onerror = () => {
      console.error('Failed to load EmailJS');
    };
    document.body.appendChild(script);

    // Check if a specific course was selected from the navbar
    const savedCourseId = localStorage.getItem('selectedCourse');
    if (savedCourseId) {
      const course = courses.find(c => c.id === savedCourseId);
      if (course) {
        setSelectedCourse(course);
        setActiveTab('details');
      }
      localStorage.removeItem('selectedCourse');
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    
    // Get the course value from the form
    const courseSelect = e.target.elements.course;
    const paymentSelect = e.target.elements.payment;
    const courseValue = courseSelect ? courseSelect.value : (selectedCourseForForm || (selectedCourse?.title || 'Not specified'));
    const paymentValue = paymentSelect ? paymentSelect.value : selectedPaymentOption;
    
    // Prepare form data for email
    const formData = {
      name: enquiryName,
      email: enquiryEmail,
      phone: enquiryPhone,
      course: courseValue,
      paymentOption: paymentValue,
      message: enquiryMessage || 'No additional message',
      submissionDate: new Date().toLocaleString('en-GH', { timeZone: 'Africa/Accra' }),
      startDate: '1st May 2026',
      duration: '3 Months',
      format: '100% Online'
    };

    setIsSubmitting(true);

    try {
      if (window.emailjs && emailjsLoaded) {
        // Send email using EmailJS
        const result = await window.emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          formData
        );
        
        console.log('Email sent successfully:', result);
        
        // Save to localStorage as backup
        const submissions = JSON.parse(localStorage.getItem('enrollments') || '[]');
        submissions.push({ ...formData, id: Date.now(), status: 'sent' });
        localStorage.setItem('enrollments', JSON.stringify(submissions));
        
        // Show success message
        alert(`✅ Thank you ${enquiryName}!\n\nYour enrollment request for ${courseValue} has been received.\n\nWe will contact you within 24 hours with payment instructions and course access details.\n\n📅 Start Date: 1st May 2026\n⏱️ Duration: 3 Months\n💻 Format: 100% Online`);
        
        // Reset form
        setEnquiryName('');
        setEnquiryEmail('');
        setEnquiryPhone('');
        setEnquiryMessage('');
        setSelectedCourseForForm('');
        setSelectedPaymentOption('Full Payment');
        setShowEnquiryForm(false);
      } else {
        // Fallback if EmailJS is not loaded
        console.log('EmailJS not loaded, saving to localStorage');
        const submissions = JSON.parse(localStorage.getItem('enrollments') || '[]');
        submissions.push({ ...formData, id: Date.now(), status: 'pending' });
        localStorage.setItem('enrollments', JSON.stringify(submissions));
        
        alert(`📋 Thank you ${enquiryName}! Your enrollment request has been saved locally.\n\nWe will contact you within 24 hours.\n\nThank you for your interest in ${courseValue}!`);
        setShowEnquiryForm(false);
        setEnquiryName('');
        setEnquiryEmail('');
        setEnquiryPhone('');
        setEnquiryMessage('');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      
      // Fallback: Save to localStorage
      const submissions = JSON.parse(localStorage.getItem('enrollments') || '[]');
      submissions.push({ 
        ...formData, 
        id: Date.now(), 
        status: 'pending',
        error: error.message 
      });
      localStorage.setItem('enrollments', JSON.stringify(submissions));
      
      alert(`⚠️ Your enrollment request has been saved successfully!\n\nWe will contact you within 24 hours.\n\nThank you for choosing Fast Multimedia Institute.`);
      setShowEnquiryForm(false);
      setEnquiryName('');
      setEnquiryEmail('');
      setEnquiryPhone('');
      setEnquiryMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriceDisplay = () => {
    if (selectedPaymentPlan === 'installment') {
      return selectedCourse?.installmentPrice;
    }
    return selectedCourse?.fullPrice;
  };

  return (
    <div className="school-page">
      {/* Hero Section */}
      <section className="school-hero">
        <div className="school-hero-overlay"></div>
        <div className="school-hero-content">
          <h1 className="school-hero-title">
            Welcome to <span className="gradient-text">Fast Multimedia</span> Institute
          </h1>
          <p className="school-hero-subtitle">
            3 Months Online Courses • 100% Online • Certificate Awarded
          </p>
          <div className="school-hero-badge">
            <span className="hero-badge"> Start Date: 1st May 2026</span>
            <span className="hero-badge">100% Online Learning</span>
            <span className="hero-badge">Certificate Included</span>
          </div>
          <div className="school-hero-stats">
            <div className="hero-stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Professional Courses</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Months Duration</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Online Learning</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Student Support</div>
            </div>
          </div>
        </div>
        <div className="school-hero-scroll">
          <span>Explore Courses</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="school-tabs">
        <div className="container">
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            📚 Our Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bundle' ? 'active' : ''}`}
            onClick={() => setActiveTab('bundle')}
          >
            🎁 Bundle Discounts
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            🏫 About School
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            📞 Enroll Now
          </button>
        </div>
      </div>

      <div className="container">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <>
            {/* Category Filter */}
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

            {/* Courses Grid */}
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
                    <div className="course-badge">3 Months</div>
                  </div>
                  <div className="course-card-content">
                    <div className="course-icon">{course.icon}</div>
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span className="course-duration">⏱️ {course.duration}</span>
                      <span className="course-level">📊 {course.level}</span>
                    </div>
                    <div className="course-footer">
                      <div>
                        <span className="course-price">{course.price}</span>
                        <span className="installment-note">or {course.installmentPrice}/month</span>
                      </div>
                      <button className="view-details-btn">
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Open To All Section */}
            <div className="open-to-all">
              <div className="open-to-all-content">
                <span className="open-icon">🎓</span>
                <h3>Open To:</h3>
                <div className="audience-tags">
                  <span className="audience-tag">Students</span>
                  <span className="audience-tag">Job Seekers</span>
                  <span className="audience-tag">Workers</span>
                  <span className="audience-tag">Business Owners</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bundle Discounts Tab */}
        {activeTab === 'bundle' && (
          <div className="bundle-section">
            <div className="bundle-header">
              <h1>🎁 Bundle Discounts</h1>
              <p>Save more when you enroll in multiple courses</p>
            </div>

            <div className="bundle-grid">
              {bundleDiscounts.map((bundle, index) => (
                <div key={index} className="bundle-card">
                  <div className="bundle-icon">🎯</div>
                  <h3>{bundle.courses}</h3>
                  <div className="bundle-discount">{bundle.discount}</div>
                  <p className="bundle-savings">{bundle.price}</p>
                  <button 
                    className="bundle-btn"
                    onClick={() => {
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Enquire Now →
                  </button>
                </div>
              ))}
            </div>

            <div className="payment-info">
              <h2>💳 Installment Plans Available</h2>
              <p>Pay in easy monthly installments. Contact us to set up your payment plan.</p>
              <div className="installment-example">
                <div className="installment-item">
                  <strong>Basic I.C.T & Office</strong>
                  <span>GH₵ 220/month × 3 months</span>
                </div>
                <div className="installment-item">
                  <strong>Graphic Design</strong>
                  <span>GH₵ 275/month × 3 months</span>
                </div>
                <div className="installment-item">
                  <strong>Web Development</strong>
                  <span>GH₵ 290/month × 3 months</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Details Tab */}
        {activeTab === 'details' && selectedCourse && (
          <div className="course-details">
            <button className="back-btn" onClick={() => setActiveTab('courses')}>
              ← Back to All Courses
            </button>
            
            <div className="details-grid">
              <div className="details-image">
                <img src={selectedCourse.image} alt={selectedCourse.title} />
                <div className="course-badge">{selectedCourse.category}</div>
                <div className="duration-badge">3 Months Course</div>
              </div>
              <div className="details-info">
                <h1 className="details-title">{selectedCourse.title}</h1>
                <div className="details-rating">
                  <span className="stars">★</span>
                  <span className="rating-value">{selectedCourse.rating}</span>
                  <span className="students">({selectedCourse.students}+ students)</span>
                </div>
                <p className="details-long-desc">{selectedCourse.longDescription}</p>
                
                {/* Payment Plan Selector */}
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
                    <span className="meta-icon">⏱️</span>
                    <div>
                      <div className="meta-label">Duration</div>
                      <div className="meta-value">{selectedCourse.duration}</div>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📊</span>
                    <div>
                      <div className="meta-label">Level</div>
                      <div className="meta-value">{selectedCourse.level}</div>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">💰</span>
                    <div>
                      <div className="meta-label">Price</div>
                      <div className="meta-value">{getPriceDisplay()}</div>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📜</span>
                    <div>
                      <div className="meta-label">Certificate</div>
                      <div className="meta-value">Included</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-sections">
              <div className="details-section">
                <h2>What You'll Learn</h2>
                <ul className="features-list">
                  {selectedCourse.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="details-section">
                <h2>Course Format</h2>
                <p className="schedule-info">{selectedCourse.schedule}</p>
                <div className="format-highlight">
                  <span>💻 100% Online</span>
                  <span>📅 Start Date: 1st May 2026</span>
                  <span>🎓 Certificate Awarded Upon Completion</span>
                </div>
              </div>

              <div className="details-section">
                <h2>Who Is This For?</h2>
                <p>{selectedCourse.targetAudience}</p>
                <div className="audience-badges">
                  <span>👨‍🎓 Students</span>
                  <span>💼 Job Seekers</span>
                  <span>👔 Workers</span>
                  <span>🏢 Business Owners</span>
                </div>
              </div>

              <div className="details-section">
                <h2>Prerequisites</h2>
                <p>{selectedCourse.prerequisites}</p>
              </div>

              <div className="details-section">
                <h2>Certificate</h2>
                <p>{selectedCourse.certificate}</p>
                <p className="certificate-note">✓ Officially recognized certificate upon successful completion</p>
              </div>
            </div>

            <div className="enquiry-section">
              <h2>Ready to Enroll?</h2>
              <p>Start Date: 1st May 2026 | 3 Months | 100% Online</p>
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
                    name="name"
                    placeholder="Your Full Name *"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address *"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    required
                  />
                  <select 
                    name="course"
                    value={selectedCourseForForm}
                    onChange={(e) => setSelectedCourseForForm(e.target.value)}
                    required
                  >
                    <option value="">Select Course *</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.title}>{course.title} - {course.price}</option>
                    ))}
                  </select>
                  <select 
                    name="payment"
                    value={selectedPaymentOption}
                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                  >
                    <option>Full Payment</option>
                    <option>Installment Plan (3 months)</option>
                  </select>
                  <textarea
                    name="message"
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

        {/* About School Tab */}
        {activeTab === 'about' && (
          <div className="about-school">
            <div className="about-hero">
              <h1>About Fast Multimedia School</h1>
              <p>Quality Online Education Since 2010</p>
            </div>
            
            <div className="about-grid">
              <div className="about-card">
                <div className="about-icon">🎯</div>
                <h3>Our Mission</h3>
                <p>To provide accessible, high-quality online education that empowers individuals with practical skills for career advancement and business growth.</p>
              </div>
              <div className="about-card">
                <div className="about-icon">👁️</div>
                <h3>Our Vision</h3>
                <p>To become Ghana's leading online institution for technology and creative education, producing globally competitive graduates.</p>
              </div>
              <div className="about-card">
                <div className="about-icon">💎</div>
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
                <div className="stat-number">100%</div>
                <div className="stat-label">Online Delivery</div>
              </div>
            </div>

            <div className="course-info">
              <h2>Course Information</h2>
              <div className="info-grid">
                <div className="info-card">
                  <span className="info-icon">⏱️</span>
                  <h3>Duration</h3>
                  <p>3 Months per course</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">💻</span>
                  <h3>Format</h3>
                  <p>100% Online Learning</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">📅</span>
                  <h3>Start Date</h3>
                  <p>1st May 2026</p>
                </div>
                <div className="info-card">
                  <span className="info-icon">🎓</span>
                  <h3>Certificate</h3>
                  <p>Awarded upon completion</p>
                </div>
              </div>
            </div>

            <div className="target-audience">
              <h2>Open To:</h2>
              <div className="audience-grid">
                <div className="audience-card">👨‍🎓 Students</div>
                <div className="audience-card">💼 Job Seekers</div>
                <div className="audience-card">👔 Workers</div>
                <div className="audience-card">🏢 Business Owners</div>
              </div>
            </div>
          </div>
        )}

        {/* Contact / Enroll Tab */}
        {activeTab === 'contact' && (
          <div className="contact-school">
            <div className="contact-header">
              <h1>Enroll Now</h1>
              <p>Start your learning journey with us today</p>
              <div className="enrollment-dates">
                <span>📅 Start Date: 1st May 2026</span>
                <span>⏱️ Duration: 3 Months</span>
                <span>💻 100% Online</span>
                <span>🎓 Certificate Included</span>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div>
                    <h3>Location</h3>
                    <p>100% Online - Learn from Anywhere</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div>
                    <h3>Call Us</h3>
                    <p>+233 24 123 4567<br />+233 30 276 5432</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div>
                    <h3>Email Us</h3>
                    <p>enroll@fastmultimedia.com<br />info@fastmultimedia.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">💳</div>
                  <div>
                    <h3>Payment Options</h3>
                    <p>Full Payment or Installment Plans Available</p>
                    <p className="payment-note">Bundle discounts available for multiple courses</p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h2>Enrollment Form</h2>
                <form onSubmit={handleEnquirySubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={enquiryName}
                    onChange={(e) => setEnquiryName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={enquiryEmail}
                    onChange={(e) => setEnquiryEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={enquiryPhone}
                    onChange={(e) => setEnquiryPhone(e.target.value)}
                    required
                  />
                  <select 
                    name="course"
                    value={selectedCourseForForm}
                    onChange={(e) => setSelectedCourseForForm(e.target.value)}
                    required
                  >
                    <option value="">Select Course *</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.title}>{course.title} - {course.price}</option>
                    ))}
                  </select>
                  <select 
                    name="payment"
                    value={selectedPaymentOption}
                    onChange={(e) => setSelectedPaymentOption(e.target.value)}
                  >
                    <option>Full Payment</option>
                    <option>Installment Plan (3 months)</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Additional Information (Occupation, Experience Level, etc.)"
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    rows="4"
                  />
                  <button type="submit" className="send-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Enrollment →'}
                  </button>
                </form>
                <p className="form-note">We'll contact you within 24 hours with payment instructions and course access details.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="school-footer-cta">
        <div className="container">
          <h2>Start Your Learning Journey Today</h2>
          <p>3 Months • 100% Online • Certificate Awarded • Start Date: 1st May 2026</p>
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => {
                setActiveTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Explore Courses
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
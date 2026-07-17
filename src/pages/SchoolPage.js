import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaLaptop, FaPalette, FaCode, FaGraduationCap, 
  FaUsers, FaClock, FaCalendarAlt, FaCertificate,
  FaAward, FaStar, FaBookOpen, FaRocket,
  FaPhone, FaEnvelope, FaMoneyBillWave,
  FaGift, FaCheckCircle, FaArrowRight, FaChevronDown,
  FaLightbulb, FaHeart, 
  FaUserGraduate, FaBriefcase, FaBuilding, FaUserTie,
  FaGlobe, FaPaintBrush, FaTools, FaNetworkWired,
  FaHeadset, FaWhatsapp
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
  
  const [showBundleEnrollment, setShowBundleEnrollment] = useState(false);
  const [selectedBundleCourses, setSelectedBundleCourses] = useState([]);
  const [bundlePaymentPlan, setBundlePaymentPlan] = useState('full');
  const [bundleInstallmentMonths, setBundleInstallmentMonths] = useState(2);

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
      price: 400,
      fullPrice: 'GH₵ 400',
      installmentPrice: 'GH₵ 220/month',
      actualPrice: 400,
      monthlyInstallment: 220,
      description: 'Learn essential computer skills, Microsoft Office, and internet fundamentals.',
      longDescription: 'Master the fundamental computer skills needed for modern workplaces.',
      icon: <FaLaptop />,
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
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'No prior computer experience required - complete beginners welcome!',
      certificate: 'Certificate in Basic I.C.T & Office Skills',
      instructor: 'Adwoa Mensah - Certified ICT Trainer with 7+ years experience',
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
      price: 500,
      fullPrice: 'GH₵ 500',
      installmentPrice: 'GH₵ 275/month',
      actualPrice: 500,
      monthlyInstallment: 275,
      description: 'Learn Photoshop, Illustrator, InDesign and master visual communication.',
      longDescription: 'Unlock your creative potential with our Graphic Design course.',
      icon: <FaPaintBrush />,
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
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Passion for design, no prior experience needed',
      certificate: 'Certificate in Graphic Design',
      instructor: 'Abena Osei - Creative Director with 10+ years in branding',
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
      price: 550,
      fullPrice: 'GH₵ 550',
      installmentPrice: 'GH₵ 290/month',
      actualPrice: 550,
      monthlyInstallment: 290,
      description: 'Master HTML, CSS, JavaScript, and build modern websites.',
      longDescription: 'Learn to build professional, responsive websites from scratch.',
      icon: <FaCode />,
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
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Basic computer knowledge, no prior coding experience required',
      certificate: 'Certificate in Web Development',
      instructor: 'John Mensah - Senior Full Stack Developer with 8+ years experience',
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
      price: 450,
      fullPrice: 'GH₵ 450',
      installmentPrice: 'GH₵ 240/month',
      actualPrice: 450,
      monthlyInstallment: 240,
      description: 'Learn computer networking fundamentals, setup, and configuration.',
      longDescription: 'Master the essentials of computer networking.',
      icon: <FaNetworkWired />,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Network fundamentals and OSI model',
        'IP addressing and subnetting',
        'Network topologies and devices',
        'Router and switch configuration',
        'Network troubleshooting techniques',
        'Wireless networking basics',
        'Network security fundamentals',
        'Cabling and physical networking',
        'Internet and WAN technologies',
        'Network monitoring and management'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Basic computer knowledge, interest in networking',
      certificate: 'Certificate in Networking Basics',
      instructor: 'Kwame Asare - Network Engineer with 8+ years experience',
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
      price: 600,
      fullPrice: 'GH₵ 600',
      installmentPrice: 'GH₵ 320/month',
      actualPrice: 600,
      monthlyInstallment: 320,
      description: 'Comprehensive IT support training for help desk and system administration.',
      longDescription: 'Become a complete IT support professional.',
      icon: <FaHeadset />,
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: [
        'Computer hardware assembly and maintenance',
        'Operating systems installation and management',
        'Software installation and troubleshooting',
        'Network setup and configuration',
        'IT security fundamentals',
        'Help desk and customer service skills',
        'Remote support techniques',
        'System backup and recovery',
        'IT documentation and reporting',
        'Real-world IT support scenarios and projects'
      ],
      schedule: `Online & In-Person | Start Date: ${startDate}`,
      prerequisites: 'Basic computer knowledge, interest in IT support',
      certificate: 'Certificate in Full I.T Support',
      instructor: 'Emmanuel Appiah - Senior IT Support Specialist with 10+ years experience',
      students: 345,
      rating: 4.8,
      targetAudience: 'IT Beginners, Career Changers, Help Desk Aspirants, System Administrators',
      deliveryMode: 'Online & In-Person'
    }
  ];

  const calculateBundlePrice = (selectedCourses) => {
    if (selectedCourses.length === 0) return { total: 0, discount: 0, final: 0, discountPercent: 0 };
    
    const total = selectedCourses.reduce((sum, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return sum + (course?.actualPrice || 0);
    }, 0);
    
    let discountPercent = 0;
    if (selectedCourses.length === 2) discountPercent = 10;
    if (selectedCourses.length === 3) discountPercent = 15;
    if (selectedCourses.length >= 4) discountPercent = 20;
    
    const discount = (total * discountPercent) / 100;
    const final = total - discount;
    
    return { total, discount, final, discountPercent };
  };

  const calculateBundleInstallment = (finalPrice, months) => {
    return Math.ceil(finalPrice / months);
  };

  const bundlePrice = calculateBundlePrice(selectedBundleCourses);
  const bundleMonthlyInstallment = calculateBundleInstallment(bundlePrice.final, bundleInstallmentMonths);

  const toggleBundleCourse = (courseId) => {
    setSelectedBundleCourses(prev => {
      if (prev.includes(courseId)) {
        return prev.filter(id => id !== courseId);
      } else {
        return [...prev, courseId];
      }
    });
  };

  const getBundleDisplayPrice = () => {
    if (bundlePaymentPlan === 'installment') {
      return `GH₵ ${bundleMonthlyInstallment}/month × ${bundleInstallmentMonths} months`;
    }
    return `GH₵ ${bundlePrice.final}`;
  };

  const bundleDiscounts = [
    { courses: 'Any 2 Courses', discount: '10% OFF', price: 'Save up to GH₵ 110' },
    { courses: 'Any 3 Courses', discount: '15% OFF', price: 'Save up to GH₵ 240' },
    { courses: 'Any 4+ Courses', discount: '20% OFF', price: 'Save up to GH₵ 400' }
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
    
    if (showBundleEnrollment && selectedBundleCourses.length > 0) {
      const selectedCoursesData = selectedBundleCourses.map(id => courses.find(c => c.id === id));
      const coursesList = selectedCoursesData.map(c => c.title).join(', ');
      const totalOriginal = bundlePrice.total;
      const discountAmount = bundlePrice.discount;
      const finalAmount = bundlePrice.final;
      
      setIsSubmitting(true);

      try {
        const message = `BUNDLE ENROLLMENT\n\nName: ${enquiryName}\nEmail: ${enquiryEmail}\nPhone: ${enquiryPhone}\n\nCourses: ${coursesList}\nOriginal Price: GH₵ ${totalOriginal}\nDiscount: ${bundlePrice.discountPercent}% OFF (Save GH₵ ${discountAmount})\nFinal Price: GH₵ ${finalAmount}\nPayment Plan: ${bundlePaymentPlan === 'full' ? 'Full Payment' : `Installment - GH₵ ${bundleMonthlyInstallment}/month for ${bundleInstallmentMonths} months`}\n\nStart Date: ${startDate}\nDuration: 2 Months per course\nDelivery: Online & In-Person\n\nMessage: ${enquiryMessage || 'No additional message'}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        alert(`Thank you ${enquiryName}! Your BUNDLE enrollment has been prepared. We will contact you via WhatsApp shortly.`);
        resetBundleForm();
      } catch (error) {
        alert('Your bundle enrollment request has been saved. We will contact you within 24 hours.');
        resetBundleForm();
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const courseValue = selectedCourseForForm || (selectedCourse?.title || 'Not specified');
      const paymentValue = selectedPaymentOption;
      
      setIsSubmitting(true);

      try {
        const message = `ENROLLMENT REQUEST\n\nName: ${enquiryName}\nEmail: ${enquiryEmail}\nPhone: ${enquiryPhone}\nCourse: ${courseValue}\nPayment Option: ${paymentValue}\n\nStart Date: ${startDate}\nDuration: 2 Months\nDelivery: Online & In-Person\n\nMessage: ${enquiryMessage || 'No additional message'}`;
        
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        alert(`Thank you ${enquiryName}! Your enrollment request has been prepared. We will contact you via WhatsApp shortly.`);
        resetSingleForm();
      } catch (error) {
        alert('Your enrollment request has been saved. We will contact you within 24 hours.');
        resetSingleForm();
      } finally {
        setIsSubmitting(false);
      }
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
    setShowBundleEnrollment(false);
    setSelectedBundleCourses([]);
  };

  const resetBundleForm = () => {
    setEnquiryName('');
    setEnquiryEmail('');
    setEnquiryPhone('');
    setEnquiryMessage('');
    setShowEnquiryForm(false);
    setShowBundleEnrollment(false);
    setSelectedBundleCourses([]);
    setBundlePaymentPlan('full');
    setBundleInstallmentMonths(2);
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
      {/* Hero Section - Simplified */}
      <section className="school-hero">
        <div className="school-hero-overlay"></div>
        <div className="school-hero-content">
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
      </section>

      {/* Tab Navigation */}
      <div className="school-tabs">
        <div className="container">
          <button 
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <FaBookOpen /> Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bundle' ? 'active' : ''}`}
            onClick={() => setActiveTab('bundle')}
          >
            <FaGift /> Bundles
          </button>
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <FaGraduationCap /> About
          </button>
          <button 
            className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <FaEnvelope /> Enroll
          </button>
        </div>
      </div>

      <div className="container">
        {/* Courses Tab */}
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
                        Details <FaArrowRight />
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
                  <p>Chat with us directly on WhatsApp</p>
                </div>
                <button className="whatsapp-cta-btn" onClick={handleWhatsAppClick}>
                  <FaWhatsapp /> Chat Now
                </button>
              </div>
            </div>
          </>
        )}

        {/* Bundle Tab - Simplified */}
        {activeTab === 'bundle' && (
          <div className="bundle-section">
            <div className="bundle-header">
              <h1><FaGift /> Bundle Discounts</h1>
              <p>Save more when you enroll in multiple courses</p>
            </div>

            <div className="bundle-builder">
              <h2>Build Your Bundle</h2>
              <p className="bundle-subtitle">Select 2 or more courses for discounts</p>
              
              <div className="bundle-courses-selector">
                {courses.map(course => (
                  <div 
                    key={course.id}
                    className={`bundle-course-option ${selectedBundleCourses.includes(course.id) ? 'selected' : ''}`}
                    onClick={() => toggleBundleCourse(course.id)}
                  >
                    <div className="bundle-course-checkbox">
                      {selectedBundleCourses.includes(course.id) && <FaCheckCircle />}
                    </div>
                    <div className="bundle-course-icon">{course.icon}</div>
                    <div className="bundle-course-info">
                      <h4>{course.title}</h4>
                      <p>GH₵ {course.actualPrice}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBundleCourses.length > 0 && (
                <div className="bundle-summary">
                  <h3>Bundle Summary</h3>
                  <div className="bundle-price-breakdown">
                    <div className="price-row">
                      <span>Original Price:</span>
                      <span>GH₵ {bundlePrice.total}</span>
                    </div>
                    {bundlePrice.discount > 0 && (
                      <div className="price-row discount">
                        <span>Discount ({bundlePrice.discountPercent}% OFF):</span>
                        <span>- GH₵ {bundlePrice.discount}</span>
                      </div>
                    )}
                    <div className="price-row total">
                      <span>Final Price:</span>
                      <span>GH₵ {bundlePrice.final}</span>
                    </div>
                  </div>

                  <button 
                    className="enroll-bundle-btn"
                    onClick={() => {
                      setShowEnquiryForm(true);
                      setShowBundleEnrollment(true);
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    Enroll in Bundle - {getBundleDisplayPrice()}
                  </button>
                </div>
              )}
            </div>

            <div className="bundle-grid">
              {bundleDiscounts.map((bundle, index) => (
                <div key={index} className="bundle-card">
                  <div className="bundle-icon"><FaGift /></div>
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
                    Enquire <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>

            <div className="payment-info">
              <h2><FaMoneyBillWave /> Installment Plans</h2>
              <p>Pay in easy monthly installments</p>
              <div className="installment-example">
                <div className="installment-item">
                  <strong>Basic I.C.T & Office</strong>
                  <span>GH₵ 220/month × 2 months</span>
                </div>
                <div className="installment-item">
                  <strong>Graphic Design</strong>
                  <span>GH₵ 275/month × 2 months</span>
                </div>
                <div className="installment-item">
                  <strong>Web Development</strong>
                  <span>GH₵ 290/month × 2 months</span>
                </div>
                <div className="installment-item">
                  <strong>Networking Basics</strong>
                  <span>GH₵ 240/month × 2 months</span>
                </div>
                <div className="installment-item">
                  <strong>Full I.T Support</strong>
                  <span>GH₵ 320/month × 2 months</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab - Simplified */}
        {activeTab === 'details' && selectedCourse && (
          <div className="course-details">
            <button className="back-btn" onClick={() => setActiveTab('courses')}>
              <FaArrowRight /> Back
            </button>
            
            <div className="details-grid">
              <div className="details-image">
                <img src={selectedCourse.image} alt={selectedCourse.title} />
                <div className="course-badge">{selectedCourse.category}</div>
                <div className="duration-badge">2 Months</div>
              </div>
              <div className="details-info">
                <h1 className="details-title">{selectedCourse.title}</h1>
                <p className="details-long-desc">{selectedCourse.longDescription}</p>
                
                <div className="details-delivery">
                  <span><FaGlobe /> {selectedCourse.deliveryMode}</span>
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
                      <div className="meta-value">{selectedCourse.fullPrice}</div>
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
                    setShowBundleEnrollment(false);
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
                  {selectedCourse.features.slice(0, 5).map((feature, idx) => (
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
                  <span><FaCertificate /> Certificate Included</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Tab - Simplified */}
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
                <p>To provide accessible, high-quality education through online and in-person learning.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><FaEye /></div>
                <h3>Our Vision</h3>
                <p>To become Ghana's leading institution for technology and creative education.</p>
              </div>
              <div className="about-card">
                <div className="about-icon"><FaHeart /></div>
                <h3>Our Values</h3>
                <p>Excellence, Accessibility, Practical Learning, Student Success.</p>
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

            <div className="course-info">
              <h2><FaBookOpen /> Course Information</h2>
              <div className="info-grid">
                <div className="info-card">
                  <span className="info-icon"><FaClock /></span>
                  <h3>Duration</h3>
                  <p>2 Months</p>
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
                  <p>Awarded</p>
                </div>
                <div className="info-card">
                  <span className="info-icon"><FaWhatsapp /></span>
                  <h3>Support</h3>
                  <p>24/7 WhatsApp</p>
                </div>
              </div>
            </div>

            <div className="contact-buttons">
              <button className="whatsapp-about-btn" onClick={handleWhatsAppClick}>
                <FaWhatsapp /> Contact us on WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* Contact Tab - Simplified */}
        {activeTab === 'contact' && (
          <div className="contact-school">
            <div className="contact-header">
              <h1><FaEnvelope /> Enroll Now</h1>
              <p>Start your learning journey with us today</p>
              <div className="enrollment-dates">
                <span><FaCalendarAlt /> Start: {startDate}</span>
                <span><FaClock /> 2 Months</span>
                <span><FaGlobe /> Online & In-Person</span>
                <span><FaCertificate /> Certificate</span>
              </div>
            </div>

            <div className="contact-grid">
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon"><FaWhatsapp /></div>
                  <div>
                    <h3>WhatsApp</h3>
                    <p>{displayWhatsappNumber}</p>
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
                  <div className="info-icon"><FaEnvelope /></div>
                  <div>
                    <h3>Email</h3>
                    <p>fasttech227@gmail.com</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon"><FaMoneyBillWave /></div>
                  <div>
                    <h3>Payment</h3>
                    <p>Full Payment or Installment Plans</p>
                  </div>
                </div>
              </div>

              <div className="contact-form">
                <h2>{showBundleEnrollment ? 'Bundle Enrollment' : 'Course Enrollment'}</h2>
                
                {!showBundleEnrollment && (
                  <button 
                    className="switch-to-bundle"
                    onClick={() => {
                      setShowBundleEnrollment(true);
                      setSelectedBundleCourses([]);
                    }}
                  >
                    <FaGift /> Bundle discounts available
                  </button>
                )}

                {showBundleEnrollment && (
                  <button 
                    className="switch-to-single"
                    onClick={() => setShowBundleEnrollment(false)}
                  >
                    <FaArrowRight /> Single course enrollment
                  </button>
                )}
                
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
                  
                  {!showBundleEnrollment ? (
                    <>
                      <select 
                        name="course"
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
                        name="payment"
                        value={selectedPaymentOption}
                        onChange={(e) => setSelectedPaymentOption(e.target.value)}
                      >
                        <option>Full Payment</option>
                        <option>Installment Plan</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <div className="bundle-course-selection">
                        <label>Select Courses (2 or more):</label>
                        {courses.map(course => (
                          <label key={course.id} className="bundle-checkbox-label">
                            <input
                              type="checkbox"
                              checked={selectedBundleCourses.includes(course.id)}
                              onChange={() => toggleBundleCourse(course.id)}
                            />
                            <span>{course.title} - {course.fullPrice}</span>
                          </label>
                        ))}
                      </div>
                      
                      {selectedBundleCourses.length >= 2 && (
                        <div className="bundle-pricing-info">
                          <p><strong>Bundle Discount Applied!</strong></p>
                          <p>Original: GH₵ {bundlePrice.total}</p>
                          <p>Discount: {bundlePrice.discountPercent}% OFF</p>
                          <p><strong>Final: GH₵ {bundlePrice.final}</strong></p>
                        </div>
                      )}
                      
                      {selectedBundleCourses.length > 0 && selectedBundleCourses.length < 2 && (
                        <p className="bundle-warning">Select at least 2 courses</p>
                      )}
                    </>
                  )}
                  
                  <textarea
                    name="message"
                    placeholder="Additional Information"
                    value={enquiryMessage}
                    onChange={(e) => setEnquiryMessage(e.target.value)}
                    rows="3"
                  />
                  <button 
                    type="submit" 
                    className="send-btn" 
                    disabled={isSubmitting || (showBundleEnrollment && selectedBundleCourses.length < 2)}
                  >
                    {isSubmitting ? 'Sending...' : (showBundleEnrollment ? 'Submit Bundle →' : 'Submit →')}
                  </button>
                </form>
                <p className="form-note"><FaWhatsapp /> We'll contact you via WhatsApp within 24 hours</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="school-footer-cta">
        <div className="container">
          <h2><FaRocket /> Start Your Learning Journey</h2>
          <p>2 Months • Online & In-Person • Certificate • Start: {startDate}</p>
          <div className="cta-buttons">
            <button 
              className="cta-button primary"
              onClick={() => {
                setActiveTab('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FaBookOpen /> Explore
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FaEnvelope /> Enroll
            </button>
            <button 
              className="cta-button whatsapp"
              onClick={handleWhatsAppClick}
            >
              <FaWhatsapp /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolPage;
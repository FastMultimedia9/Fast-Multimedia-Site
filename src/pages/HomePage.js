import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPalette, FaDesktop, FaPenFancy, FaLaptop, FaPrint, FaGlobe,
  FaTools, FaCogs, FaCloudUploadAlt, FaWifi,
  FaArrowRight, FaStar, FaCheckCircle, FaPlay,
  FaUsers, FaClock, FaHeadset
} from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProject, setQuickViewProject] = useState(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState('design');
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Hero images
  const heroImages = [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
  ];

  const techHeroImages = [
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80",
  ];

  const updatesData = [
    {
      id: 1,
      title: "New Courses Available",
      subtitle: "3-Month Online Programs",
      description: "Enroll now for Basic ICT, Graphic Design & Web Development. Start Date: 1st May 2026",
      image: "/images/school-update-1.jpg",
      cta: "Learn More",
      tag: "🎓 New",
      type: "school",
      category: "Education"
    },
    {
      id: 3,
      title: "Free Webinar: Web Development",
      subtitle: "Live Online Session",
      description: "Join our free webinar on modern web development. Limited seats available!",
      image: "/images/tech-update-1.jpg",
      cta: "Register Free",
      tag: "🎥 Free",
      type: "flyer",
      category: "Event"
    },
    {
      id: 5,
      title: "New Computer Repair Service",
      subtitle: "Fast & Reliable",
      description: "Professional computer repair services at affordable prices. Free diagnosis!",
      image: "/images/tech-update-2.jpg",
      cta: "Book Service",
      tag: "🔧 New Service",
      type: "service",
      category: "Tech"
    },
    {
      id: 6,
      title: "Portfolio Review Day",
      subtitle: "Free Consultation",
      description: "Get your design portfolio reviewed by industry experts. Book your slot today!",
      image: "/images/service-update-2.jpg",
      cta: "Book Slot",
      tag: "📅 Event",
      type: "flyer",
      category: "Design"
    }
  ];

  const featuredPortfolioProjects = [
    {
      id: 'featured-1',
      title: 'St. Martin Hospital',
      subtitle: '80th Anniversary',
      category: 'Brand Identity',
      description: 'Award-winning logo design celebrating heritage and future vision.',
      image: '/80th.jpg',
      tags: ['Logo Design', 'Healthcare'],
      details: ['Winning competition design', 'Heritage meets future concept', 'Clean sans-serif typography'],
      client: 'St. Martin De Porres Hospital',
      year: '2025'
    },
    {
      id: 'featured-2',
      title: 'Mr. Wise',
      subtitle: 'Clothing Brand',
      category: 'Brand Identity',
      description: 'Sophisticated fashion brand with "Exclusively Different" positioning.',
      image: '/mr-wise.jpg',
      tags: ['Fashion', 'Luxury'],
      details: ['Complete brand identity', 'Premium positioning', 'Brand guidelines'],
      client: 'Mr. Wise Clothing',
      year: '2025'
    },
    {
      id: 'featured-3',
      title: 'Abidan Royal',
      subtitle: 'Mango Ice-Cream',
      category: 'Packaging',
      description: 'Product label design with clear ingredient listing.',
      image: '/mango-label.jpg',
      tags: ['Packaging', 'Food'],
      details: ['Regulatory compliance', 'Professional retail appearance', 'Clear ingredient display'],
      client: 'Abidan Royal Enterprise',
      year: '2024'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const interval = setInterval(() => {
      const activeImages = getActiveHeroImages();
      setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
    }, 4000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const getActiveHeroImages = () => {
    return activeServiceCategory === 'design' ? heroImages : techHeroImages;
  };

  const handleUpdateClick = (update) => {
    const updateData = {
      name: update.title,
      category: update.category,
      details: update.subtitle,
      description: update.description,
      timestamp: Date.now(),
      type: update.type
    };
    localStorage.setItem('selectedUpdate', JSON.stringify(updateData));
    
    if (update.type === 'school') {
      navigate('/school');
    } else {
      navigate('/contact');
    }
  };

  const services = {
    design: [
      {
        id: 'branding',
        name: 'Brand Identity',
        price: '₵699+',
        description: 'Complete brand systems including logo, color, typography.',
        icon: FaPenFancy,
        features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography']
      },
      {
        id: 'uiux',
        name: 'UI/UX Design',
        price: '₵899+',
        description: 'User-centered interfaces for web and mobile.',
        icon: FaLaptop,
        features: ['Wireframing', 'Prototyping', 'User Testing', 'Responsive']
      },
      {
        id: 'print',
        name: 'Print Design',
        price: '₵549+',
        description: 'Professional print materials and packaging.',
        icon: FaPrint,
        features: ['Business Cards', 'Packaging', 'Brochures', 'Posters']
      },
      {
        id: 'web',
        name: 'Web Design',
        price: '₵1,299+',
        description: 'Modern, responsive websites.',
        icon: FaGlobe,
        features: ['Website Design', 'E-commerce', 'CMS', 'SEO']
      }
    ],
    tech: [
      {
        id: 'repair',
        name: 'Computer Repair',
        price: '₵50+/hr',
        description: 'Professional repair for all computer makes.',
        icon: FaTools,
        features: ['Hardware Diagnosis', 'Component Repair', 'System Tuning']
      },
      {
        id: 'setup',
        name: 'System Setup',
        price: '₵150+',
        description: 'Complete OS installation and configuration.',
        icon: FaCogs,
        features: ['Windows Setup', 'Driver Updates', 'Optimization']
      },
      {
        id: 'software',
        name: 'Software Support',
        price: '₵100+',
        description: 'Installation and configuration.',
        icon: FaCloudUploadAlt,
        features: ['Office Setup', 'Creative Software', 'Antivirus']
      },
      {
        id: 'network',
        name: 'Networking',
        price: '₵250+',
        description: 'Network setup and management.',
        icon: FaWifi,
        features: ['Wi-Fi Setup', 'Security', 'Troubleshooting']
      }
    ]
  };

  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₵699',
      description: 'Perfect for new businesses',
      features: ['Logo Design', 'Business Cards', 'Social Media Kit', 'Brand Guide'],
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '₵1,499',
      description: 'Complete branding solution',
      features: ['Logo + Variations', 'Full Guidelines', 'Stationery Set', 'Social Content'],
      highlighted: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₵2,299',
      description: 'End-to-end solution',
      features: ['All Pro Features', 'Website Design', 'Marketing Materials', '3 Months Support'],
      highlighted: false
    }
  ];

  const handleServiceClick = (service) => {
    const serviceData = {
      name: service.name,
      category: service.id === 'branding' ? 'Brand Identity Design' : 
                service.id === 'uiux' ? 'UI/UX Design' :
                service.id === 'print' ? 'Print Design' :
                service.id === 'web' ? 'Web Design' :
                service.id === 'repair' ? 'Computer Repair & Maintenance' :
                service.id === 'setup' ? 'Windows Installation & Setup' :
                service.id === 'software' ? 'Software Installation & Support' :
                service.id === 'network' ? 'Networking Solutions' : 'General Service',
      price: service.price,
      timestamp: Date.now(),
      type: 'regular'
    };
    
    localStorage.removeItem('selectedService');
    localStorage.setItem('selectedService', JSON.stringify(serviceData));
    navigate('/contact');
  };

  return (
    <div className="homepage">
      {/* Hero Section - Duck Design Style */}
      <section className="hero">
        <div className="hero-background">
          {getActiveHeroImages().map((img, index) => (
            <div
              key={index}
              className={`hero-bg-slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          {/* Service Toggle - Positioned inside Hero like Duck Design */}
          <div className={`service-toggle-wrapper ${isScrolled ? 'scrolled' : ''}`}>
            <div className="toggle-container">
              <button
                className={`toggle-btn ${activeServiceCategory === 'design' ? 'active' : ''}`}
                onClick={() => setActiveServiceCategory('design')}
              >
                <FaPalette className="toggle-icon" />
                <span className="toggle-text">Design Services</span>
              </button>
              <button
                className={`toggle-btn ${activeServiceCategory === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveServiceCategory('tech')}
              >
                <FaDesktop className="toggle-icon" />
                <span className="toggle-text">Tech Services</span>
              </button>
            </div>
          </div>

          <div className="hero-badge">
            <span className="badge-text">Professional Services</span>
          </div>
          
          <h1 className="hero-title">
            {activeServiceCategory === 'design' ? (
              <>
                Exceptional <span className="gradient-text">Design</span>
                <br />
                That Drives Results
              </>
            ) : (
              <>
                Reliable <span className="gradient-text">Tech</span>
                <br />
                Support & Solutions
              </>
            )}
          </h1>
          
          <p className="hero-subtitle">
            {activeServiceCategory === 'design'
              ? 'We create stunning visual identities that elevate brands and captivate audiences.'
              : 'Professional IT solutions to keep your systems running smoothly and efficiently.'}
          </p>
          
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (activeServiceCategory === 'design') {
                  setShowPackageModal(true);
                } else {
                  navigate('/services');
                }
              }}
            >
              {activeServiceCategory === 'design' ? 'View Packages' : 'Explore Services'}
              <FaArrowRight className="btn-arrow" />
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/contact')}>
              Get Started
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">150+</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="divider"></div>
            <div className="stat">
              <div className="stat-value">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
            <div className="divider"></div>
            <div className="stat">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Updates Section */}
      <section className="updates-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">Latest</span> Updates & Announcements
            </h2>
            <p className="section-subtitle">
              Stay informed about our new courses, services, and special offers
            </p>
          </div>
          
          <div className="marquee-container">
            <div className="marquee-track">
              {updatesData.map((update) => (
                <div 
                  key={`first-${update.id}`} 
                  className={`update-card ${update.type}`}
                  onClick={() => handleUpdateClick(update)}
                >
                  <div className="update-image">
                    <img src={update.image} alt={update.title} />
                    <div className="update-tag">
                      {update.tag}
                    </div>
                    <div className="update-type-badge">
                      {update.type === 'school' ? '🎓 School' : '📢 Offer'}
                    </div>
                  </div>
                  <div className="update-content">
                    <h3 className="update-title">{update.title}</h3>
                    <p className="update-subtitle">{update.subtitle}</p>
                    <p className="update-description">{update.description}</p>
                    <button className="update-cta">
                      {update.cta} <FaArrowRight className="btn-arrow" />
                    </button>
                  </div>
                </div>
              ))}
              {updatesData.map((update) => (
                <div 
                  key={`second-${update.id}`} 
                  className={`update-card ${update.type}`}
                  onClick={() => handleUpdateClick(update)}
                >
                  <div className="update-image">
                    <img src={update.image} alt={update.title} />
                    <div className="update-tag">
                      {update.tag}
                    </div>
                    <div className="update-type-badge">
                      {update.type === 'school' ? '🎓 School' : '📢 Offer'}
                    </div>
                  </div>
                  <div className="update-content">
                    <h3 className="update-title">{update.title}</h3>
                    <p className="update-subtitle">{update.subtitle}</p>
                    <p className="update-description">{update.description}</p>
                    <button className="update-cta">
                      {update.cta} <FaArrowRight className="btn-arrow" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {activeServiceCategory === 'design' ? 'Design Services' : 'Tech Services'}
            </h2>
            <p className="section-subtitle">
              Professional solutions tailored to your needs
            </p>
          </div>

          <div className="services-grid">
            {services[activeServiceCategory].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="service-card"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="service-card-inner">
                    <div className="service-header">
                      <Icon className="service-icon" />
                      <div className="service-price">{service.price}</div>
                    </div>
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-description">{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <FaCheckCircle className="feature-check" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="service-cta">
                      <span>Select Service</span>
                      <FaArrowRight className="cta-arrow" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {activeServiceCategory === 'design' && (
        <section className="portfolio-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured Work</h2>
              <p className="section-subtitle">
                Explore our portfolio of successful design projects
              </p>
            </div>

            <div className="portfolio-grid">
              {featuredPortfolioProjects.map((project) => (
                <div
                  key={project.id}
                  className="portfolio-card"
                  onClick={() => {
                    setQuickViewProject(project);
                    setShowQuickView(true);
                  }}
                >
                  <div className="portfolio-image">
                    <img src={project.image} alt={project.title} />
                    <div className="portfolio-overlay">
                      <button className="view-project-btn">
                        <span>View Project</span>
                        <FaArrowRight className="btn-arrow" />
                      </button>
                    </div>
                  </div>
                  <div className="portfolio-info">
                    <div className="portfolio-meta">
                      <span className="portfolio-category">{project.category}</span>
                      <span className="portfolio-year">{project.year}</span>
                    </div>
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-subtitle">{project.subtitle}</p>
                    <div className="portfolio-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="portfolio-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Simple, transparent, and efficient</p>
          </div>
          <div className="process-steps">
            <div className="step">
              <span className="step-number">1</span>
              <h4>Choose a Plan</h4>
              <p>Select the plan that fits your needs and budget.</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <h4>Payment & Brief</h4>
              <p>Make payment and provide a brief about your project.</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <h4>Designer Assigned</h4>
              <p>A dedicated designer/tech expert is assigned to you.</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <h4>Receive & Review</h4>
              <p>Receive your work, request revisions, and approve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Choose Your <span className="gradient-text">Plan</span></h2>
            <p className="section-subtitle">Flexible packages for every business</p>
          </div>
          <div className="pricing-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`pricing-card ${pkg.highlighted ? 'highlighted' : ''}`}>
                {pkg.highlighted && <div className="pricing-badge">Most Popular</div>}
                <h3 className="pricing-name">{pkg.name}</h3>
                <div className="pricing-price">{pkg.price}</div>
                <ul className="pricing-features">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="feature-check" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-primary" onClick={() => navigate('/contact')}>
                  Get Started <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
            <p className="section-subtitle">Real feedback from real people</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"The branding package transformed our business. Professional, creative, and delivered on time!"</p>
              <div className="testimonial-author">
                <strong>John Mensah</strong>
                <span>CEO, TechStart Ghana</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"The tech support team is incredible. They fixed our network issues and got us running smoothly."</p>
              <div className="testimonial-author">
                <strong>Mary Asare</strong>
                <span>Operations Manager, EduHub</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <p>"From logo design to website, they handled everything. Highly recommend their design services."</p>
              <div className="testimonial-author">
                <strong>Kwame Osei</strong>
                <span>Founder, Abidan Royal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Modal */}
      {showPackageModal && (
        <div className="modal-overlay" onClick={() => setShowPackageModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPackageModal(false)}>
              ×
            </button>
            
            <div className="modal-header">
              <h2 className="modal-title">Design Packages</h2>
              <p className="modal-subtitle">Choose the perfect package for your needs</p>
            </div>

            <div className="packages-grid">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`package-card ${pkg.highlighted ? 'highlighted' : ''} ${selectedPackage === pkg.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.highlighted && <div className="package-badge">Most Popular</div>}
                  <div className="package-header">
                    <h3 className="package-name">{pkg.name}</h3>
                    <div className="package-price">{pkg.price}</div>
                  </div>
                  <p className="package-description">{pkg.description}</p>
                  <ul className="package-features">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="feature-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`package-select-btn ${selectedPackage === pkg.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {selectedPackage === pkg.id ? 'Selected ✓' : 'Select Package'}
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-primary btn-large"
                onClick={() => {
                  const selected = packages.find(p => p.id === selectedPackage);
                  handleServiceClick(selected);
                  setShowPackageModal(false);
                }}
              >
                <span>Get Started with {selectedPackage}</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && quickViewProject && (
        <div className="modal-overlay" onClick={() => setShowQuickView(false)}>
          <div className="modal-content quickview" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQuickView(false)}>
              ×
            </button>
            
            <div className="quickview-grid">
              <div className="quickview-image">
                <img src={quickViewProject.image} alt={quickViewProject.title} />
              </div>
              <div className="quickview-info">
                <div className="quickview-header">
                  <div className="quickview-meta">
                    <span className="meta-category">{quickViewProject.category}</span>
                    <span className="meta-year">{quickViewProject.year}</span>
                  </div>
                  <h2 className="quickview-title">{quickViewProject.title}</h2>
                  <p className="quickview-subtitle">{quickViewProject.subtitle}</p>
                  <div className="quickview-client">
                    <span className="client-label">Client:</span>
                    <span className="client-name">{quickViewProject.client}</span>
                  </div>
                </div>
                
                <div className="quickview-content">
                  <h3>Project Overview</h3>
                  <p>{quickViewProject.description}</p>
                  
                  <h3>Key Features</h3>
                  <ul className="quickview-features">
                    {quickViewProject.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="quickview-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowQuickView(false);
                      setShowPackageModal(true);
                    }}
                  >
                    <span>Start Similar Project</span>
                    <FaArrowRight className="btn-arrow" />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => navigate('/portfolio')}
                  >
                    View Full Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Transform Your{' '}
              {activeServiceCategory === 'design' ? 'Brand' : 'Business'}?
            </h2>
            <p className="cta-subtitle">
              Let's create something amazing together. Get in touch to discuss your project.
            </p>
            <div className="cta-actions">
              <button
                className="btn btn-primary btn-large"
                onClick={() => navigate('/contact')}
              >
                <span>Start Your Project</span>
                <FaArrowRight className="btn-arrow" />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate('/portfolio')}
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
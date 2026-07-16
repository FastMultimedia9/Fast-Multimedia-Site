import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaPalette, FaMobileAlt, FaPrint, FaShareAlt, FaCode, FaFilm,
  FaTools, FaWindows, FaDownload, FaLaptop, FaNetworkWired, FaServer,
  FaArrowRight, FaCheckCircle, FaPlusCircle, FaShoppingCart,
  FaComments, FaClipboardList, FaPaintBrush, FaSearch, FaPaperPlane, FaHeadset,
  FaBolt, FaShieldAlt, FaUsers, FaHandshake, FaCalendarCheck, FaFileInvoiceDollar,
  FaStar, FaClock, FaAward
} from 'react-icons/fa';
import './Services.css';

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('design');

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  const handleServiceClick = (serviceName, category, price = null) => {
    const serviceData = {
      name: serviceName,
      category: category,
      price: price,
      timestamp: Date.now(),
      type: 'regular'
    };
    localStorage.removeItem('selectedService');
    localStorage.removeItem('selectedValentinePackage');
    localStorage.setItem('selectedService', JSON.stringify(serviceData));
    navigate('/contact');
    showServiceNotification(serviceName);
  };

  const showServiceNotification = (serviceName) => {
    const notification = document.createElement('div');
    notification.className = 'service-notification';
    notification.innerHTML = `
      <span class="notification-icon">✓</span>
      <span>${serviceName} added to request form!</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const graphicDesignServices = [
    {
      id: 1,
      title: 'Brand Identity Design',
      description: 'Complete brand identity packages including logo design, color palette, typography, and brand guidelines.',
      features: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Stationery Design'],
      icon: FaPalette,
      color: '#ff8b20',
      basePrice: '₵699'
    },
    {
      id: 2,
      title: 'UI/UX Design',
      description: 'User-centered design for websites and applications focusing on usability and engagement.',
      features: ['Wireframing', 'Prototyping', 'User Testing', 'Responsive Design'],
      icon: FaMobileAlt,
      color: '#ffca41',
      basePrice: '₵899'
    },
    {
      id: 3,
      title: 'Print & Packaging',
      description: 'Professional print materials and packaging designs that stand out on shelves.',
      features: ['Brochures & Flyers', 'Product Packaging', 'Business Cards', 'Posters & Banners'],
      icon: FaPrint,
      color: '#fdb572',
      basePrice: '₵549'
    },
    {
      id: 4,
      title: 'Social Media Graphics',
      description: 'Eye-catching social media content that drives engagement and conversions.',
      features: ['Social Media Posts', 'Ad Creatives', 'Profile Branding', 'Content Templates'],
      icon: FaShareAlt,
      color: '#ffda7a',
      basePrice: '₵399'
    },
    {
      id: 5,
      title: 'Website Design & Development',
      description: 'Modern, responsive websites that convert visitors into customers.',
      features: ['Website Design', 'E-commerce Solutions', 'CMS Integration', 'SEO Optimization'],
      icon: FaCode,
      color: '#ff8b20',
      basePrice: '₵1,500 +'
    },
    {
      id: 6,
      title: 'Motion Graphics',
      description: 'Animated videos and graphics for social media, presentations, and marketing.',
      features: ['Animated Logos', 'Explainer Videos', 'Social Media Ads', 'Presentation Graphics'],
      icon: FaFilm,
      color: '#ffca41',
      basePrice: '₵799 +'
    }
  ];

  const techServices = [
    {
      id: 1,
      title: 'Computer Repair & Maintenance',
      description: 'Professional repair services for all computer makes and models.',
      features: ['Hardware Diagnosis', 'Component Replacement', 'System Cleaning', 'Performance Tuning'],
      icon: FaTools,
      color: '#ff8b20',
      basePrice: '₵50/hour'
    },
    {
      id: 2,
      title: 'Windows Installation & Setup',
      description: 'Complete Windows OS installation, configuration, and optimization.',
      features: ['Windows 10/11 Installation', 'Driver Updates', 'System Optimization', 'Data Migration'],
      icon: FaWindows,
      color: '#ffca41',
      basePrice: '₵150'
    },
    {
      id: 3,
      title: 'Software Installation & Support',
      description: 'Installation and configuration of all types of software applications.',
      features: ['Office Suite Setup', 'Creative Software', 'Antivirus Installation', 'Troubleshooting'],
      icon: FaDownload,
      color: '#fdb572',
      basePrice: '₵100'
    },
    {
      id: 4,
      title: 'New Computer Setup',
      description: 'Complete setup and configuration of new computer systems.',
      features: ['Initial Setup', 'Software Installation', 'Data Transfer', 'System Optimization'],
      icon: FaLaptop,
      color: '#ffda7a',
      basePrice: '₵200'
    },
    {
      id: 5,
      title: 'Networking Solutions',
      description: 'Setup and management of wired and wireless networks for businesses and homes.',
      features: ['Wi-Fi Setup', 'Network Security', 'Router Configuration', 'Troubleshooting'],
      icon: FaNetworkWired,
      color: '#ff8b20',
      basePrice: '₵250'
    },
    {
      id: 6,
      title: 'Computer System Management',
      description: 'Ongoing maintenance and management of computer systems for optimal performance.',
      features: ['System Monitoring', 'Regular Updates', 'Backup Solutions', 'Security Management'],
      icon: FaServer,
      color: '#ffca41',
      basePrice: '₵300/month'
    }
  ];

  const pricingPlans = [
    {
      id: 1,
      name: 'Starter Package',
      price: '₵699',
      originalPrice: '₵848',
      savings: 'Save ₵149',
      description: 'Perfect for new businesses needing basic brand identity',
      features: [
        'Logo Design (Value: ₵299)',
        'Business Cards (Value: ₵150)',
        'Social Media Profile Kit (Value: ₵250)',
        'Basic Brand Guidelines (Value: ₵149)'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Professional Package',
      price: '₵1,499',
      originalPrice: '₵1,898',
      savings: 'Save ₵399',
      description: 'Complete branding solution for growing businesses',
      features: [
        'Logo Design + Variations',
        'Complete Brand Guidelines',
        'Business Stationery Set',
        'Social Media Content Kit',
        'Email Signature Design'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Website Package',
      price: '₵1,299',
      originalPrice: '₵1,548',
      savings: 'Save ₵249',
      description: 'Professional website design and development',
      features: [
        '5-Page Responsive Website',
        'Mobile-First Design',
        'SEO Optimization',
        'Contact Form Setup',
        'Social Media Integration'
      ],
      popular: false
    }
  ];

  const processSteps = [
    { id: 1, title: 'Consultation', description: 'We discuss your project requirements, goals, and timeline.', icon: FaComments },
    { id: 2, title: 'Planning & Strategy', description: 'We develop a detailed plan and strategy for your project.', icon: FaClipboardList },
    { id: 3, title: 'Design & Development', description: 'Our team creates and develops your project with precision.', icon: FaPaintBrush },
    { id: 4, title: 'Review & Feedback', description: 'You review the work and provide feedback for improvements.', icon: FaSearch },
    { id: 5, title: 'Final Delivery', description: 'We deliver the final product and provide support.', icon: FaPaperPlane },
    { id: 6, title: 'Support & Maintenance', description: 'Ongoing support and maintenance for your project.', icon: FaHeadset }
  ];

  const features = [
    { icon: FaBolt, title: 'Fast Turnaround', description: 'We deliver projects on time without compromising on quality.' },
    { icon: FaHeadset, title: '24/7 Support', description: 'Round-the-clock technical support for all your needs.' },
    { icon: FaShieldAlt, title: 'Quality Guarantee', description: 'We stand behind our work with a satisfaction guarantee.' },
    { icon: FaUsers, title: 'Expert Team', description: 'Skilled professionals in both design and technology.' },
    { icon: FaTools, title: 'Modern Tools', description: 'Using the latest software and technology for best results.' },
    { icon: FaHandshake, title: 'Personalized Service', description: 'Tailored solutions to meet your specific business needs.' }
  ];

  const currentServices = activeTab === 'design' ? graphicDesignServices : techServices;

  return (
    <div className="services-page">
      {/* Notification */}
      <style>
        {`
          .service-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-gold);
            color: var(--duck-dark);
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px var(--duck-shadow);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            transform: translateX(150%);
            transition: transform 0.3s ease-in-out;
            max-width: 350px;
            font-weight: 600;
            border: 1px solid var(--duck-border);
          }
          .service-notification.show { transform: translateX(0); }
          .service-notification .notification-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            background: var(--duck-dark);
            color: var(--duck-gold);
            border-radius: 50%;
            font-weight: 700;
          }
        `}
      </style>

      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content animate-on-scroll">
            <div className="hero-badge">
              <span className="badge-text">Comprehensive Services</span>
            </div>
            <h1 className="hero-title">
              Professional <span className="gradient-text">Graphic Design</span> &<br />
              <span className="gradient-text">Tech Support</span> Services
            </h1>
            <p className="hero-subtitle">
              From stunning visual designs to reliable technical solutions, we provide 
              comprehensive services to elevate your business and keep your systems running smoothly.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Tech Support</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="services-tabs-section">
        <div className="container">
          <div className="services-tabs">
            <button 
              className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              <FaPalette className="tab-icon" />
              Graphic Design
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => setActiveTab('tech')}
            >
              <FaTools className="tab-icon" />
              Tech Support
            </button>
          </div>
          <p className="selection-hint">
            <FaPlusCircle className="hint-icon" />
            Click any service to add it to your contact request
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {currentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id} 
                  className="service-card animate-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleServiceClick(service.title, activeTab === 'design' ? 'Graphic Design' : 'Tech Support', service.basePrice)}
                >
                  <div className="service-icon-wrapper" style={{ backgroundColor: service.color }}>
                    <Icon className="service-icon" />
                  </div>
                  <div className="service-header">
                    <h3 className="service-title">{service.title}</h3>
                    <span className="service-price">{service.basePrice}</span>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheckCircle className="feature-check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="service-action">
                    <span className="service-select-btn">
                      Select Service <FaArrowRight className="service-select-arrow" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works - Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Simple, transparent, and efficient process</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="process-step animate-on-scroll">
                  <div className="step-number">{step.id}</div>
                  <div className="step-content">
                    <div className="step-icon-wrapper">
                      <Icon className="step-icon" />
                    </div>
                    <h4 className="step-title">{step.title}</h4>
                    <p className="step-description">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-plans-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Choose Your <span className="gradient-text">Plan</span></h2>
            <p className="section-subtitle">Flexible packages for every business need</p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div 
                key={plan.id} 
                className={`pricing-card animate-on-scroll ${plan.popular ? 'popular' : ''}`}
                onClick={() => handleServiceClick(plan.name, 'Package', plan.price)}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                  </div>
                  <p className="plan-description">{plan.description}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <FaCheckCircle className="feature-check" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="plan-action">
                  <button className="btn-select-plan">
                    Select Package <FaArrowRight className="btn-arrow" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Why Choose <span className="gradient-text">Fast Multimedia</span></h2>
            <p className="section-subtitle">We combine creative design expertise with technical excellence</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card animate-on-scroll">
                  <div className="feature-icon-wrapper">
                    <Icon className="feature-icon" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <h2 className="cta-title">Ready to Transform Your Business?</h2>
            <p className="cta-description">
              Whether you need stunning designs or reliable tech support, 
              we've got you covered. Get in touch for a free consultation.
            </p>
            <div className="cta-buttons">
              <button 
                onClick={() => handleServiceClick('Free Consultation', 'Consultation')}
                className="btn-cta-primary"
              >
                <FaCalendarCheck />
                Book Free Consultation
              </button>
              <button 
                onClick={() => handleServiceClick('Custom Quote', 'Quote')}
                className="btn-cta-secondary"
              >
                <FaFileInvoiceDollar />
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
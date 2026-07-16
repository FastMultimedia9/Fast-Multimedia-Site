import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowRight, FaCheckCircle, FaPlusCircle,
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

  // Design Services - Following Duck Design's service structure
  const designServices = [
    {
      id: 1,
      title: 'Graphic Design',
      description: 'Professional graphic design services for all your visual needs.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/graphic-design'
    },
    {
      id: 2,
      title: 'Brand Identity Design',
      description: 'Complete brand identity packages including logo design, color palette, and brand guidelines.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/brand-identity'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'User-centered design for websites and applications focusing on usability and engagement.',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/ui-ux-design'
    },
    {
      id: 4,
      title: 'Print & Packaging',
      description: 'Professional print materials and packaging designs that stand out on shelves.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/print-packaging'
    },
    {
      id: 5,
      title: 'Motion Graphics',
      description: 'Animated videos and graphics for social media, presentations, and marketing.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/motion-graphics'
    },
    {
      id: 6,
      title: 'Website Design',
      description: 'Modern, responsive websites that convert visitors into customers.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/website-design'
    },
    {
      id: 7,
      title: 'Landing Page Design',
      description: 'High-converting landing pages designed to capture leads and drive sales.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/landing-page'
    },
    {
      id: 8,
      title: 'PowerPoint Design',
      description: 'Professional presentation designs that captivate your audience.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/powerpoint-design'
    },
    {
      id: 9,
      title: 'SaaS Product Design',
      description: 'Design solutions tailored for software-as-a-service products.',
      image: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/saas-design'
    },
    {
      id: 10,
      title: 'Amazon Design',
      description: 'Optimized product listings and branding for Amazon sellers.',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/amazon-design'
    },
    {
      id: 11,
      title: 'Startup Design',
      description: 'Design solutions for startups looking to make a strong first impression.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/startup-design'
    },
    {
      id: 12,
      title: 'Software Design',
      description: 'User-friendly software interfaces that enhance productivity.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/software-design'
    }
  ];

  // Tech Services
  const techServices = [
    {
      id: 1,
      title: 'Computer Repair',
      description: 'Professional repair services for all computer makes and models.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/computer-repair'
    },
    {
      id: 2,
      title: 'Windows Installation',
      description: 'Complete Windows OS installation, configuration, and optimization.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/windows-installation'
    },
    {
      id: 3,
      title: 'Software Support',
      description: 'Installation and configuration of all types of software applications.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/software-support'
    },
    {
      id: 4,
      title: 'New Computer Setup',
      description: 'Complete setup and configuration of new computer systems.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/computer-setup'
    },
    {
      id: 5,
      title: 'Networking Solutions',
      description: 'Setup and management of wired and wireless networks.',
      image: 'https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/networking'
    },
    {
      id: 6,
      title: 'System Management',
      description: 'Ongoing maintenance and management of computer systems.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      link: '/system-management'
    }
  ];

  // Partner logos
  const partnerLogos = [
    '/images/partner-logo-1.svg',
    '/images/partner-logo-2.svg',
    '/images/partner-logo-3.svg',
    '/images/partner-logo-4.svg',
    '/images/partner-logo-5.svg',
  ];

  const currentServices = activeTab === 'design' ? designServices : techServices;

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

      {/* ============================================
          HERO SECTION - DUCK DESIGN STYLE
          ============================================ */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content animate-on-scroll">
            <h1 className="page-title page-title_small text-center">
              Scale your success with outstanding design
            </h1>
            <p className="hero-section__txt text-center">
              Leading companies trust Fast Multimedia to deliver high-quality design at scale. 
              Book a call and start working with a dedicated team of professional designers.
            </p>
            <div className="hero-section__btngroup">
              <button 
                className="btn btn-primary btn-primary_arrow"
                onClick={() => navigate('/contact')}
              >
                Book a Call <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES GRID - DUCK DESIGN STYLE
          ============================================ */}
      <section className="dservices-section">
        <div className="container">
          <h2 className="section-title text-left animate-on-scroll">Design Services</h2>
          
          {/* Service Tabs */}
          <div className="services-tabs animate-on-scroll">
            <button 
              className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              <span>Design Services</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
              onClick={() => setActiveTab('tech')}
            >
              <span>Tech Services</span>
            </button>
          </div>

          <div className="dservices-section__list">
            {currentServices.map((service, index) => (
              <a 
                key={service.id} 
                href={service.link}
                className="dservices-section__item animate-on-scroll"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  handleServiceClick(service.title, activeTab === 'design' ? 'Design Service' : 'Tech Service');
                }}
              >
                <img 
                  className="dservices-section__icon" 
                  src={service.image} 
                  alt={service.title} 
                />
                <span className="dservices-section__head">
                  <span>{service.title}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PARTNER SECTION - DUCK DESIGN STYLE
          ============================================ */}
      <section className="partner-section">
        <div className="container">
          <div className="partner-section__col">
            <div className="partner-section__left">
              <h2 className="section-title animate-on-scroll">
                "Clients we are proud of" <br />
                Trust from major international companies
              </h2>
            </div>
            <div className="partner-section__right animate-on-scroll">
              <div className="partner-section__list horslider-left">
                {partnerLogos.map((logo, index) => (
                  <div key={index} className="partner-section__item">
                    <img src={logo} alt="Partner" />
                  </div>
                ))}
                {partnerLogos.map((logo, index) => (
                  <div key={`dup-${index}`} className="partner-section__item">
                    <img src={logo} alt="Partner" />
                  </div>
                ))}
              </div>
              <div className="partner-section__list horslider-rightcenter">
                {partnerLogos.map((logo, index) => (
                  <div key={`second-${index}`} className="partner-section__item">
                    <img src={logo} alt="Partner" />
                  </div>
                ))}
                {partnerLogos.map((logo, index) => (
                  <div key={`second-dup-${index}`} className="partner-section__item">
                    <img src={logo} alt="Partner" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT MAKES US DIFFERENT - DUCK DESIGN STYLE
          ============================================ */}
      <section className="include-section" id="include">
        <div className="container">
          <div className="include-section__col">
            <div className="include-section__info">
              <div className="page-pretitle text-left animate-on-scroll">
                see how we compare
              </div>
              <h2 className="section-title text-left animate-on-scroll">
                What Makes Us Different?
              </h2>
              <div className="include-section__txt animate-on-scroll">
                We will take care of all your creative needs. No inefficient freelancers. 
                No lengthy hiring procedures. No contracts. Just your work getting done!
              </div>
            </div>
            <div className="include-section__list">
              {[
                'Unlimited requests',
                'Real-time collaboration',
                'Unlimited revisions',
                'Trello Project Management',
                'Unlimited brand profiles',
                '7-day money-back guarantee',
                'Native source files',
                'Cancel anytime',
                'Art Director',
                'Middle+/Senior Designer',
                'Project Manager'
              ].map((feature, index) => (
                <div key={index} className="include-section__item animate-on-scroll">
                  <div className="include-section__icon">
                    <img src={`/images/differentsicon-${(index % 11) + 1}.svg`} alt={feature} />
                  </div>
                  <div className="include-section__name">{feature}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PREFERENCE SECTION - DUCK DESIGN STYLE
          ============================================ */}
      <section className="preference-section">
        <div className="container">
          <div className="preference-section__list">
            {[
              { icon: '/images/preficonn-3.svg', title: 'Fixed monthly rate', desc: 'No hidden costs. Pay the same price every month.' },
              { icon: '/images/preficonn-4.svg', title: 'Unlimited requests', desc: 'Don\'t limit your creativity. Request as many designs as you need.' },
              { icon: '/images/preficonn-5.svg', title: 'Unlimited revisions', desc: 'Request changes without limits. We iterate until you say it\'s perfect.' },
              { icon: '/images/time-icon.svg', title: 'Same-day delivery', desc: 'Receive your designs on the same day with our higher-tier package.' },
              { icon: '/images/preficonn-6.svg', title: 'Professional designers', desc: 'Work with experienced designers who bring creativity and precision to every project.' },
              { icon: '/images/preficonn-1.svg', title: 'Designer match', desc: 'Each request goes to the most qualified designer for the job.' }
            ].map((item, index) => (
              <div key={index} className="preference-section__item animate-on-scroll">
                <div className="preference-section__icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="preference-section__info">
                  <div className="preference-section__head">{item.title}</div>
                  <div className="preference-section__txt">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          WHO IS IT FOR - DUCK DESIGN STYLE
          ============================================ */}
      <section className="whois-section">
        <div className="container">
          <h2 className="section-title text-center animate-on-scroll">Who is it For?</h2>
          <p className="section-txt text-center animate-on-scroll">
            No client or task is too big or small. If you want to strengthen your brand 
            and drive more creativity, you're in the right place.
          </p>
          <div className="whois-tabs">
            <div className="content-tabs__nav animate-on-scroll">
              <button className="btn content-tabs__btn active" data-tab="who1">
                <span>Agencies</span>
              </button>
              <button className="btn content-tabs__btn" data-tab="who2">
                <span>Small and Medium-Sized Businesses</span>
              </button>
              <button className="btn content-tabs__btn" data-tab="who3">
                <span>Marketing teams</span>
              </button>
              <button className="btn content-tabs__btn" data-tab="who4">
                <span>Large Enterprise</span>
              </button>
            </div>
            <div className="whois-section__list">
              {/* Tab 1 - Agencies */}
              <div className="content-tabs__items active" data-tab="who1" id="who1">
                <div className="whois-section__icon">
                  <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Agencies" />
                </div>
                <div className="whois-section__info">
                  <div className="whois-section__head">Multiply your agency output without multiplying your overhead costs.</div>
                  <div className="whois-section__txt">Overwhelmed? Overworked? Not anymore! Our vetted designers handle your design requests, freeing you up to focus on growing your business and delivering results for your clients.</div>
                  <ul className="whois-section__ul">
                    <li>SAVE TIME AND MONEY ON CREATIVE PRODUCTION</li>
                    <li>SCALE UP AND DOWN AS NEEDED</li>
                    <li>MEET TIGHT DEADLINES WITH EASE</li>
                  </ul>
                </div>
              </div>
              {/* Tab 2 - SMBs */}
              <div className="content-tabs__items" data-tab="who2" id="who2">
                <div className="whois-section__icon">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="SMBs" />
                </div>
                <div className="whois-section__info">
                  <div className="whois-section__head">Flat-rate graphic design to help you grow your business.</div>
                  <div className="whois-section__txt">Don't break your budget or settle for sloppy design that harms your business. Knock your competitors out of the park while saving money.</div>
                  <ul className="whois-section__ul">
                    <li>Scale your business</li>
                    <li>Cut hiring costs up to 70%</li>
                    <li>Limit risk with no contracts</li>
                  </ul>
                </div>
              </div>
              {/* Tab 3 - Marketing Teams */}
              <div className="content-tabs__items" data-tab="who3" id="who3">
                <div className="whois-section__icon">
                  <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Marketing Teams" />
                </div>
                <div className="whois-section__info">
                  <div className="whois-section__head">Position your marketing team for rapid growth.</div>
                  <div className="whois-section__txt">Reach your marketing goals without getting bogged down by graphics! You provide the ideas and concepts, and we deliver top-notch marketing materials.</div>
                  <ul className="whois-section__ul">
                    <li>Eliminate creative bottlenecks</li>
                    <li>Get your creative to market 3x faster</li>
                    <li>Supplement your existing graphic design process</li>
                  </ul>
                </div>
              </div>
              {/* Tab 4 - Large Enterprise */}
              <div className="content-tabs__items" data-tab="who4" id="who4">
                <div className="whois-section__icon">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Large Enterprise" />
                </div>
                <div className="whois-section__info">
                  <div className="whois-section__head">A Single Subscription to Replace Your Company's Design Departments.</div>
                  <div className="whois-section__txt">With one subscription, we handle all your business's design needs across every department. Your projects will be overseen by a dedicated manager, and our expert team will efficiently meet any of your demands.</div>
                  <ul className="whois-section__ul">
                    <li>No more in-house design departments or full-time designers</li>
                    <li>Significant time savings for your managers</li>
                    <li>Reduced costs on salaries and recruitment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION - DUCK DESIGN STYLE
          ============================================ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title text-center animate-on-scroll">Got Any Questions?</h2>
          <div className="faq-section__items">
            {[
              {
                q: 'Who is it for?',
                a: 'Our service is perfect for businesses of all sizes and entrepreneurs at any stage. Fast Multimedia is ideal for anyone needing cost-effective, high-quality graphic design on an ongoing basis. Hire Designer service makes you feel like you have an in-house designer, but without the hefty price tag.'
              },
              {
                q: 'What does unlimited requests and revisions really mean?',
                a: 'With all our plans, you can submit as many design requests as needed, and our designers will work on them during normal business days. Revisions are also unlimited. No matter how many requests or revisions you submit, the price remains the same.'
              },
              {
                q: 'What is the turnaround time?',
                a: 'Our designers will work on your requests during normal business days, all year round. In most cases, we deliver the first update within 24 hours. For more complex requests, it may take up to 48 hours.'
              },
              {
                q: 'What kind of designs can I request?',
                a: 'You can request a wide range of designs, including: Website design, Logo design, Advertising banners, Social media posts, Infographics, Brand merchandise, Brochures, Pitch decks, Flyers, Brand identity, Emails, GIFs, Brand books, Package design, Graphic videos, and more.'
              },
              {
                q: 'Do I own the rights to the designs?',
                a: 'Yes. All our work is created specifically for you. You have full ownership of the files as soon as you receive them and are free to use them however you like. We always provide source files (PSD, AI, INDD, FIG, SKETCH) along with PNG, JPEG, SVG, and PDF formats.'
              },
              {
                q: 'Can I pause my subscription?',
                a: 'Yes, you can pause your subscription for up to 7 days, but only during the 3rd month of your subscription.'
              },
              {
                q: 'What is your 7-day money-back guarantee?',
                a: 'All our plans come with a full 7-day money-back guarantee. If, after several design requests, you still don\'t think Fast Multimedia is the right fit for you, we will refund 100% of your initial membership fee.'
              },
              {
                q: 'What are your designers\' working hours?',
                a: 'Designers work on Monday to Friday, from 09:00 to 18:00 (GMT+2).'
              }
            ].map((faq, index) => (
              <div key={index} className="faq-section__item">
                <button className="faq-btn" type="button">{faq.q}</button>
                <div className="faq-section__answer">
                  <div className="faq-section__answer-inner">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA SECTION - DUCK DESIGN STYLE
          ============================================ */}
      <section className="cta-boxbg cta-boxbg_contact">
        <div className="container">
          <div className="cta-boxbg__inner">
            <div className="cta-boxbg__left">
              <div className="section-pretitle text-left animate-on-scroll">LET'S WORK TOGETHER</div>
              <h2 className="section-title text-left animate-on-scroll">Contact Us</h2>
              <p className="section-txt text-left animate-on-scroll">
                Know what you want? Great.<br />
                Got questions? Even better.
              </p>
              <div className="contactcta-section__btngroup text-left animate-on-scroll">
                <button 
                  className="btn btn-white btn-primary_arrow"
                  onClick={() => navigate('/contact')}
                >
                  BOOK A CALL NOW <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>
            <div className="cta-boxbg__img">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Contact Us" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
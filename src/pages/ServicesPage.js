import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaArrowRight, FaCheckCircle, FaPlusCircle,
  FaComments, FaClipboardList, FaPaintBrush, FaSearch, FaPaperPlane, FaHeadset,
  FaBolt, FaShieldAlt, FaUsers, FaHandshake, FaCalendarCheck, FaFileInvoiceDollar,
  FaStar, FaClock, FaAward, FaPalette, FaMobileAlt, FaPrint, FaShareAlt, FaCode, FaFilm,
  FaTools, FaWindows, FaDownload, FaLaptop, FaNetworkWired, FaServer, FaShoppingCart, FaRocket
} from 'react-icons/fa';
import './Services.css';

// ===== SVG ICON COMPONENTS =====
const DifferentsIcon1 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const DifferentsIcon2 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const DifferentsIcon3 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const DifferentsIcon4 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const DifferentsIcon5 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
  </svg>
);

const DifferentsIcon6 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18" r="2.5"/>
    <circle cx="18.5" cy="18" r="2.5"/>
  </svg>
);

const DifferentsIcon7 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const DifferentsIcon8 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const DifferentsIcon9 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const DifferentsIcon10 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

const DifferentsIcon11 = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

// Map for different icons
const differentsIcons = {
  1: DifferentsIcon1,
  2: DifferentsIcon2,
  3: DifferentsIcon3,
  4: DifferentsIcon4,
  5: DifferentsIcon5,
  6: DifferentsIcon6,
  7: DifferentsIcon7,
  8: DifferentsIcon8,
  9: DifferentsIcon9,
  10: DifferentsIcon10,
  11: DifferentsIcon11,
};

// ===== PREFERENCE ICONS =====
const PrefIcon1 = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FF8B20" opacity="0.1"/>
    <path d="M50 20V80M20 50H80" stroke="#FF8B20" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="8" fill="#FF8B20"/>
  </svg>
);

const PrefIcon2 = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FF8B20" opacity="0.1"/>
    <path d="M30 40L45 55L70 30" stroke="#FF8B20" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="8" fill="#FF8B20"/>
  </svg>
);

const PrefIcon3 = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FF8B20" opacity="0.1"/>
    <path d="M30 40L45 55L70 30" stroke="#FF8B20" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 55L45 70L70 45" stroke="#FF8B20" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="8" fill="#FF8B20"/>
  </svg>
);

const PrefIcon4 = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FF8B20" opacity="0.1"/>
    <circle cx="50" cy="50" r="10" fill="#FF8B20"/>
    <path d="M50 35V50L60 60" stroke="#FF8B20" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const PrefIcon5 = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FF8B20" opacity="0.1"/>
    <path d="M30 50L45 65L70 40" stroke="#FF8B20" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="8" fill="#FF8B20"/>
  </svg>
);

const PrefIcon6 = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FF8B20" opacity="0.1"/>
    <path d="M35 50L45 60L65 40" stroke="#FF8B20" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="8" fill="#FF8B20"/>
  </svg>
);

const prefIcons = [
  PrefIcon1,
  PrefIcon2,
  PrefIcon3,
  PrefIcon4,
  PrefIcon5,
  PrefIcon6,
];

const ServicesPage = () => {
  const navigate = useNavigate();

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

  // Design Services - All visible
  const designServices = [
    {
      id: 1,
      title: 'Graphic Design',
      description: 'Professional graphic design services for all your visual needs.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      icon: FaPalette,
      color: '#ff8b20',
      link: '/graphic-design'
    },
    // ... rest of design services
  ];

  // Tech Services - All visible
  const techServices = [
    // ... same as before
  ];

  return (
    <div className="services-page">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content animate-on-scroll">
            <h1 className="page-title page-title_small text-center">
              Scale your success with outstanding <span className="gradient-text">Design</span> &amp; <span className="gradient-text">Tech</span> Services
            </h1>
            <p className="hero-section__txt text-center">
              Leading companies trust Fast Multimedia to deliver high-quality design and reliable technical solutions at scale. 
              Book a call and start working with a dedicated team of professional designers and tech experts.
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
          DESIGN SERVICES
          ============================================ */}
      <section className="dservices-section">
        <div className="container">
          <h2 className="section-title text-left animate-on-scroll">
            <span className="gradient-text">Design</span> Services
          </h2>
          <p className="section-subtitle animate-on-scroll">
            Creative design solutions that make your brand stand out
          </p>

          <div className="dservices-section__list">
            {designServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.id} 
                  to={`/services${service.link}`}
                  className="dservices-section__item animate-on-scroll"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img 
                    className="dservices-section__icon" 
                    src={service.image} 
                    alt={service.title} 
                  />
                  <div className="dservices-section__overlay">
                    <div className="dservices-section__icon-wrapper" style={{ backgroundColor: service.color }}>
                      <Icon className="dservices-section__icon-icon" />
                    </div>
                    <span className="dservices-section__head">{service.title}</span>
                    <p className="dservices-section__desc">{service.description}</p>
                    <span className="dservices-section__link">
                      Learn More <FaArrowRight />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          TECH SERVICES
          ============================================ */}
      <section className="dservices-section tech-services">
        <div className="container">
          <h2 className="section-title text-left animate-on-scroll">
            <span className="gradient-text">Tech</span> Services
          </h2>
          <p className="section-subtitle animate-on-scroll">
            Reliable technical solutions to keep your systems running smoothly
          </p>

          <div className="dservices-section__list">
            {techServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link 
                  key={service.id} 
                  to={`/services${service.link}`}
                  className="dservices-section__item animate-on-scroll"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img 
                    className="dservices-section__icon" 
                    src={service.image} 
                    alt={service.title} 
                  />
                  <div className="dservices-section__overlay">
                    <div className="dservices-section__icon-wrapper" style={{ backgroundColor: service.color }}>
                      <Icon className="dservices-section__icon-icon" />
                    </div>
                    <span className="dservices-section__head">{service.title}</span>
                    <p className="dservices-section__desc">{service.description}</p>
                    <span className="dservices-section__link">
                      Learn More <FaArrowRight />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          PARTNER SECTION
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
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="partner-section__item">
                    <div className="partner-logo-placeholder">Logo {i}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHAT MAKES US DIFFERENT
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
                We will take care of all your creative and technical needs. No inefficient freelancers. 
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
              ].map((feature, index) => {
                const IconComponent = differentsIcons[(index % 11) + 1];
                return (
                  <div key={index} className="include-section__item animate-on-scroll">
                    <div className="include-section__icon">
                      <IconComponent />
                    </div>
                    <div className="include-section__name">{feature}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PREFERENCE SECTION
          ============================================ */}
      <section className="preference-section">
        <div className="container">
          <div className="preference-section__list">
            {[
              { title: 'Fixed monthly rate', desc: 'No hidden costs. Pay the same price every month.' },
              { title: 'Unlimited requests', desc: 'Don\'t limit your creativity. Request as many designs as you need.' },
              { title: 'Unlimited revisions', desc: 'Request changes without limits. We iterate until you say it\'s perfect.' },
              { title: 'Same-day delivery', desc: 'Receive your designs on the same day with our higher-tier package.' },
              { title: 'Professional designers', desc: 'Work with experienced designers who bring creativity and precision to every project.' },
              { title: 'Designer match', desc: 'Each request goes to the most qualified designer for the job.' }
            ].map((item, index) => {
              const IconComponent = prefIcons[index];
              return (
                <div key={index} className="preference-section__item animate-on-scroll">
                  <div className="preference-section__icon">
                    <IconComponent />
                  </div>
                  <div className="preference-section__info">
                    <div className="preference-section__head">{item.title}</div>
                    <div className="preference-section__txt">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          WHO IS IT FOR
          ============================================ */}
      <section className="whois-section">
        <div className="container">
          <h2 className="section-title text-center animate-on-scroll">Who is it For?</h2>
          <p className="section-txt text-center animate-on-scroll">
            No client or task is too big or small. If you want to strengthen your brand, improve your technology, 
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
                  <div className="whois-section__txt">Overwhelmed? Overworked? Not anymore! Our vetted designers handle your design and tech requests, freeing you up to focus on growing your business and delivering results for your clients.</div>
                  <ul className="whois-section__ul">
                    <li><FaCheckCircle /> SAVE TIME AND MONEY ON CREATIVE PRODUCTION</li>
                    <li><FaCheckCircle /> SCALE UP AND DOWN AS NEEDED</li>
                    <li><FaCheckCircle /> MEET TIGHT DEADLINES WITH EASE</li>
                  </ul>
                </div>
              </div>
              {/* Tab 2 - SMBs */}
              <div className="content-tabs__items" data-tab="who2" id="who2">
                <div className="whois-section__icon">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="SMBs" />
                </div>
                <div className="whois-section__info">
                  <div className="whois-section__head">Flat-rate design and tech solutions to help you grow your business.</div>
                  <div className="whois-section__txt">Don't break your budget or settle for subpar design and technology that harms your business. Knock your competitors out of the park while saving money.</div>
                  <ul className="whois-section__ul">
                    <li><FaCheckCircle /> Scale your business</li>
                    <li><FaCheckCircle /> Cut hiring costs up to 70%</li>
                    <li><FaCheckCircle /> Limit risk with no contracts</li>
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
                  <div className="whois-section__txt">Reach your marketing goals without getting bogged down by graphics and technical issues! You provide the ideas and concepts, and we deliver top-notch marketing materials and tech support.</div>
                  <ul className="whois-section__ul">
                    <li><FaCheckCircle /> Eliminate creative and technical bottlenecks</li>
                    <li><FaCheckCircle /> Get your creative to market 3x faster</li>
                    <li><FaCheckCircle /> Supplement your existing design and tech processes</li>
                  </ul>
                </div>
              </div>
              {/* Tab 4 - Large Enterprise */}
              <div className="content-tabs__items" data-tab="who4" id="who4">
                <div className="whois-section__icon">
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Large Enterprise" />
                </div>
                <div className="whois-section__info">
                  <div className="whois-section__head">A Single Subscription to Replace Your Company's Design and Tech Departments.</div>
                  <div className="whois-section__txt">With one subscription, we handle all your business's design and tech needs across every department. Your projects will be overseen by a dedicated manager, and our expert team will efficiently meet any of your demands.</div>
                  <ul className="whois-section__ul">
                    <li><FaCheckCircle /> No more in-house design or tech departments</li>
                    <li><FaCheckCircle /> Significant time savings for your managers</li>
                    <li><FaCheckCircle /> Reduced costs on salaries and recruitment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title text-center animate-on-scroll">Got Any Questions?</h2>
          <div className="faq-section__items">
            {[
              {
                q: 'Who is it for?',
                a: 'Our service is perfect for businesses of all sizes and entrepreneurs at any stage. Fast Multimedia is ideal for anyone needing cost-effective, high-quality design and tech solutions on an ongoing basis. Our service makes you feel like you have an in-house team, but without the hefty price tag.'
              },
              {
                q: 'What does unlimited requests and revisions really mean?',
                a: 'With all our plans, you can submit as many design and tech requests as needed, and our team will work on them during normal business days. Revisions are also unlimited. No matter how many requests or revisions you submit, the price remains the same.'
              },
              {
                q: 'What is the turnaround time?',
                a: 'Our team will work on your requests during normal business days, all year round. In most cases, we deliver the first update within 24 hours. For more complex requests, it may take up to 48 hours.'
              },
              {
                q: 'What kind of services can I request?',
                a: 'You can request a wide range of design and tech services, including: Website design, Logo design, Advertising banners, Social media posts, Infographics, Brand merchandise, Brochures, Pitch decks, Flyers, Brand identity, Emails, GIFs, Brand books, Package design, Graphic videos, Computer repair, Windows installation, Software support, Networking solutions, System management, and more.'
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
                a: 'All our plans come with a full 7-day money-back guarantee. If, after several requests, you still don\'t think Fast Multimedia is the right fit for you, we will refund 100% of your initial membership fee.'
              },
              {
                q: 'What are your team\'s working hours?',
                a: 'Our team works on Monday to Friday, from 09:00 to 18:00 (GMT+2).'
              }
            ].map((faq, index) => (
              <div key={index} className="faq-section__item">
                <button className="faq-btn" type="button" onClick={(e) => {
                  const item = e.currentTarget.closest('.faq-section__item');
                  const answer = item.querySelector('.faq-section__answer');
                  const isActive = item.classList.contains('active');
                  
                  // Close all others
                  document.querySelectorAll('.faq-section__item').forEach(el => {
                    el.classList.remove('active');
                    const ans = el.querySelector('.faq-section__answer');
                    ans.style.maxHeight = '0';
                  });
                  
                  if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                  }
                }}>
                  {faq.q}
                </button>
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
          CTA SECTION
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
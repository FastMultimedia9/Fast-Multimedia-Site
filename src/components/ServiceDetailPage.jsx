import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import './ServiceDetailPage.css';

const ServiceDetailPage = ({ service }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('1');
  const [price, setPrice] = useState(service?.price || '₵1,199');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <div className="service-not-found">Service not found</div>;
  }

  const handleBookCall = () => {
    navigate('/contact');
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    let basePrice = parseFloat(service.price?.replace(/[₵,]/g, '') || 1199);
    let newPrice = basePrice;
    if (plan === '3') {
      newPrice = Math.round((basePrice * 3 * 0.9) / 3);
    } else if (plan === '6') {
      newPrice = Math.round((basePrice * 6 * 0.8) / 6);
    }
    setPrice(`₵${newPrice.toLocaleString()}`);
  };

  const features = service.features || [
    'Professional Design & Execution',
    'Unlimited Revisions',
    'Fast Turnaround',
    'Source Files Included'
  ];

  // Hero image mapping based on service
  const getHeroImages = () => {
    const imageMap = {
      'Graphic Design': {
        desktop: 'https://duck.design/wp-content/uploads/2024/05/servicon_bscrenn.png',
        mobile: 'https://duck.design/wp-content/uploads/2024/05/serv-gr-2x.png'
      },
      'Brand Identity Design': {
        desktop: 'https://duck.design/wp-content/uploads/2024/05/servicon_bscrenn.png',
        mobile: 'https://duck.design/wp-content/uploads/2024/05/serv-gr-2x.png'
      },
      'UI/UX Design': {
        desktop: 'https://duck.design/wp-content/uploads/2024/05/servicon_bscrenn.png',
        mobile: 'https://duck.design/wp-content/uploads/2024/05/serv-gr-2x.png'
      },
      'Motion Graphics': {
        desktop: 'https://duck.design/wp-content/uploads/2024/05/servicon_bscrenn.png',
        mobile: 'https://duck.design/wp-content/uploads/2024/05/serv-gr-2x.png'
      },
      'Website Design': {
        desktop: 'https://duck.design/wp-content/uploads/2024/05/servicon_bscrenn.png',
        mobile: 'https://duck.design/wp-content/uploads/2024/05/serv-gr-2x.png'
      }
    };
    return imageMap[service.title] || imageMap['Graphic Design'];
  };

  const images = getHeroImages();

  return (
    <div className="service-detail-page">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section hero-section_capability">
        <div className="container-wide">
          <div className="hero-section__col">
            <div className="hero-section__left">
              <ul className="breadcrumbs">
                <li><a href="/">Home</a> <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M6.5 12L10.5 8L6.5 4" stroke="#434C62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></li>
                <li><span>{service.title} Services</span></li>
              </ul>
              <h1 className="page-title wow fadeInUp" data-wow-delay=".2s">
                {service.title} <span className="gradient-text">Services</span>
              </h1>
              <div className="hero-section__txt wow fadeInUp" data-wow-delay=".3s">
                {service.longDescription || `Get all your ${service.title.toLowerCase()} needs met with our dedicated team of experts.`}
              </div>
              <div className="hero-section__btngroup wow fadeInUp" data-wow-delay=".4s">
                <button className="btn btn-primary btn-primary_arrow" onClick={handleBookCall}>
                  Book a 15 min demo <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>
            <div className="hero-section__right wow fadeInUp" data-wow-delay=".3s">
              {/* Mobile Image - visible on smaller screens */}
              <div className="mobile-only_xl">
                <img 
                  src={images.mobile} 
                  alt={service.title} 
                  className="hero-image-mobile"
                  width="1420" 
                  height="878"
                />
              </div>
              {/* Desktop Image - visible on larger screens */}
              <div className="desktop-only_xl">
                <img 
                  src={images.desktop} 
                  alt={service.title} 
                  className="hero-image-desktop"
                  width="1700" 
                  height="1162"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="team-section">
        <div className="container">
          <div className="team-section__column">
            <div className="team-section__info">
              <h2 className="section-title wow fadeInUp" data-wow-delay=".2s">
                A dedicated <span className="txtorange_bg">super team</span> for all types of {service.title.toLowerCase()} from A to Z
              </h2>
              <div className="team-section__txt wow fadeInUp" data-wow-delay=".3s">
                {service.offeringsDescription || `Professional ${service.title.toLowerCase()} solutions for all your business needs.`}
              </div>
            </div>
            <div className="team-section__list wow fadeInUp">
              <div className="team-section__item">
                <div className="team-section__head">7+ years</div>
                <div className="team-section__item-txt">Fast Multimedia<br /> on the market</div>
              </div>
              <div className="team-section__item">
                <div className="team-section__head">3%</div>
                <div className="team-section__item-txt">Get hired at<br /> Fast Multimedia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section className="price-section price-section_mini" id="pricing">
        <div className="container-l">
          <div className="price-sale__nav">
            <div className="price-sale">
              <div 
                className={`price-sale__item ${selectedPlan === '1' ? 'active' : ''}`} 
                data-month="1"
                onClick={() => handlePlanChange('1')}
              >
                1 month
              </div>
              <div 
                className={`price-sale__item ${selectedPlan === '3' ? 'active' : ''}`} 
                data-month="3"
                onClick={() => handlePlanChange('3')}
              >
                3 months <span className="price-sale__label">10% off</span>
              </div>
              <div 
                className={`price-sale__item ${selectedPlan === '6' ? 'active' : ''}`} 
                data-month="6"
                onClick={() => handlePlanChange('6')}
              >
                6 months <span className="price-sale__label">20% off</span>
              </div>
            </div>
          </div>
          <div className="price-item en price-item_yellow">
            <div className="price-item__top">
              <div className="price-item__info">
                <div className="price-item__oneline">
                  <div className="price-item__info-txt">
                    <div className="price-item__label-box">
                      <div className="price-item__label">🖌 {service.title}</div>
                    </div>
                    <h3 className="price-item__title">{service.title}</h3>
                  </div>
                </div>
                <div className="price-item__desc">
                  {service.offeringsDescription || `Professional ${service.title.toLowerCase()} solutions for all your business needs.`}
                </div>
              </div>
              <div className="price-item__box">
                <ul className="price-item__includes">
                  {features.map((feature, index) => (
                    <li key={index} className="price-item__includes-name">
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1.3335" y="1.5" width="22" height="22" rx="11" fill="white"/>
                        <rect x="1.3335" y="1.5" width="22" height="22" rx="11" stroke="url(#paint0_linear_4305_20787)" strokeWidth="2"/>
                        <path d="M16.3335 9.83337L10.8335 15.1667L8.3335 12.7425" stroke="#2C3449" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <defs>
                          <linearGradient id="paint0_linear_4305_20787" x1="12.3335" y1="2.5" x2="12.3335" y2="22.5" gradientUnits="userSpaceOnUse">
                            <stop stopColor="white"/>
                            <stop offset="1" stopColor="white" stopOpacity="0.3"/>
                          </linearGradient>
                        </defs>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="price-item__right">
              <div className="price-item__info-price">
                <div className="price-item__price">
                  <div className="price-item__price-count">
                    <span className="price-item__currency active">₵</span>
                    <span data-price="1199" className="price-item__price">{price.replace('₵', '')}</span>
                  </div>
                  <div className="price-item__price-txt">
                    PER MONTH
                  </div>
                </div>
              </div>
              <button className="btn btn-white price-item__link" onClick={handleBookCall}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT MAKES US DIFFERENT ===== */}
      <section className="different-section">
        <div className="container">
          <div className="different-section__col">
            <div className="different-section__img wow fadeInUp" data-wow-delay=".2s">
              <svg width="459" height="571" viewBox="0 0 459 571" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="359" height="471" rx="30" fill="#F8F5F0" stroke="#E8E0D6" strokeWidth="2"/>
                <circle cx="229" cy="285" r="150" fill="#E8A04A" opacity="0.1"/>
                <circle cx="229" cy="285" r="100" fill="#E8A04A" opacity="0.15"/>
                <circle cx="229" cy="285" r="50" fill="#E8A04A" opacity="0.2"/>
                <text x="229" y="295" textAnchor="middle" fontFamily="Arial" fontSize="24" fontWeight="bold" fill="#2C3449">{service.title}</text>
              </svg>
            </div>
            <div className="different-section__info">
              <h2 className="section-title text-left wow fadeInUp" data-wow-delay=".2s">
                What makes us different?
              </h2>
              <div className="different-section__txt wow fadeInUp" data-wow-delay=".3s">
                <p>Fast Multimedia delivers speedy, high-quality {service.title.toLowerCase()} work with a transparent subscription model. Over 400 high-growth and enterprise companies trust Fast Multimedia to produce great, on-brand {service.title.toLowerCase()} at scale.</p>
                <p>Invite your entire team to make requests—from {service.title.toLowerCase()} to marketing assets—in one centralized platform with a dedicated team that scales up and down with your needs.</p>
              </div>
              <div className="different-section__btn wow fadeInUp" data-wow-delay=".4s">
                <button className="btn btn-primary btn-primary_arrow" onClick={handleBookCall}>
                  SEE IT IN ACTION <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PREFERENCE SECTION ===== */}
      <section className="preference-section">
        <div className="container">
          <div className="preference-section__list">
            <div className="preference-section__item wow fadeInUp">
              <div className="preference-section__icon">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#E8A04A" opacity="0.1"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40">💰</text>
                </svg>
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Fixed monthly rate</div>
                <div className="preference-section__txt">No hidden costs. Pay the same price every month.</div>
              </div>
            </div>
            <div className="preference-section__item wow fadeInUp">
              <div className="preference-section__icon">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#E8A04A" opacity="0.1"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40">♾️</text>
                </svg>
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Unlimited requests</div>
                <div className="preference-section__txt">Don't limit your creativity. Request as many designs as you need.</div>
              </div>
            </div>
            <div className="preference-section__item wow fadeInUp">
              <div className="preference-section__icon">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#E8A04A" opacity="0.1"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40">🔄</text>
                </svg>
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Unlimited revisions</div>
                <div className="preference-section__txt">Request changes without limits. We iterate until you say it's perfect.</div>
              </div>
            </div>
            <div className="preference-section__item wow fadeInUp">
              <div className="preference-section__icon">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#E8A04A" opacity="0.1"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40">⏱️</text>
                </svg>
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Same-day delivery</div>
                <div className="preference-section__txt">Receive your designs on the same day with our higher-tier package.</div>
              </div>
            </div>
            <div className="preference-section__item wow fadeInUp">
              <div className="preference-section__icon">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#E8A04A" opacity="0.1"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40">👨‍🎨</text>
                </svg>
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Professional designers</div>
                <div className="preference-section__txt">Work with experienced designers who bring creativity and precision to every project.</div>
              </div>
            </div>
            <div className="preference-section__item wow fadeInUp">
              <div className="preference-section__icon">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="45" fill="#E8A04A" opacity="0.1"/>
                  <text x="50" y="60" textAnchor="middle" fontSize="40">🎯</text>
                </svg>
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Designer match</div>
                <div className="preference-section__txt">Each request goes to the most qualified designer for the job.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bigcta-section bigcta-section__2col">
        <div className="bigcta-section__inner">
          <div className="container">
            <h2 className="bigcta-section__title text-center wow fadeInUp" data-wow-delay=".2s">
              Your one-stop-shop for good {service.title.toLowerCase()}
            </h2>
            <div className="bigcta-section__column wow fadeInUp" data-wow-delay=".3s">
              <div className="bigcta-section__txt">
                Come join 400+ companies who are doing {service.title.toLowerCase()} at scale without increasing headcount
              </div>
              <div className="bigcta-section__btngroup">
                <button className="btn btn-white" onClick={handleBookCall}>
                  GET STARTED
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
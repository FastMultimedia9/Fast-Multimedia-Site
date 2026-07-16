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
                <li>
                  <a href="/">Home</a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M6.5 12L10.5 8L6.5 4" stroke="#434C62" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </li>
                <li><span>{service.title} Services</span></li>
              </ul>
              <h1 className="page-title">
                {service.title} <span className="gradient-text">Services</span>
              </h1>
              <div className="hero-section__txt">
                {service.longDescription || `Get all your ${service.title.toLowerCase()} needs met with our dedicated team of experts.`}
              </div>
              <div className="hero-section__btngroup">
                <button className="btn btn-primary btn-primary_arrow" onClick={handleBookCall}>
                  Book a 15 min demo <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>
            <div className="hero-section__right">
              <div className="mobile-only_xl">
                <img src={images.mobile} alt={service.title} className="hero-image-mobile" />
              </div>
              <div className="desktop-only_xl">
                <img src={images.desktop} alt={service.title} className="hero-image-desktop" />
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
              <h2 className="section-title">
                A dedicated <span className="txtorange_bg">super team</span> for all types of {service.title.toLowerCase()} from A to Z
              </h2>
              <div className="team-section__txt">
                {service.offeringsDescription || `Professional ${service.title.toLowerCase()} solutions for all your business needs.`}
              </div>
            </div>
            <div className="team-section__list">
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
                  <div className="price-item__price-txt">PER MONTH</div>
                </div>
              </div>
              <button className="btn btn-white price-item__link" onClick={handleBookCall}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALWAYS-ON SECTION ===== */}
      <section className="always-section" id="include">
        <div className="container">
          <div className="always-section__info">
            <h2 className="section-title text-left">
              We're always-on to deliver the {service.title.toLowerCase()} you want when you need it
            </h2>
          </div>
          <div className="always-section__list">
            <div className="always-section__item">
              <div className="always-section__head">
                <div className="always-section__icon">
                  <img src="https://duck.design/wp-content/uploads/2024/05/serviconalw03.png" width="103" height="103" alt="" />
                </div>
                <div className="always-section__name">Digital Ads &amp; <br />Marketing Design</div>
              </div>
              <div className="always-section__txt">Facebook, Instagram, Pinterest, Google Display and Banner ads — whatever channels you're investing in, Fast Multimedia can deliver the content and creative you need at lightning fast speeds!</div>
            </div>
            <div className="always-section__item">
              <div className="always-section__head">
                <div className="always-section__icon">
                  <img src="https://duck.design/wp-content/uploads/2024/05/graficicon02.svg" width="103" height="103" alt="" />
                </div>
                <div className="always-section__name">Motion Graphics Design</div>
              </div>
              <div className="always-section__txt">Use Fast Multimedia's motion graphics design studio to enhance your website design, digital campaigns, collateral and presentations.</div>
            </div>
            <div className="always-section__item">
              <div className="always-section__head">
                <div className="always-section__icon">
                  <img src="https://duck.design/wp-content/uploads/2024/05/graficicon03.svg" width="103" height="103" alt="" />
                </div>
                <div className="always-section__name">Print, Merch &amp; <br />Packaging Design</div>
              </div>
              <div className="always-section__txt">Get on-brand and meticulously designed packaging for various products, posters, book covers, magazines, tradeshow graphics, stickers, and more.</div>
            </div>
            <div className="always-section__item">
              <div className="always-section__head">
                <div className="always-section__icon">
                  <img src="https://duck.design/wp-content/uploads/2024/05/serviconalw05.png" width="103" height="103" alt="" />
                </div>
                <div className="always-section__name">Pitch Deck Design</div>
              </div>
              <div className="always-section__txt">Level up your slides, as well as produce eye-catching branded templates to help your teams scale presentation design.</div>
            </div>
            <div className="always-section__item">
              <div className="always-section__head">
                <div className="always-section__icon">
                  <img src="https://duck.design/wp-content/uploads/2024/05/serviconalw04.png" width="104" height="103" alt="" />
                </div>
                <div className="always-section__name">Illustration &amp; <br />Infographic Design</div>
              </div>
              <div className="always-section__txt">Create on-brand graphical illustrations, infographics and data visualization for use across your websites, collateral, reports and presentations.</div>
            </div>
            <div className="always-section__item">
              <div className="always-section__head">
                <div className="always-section__icon">
                  <img src="https://duck.design/wp-content/uploads/2024/05/graficicon06.svg" width="103" height="103" alt="" />
                </div>
                <div className="always-section__name">Landing Page Design</div>
              </div>
              <div className="always-section__txt">Marketing, Digital and Product teams rely on Fast Multimedia to create landing pages from scratch or based on existing materials for thoughtful UX wireframes and high-fidelity UI designs.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <section className="portfolio-mini portfolio-tabs__section" id="portfolio">
        <div className="container">
          <h2 className="section-title text-center">
            Take a look at some of our {service.title} work
          </h2>
          <div className="portfolio-tabs">
            <div className="portfolio-tabs__nav">
              <a href="#1" className="btn portfolio-tabs__btn active" data-tab="1">
                <span>Branding</span>
              </a>
              <a href="#2" className="btn portfolio-tabs__btn" data-tab="2">
                <span>Infographics</span>
              </a>
              <a href="#3" className="btn portfolio-tabs__btn" data-tab="3">
                <span>Logo</span>
              </a>
              <a href="#4" className="btn portfolio-tabs__btn" data-tab="4">
                <span>Presentation Design</span>
              </a>
              <a href="#5" className="btn portfolio-tabs__btn" data-tab="5">
                <span>UI/UX Design + Mobile App</span>
              </a>
              <a href="#6" className="btn portfolio-tabs__btn" data-tab="6">
                <span>Website</span>
              </a>
              <a href="#7" className="btn portfolio-tabs__btn" data-tab="7">
                <span>SAAS</span>
              </a>
              <a href="#8" className="btn portfolio-tabs__btn" data-tab="8">
                <span>Social Media banners &amp; Ad Creative</span>
              </a>
              <a href="#9" className="btn portfolio-tabs__btn" data-tab="9">
                <span>Gifs</span>
              </a>
              <a href="#10" className="btn portfolio-tabs__btn" data-tab="10">
                <span>Printing</span>
              </a>
              <a href="#11" className="btn portfolio-tabs__btn" data-tab="11">
                <span>Videos</span>
              </a>
            </div>
            <div className="portfolio-tabs__main">
              <div className="portfolio-tabs__items portfolio-tab active" data-tab="1" id="1">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#7A48E8' : '#F57B0C' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#7A48E8' : '#F57B0C'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/05/1-${i}-1.png`} 
                            alt={`Portfolio ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="2" id="2">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[2,3,4,5,6,7].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#4955AE' : '#915ACF' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#4955AE' : '#915ACF'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/10/infographics-${i}.png`} 
                            alt={`Infographic ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="3" id="3">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#272727' : '#7F3E87' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#272727' : '#7F3E87'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/05/2-${i}-1.png`} 
                            alt={`Logo ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="4" id="4">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[4,3,2,1,6,5].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#FF9F59' : '#DCFF03' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#FF9F59' : '#DCFF03'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/06/pd-${i}.png`} 
                            alt={`Presentation ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="5" id="5">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[4,3,2,1,6,5].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#5D7DF7' : '#9136FD' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#5D7DF7' : '#9136FD'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/06/uxui-${i}.png`} 
                            alt={`UI/UX ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="6" id="6">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[4,3,2,1,6,5].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#EEFF81' : '#EDEFF2' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#EEFF81' : '#EDEFF2'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/06/website-${i}.png`} 
                            alt={`Website ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="7" id="7">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[4,3,2,1,6,5].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#213238' : '#CBD7E7' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#213238' : '#CBD7E7'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/06/saas-${i}.png`} 
                            alt={`SAAS ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="8" id="8">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[6,5,4,3,2,1].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#323232' : '#242422' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#323232' : '#242422'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/06/smm-${i}.png`} 
                            alt={`Social Media ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="9" id="9">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[4,3,2,6,5,1].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#001122' : '#EDB51A' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#001122' : '#EDB51A'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2022/01/${i}.gif`} 
                            alt={`GIF ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="10" id="10">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} style={{ backgroundColor: i % 2 === 0 ? '#7D99A7' : '#E99274' }}>
                        <a href="#" className="portfolio-tabs__img" data-lightbox="portfolio" data-bg={i % 2 === 0 ? '#7D99A7' : '#E99274'}>
                          <img 
                            src={`https://duck.design/wp-content/uploads/2025/05/${i}.png`} 
                            alt={`Print ${i}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="portfolio-tabs__items portfolio-tab" data-tab="11" id="11">
                <div className="portfolio-slider-box">
                  <div className="portfolio-tabs__slider">
                    {[1,2,3,4].map((i) => (
                      <div key={i} style={{ backgroundColor: '#3A3B6A' }}>
                        <div className="portfolio-tabs__video js-video" data-bg="#3A3B6A">
                          <button className="btn portfolio-tabs__video-btn js-portfolio-video" data-src="bBfKDRrD5fA">
                            <img src="https://duck.design/wp-content/uploads/2022/02/1-3.webp" alt="Video" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHAT MAKES US DIFFERENT ===== */}
      <section className="different-section">
        <div className="container">
          <div className="different-section__col">
            <div className="different-section__img">
              <img width="459" height="571" src="https://duck.design/wp-content/uploads/2022/02/6099982-1.svg" alt="What makes us different" />
            </div>
            <div className="different-section__info">
              <h2 className="section-title text-left">
                What makes us different?
              </h2>
              <div className="different-section__txt">
                <p>Fast Multimedia delivers speedy, high-quality {service.title.toLowerCase()} work with a transparent subscription model. Over 400 high-growth and enterprise companies trust Fast Multimedia to produce great, on-brand {service.title.toLowerCase()} at scale.</p>
                <p>Invite your entire team to make {service.title.toLowerCase()} requests—from {service.title.toLowerCase()} to marketing assets—in one centralized platform with a dedicated team that scales up and down with your needs.</p>
              </div>
              <div className="different-section__btn">
                <button className="btn btn-primary btn-primary_arrow" onClick={handleBookCall}>
                  SEE IT IN ACTION <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SERVICES SECTION ===== */}
      <section className="cta-services">
        <div className="container">
          <h2 className="section-title text-left">
            Fast Multimedia is a tech-enabled company, developing its own proprietary software to brief, manage, and coordinate a high-volume of design projects, making it possible to keep pace with teams at Amazon, Puma, Facebook, and more.
          </h2>
          <div className="cta-services__txt text-left">
            Learn how Fast Multimedia can revolutionize the way your organization gets {service.title.toLowerCase()} work done. Book a call today.
          </div>
          <div className="cta-services__btn">
            <button className="btn btn-primary btn-primary_arrow" onClick={handleBookCall}>
              START YOUR PROJECT <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== PREFERENCE SECTION ===== */}
      <section className="preference-section">
        <div className="container">
          <div className="preference-section__list">
            <div className="preference-section__item">
              <div className="preference-section__icon">
                <img src="https://duck.design/wp-content/uploads/2024/07/preficonn-3.svg" width="100" height="100" alt="Fixed monthly rate" />
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Fixed monthly rate</div>
                <div className="preference-section__txt">No hidden costs. Pay the same price every month.</div>
              </div>
            </div>
            <div className="preference-section__item">
              <div className="preference-section__icon">
                <img src="https://duck.design/wp-content/uploads/2024/07/preficonn-4.svg" width="101" height="100" alt="Unlimited requests" />
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Unlimited requests</div>
                <div className="preference-section__txt">Don't limit your creativity. Request as many {service.title.toLowerCase()} as you need.</div>
              </div>
            </div>
            <div className="preference-section__item">
              <div className="preference-section__icon">
                <img src="https://duck.design/wp-content/uploads/2024/07/preficonn-5.svg" width="101" height="100" alt="Unlimited revisions" />
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Unlimited revisions</div>
                <div className="preference-section__txt">Request changes without limits. We iterate until you say it's perfect.</div>
              </div>
            </div>
            <div className="preference-section__item">
              <div className="preference-section__icon">
                <img src="https://duck.design/wp-content/uploads/2024/11/time-icon.svg" width="100" height="100" alt="Same-day delivery" />
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Same-day delivery</div>
                <div className="preference-section__txt">Receive your {service.title.toLowerCase()} on the same day with our higher-tier package.</div>
              </div>
            </div>
            <div className="preference-section__item">
              <div className="preference-section__icon">
                <img src="https://duck.design/wp-content/uploads/2024/07/preficonn-6.svg" width="101" height="100" alt="Professional designers" />
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Professional designers</div>
                <div className="preference-section__txt">Work with experienced designers who bring creativity and precision to every project.</div>
              </div>
            </div>
            <div className="preference-section__item">
              <div className="preference-section__icon">
                <img src="https://duck.design/wp-content/uploads/2024/07/preficonn-1.svg" width="101" height="100" alt="Designer match" />
              </div>
              <div className="preference-section__info">
                <div className="preference-section__head">Designer match</div>
                <div className="preference-section__txt">Each request goes to the most qualified designer for the job.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BIG CTA SECTION ===== */}
      <section className="bigcta-section bigcta-section__2col">
        <div className="bigcta-section__inner">
          <div className="container">
            <h2 className="bigcta-section__title text-center">
              Your one-stop-shop for good {service.title.toLowerCase()}
            </h2>
            <div className="bigcta-section__column">
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
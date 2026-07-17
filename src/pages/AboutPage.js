// AboutPage.jsx - Updated to match Duck Design layout
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
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

  const teamMembers = [
    {
      id: 1,
      name: 'Teye James',
      role: 'Founder & Creative Director',
      bio: 'With over 8 years in graphic design, UI/UX Design and Tech Support, Teye leads our vision to provide exceptional design and technical services.',
      image: '/images/Teye-James.JPG'
    },
    {
      id: 2,
      name: 'Akwetey John',
      role: 'Tech Specialist',
      bio: 'Specializing in Hardware and software, John helps with all tech issues from hardware to software problems.',
      image: '/images/John.jpg'
    },
    {
      id: 3,
      name: 'Tawiah Nicholas Tetteh',
      role: 'Tech Support Lead',
      bio: 'With extensive experience in computer systems and networking, Nicholas ensures all tech solutions are reliable and efficient.',
      image: '/images/Nichola Tetteh.jpg'
    },
    {
      id: 4,
      name: 'Ama Ofor',
      role: 'UI/UX Designer',
      bio: 'Ama creates intuitive digital experiences that blend beautiful design with exceptional functionality.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  const values = [
    {
      id: 1,
      title: 'Quality & Excellence',
      description: 'We deliver exceptional work that exceeds expectations and stands the test of time.',
      icon: 'fas fa-medal'
    },
    {
      id: 2,
      title: 'Customer Focus',
      description: 'Your success is our priority. We listen, understand, and deliver exactly what you need.',
      icon: 'fas fa-handshake'
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'We embrace new technologies and creative approaches to solve business challenges.',
      icon: 'fas fa-lightbulb'
    },
    {
      id: 4,
      title: 'Reliability',
      description: 'We deliver on time, every time. Your project is in safe hands with our team.',
      icon: 'fas fa-shield-alt'
    }
  ];

  const processSteps = [
    {
      id: 1,
      title: 'Consultation & Discovery',
      description: 'We begin with a detailed consultation to understand your needs, goals, and vision.',
      icon: 'fas fa-comments'
    },
    {
      id: 2,
      title: 'Planning & Strategy',
      description: 'We develop a custom strategy and plan tailored to your specific requirements.',
      icon: 'fas fa-clipboard-list'
    },
    {
      id: 3,
      title: 'Design & Development',
      description: 'Our team creates and develops your project with precision and attention to detail.',
      icon: 'fas fa-paint-brush'
    },
    {
      id: 4,
      title: 'Review & Refinement',
      description: 'We present the work, gather feedback, and make refinements until it\'s perfect.',
      icon: 'fas fa-search'
    },
    {
      id: 5,
      title: 'Final Delivery',
      description: 'We deliver the final product along with any necessary files, guidelines, or support.',
      icon: 'fas fa-paper-plane'
    },
    {
      id: 6,
      title: 'Ongoing Support',
      description: 'We provide continued support and maintenance to ensure your long-term success.',
      icon: 'fas fa-headset'
    }
  ];

  const serviceList = [
    { name: 'Graphic Design' },
    { name: 'Web Design' },
    { name: 'Animation' },
    { name: 'UX/UI' },
    { name: 'Branding' },
    { name: 'No-Code Design' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section - Duck Design Style */}
      <section className="hero-section hero-section_default" style={{ 
        background: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') no-repeat center bottom transparent",
        backgroundSize: "cover"
      }}>
        <div className="container">
          <div className="hero-section__box">
            <div className="hero-section__info">
              <h1 className="page-title page-title_small text-center wow fadeInUp" data-wow-delay=".2s">
                Fast Multimedia: Design &amp; Tech Solutions for Your Business
              </h1>
              <div className="hero-section__txt text-center wow fadeInUp" data-wow-delay=".3s">
                Founded in 2018, Fast Multimedia provides professional design and technical support services. We specialize in high-quality business solutions through a client-focused approach, serving businesses of all sizes.
              </div>
              <div className="desktop-only">
                <div className="hero-section__btngroup wow fadeInUp">
                  <Link to="/contact" className="btn btn-primary btn-primary_arrow">Get Started</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Duck Design Style */}
      <section className="solution-section">
        <div className="container-wide_l">
          <div className="solution-section__col">
            <div className="solution-section__box">
              <div className="page-pretitle wow fadeInUp" data-wow-delay=".2s">Our Expertise</div>
              <h2 className="section-title text-left wow fadeInUp" data-wow-delay=".3s">Comprehensive Design &amp; Tech Solutions</h2>
              <div className="solution-section__txt wow fadeInUp" data-wow-delay=".3s">
                <p>We offer a wide range of services, including:</p>
                <div className="hero-section__adv">
                  {serviceList.map((service, index) => (
                    <div key={index} className="hero-section__adv-item">
                      <span>{service.name}</span>
                    </div>
                  ))}
                </div>
                <p>Fast Multimedia leverages modern technologies to optimize processes and deliver projects faster than traditional in-house teams. Our client-focused approach makes the process transparent and predictable.</p>
              </div>
              <div className="solution-section__btngroup wow fadeInUp" data-wow-delay=".4s">
                <Link to="/portfolio" className="btn btn-border btn-border_arrow">Our Works</Link>
              </div>
            </div>
            <div className="solution-section__img">
              <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" width="1320" height="1192" alt="Fast Multimedia Studio" />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Duck Design Style */}
      <section className="partner-section">
        <div className="container">
          <div className="partner-section__col">
            <div className="partner-section__left">
              <h2 className="section-title wow fadeInUp" data-wow-delay=".3s">Trusted by Businesses Across Ghana</h2>
              <div className="section-txt wow fadeInUp" data-wow-delay=".4s">
                Our clients include local businesses, startups, and growing companies. Their trust in us reflects the high quality and reliability of our services.
              </div>
            </div>
            <div className="partner-section__right wow fadeInUp">
              <div className="partner-section__list horslider-left">
                {[1,2,3,4,5,6,7,8].map((item) => (
                  <div key={item} className="partner-section__item">
                    <span style={{ fontSize: '1.4rem', fontWeight: '600', color: '#161B26' }}>
                      Partner {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - Duck Design Style */}
      <section className="txtimg-section txtimg-section_about">
        <div className="container">
          <div className="txtimg-section__list">
            <div className="txtimg-section__item wow fadeInUp">
              <div className="txtimg-section__icon">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" width="1000" height="1000" alt="Our Team" />
              </div>
              <div className="txtimg-section__info">
                <div className="txtimg-section__name">Our Team: <br />The Driving Force Behind Fast Multimedia</div>
                <div className="txtimg-section__txt">
                  The success of Fast Multimedia lies in the talent and dedication of our team. We prioritize hiring and nurturing highly skilled professionals from diverse fields, creating a flexible and dynamic environment. This empowers our team to deliver impactful solutions that help our clients achieve their business goals.
                </div>
              </div>
            </div>

            <div className="txtimg-section__item wow fadeInUp">
              <div className="txtimg-section__icon">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" width="634" height="470" alt="Continuous Learning" />
              </div>
              <div className="txtimg-section__info">
                <div className="txtimg-section__name">Commitment <br />to Continuous Learning</div>
                <div className="txtimg-section__txt">
                  Fast Multimedia fosters continuous learning and skill development for its team. The company invests in its people, offering training on new technologies, tools, and methods in creative and technical industries.
                </div>
              </div>
            </div>

            <div className="txtimg-section__item wow fadeInUp">
              <div className="txtimg-section__icon">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" width="634" height="470" alt="Our Values" />
              </div>
              <div className="txtimg-section__info">
                <div className="txtimg-section__name">Our Values: <br />High Quality <br />Standards and Client-Centricity</div>
                <div className="txtimg-section__txt">
                  At Fast Multimedia, we take pride in our commitment to high standards and attention to detail. With a growing client base, we hold ourselves accountable for delivering top-quality work. Client-centricity and the ability to quickly adapt to changing needs are at the heart of our approach.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Duck Design Style */}
      <section className="story-section">
        <div className="container">
          <h2 className="section-title text-left wow fadeInUp" data-wow-delay=".3s">The Rise of Fast Multimedia</h2>
          <div className="story-section__box">
            <div className="story-section__list wow fadeInUp">
              <div className="story-section__item story-section__item-img">
                <div className="story-section__info">
                  <div className="story-section__head">
                    <div className="story-section__name">PROJECTS SPANNING GHANA</div>
                  </div>
                  <div className="story-section__txt">
                    Fast Multimedia is a local company committed to providing tailored solutions that meet the diverse needs of clients, wherever they are.
                  </div>
                </div>
                <div className="story-section__img">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" width="468" height="528" alt="Projects" />
                </div>
              </div>

              <div className="story-section__item">
                <div className="story-section__info">
                  <div className="story-section__head">
                    <div className="story-section__name">SATISFIED CLIENTS</div>
                    <div className="story-section__number">50+</div>
                  </div>
                  <div className="story-section__txt">
                    From startups to established businesses, we work with companies of all sizes. Our expertise helps every business achieve success through creative design and tech solutions.
                  </div>
                </div>
              </div>

              <div className="story-section__item">
                <div className="story-section__info">
                  <div className="story-section__head">
                    <div className="story-section__name">TOP-TIER TALENT</div>
                    <div className="story-section__number">10+</div>
                  </div>
                  <div className="story-section__txt">
                    Fast Multimedia is home to skilled designers and tech professionals. Our flexibility allows us to deliver quality solutions that meet your needs.
                  </div>
                </div>
              </div>

              <div className="story-section__item story-section__item-img">
                <div className="story-section__info">
                  <div className="story-section__head">
                    <div className="story-section__name">INDUSTRY LEADERS</div>
                  </div>
                  <div className="story-section__txt">
                    Fast Multimedia actively participates in industry events and competitions, highlighting our creativity and commitment to excellence.
                  </div>
                </div>
                <div className="story-section__img">
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" width="468" height="528" alt="Industry Leaders" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section - Duck Design Style */}
      <section className="mission-vision section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card animate-on-scroll">
              <div className="card-icon">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-description">
                To empower Ghanaian businesses with exceptional design and reliable tech solutions 
                that enhance their brand presence and operational efficiency. We strive to make 
                professional design and technical support accessible to businesses of all sizes.
              </p>
            </div>
            
            <div className="vision-card animate-on-scroll">
              <div className="card-icon">
                <i className="fas fa-eye"></i>
              </div>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-description">
                To be Ghana's leading creative and technical solutions provider, recognized for 
                innovation, quality, and exceptional customer service. We aim to contribute to 
                the growth of Ghana's digital economy through our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Duck Design Style */}
      <section className="cta-boxbg cta-boxbg_contact">
        <div className="container">
          <div className="cta-boxbg__inner">
            <div className="cta-boxbg__left">
              <div className="section-pretitle text-left wow fadeInUp" data-wow-delay=".2s">LET'S WORK TOGETHER</div>
              <div className="section-title text-left wow fadeInUp" data-wow-delay=".3s">Get in touch.</div>
              <div className="section-txt text-left wow fadeInUp" data-wow-delay=".4s">
                Have a clear vision in mind? Fantastic.
                <br />Need help bringing it to life? We've got you covered.
              </div>
              <div className="contactcta-section__btngroup text-left wow fadeInUp" data-wow-delay=".4s">
                <Link to="/contact" className="btn btn-white btn-primary_arrow">Get Started</Link>
              </div>
            </div>
            <div className="cta-boxbg__img">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" width="1526" height="848" alt="Contact Us" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
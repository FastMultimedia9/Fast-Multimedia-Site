// AboutPage.jsx - Complete working version
import React, { useEffect } from 'react';
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

  // Team Members Data
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

  // Values Data
  const values = [
    {
      id: 1,
      title: 'Quality & Excellence',
      description: 'We deliver exceptional work that exceeds expectations and stands the test of time.',
      icon: 'fa-solid fa-medal'
    },
    {
      id: 2,
      title: 'Customer Focus',
      description: 'Your success is our priority. We listen, understand, and deliver exactly what you need.',
      icon: 'fa-solid fa-handshake'
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'We embrace new technologies and creative approaches to solve business challenges.',
      icon: 'fa-solid fa-lightbulb'
    },
    {
      id: 4,
      title: 'Reliability',
      description: 'We deliver on time, every time. Your project is in safe hands with our team.',
      icon: 'fa-solid fa-shield-alt'
    }
  ];

  // Process Steps Data
  const processSteps = [
    {
      id: 1,
      title: 'Consultation & Discovery',
      description: 'We begin with a detailed consultation to understand your needs, goals, and vision.',
      icon: 'fa-solid fa-comments'
    },
    {
      id: 2,
      title: 'Planning & Strategy',
      description: 'We develop a custom strategy and plan tailored to your specific requirements.',
      icon: 'fa-solid fa-clipboard-list'
    },
    {
      id: 3,
      title: 'Design & Development',
      description: 'Our team creates and develops your project with precision and attention to detail.',
      icon: 'fa-solid fa-paint-brush'
    },
    {
      id: 4,
      title: 'Review & Refinement',
      description: 'We present the work, gather feedback, and make refinements until it\'s perfect.',
      icon: 'fa-solid fa-search'
    },
    {
      id: 5,
      title: 'Final Delivery',
      description: 'We deliver the final product along with any necessary files, guidelines, or support.',
      icon: 'fa-solid fa-paper-plane'
    },
    {
      id: 6,
      title: 'Ongoing Support',
      description: 'We provide continued support and maintenance to ensure your long-term success.',
      icon: 'fa-solid fa-headset'
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
      {/* Hero Section */}
      <section 
        className="hero-section" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="container">
          <div className="hero-section__box">
            <div className="hero-section__info">
              <h1 className="page-title page-title_small text-center">
                Fast Multimedia: Design &amp; Tech Solutions for Your Business
              </h1>
              <div className="hero-section__txt text-center">
                Founded in 2018, Fast Multimedia provides professional design and technical support services. We specialize in high-quality business solutions through a client-focused approach, serving businesses of all sizes.
              </div>
              <div className="hero-section__btngroup">
                <Link to="/contact" className="btn btn-primary btn-primary_arrow">Get Started</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="solution-section">
        <div className="container-wide_l">
          <div className="solution-section__col">
            <div className="solution-section__box">
              <div className="page-pretitle">Our Expertise</div>
              <h2 className="section-title text-left">Comprehensive Design &amp; Tech Solutions</h2>
              <div className="solution-section__txt">
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
              <div className="solution-section__btngroup">
                <Link to="/portfolio" className="btn btn-border btn-border_arrow">Our Works</Link>
              </div>
            </div>
            <div className="solution-section__img">
              <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Fast Multimedia Studio" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title text-center">Meet Our Team</h2>
          <p className="team-subtitle text-center">The talented professionals behind Fast Multimedia</p>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card animate-on-scroll">
                <div className="team-card-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-card-content">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-role">{member.role}</p>
                  <p className="team-card-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title text-center">Our Core Values</h2>
          <p className="values-subtitle text-center">What drives us to deliver excellence every day</p>
          <div className="values-grid">
            {values.map((value) => (
              <div key={value.id} className="value-card animate-on-scroll">
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title text-center">Our Process</h2>
          <p className="process-subtitle text-center">How we bring your ideas to life</p>
          <div className="process-grid">
            {processSteps.map((step) => (
              <div key={step.id} className="process-card animate-on-scroll">
                <div className="process-step-number">{step.id}</div>
                <div className="process-icon">
                  <i className={step.icon}></i>
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="partner-section">
        <div className="container">
          <div className="partner-section__col">
            <div className="partner-section__left">
              <h2 className="section-title">Trusted by Businesses Across Ghana</h2>
              <div className="section-txt">
                Our clients include local businesses, startups, and growing companies. Their trust in us reflects the high quality and reliability of our services.
              </div>
            </div>
            <div className="partner-section__right">
              <div className="partner-section__list">
                {[1,2,3,4,5,6,7,8].map((item) => (
                  <div key={item} className="partner-section__item">
                    <span>Partner {item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card animate-on-scroll">
              <div className="card-icon">
                <i className="fa-solid fa-bullseye"></i>
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
                <i className="fa-solid fa-eye"></i>
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

      {/* CTA Section */}
      <section className="cta-boxbg">
        <div className="container">
          <div className="cta-boxbg__inner">
            <div className="cta-boxbg__left">
              <div className="section-pretitle text-left">LET'S WORK TOGETHER</div>
              <div className="section-title text-left">Get in touch.</div>
              <div className="section-txt text-left">
                Have a clear vision in mind? Fantastic.
                <br />Need help bringing it to life? We've got you covered.
              </div>
              <div className="contactcta-section__btngroup text-left">
                <Link to="/contact" className="btn btn-white btn-primary_arrow">Get Started</Link>
              </div>
            </div>
            <div className="cta-boxbg__img">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Contact Us" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
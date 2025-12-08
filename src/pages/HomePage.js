import React, { useEffect } from 'react';
import './Homepage.css';

const Homepage = () => {
  // Animation on scroll effect
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
    animateOnScroll(); // Trigger once on load
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content animate-on-scroll">
          <div className="hero-badge">
            <span className="badge-text">Award Winning Design Studio</span>
            <div className="badge-dot"></div>
          </div>
          <h1 className="hero-title">
            We Create <span className="highlight">Beautiful</span> & 
            <span className="highlight"> Effective</span> Designs
          </h1>
          <p className="hero-subtitle">
            Transforming ideas into stunning visual experiences. 
            We craft memorable brand identities that connect with your audience.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <i className="fas fa-rocket"></i> Start Your Project
            </button>
            <button className="btn btn-secondary">
              <i className="fas fa-play-circle"></i> Watch Showreel
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <h3 className="stat-number">250+</h3>
              <p className="stat-label">Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">98%</h3>
              <p className="stat-label">Client Satisfaction</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">50+</h3>
              <p className="stat-label">Happy Clients</p>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Creative Design Process" 
              className="hero-image"
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section id="services" className="services-section">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Our Design Services</h2>
          <p className="section-subtitle">
            We offer a complete range of design services to elevate your brand
          </p>
        </div>
        
        <div className="services-grid">
          <div className="service-card animate-on-scroll">
            <div className="service-icon">
              <i className="fas fa-paint-brush"></i>
            </div>
            <h3 className="service-title">Brand Identity</h3>
            <p className="service-description">
              Create a unique visual identity that communicates your brand's values and personality.
            </p>
            <div className="service-features">
              <span className="feature">Logo Design</span>
              <span className="feature">Color Palette</span>
              <span className="feature">Typography</span>
            </div>
          </div>
          
          <div className="service-card animate-on-scroll">
            <div className="service-icon">
              <i className="fas fa-desktop"></i>
            </div>
            <h3 className="service-title">UI/UX Design</h3>
            <p className="service-description">
              Design intuitive and engaging digital experiences that users love.
            </p>
            <div className="service-features">
              <span className="feature">Wireframing</span>
              <span className="feature">Prototyping</span>
              <span className="feature">User Testing</span>
            </div>
          </div>
          
          <div className="service-card animate-on-scroll">
            <div className="service-icon">
              <i className="fas fa-bullhorn"></i>
            </div>
            <h3 className="service-title">Marketing Design</h3>
            <p className="service-description">
              Create compelling marketing materials that drive engagement and conversions.
            </p>
            <div className="service-features">
              <span className="feature">Social Media</span>
              <span className="feature">Print Materials</span>
              <span className="feature">Digital Ads</span>
            </div>
          </div>
        </div>
        
        <div className="section-cta animate-on-scroll">
          <button className="btn btn-outline">
            <i className="fas fa-list"></i> View All Services
          </button>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Explore our recent work that showcases creativity and innovation
          </p>
        </div>
        
        <div className="portfolio-grid">
          <div className="portfolio-item animate-on-scroll">
            <div className="portfolio-image">
              <img 
                src="https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Brand Identity Project"
              />
              <div className="portfolio-overlay">
                <div className="overlay-content">
                  <h4>EcoBrand Identity</h4>
                  <p>Complete brand identity for sustainable products company</p>
                  <button className="btn btn-small">
                    <i className="fas fa-eye"></i> View Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="portfolio-item animate-on-scroll">
            <div className="portfolio-image">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Mobile App Design"
              />
              <div className="portfolio-overlay">
                <div className="overlay-content">
                  <h4>Finance Mobile App</h4>
                  <p>UI/UX design for personal finance management app</p>
                  <button className="btn btn-small">
                    <i className="fas fa-eye"></i> View Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="portfolio-item animate-on-scroll">
            <div className="portfolio-image">
              <img 
                src="https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Packaging Design"
              />
              <div className="portfolio-overlay">
                <div className="overlay-content">
                  <h4>Organic Food Packaging</h4>
                  <p>Packaging design for organic food product line</p>
                  <button className="btn btn-small">
                    <i className="fas fa-eye"></i> View Case Study
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="section-cta animate-on-scroll">
          <button className="btn btn-primary">
            <i className="fas fa-images"></i> View Full Portfolio
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container animate-on-scroll">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Brand?</h2>
            <p className="cta-text">
              Let's discuss your project and create something amazing together.
              Get a free consultation and quote.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-light">
                <i className="fas fa-calendar-alt"></i> Schedule Call
              </button>
              <button className="btn btn-outline-light">
                <i className="fas fa-download"></i> Download Brochure
              </button>
            </div>
          </div>
          <div className="cta-visual">
            <div className="cta-image">
              <i className="fas fa-magic"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
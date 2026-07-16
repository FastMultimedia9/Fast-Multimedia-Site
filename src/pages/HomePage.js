import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Assuming FontAwesome is installed (npm install @fortawesome/fontawesome-free)
// If not, you can replace icons with emojis or SVGs.
import './HomePage.css';

const HomePage = () => {
  const [activeServiceCategory, setActiveServiceCategory] = useState('design');
  const navigate = useNavigate();

  // --- Data --- (Same as your original, but structured differently)
  const services = {
    design: [
      { id: 'branding', name: 'Brand Identity', price: '₵699+', description: 'Complete brand systems including logo, color, typography.', icon: 'fa-pen-fancy' },
      { id: 'uiux', name: 'UI/UX Design', price: '₵899+', description: 'User-centered interfaces for web and mobile.', icon: 'fa-laptop' },
      { id: 'print', name: 'Print Design', price: '₵549+', description: 'Professional print materials and packaging.', icon: 'fa-print' },
      { id: 'web', name: 'Web Design', price: '₵1,299+', description: 'Modern, responsive websites.', icon: 'fa-globe' },
    ],
    tech: [
      { id: 'repair', name: 'Computer Repair', price: '₵50+/hr', description: 'Professional repair for all computer makes.', icon: 'fa-tools' },
      { id: 'setup', name: 'System Setup', price: '₵150+', description: 'Complete OS installation and configuration.', icon: 'fa-cogs' },
      { id: 'software', name: 'Software Support', price: '₵100+', description: 'Installation and configuration.', icon: 'fa-cloud-upload-alt' },
      { id: 'network', name: 'Networking', price: '₵250+', description: 'Network setup and management.', icon: 'fa-wifi' },
    ]
  };

  const packages = [
    { id: 'starter', name: 'Starter', price: '₵699', features: ['Logo Design', 'Business Cards', 'Social Media Kit'], highlighted: false },
    { id: 'pro', name: 'Professional', price: '₵1,499', features: ['Logo + Variations', 'Full Guidelines', 'Stationery Set', 'Social Content'], highlighted: true },
    { id: 'premium', name: 'Premium', price: '₵2,299', features: ['All Pro Features', 'Website Design', 'Marketing Materials', '3 Months Support'], highlighted: false },
  ];

  const featuredPortfolioProjects = [
    { id: '1', title: 'St. Martin Hospital', subtitle: '80th Anniversary', category: 'Brand Identity', image: '/80th.jpg' },
    { id: '2', title: 'Mr. Wise', subtitle: 'Clothing Brand', category: 'Brand Identity', image: '/mr-wise.jpg' },
    { id: '3', title: 'Abidan Royal', subtitle: 'Mango Ice-Cream', category: 'Packaging', image: '/mango-label.jpg' },
  ];

  const handleServiceClick = (service) => {
    const serviceData = { name: service.name, price: service.price, timestamp: Date.now() };
    localStorage.setItem('selectedService', JSON.stringify(serviceData));
    navigate('/contact');
  };

  // --- Render ---
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Design & Tech <br />
            <span className="gradient-text">Without Limits</span>
          </h1>
          <p className="hero-subtitle">
            We take care of all your creative and technical needs. No lengthy hiring, no inefficient freelancers.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>
              Get Started <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/services')}>
              View Services
            </button>
          </div>
        </div>
        {/* Optional decorative background elements can be added here */}
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
            <p className="section-subtitle">Professional solutions tailored to your needs</p>
            <div className="service-toggle">
              <button className={`toggle-btn ${activeServiceCategory === 'design' ? 'active' : ''}`} onClick={() => setActiveServiceCategory('design')}>🎨 Design</button>
              <button className={`toggle-btn ${activeServiceCategory === 'tech' ? 'active' : ''}`} onClick={() => setActiveServiceCategory('tech')}>🔧 Tech</button>
            </div>
          </div>

          <div className="services-grid">
            {services[activeServiceCategory].map((service) => (
              <div key={service.id} className="service-card" onClick={() => handleServiceClick(service)}>
                <div className="service-header">
                  <i className={`fas ${service.icon} service-icon`}></i>
                  <span className="service-price">{service.price}</span>
                </div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-description">{service.description}</p>
                <button className="service-cta">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our <span className="gradient-text">Work</span></h2>
            <p className="section-subtitle">A glimpse into our recent projects</p>
          </div>
          <div className="portfolio-grid">
            {featuredPortfolioProjects.map((project) => (
              <div key={project.id} className="portfolio-card">
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="portfolio-info">
                  <span className="portfolio-category">{project.category}</span>
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="portfolio-subtitle">{project.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Simple, transparent, and efficient</p>
          </div>
          <div className="process-steps">
            <div className="step"><span className="step-number">1</span><h4>Choose a Plan</h4><p>Select the plan that fits your needs and budget.</p></div>
            <div className="step"><span className="step-number">2</span><h4>Payment & Brief</h4><p>Make payment and provide a brief about your project.</p></div>
            <div className="step"><span className="step-number">3</span><h4>Designer Assigned</h4><p>A dedicated designer/tech expert is assigned to you.</p></div>
            <div className="step"><span className="step-number">4</span><h4>Receive & Review</h4><p>Receive your work, request revisions, and approve.</p></div>
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
                  {pkg.features.map((feature, idx) => (<li key={idx}>✓ {feature}</li>))}
                </ul>
                <button className="btn btn-primary">Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to elevate your <br /><span className="gradient-text">brand or business</span>?</h2>
          <p className="cta-subtitle">Let's create something amazing together.</p>
          <button className="btn btn-primary btn-large" onClick={() => navigate('/contact')}>
            Start Your Project <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2026 Your Brand Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
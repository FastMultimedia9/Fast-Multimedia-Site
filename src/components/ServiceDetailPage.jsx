// src/components/ServiceDetailPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaUsers, FaClock, FaAward } from 'react-icons/fa';
import './ServiceDetailPage.css';

const ServiceDetailPage = ({ service }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <div className="service-not-found">Service not found</div>;
  }

  const handleBookCall = () => {
    navigate('/contact');
  };

  return (
    <div className="service-detail-page">
      {/* Hero Section - Duck Design Style */}
      <section className="service-hero">
        <div className="container">
          <div className="service-hero-content">
            <h1 className="service-hero-title">
              {service.title} <span className="gradient-text">Services</span>
            </h1>
            <p className="service-hero-subtitle">
              {service.longDescription || `Get all your ${service.title.toLowerCase()} needs met with our dedicated team of experts.`}
            </p>
            <div className="service-hero-actions">
              <button className="btn btn-primary" onClick={handleBookCall}>
                Book a Call <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="service-offerings">
        <div className="container">
          <div className="service-offerings-header">
            <h2 className="section-title">
              A dedicated super team for all types of <span className="gradient-text">{service.title.toLowerCase()}</span> from A to Z
            </h2>
          </div>

          {/* Pricing Toggle Placeholder */}
          <div className="service-pricing-toggle">
            <button className="pricing-toggle-btn active">1 month</button>
            <button className="pricing-toggle-btn">3 months <span className="discount-badge">10% off</span></button>
            <button className="pricing-toggle-btn">6 months <span className="discount-badge">20% off</span></button>
          </div>

          <div className="service-offerings-grid">
            <div className="service-offering-card">
              <div className="service-offering-icon">
                {service.icon ? <service.icon /> : <FaCheckCircle />}
              </div>
              <h3 className="service-offering-title">{service.title}</h3>
              <p className="service-offering-description">
                {service.offeringsDescription || `Professional ${service.title.toLowerCase()} solutions for all your business needs.`}
              </p>
              <ul className="service-offering-features">
                {service.features && service.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheckCircle className="feature-check-icon" /> {feature}
                  </li>
                ))}
                {!service.features && (
                  <>
                    <li><FaCheckCircle className="feature-check-icon" /> Professional Design & Execution</li>
                    <li><FaCheckCircle className="feature-check-icon" /> Unlimited Revisions</li>
                    <li><FaCheckCircle className="feature-check-icon" /> Fast Turnaround</li>
                  </>
                )}
              </ul>
            </div>

            {/* Pricing Card */}
            <div className="service-pricing-card">
              <div className="pricing-card-header">
                <h3 className="pricing-plan-name">Professional Plan</h3>
                <div className="pricing-plan-price">
                  {service.price || '₵1,199'} <span className="pricing-plan-period">PER MONTH</span>
                </div>
              </div>
              <ul className="pricing-plan-features">
                <li><FaCheckCircle className="feature-check-icon" /> Dedicated {service.title} Expert</li>
                <li><FaCheckCircle className="feature-check-icon" /> Unlimited Requests</li>
                <li><FaCheckCircle className="feature-check-icon" /> Source Files Included</li>
                <li><FaCheckCircle className="feature-check-icon" /> 7-Day Money-Back Guarantee</li>
              </ul>
              <button className="btn btn-primary btn-block" onClick={handleBookCall}>
                Get Started <FaArrowRight className="btn-arrow" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="service-why-choose">
        <div className="container">
          <h2 className="section-title text-center">
            Why Choose Our <span className="gradient-text">{service.title}</span> Services?
          </h2>
          <div className="service-why-grid">
            <div className="service-why-card">
              <div className="service-why-icon"><FaUsers /></div>
              <h3>Expert Team</h3>
              <p>Work with experienced professionals dedicated to your success.</p>
            </div>
            <div className="service-why-card">
              <div className="service-why-icon"><FaClock /></div>
              <h3>Fast Delivery</h3>
              <p>Get your projects delivered on time, every time.</p>
            </div>
            <div className="service-why-card">
              <div className="service-why-icon"><FaAward /></div>
              <h3>Quality Guarantee</h3>
              <p>We stand behind our work with a satisfaction guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="container">
          <div className="service-cta-content">
            <h2 className="service-cta-title">
              Ready to elevate your <span className="gradient-text">brand</span>?
            </h2>
            <p className="service-cta-text">
              Let's create something amazing together. Get in touch for a free consultation.
            </p>
            <button className="btn btn-primary btn-large" onClick={handleBookCall}>
              Book a Call Now <FaArrowRight className="btn-arrow" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
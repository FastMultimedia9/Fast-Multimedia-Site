import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AffiliatesPage.css';

const AffiliatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const commissionRates = [
    {
      category: 'Training Programs',
      rate: '25%',
      cookie: '90 days',
      averageSale: '₵800',
      description: 'Our most popular affiliate category'
    },
    {
      category: 'Templates',
      rate: '30%',
      cookie: '60 days',
      averageSale: '₵100',
      description: 'High volume, recurring purchases'
    },
    {
      category: 'E-books',
      rate: '40%',
      cookie: '60 days',
      averageSale: '₵150',
      description: 'Digital products with high margins'
    },
    {
      category: 'Tools Subscription',
      rate: '20% recurring',
      cookie: '90 days',
      averageSale: '₵300/month',
      description: 'Recurring monthly commissions'
    },
    {
      category: 'Custom Services',
      rate: '15%',
      cookie: '30 days',
      averageSale: '₵2,000+',
      description: 'High-value custom projects'
    },
    {
      category: 'Bundle Products',
      rate: '25%',
      cookie: '90 days',
      averageSale: '₵1,500',
      description: 'Premium bundles and packages'
    }
  ];

  const successStories = [
    {
      name: 'David Osei',
      niche: 'Web Design Blog',
      earnings: '₵15,000+',
      testimonial: 'The affiliate program has been a game-changer for my blog. The high commissions and reliable tracking make it my top recommendation.',
      avatar: '👨‍💻'
    },
    {
      name: 'Ama Boateng',
      niche: 'YouTube Channel',
      earnings: '₵8,000+',
      testimonial: 'As a content creator, I appreciate the marketing materials provided. My audience loves the quality of products.',
      avatar: '🎥'
    },
    {
      name: 'Kwame Mensah',
      niche: 'Email Newsletter',
      earnings: '₵12,000+',
      testimonial: 'Excellent support and timely payments. The 90-day cookie duration really makes a difference in conversions.',
      avatar: '📧'
    }
  ];

  const marketingMaterials = [
    {
      name: 'Banners & Graphics',
      formats: ['PNG', 'JPG', 'SVG'],
      sizes: ['728x90', '300x250', '160x600'],
      description: 'Professional banners for websites and blogs'
    },
    {
      name: 'Email Templates',
      formats: ['HTML', 'TXT'],
      sizes: ['Responsive'],
      description: 'Pre-written email campaigns and templates'
    },
    {
      name: 'Social Media Posts',
      formats: ['PSD', 'Canva'],
      sizes: ['Instagram', 'Facebook', 'Twitter'],
      description: 'Ready-to-use social media content'
    },
    {
      name: 'Video Assets',
      formats: ['MP4', 'MOV'],
      sizes: ['1080p', '4K'],
      description: 'Product demos and promotional videos'
    },
    {
      name: 'Text Links',
      formats: ['HTML'],
      sizes: ['Custom'],
      description: 'Pre-optimized text links and reviews'
    },
    {
      name: 'Landing Pages',
      formats: ['HTML', 'WordPress'],
      sizes: ['Responsive'],
      description: 'Complete landing pages for promotions'
    }
  ];

  return (
    <div className="affiliates-page">
      {/* Hero Section */}
      <section className="affiliates-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Earn Commissions</span>
            </div>
            <h1 className="hero-title">Join Our Affiliate Program</h1>
            <p className="hero-subtitle">
              Earn generous commissions by promoting our premium products and services. 
              Join thousands of successful affiliates worldwide.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>30%</h3>
                <p>Average Commission</p>
              </div>
              <div className="stat">
                <h3>90 Days</h3>
                <p>Cookie Duration</p>
              </div>
              <div className="stat">
                <h3>₵500K+</h3>
                <p>Paid to Affiliates</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-user-plus"></i> Join Now
              </Link>
              <a href="#how-it-works" className="btn btn-outline">
                <i className="fas fa-play-circle"></i> Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Start earning commissions in just three simple steps
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up</h3>
                <p>Create your free affiliate account and get instant approval.</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Promote</h3>
                <p>Use your unique links and marketing materials to promote our products.</p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Earn</h3>
                <p>Earn commissions on every sale made through your referral links.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Rates */}
      <section className="commissions-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Generous Commission Rates</h2>
            <p className="section-subtitle">
              Earn some of the highest commissions in the industry
            </p>
          </div>

          <div className="commissions-grid">
            {commissionRates.map((rate, index) => (
              <div key={index} className="commission-card">
                <div className="commission-header">
                  <h3>{rate.category}</h3>
                  <div className="commission-rate">{rate.rate}</div>
                </div>
                <div className="commission-details">
                  <div className="detail">
                    <i className="fas fa-cookie-bite"></i>
                    <span>Cookie: {rate.cookie}</span>
                  </div>
                  <div className="detail">
                    <i className="fas fa-chart-line"></i>
                    <span>Average Sale: {rate.averageSale}</span>
                  </div>
                </div>
                <p className="commission-description">{rate.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Materials */}
      <section className="materials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Marketing Materials</h2>
            <p className="section-subtitle">
              Everything you need to start promoting
            </p>
          </div>

          <div className="materials-grid">
            {marketingMaterials.map((material, index) => (
              <div key={index} className="material-card">
                <div className="material-icon">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h3>{material.name}</h3>
                <div className="material-formats">
                  {material.formats.map((format, idx) => (
                    <span key={idx} className="format-tag">{format}</span>
                  ))}
                </div>
                <p className="material-description">{material.description}</p>
                <div className="material-sizes">
                  {material.sizes.map((size, idx) => (
                    <span key={idx} className="size-tag">{size}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="stories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">
              Hear from our top-performing affiliates
            </p>
          </div>

          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-content">
                  <p className="story-testimonial">"{story.testimonial}"</p>
                </div>
                <div className="story-author">
                  <div className="author-avatar">
                    {story.avatar}
                  </div>
                  <div className="author-info">
                    <h4>{story.name}</h4>
                    <p className="author-niche">{story.niche}</p>
                    <p className="author-earnings">Earnings: {story.earnings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Get answers to common questions about our affiliate program
            </p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I get paid?</h3>
              <p>We pay commissions monthly via bank transfer, PayPal, or mobile money. Minimum payout is ₵500.</p>
            </div>

            <div className="faq-item">
              <h3>When do I get paid?</h3>
              <p>Commissions are paid on the 15th of each month for the previous month's sales.</p>
            </div>

            <div className="faq-item">
              <h3>Is there a fee to join?</h3>
              <p>No, joining our affiliate program is completely free.</p>
            </div>

            <div className="faq-item">
              <h3>How are sales tracked?</h3>
              <p>We use advanced tracking with unique affiliate links and 90-day cookies.</p>
            </div>

            <div className="faq-item">
              <h3>Can I promote on social media?</h3>
              <p>Yes! We encourage promotion on all platforms including YouTube, Instagram, and blogs.</p>
            </div>

            <div className="faq-item">
              <h3>Is there an affiliate dashboard?</h3>
              <p>Yes, you get access to a real-time dashboard with stats, reports, and links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="affiliates-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Earning?</h2>
            <p>
              Join our affiliate program today and start earning generous commissions 
              on our premium products and services.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-user-plus"></i> Join Affiliate Program
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-question-circle"></i> Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AffiliatesPage;
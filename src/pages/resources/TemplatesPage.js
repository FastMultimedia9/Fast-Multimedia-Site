import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TemplatesPage.css';

const TemplatesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'business', name: 'Business' },
    { id: 'social', name: 'Social Media' },
    { id: 'web', name: 'Website' },
    { id: 'presentation', name: 'Presentation' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'print', name: 'Print' }
  ];

  const templates = [
    {
      id: 1,
      title: 'Professional Business Cards',
      category: 'business',
      type: 'Print',
      price: '₵49',
      downloads: '2.8K',
      rating: 4.9,
      description: 'Modern business card templates for professionals',
      preview: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['AI', 'PSD', 'PDF']
    },
    {
      id: 2,
      title: 'Social Media Kit',
      category: 'social',
      type: 'Digital',
      price: '₵89',
      downloads: '3.5K',
      rating: 4.8,
      description: 'Complete social media templates for all platforms',
      preview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['PSD', 'Figma', 'XD']
    },
    {
      id: 3,
      title: 'Website UI Kit',
      category: 'web',
      type: 'Digital',
      price: '₵149',
      downloads: '1.9K',
      rating: 4.7,
      description: 'Modern website UI components and templates',
      preview: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['Figma', 'XD', 'Sketch']
    },
    {
      id: 4,
      title: 'Corporate Presentation',
      category: 'presentation',
      type: 'Digital',
      price: '₵69',
      downloads: '4.2K',
      rating: 4.9,
      description: 'Professional PowerPoint templates',
      preview: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['PPT', 'Keynote', 'Google Slides']
    },
    {
      id: 5,
      title: 'Email Newsletter',
      category: 'marketing',
      type: 'Digital',
      price: '₵59',
      downloads: '2.3K',
      rating: 4.6,
      description: 'Responsive email templates',
      preview: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['HTML', 'PSD', 'XD']
    },
    {
      id: 6,
      title: 'Brochure Templates',
      category: 'print',
      type: 'Print',
      price: '₵79',
      downloads: '1.7K',
      rating: 4.5,
      description: 'Tri-fold brochure designs',
      preview: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['AI', 'InDesign', 'PDF']
    },
    {
      id: 7,
      title: 'Logo Pack',
      category: 'business',
      type: 'Digital',
      price: '₵99',
      downloads: '5.1K',
      rating: 4.9,
      description: '100+ logo templates',
      preview: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['AI', 'EPS', 'SVG']
    },
    {
      id: 8,
      title: 'Instagram Stories',
      category: 'social',
      type: 'Digital',
      price: '₵49',
      downloads: '3.8K',
      rating: 4.7,
      description: 'Animated Instagram story templates',
      preview: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['AE', 'PSD', 'MOV']
    },
    {
      id: 9,
      title: 'Resume Templates',
      category: 'business',
      type: 'Print',
      price: '₵39',
      downloads: '6.2K',
      rating: 4.8,
      description: 'Professional resume designs',
      preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      formats: ['Word', 'InDesign', 'PDF']
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="templates-page">
      {/* Hero Section */}
      <section className="templates-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Professional Templates</span>
            </div>
            <h1 className="hero-title">Ready-to-Use Design Templates</h1>
            <p className="hero-subtitle">
              Save time with professionally designed templates for business, 
              marketing, social media, and more. Fully customizable.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Templates</p>
              </div>
              <div className="stat">
                <h3>50K+</h3>
                <p>Downloads</p>
              </div>
              <div className="stat">
                <h3>4.8</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="templates-grid-section">
        <div className="container">
          <div className="templates-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Templates' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="section-subtitle">
              {filteredTemplates.length} templates available
            </p>
          </div>

          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-preview">
                  <img src={template.preview} alt={template.title} />
                  <div className="preview-overlay">
                    <Link to="/contact" className="preview-btn">
                      <i className="fas fa-eye"></i> Preview
                    </Link>
                  </div>
                </div>

                <div className="template-content">
                  <div className="template-header">
                    <div className="template-meta">
                      <span className="template-type">{template.type}</span>
                      <div className="template-rating">
                        <i className="fas fa-star"></i>
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    <h3 className="template-title">{template.title}</h3>
                    <p className="template-description">{template.description}</p>
                  </div>

                  <div className="template-footer">
                    <div className="template-info">
                      <div className="downloads">
                        <i className="fas fa-download"></i>
                        <span>{template.downloads}</span>
                      </div>
                      <div className="formats">
                        {template.formats.map((format, idx) => (
                          <span key={idx} className="format-tag">{format}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="template-actions">
                      <div className="template-price">{template.price}</div>
                      <Link to="/contact" className="btn btn-primary">
                        <i className="fas fa-shopping-cart"></i> Get Template
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="bundle-section">
        <div className="container">
          <div className="bundle-card">
            <div className="bundle-content">
              <div className="bundle-badge">
                <span>Best Value</span>
              </div>
              <h2 className="bundle-title">All Templates Bundle</h2>
              <p className="bundle-description">
                Get unlimited access to all our templates, including future updates.
                Perfect for agencies and freelancers.
              </p>
              
              <div className="bundle-features">
                <div className="feature">
                  <i className="fas fa-infinity"></i>
                  <span>Unlimited Downloads</span>
                </div>
                <div className="feature">
                  <i className="fas fa-sync"></i>
                  <span>Lifetime Updates</span>
                </div>
                <div className="feature">
                  <i className="fas fa-headset"></i>
                  <span>Priority Support</span>
                </div>
                <div className="feature">
                  <i className="fas fa-crown"></i>
                  <span>Commercial License</span>
                </div>
              </div>

              <div className="bundle-pricing">
                <div className="price-info">
                  <div className="original-price">₵2,999</div>
                  <div className="current-price">₵1,499</div>
                  <div className="savings">Save 50%</div>
                </div>
                
                <Link to="/contact" className="btn btn-primary bundle-btn">
                  <i className="fas fa-gem"></i> Get Bundle
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* License Information */}
      <section className="license-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">License Information</h2>
            <p className="section-subtitle">
              Understand how you can use our templates
            </p>
          </div>

          <div className="license-grid">
            <div className="license-card">
              <div className="license-icon">
                <i className="fas fa-user"></i>
              </div>
              <h3>Personal License</h3>
              <ul>
                <li>Single project use</li>
                <li>Non-commercial projects</li>
                <li>No resale rights</li>
                <li>Client projects allowed</li>
              </ul>
            </div>

            <div className="license-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="license-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Commercial License</h3>
              <ul>
                <li>Multiple projects</li>
                <li>Commercial use</li>
                <li>Client delivery</li>
                <li>Product packaging</li>
              </ul>
            </div>

            <div className="license-card">
              <div className="license-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>Enterprise License</h3>
              <ul>
                <li>Unlimited projects</li>
                <li>Team collaboration</li>
                <li>White-label rights</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="templates-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need Custom Templates?</h2>
            <p>
              Our design team can create custom templates tailored to your 
              specific business needs and branding.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-palette"></i> Request Custom Design
              </Link>
              <Link to="/tools" className="btn btn-outline">
                <i className="fas fa-tools"></i> View Design Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplatesPage;
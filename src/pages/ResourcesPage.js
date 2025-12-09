// pages/ResourcesPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResourcesPage.css';

const ResourcesPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const resourceCategories = [
    {
      id: 'training',
      title: 'Training Courses',
      icon: 'fas fa-graduation-cap',
      description: 'Professional courses to level up your skills',
      color: '#6c63ff',
      count: 8,
      featured: true
    },
    {
      id: 'tutorials',
      title: 'Video Tutorials',
      icon: 'fas fa-video',
      description: 'Step-by-step video guides',
      color: '#ff6584',
      count: 24,
      featured: true
    },
    {
      id: 'templates',
      title: 'Free Templates',
      icon: 'fas fa-file-download',
      description: 'Ready-to-use design templates',
      color: '#36d1dc',
      count: 36,
      featured: true
    },
    {
      id: 'tools',
      title: 'Design Tools',
      icon: 'fas fa-tools',
      description: 'Essential tools & software',
      color: '#ffb347',
      count: 18
    },
    {
      id: 'ebooks',
      title: 'Free eBooks',
      icon: 'fas fa-book',
      description: 'Educational books & guides',
      color: '#4CAF50',
      count: 12
    },
    {
      id: 'affiliates',
      title: 'Affiliate Products',
      icon: 'fas fa-star',
      description: 'Recommended tools & services',
      color: '#9c27b0',
      count: 15
    },
    {
      id: 'plugins',
      title: 'Plugins & Scripts',
      icon: 'fas fa-code',
      description: 'Custom code snippets & plugins',
      color: '#2196F3',
      count: 9
    },
    {
      id: 'checklists',
      title: 'Checklists',
      icon: 'fas fa-check-square',
      description: 'Project planning checklists',
      color: '#FF9800',
      count: 7
    }
  ];

  const featuredResources = [
    {
      id: 1,
      title: 'Complete Web Design Masterclass',
      category: 'training',
      price: '$197',
      originalPrice: '$497',
      rating: 4.9,
      students: 1240,
      description: 'From zero to professional web designer in 12 weeks',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
      featured: true,
      badge: 'Bestseller'
    },
    {
      id: 2,
      title: 'React UI Component Library',
      category: 'templates',
      price: 'Free',
      rating: 4.8,
      downloads: 2540,
      description: '50+ ready-to-use React components',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
      featured: true
    },
    {
      id: 3,
      title: 'Figma UI Kit Bundle',
      category: 'templates',
      price: '$49',
      originalPrice: '$149',
      rating: 4.7,
      downloads: 890,
      description: 'Complete UI kit for modern web apps',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop',
      featured: true,
      badge: 'Hot Deal'
    }
  ];

  const affiliateProducts = [
    {
      id: 1,
      title: 'Adobe Creative Cloud',
      category: 'affiliates',
      commission: '20%',
      description: 'Industry-standard design software',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Adobe_Creative_Cloud_rainbow_icon.svg/240px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
      rating: 4.8,
      link: '#'
    },
    {
      id: 2,
      title: 'Figma Pro',
      category: 'affiliates',
      commission: '15%',
      description: 'Collaborative interface design tool',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-1-logo.svg/240px-Figma-1-logo.svg.png',
      rating: 4.9,
      link: '#'
    },
    {
      id: 3,
      title: 'Webflow',
      category: 'affiliates',
      commission: '25%',
      description: 'No-code responsive website builder',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Webflow_logo.svg/240px-Webflow_logo.svg.png',
      rating: 4.7,
      link: '#'
    }
  ];

  const filteredCategories = activeFilter === 'all' 
    ? resourceCategories 
    : resourceCategories.filter(cat => cat.id === activeFilter);

  const handleResourceClick = (resource) => {
    alert(`You selected: ${resource.title}\n\nThis would navigate to the detailed resource page in a real application.`);
  };

  const handleAffiliateClick = (product) => {
    alert(`You clicked on affiliate link for: ${product.title}\n\nCommission: ${product.commission}\n\nThis would redirect to the partner website in a real application.`);
  };

  return (
    <div className="resources-page">
      {/* Hero Section */}
      <section className="resources-hero">
        <div className="container">
          <h1 className="resources-title">Expert Resources Hub</h1>
          <p className="resources-subtitle">
            Free & premium tools, templates, courses, and guides to accelerate your design & development journey.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <i className="fas fa-download"></i>
              <div>
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Downloads</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-graduation-cap"></i>
              <div>
                <span className="stat-number">2,500+</span>
                <span className="stat-label">Students</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="fas fa-star"></i>
              <div>
                <span className="stat-number">4.8/5</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="featured-resources">
        <div className="container">
          <div className="section-header">
            <h2>Featured Resources</h2>
            <p>Most popular resources picked by our community</p>
          </div>
          
          <div className="featured-grid">
            {featuredResources.map(resource => (
              <div key={resource.id} className="featured-card" onClick={() => handleResourceClick(resource)}>
                <div className="featured-card-image">
                  <img src={resource.image} alt={resource.title} />
                  {resource.badge && <div className="resource-badge">{resource.badge}</div>}
                  <div className="card-overlay">
                    <button className="quick-view-btn">Quick View</button>
                  </div>
                </div>
                <div className="featured-card-content">
                  <div className="resource-category">{resource.category}</div>
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  
                  <div className="resource-meta">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <span>{resource.rating}</span>
                    </div>
                    <div className="stats">
                      {resource.students && <span><i className="fas fa-users"></i> {resource.students}</span>}
                      {resource.downloads && <span><i className="fas fa-download"></i> {resource.downloads}</span>}
                    </div>
                  </div>
                  
                  <div className="resource-price">
                    <span className="current-price">{resource.price}</span>
                    {resource.originalPrice && <span className="original-price">{resource.originalPrice}</span>}
                  </div>
                  
                  <button className="get-resource-btn">
                    {resource.price === 'Free' ? 'Download Free' : 'Get Resource'} <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="resource-categories">
        <div className="container">
          <div className="section-header">
            <h2>Browse Resources by Category</h2>
            <p>Find exactly what you need from our organized resource library</p>
          </div>
          
          <div className="category-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Resources
            </button>
            {resourceCategories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.title} ({category.count})
              </button>
            ))}
          </div>
          
          <div className="categories-grid">
            {filteredCategories.map(category => (
              <Link 
                key={category.id} 
                to={`/resources/${category.id}`}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon" style={{ backgroundColor: category.color }}>
                  <i className={category.icon}></i>
                </div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="category-meta">
                    <span className="resource-count">{category.count} resources</span>
                    {category.featured && <span className="featured-tag">Featured</span>}
                  </div>
                </div>
                <div className="category-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Partners */}
      <section className="affiliate-partners">
        <div className="container">
          <div className="section-header">
            <h2>Recommended Tools & Services</h2>
            <p>Trusted tools we use and recommend (affiliate links)</p>
            <div className="affiliate-disclaimer">
              <i className="fas fa-info-circle"></i>
              <span>We earn commissions on purchases made through our links</span>
            </div>
          </div>
          
          <div className="affiliates-grid">
            {affiliateProducts.map(product => (
              <div key={product.id} className="affiliate-card" onClick={() => handleAffiliateClick(product)}>
                <div className="affiliate-logo">
                  <img src={product.logo} alt={product.title} />
                </div>
                <div className="affiliate-content">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  
                  <div className="affiliate-meta">
                    <div className="rating">
                      <i className="fas fa-star"></i>
                      <span>{product.rating}</span>
                    </div>
                    <div className="commission">
                      <i className="fas fa-percentage"></i>
                      <span>{product.commission} commission</span>
                    </div>
                  </div>
                  
                  <button className="visit-affiliate-btn">
                    Visit Website <i className="fas fa-external-link-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="resources-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Get Free Resources Weekly</h2>
              <p>Subscribe to our newsletter and receive free templates, tutorials, and exclusive discounts directly in your inbox.</p>
              <ul className="benefits-list">
                <li><i className="fas fa-check"></i> Weekly free resources</li>
                <li><i className="fas fa-check"></i> Exclusive discounts</li>
                <li><i className="fas fa-check"></i> Early access to new courses</li>
                <li><i className="fas fa-check"></i> Design tips & tutorials</li>
              </ul>
            </div>
            <div className="newsletter-form">
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); }}>
                <div className="form-group">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit" className="subscribe-btn">
                    Subscribe <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
                <div className="privacy-note">
                  <i className="fas fa-lock"></i>
                  <span>We respect your privacy. Unsubscribe at any time.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="resources-faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our resources</p>
          </div>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3><i className="fas fa-question-circle"></i> Are the resources really free?</h3>
              <p>Yes! We offer a wide range of free templates, tutorials, and eBooks. We also have premium courses and resources for those looking for more in-depth training.</p>
            </div>
            <div className="faq-item">
              <h3><i className="fas fa-question-circle"></i> Do I need to pay for training courses?</h3>
              <p>We offer both free introductory courses and premium masterclasses. Premium courses come with lifetime access, project files, and certificates of completion.</p>
            </div>
            <div className="faq-item">
              <h3><i className="fas fa-question-circle"></i> Can I use templates for commercial projects?</h3>
              <p>All our templates come with commercial licenses. You can use them in client projects, personal projects, and commercial applications without attribution.</p>
            </div>
            <div className="faq-item">
              <h3><i className="fas fa-question-circle"></i> How do affiliate links work?</h3>
              <p>When you purchase through our affiliate links, we earn a small commission at no extra cost to you. This helps us create more free content for the community.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ToolsPage.css';

const ToolsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'design', name: 'Design Tools' },
    { id: 'development', name: 'Development' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'analytics', name: 'Analytics' }
  ];

  const tools = [
    {
      id: 1,
      name: 'Color Palette Generator',
      category: 'design',
      type: 'Web App',
      price: 'Free',
      description: 'Generate beautiful color palettes for your designs',
      icon: 'fas fa-palette',
      features: ['AI-powered', 'Export to CSS', 'Accessibility check'],
      link: '#'
    },
    {
      id: 2,
      name: 'Font Pairing Tool',
      category: 'design',
      type: 'Web App',
      price: 'Free',
      description: 'Find perfect font combinations for your projects',
      icon: 'fas fa-font',
      features: ['Google Fonts', 'Preview tool', 'CSS export'],
      link: '#'
    },
    {
      id: 3,
      name: 'Image Optimizer',
      category: 'design',
      type: 'Desktop',
      price: 'Free',
      description: 'Compress and optimize images for web',
      icon: 'fas fa-file-image',
      features: ['Batch processing', 'Multiple formats', 'Quality control'],
      link: '#'
    },
    {
      id: 4,
      name: 'Code Generator',
      category: 'development',
      type: 'Web App',
      price: 'Free',
      description: 'Generate HTML, CSS, and JavaScript code snippets',
      icon: 'fas fa-code',
      features: ['Templates', 'Customizable', 'Copy to clipboard'],
      link: '#'
    },
    {
      id: 5,
      name: 'SEO Analyzer',
      category: 'marketing',
      type: 'Web App',
      price: 'Free',
      description: 'Analyze and improve website SEO',
      icon: 'fas fa-chart-line',
      features: ['Site audit', 'Keyword analysis', 'Competitor research'],
      link: '#'
    },
    {
      id: 6,
      name: 'Social Media Scheduler',
      category: 'marketing',
      type: 'Web App',
      price: 'Premium',
      description: 'Schedule posts across multiple platforms',
      icon: 'fas fa-share-alt',
      features: ['Multi-platform', 'Analytics', 'Content calendar'],
      link: '#'
    },
    {
      id: 7,
      name: 'Project Management',
      category: 'productivity',
      type: 'Web App',
      price: 'Free',
      description: 'Manage projects and collaborate with teams',
      icon: 'fas fa-tasks',
      features: ['Task tracking', 'Team collaboration', 'File sharing'],
      link: '#'
    },
    {
      id: 8,
      name: 'Time Tracker',
      category: 'productivity',
      type: 'Desktop',
      price: 'Free',
      description: 'Track time spent on projects and tasks',
      icon: 'fas fa-clock',
      features: ['Automatic tracking', 'Reports', 'Invoice generation'],
      link: '#'
    },
    {
      id: 9,
      name: 'Website Analytics',
      category: 'analytics',
      type: 'Web App',
      price: 'Premium',
      description: 'Advanced analytics for website performance',
      icon: 'fas fa-chart-bar',
      features: ['Real-time data', 'Custom reports', 'User tracking'],
      link: '#'
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="tools-page">
      {/* Hero Section */}
      <section className="tools-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Essential Tools</span>
            </div>
            <h1 className="hero-title">Powerful Tools for Professionals</h1>
            <p className="hero-subtitle">
              Boost your productivity with our collection of essential tools 
              for design, development, marketing, and business.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>Tools Available</p>
              </div>
              <div className="stat">
                <h3>80%</h3>
                <p>Free Tools</p>
              </div>
              <div className="stat">
                <h3>100K+</h3>
                <p>Active Users</p>
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

      {/* Tools Grid */}
      <section className="tools-grid-section">
        <div className="container">
          <div className="tools-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Tools' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="section-subtitle">
              {filteredTools.length} tools available
            </p>
          </div>

          <div className="tools-grid">
            {filteredTools.map(tool => (
              <div key={tool.id} className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">
                    <i className={tool.icon}></i>
                  </div>
                  <div className="tool-meta">
                    <span className={`price-badge ${tool.price === 'Free' ? 'free' : 'premium'}`}>
                      {tool.price}
                    </span>
                    <span className="tool-type">{tool.type}</span>
                  </div>
                </div>

                <div className="tool-content">
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-description">{tool.description}</p>
                  
                  <div className="tool-features">
                    {tool.features.map((feature, idx) => (
                      <span key={idx} className="feature-tag">
                        <i className="fas fa-check"></i> {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="tool-footer">
                  {tool.link === '#' ? (
                    <Link to="/contact" className="btn btn-primary">
                      <i className="fas fa-external-link-alt"></i> Access Tool
                    </Link>
                  ) : (
                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <i className="fas fa-external-link-alt"></i> Access Tool
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Tools Section */}
      <section className="premium-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Premium Tools Suite</h2>
            <p className="section-subtitle">
              Get access to all premium tools with our affordable plans
            </p>
          </div>

          <div className="premium-cards">
            <div className="premium-card">
              <div className="premium-header">
                <h3>Basic</h3>
                <div className="price">
                  <span className="amount">₵99</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="features">
                <li><i className="fas fa-check"></i> All Free Tools</li>
                <li><i className="fas fa-check"></i> 5 Premium Tools</li>
                <li><i className="fas fa-check"></i> Basic Support</li>
                <li><i className="fas fa-times"></i> API Access</li>
                <li><i className="fas fa-times"></i> Team Collaboration</li>
              </ul>
              <Link to="/contact" className="btn btn-outline">
                Get Started
              </Link>
            </div>

            <div className="premium-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="premium-header">
                <h3>Professional</h3>
                <div className="price">
                  <span className="amount">₵299</span>
                  <span className="period">/month</span>
                </div>
                <div className="savings">Best Value</div>
              </div>
              <ul className="features">
                <li><i className="fas fa-check"></i> All Free Tools</li>
                <li><i className="fas fa-check"></i> All Premium Tools</li>
                <li><i className="fas fa-check"></i> Priority Support</li>
                <li><i className="fas fa-check"></i> API Access</li>
                <li><i className="fas fa-check"></i> Team Collaboration</li>
              </ul>
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
            </div>

            <div className="premium-card">
              <div className="premium-header">
                <h3>Enterprise</h3>
                <div className="price">
                  <span className="amount">Custom</span>
                  <span className="period">Contact us</span>
                </div>
              </div>
              <ul className="features">
                <li><i className="fas fa-check"></i> All Free Tools</li>
                <li><i className="fas fa-check"></i> All Premium Tools</li>
                <li><i className="fas fa-check"></i> 24/7 Support</li>
                <li><i className="fas fa-check"></i> Custom Integration</li>
                <li><i className="fas fa-check"></i> White Label</li>
              </ul>
              <Link to="/contact" className="btn btn-outline">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Section */}
      <section className="api-section">
        <div className="container">
          <div className="api-card">
            <div className="api-content">
              <div className="api-icon">
                <i className="fas fa-code"></i>
              </div>
              <h2>Developer API</h2>
              <p>
                Integrate our tools directly into your applications with our 
                comprehensive API. Perfect for developers and agencies.
              </p>
              <div className="api-features">
                <div className="feature">
                  <i className="fas fa-bolt"></i>
                  <span>Fast & Reliable</span>
                </div>
                <div className="feature">
                  <i className="fas fa-book"></i>
                  <span>Full Documentation</span>
                </div>
                <div className="feature">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure & Scalable</span>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-key"></i> Get API Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tools-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need Custom Tools?</h2>
            <p>
              Our development team can build custom tools and applications 
              tailored to your specific business needs.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-tools"></i> Request Custom Tool
              </Link>
              <Link to="/ebooks" className="btn btn-outline">
                <i className="fas fa-book"></i> View E-Books
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage;
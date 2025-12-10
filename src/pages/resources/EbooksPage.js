import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EbooksPage.css';

const EbooksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All E-books' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'business', name: 'Business & Marketing' },
    { id: 'development', name: 'Web Development' },
    { id: 'freelance', name: 'Freelancing' },
    { id: 'productivity', name: 'Productivity' }
  ];

  const ebooks = [
    {
      id: 1,
      title: 'The Complete Graphic Design Guide',
      category: 'design',
      author: 'Sarah Johnson',
      pages: 250,
      price: '₵149',
      format: 'PDF, EPUB, MOBI',
      rating: 4.9,
      description: 'Master graphic design principles, tools, and techniques',
      cover: 'https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Digital Marketing Strategy',
      category: 'business',
      author: 'Michael Chen',
      pages: 180,
      price: '₵129',
      format: 'PDF',
      rating: 4.7,
      description: 'Build effective digital marketing campaigns',
      cover: 'https://images.unsplash.com/photo-1432888622747-4eb9a8d3c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      category: 'development',
      author: 'Alex Rodriguez',
      pages: 320,
      price: '₵169',
      format: 'PDF, EPUB',
      rating: 4.8,
      description: 'From HTML to React - complete web development guide',
      cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: true
    },
    {
      id: 4,
      title: 'Freelance Success Blueprint',
      category: 'freelance',
      author: 'Emma Wilson',
      pages: 150,
      price: '₵99',
      format: 'PDF',
      rating: 4.9,
      description: 'Build a successful freelance business from scratch',
      cover: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: false
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      category: 'design',
      author: 'David Kim',
      pages: 220,
      price: '₵139',
      format: 'PDF, EPUB',
      rating: 4.6,
      description: 'User-centered design methodologies and best practices',
      cover: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: false
    },
    {
      id: 6,
      title: 'Productivity Mastery',
      category: 'productivity',
      author: 'James Carter',
      pages: 190,
      price: '₵89',
      format: 'PDF, MOBI',
      rating: 4.8,
      description: 'Maximize efficiency and achieve more in less time',
      cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: false
    },
    {
      id: 7,
      title: 'Social Media Marketing',
      category: 'business',
      author: 'Lisa Park',
      pages: 210,
      price: '₵119',
      format: 'PDF',
      rating: 4.7,
      description: 'Advanced strategies for social media growth',
      cover: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: true
    },
    {
      id: 8,
      title: 'JavaScript Mastery',
      category: 'development',
      author: 'Robert Miller',
      pages: 350,
      price: '₵179',
      format: 'PDF, EPUB, MOBI',
      rating: 4.9,
      description: 'Advanced JavaScript concepts and patterns',
      cover: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: false
    },
    {
      id: 9,
      title: 'Client Acquisition Secrets',
      category: 'freelance',
      author: 'Maria Garcia',
      pages: 170,
      price: '₵109',
      format: 'PDF',
      rating: 4.8,
      description: 'Proven methods to attract and retain high-paying clients',
      cover: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      featured: false
    }
  ];

  const filteredEbooks = selectedCategory === 'all' 
    ? ebooks 
    : ebooks.filter(ebook => ebook.category === selectedCategory);

  return (
    <div className="ebooks-page">
      {/* Hero Section */}
      <section className="ebooks-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Knowledge Resources</span>
            </div>
            <h1 className="hero-title">Expert E-books for Professional Growth</h1>
            <p className="hero-subtitle">
              In-depth guides and resources written by industry experts. 
              Expand your knowledge and advance your career.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>50+</h3>
                <p>E-books</p>
              </div>
              <div className="stat">
                <h3>25K+</h3>
                <p>Readers</p>
              </div>
              <div className="stat">
                <h3>4.8</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat">
                <h3>30</h3>
                <p>Expert Authors</p>
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

      {/* Featured E-books */}
      {selectedCategory === 'all' && (
        <section className="featured-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Featured E-books</h2>
              <p className="section-subtitle">
                Our most popular and highly-rated titles
              </p>
            </div>

            <div className="featured-grid">
              {ebooks.filter(ebook => ebook.featured).map(ebook => (
                <div key={ebook.id} className="featured-card">
                  <div className="featured-cover">
                    <img src={ebook.cover} alt={ebook.title} />
                    <div className="featured-badge">
                      <i className="fas fa-star"></i> Featured
                    </div>
                  </div>
                  <div className="featured-content">
                    <div className="ebook-meta">
                      <span className="author">By {ebook.author}</span>
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <span>{ebook.rating}</span>
                      </div>
                    </div>
                    <h3 className="ebook-title">{ebook.title}</h3>
                    <p className="ebook-description">{ebook.description}</p>
                    <div className="ebook-details">
                      <span className="pages">
                        <i className="fas fa-book"></i> {ebook.pages} pages
                      </span>
                      <span className="format">
                        <i className="fas fa-download"></i> {ebook.format}
                      </span>
                    </div>
                    <div className="ebook-actions">
                      <div className="ebook-price">{ebook.price}</div>
                      <Link to="/contact" className="btn btn-primary">
                        <i className="fas fa-shopping-cart"></i> Get E-book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* E-books Grid */}
      <section className="ebooks-grid-section">
        <div className="container">
          <div className="ebooks-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All E-books' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="section-subtitle">
              {filteredEbooks.length} e-books available
            </p>
          </div>

          <div className="ebooks-grid">
            {filteredEbooks.filter(ebook => !ebook.featured || selectedCategory !== 'all').map(ebook => (
              <div key={ebook.id} className="ebook-card">
                <div className="ebook-cover">
                  <img src={ebook.cover} alt={ebook.title} />
                </div>

                <div className="ebook-content">
                  <div className="ebook-header">
                    <div className="ebook-meta">
                      <span className="author">By {ebook.author}</span>
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <span>{ebook.rating}</span>
                      </div>
                    </div>
                    <h3 className="ebook-title">{ebook.title}</h3>
                    <p className="ebook-description">{ebook.description}</p>
                  </div>

                  <div className="ebook-details">
                    <div className="detail">
                      <i className="fas fa-book"></i>
                      <span>{ebook.pages} pages</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-download"></i>
                      <span>{ebook.format.split(',')[0]}+</span>
                    </div>
                  </div>

                  <div className="ebook-footer">
                    <div className="ebook-price">{ebook.price}</div>
                    <Link to="/contact" className="btn btn-primary">
                      Get Now
                    </Link>
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
                <span>Ultimate Collection</span>
              </div>
              <h2 className="bundle-title">Complete E-book Library</h2>
              <p className="bundle-description">
                Get unlimited access to all our current and future e-books. 
                Perfect for lifelong learners and professionals.
              </p>
              
              <div className="bundle-features">
                <div className="feature">
                  <i className="fas fa-infinity"></i>
                  <span>All E-books</span>
                </div>
                <div className="feature">
                  <i className="fas fa-sync"></i>
                  <span>Future Updates</span>
                </div>
                <div className="feature">
                  <i className="fas fa-download"></i>
                  <span>All Formats</span>
                </div>
                <div className="feature">
                  <i className="fas fa-users"></i>
                  <span>Community Access</span>
                </div>
              </div>

              <div className="bundle-pricing">
                <div className="price-info">
                  <div className="original-price">₵2,499</div>
                  <div className="current-price">₵1,299</div>
                  <div className="savings">Save 48%</div>
                </div>
                
                <Link to="/contact" className="btn btn-primary bundle-btn">
                  <i className="fas fa-graduation-cap"></i> Get Full Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Author Spotlight */}
      <section className="authors-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Authors</h2>
            <p className="section-subtitle">
              Industry experts and thought leaders
            </p>
          </div>

          <div className="authors-grid">
            <div className="author-card">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Sarah Johnson" />
              </div>
              <div className="author-info">
                <h3>Sarah Johnson</h3>
                <p className="author-title">Lead Designer at TechCorp</p>
                <p className="author-bio">
                  10+ years experience in graphic design and brand strategy.
                </p>
                <div className="author-stats">
                  <span>5 Books</span>
                  <span>4.9 Avg Rating</span>
                </div>
              </div>
            </div>

            <div className="author-card">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Michael Chen" />
              </div>
              <div className="author-info">
                <h3>Michael Chen</h3>
                <p className="author-title">Marketing Director</p>
                <p className="author-bio">
                  Specializes in digital marketing and growth strategies.
                </p>
                <div className="author-stats">
                  <span>3 Books</span>
                  <span>4.7 Avg Rating</span>
                </div>
              </div>
            </div>

            <div className="author-card">
              <div className="author-avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Alex Rodriguez" />
              </div>
              <div className="author-info">
                <h3>Alex Rodriguez</h3>
                <p className="author-title">Senior Developer</p>
                <p className="author-bio">
                  Full-stack developer with expertise in modern web technologies.
                </p>
                <div className="author-stats">
                  <span>4 Books</span>
                  <span>4.8 Avg Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="ebooks-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Start Your Learning Journey Today</h2>
            <p>
              Access expert knowledge and transform your skills with our 
              comprehensive collection of professional e-books.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                <i className="fas fa-book-open"></i> Browse All E-books
              </Link>
              <Link to="/templates" className="btn btn-outline">
                <i className="fas fa-file-alt"></i> View Templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EbooksPage;
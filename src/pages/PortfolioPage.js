import React, { useState, useEffect } from 'react';
import './PortfolioPage.css';

const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);

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

  useEffect(() => {
    // Projects data with actual image URLs
    const allProjects = [
      {
        id: 1,
        title: 'EcoBrand Identity',
        category: 'branding',
        description: 'Complete brand identity for sustainable products company',
        tags: ['Logo', 'Branding', 'Packaging'],
        image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'EcoBrand',
        year: '2023'
      },
      {
        id: 2,
        title: 'Finance Mobile App',
        category: 'uiux',
        description: 'UI/UX design for personal finance management app',
        tags: ['UI Design', 'UX Research', 'Mobile'],
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'FinTech Co',
        year: '2023'
      },
      {
        id: 3,
        title: 'Organic Food Packaging',
        category: 'packaging',
        description: 'Packaging design for organic food product line',
        tags: ['Packaging', 'Print', 'Illustration'],
        image: 'https://images.unsplash.com/photo-1580995170656-f0aa5c5c31dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'Organic Foods',
        year: '2023'
      },
      {
        id: 4,
        title: 'Tech Startup Website',
        category: 'web',
        description: 'Modern website design for tech startup company',
        tags: ['Web Design', 'Development', 'Responsive'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'TechStart Inc',
        year: '2023'
      },
      {
        id: 5,
        title: 'Coffee Shop Branding',
        category: 'branding',
        description: 'Brand identity for local specialty coffee shop',
        tags: ['Branding', 'Print', 'Merchandise'],
        image: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'Artisan Coffee',
        year: '2023'
      },
      {
        id: 6,
        title: 'Fitness App Design',
        category: 'uiux',
        description: 'Mobile app design for fitness tracking platform',
        tags: ['UI Design', 'Prototyping', 'Mobile'],
        image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'FitTrack',
        year: '2023'
      },
      {
        id: 7,
        title: 'Book Cover Designs',
        category: 'print',
        description: 'Series of book cover designs for publishing house',
        tags: ['Print', 'Typography', 'Illustration'],
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'BookHouse Publishing',
        year: '2023'
      },
      {
        id: 8,
        title: 'Corporate Branding',
        category: 'branding',
        description: 'Complete rebranding for established corporation',
        tags: ['Brand Strategy', 'Identity', 'Guidelines'],
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'GlobalCorp',
        year: '2023'
      },
      {
        id: 9,
        title: 'E-commerce Website',
        category: 'web',
        description: 'Online store design for fashion retailer',
        tags: ['E-commerce', 'UI Design', 'Development'],
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'StyleHub',
        year: '2023'
      },
      {
        id: 10,
        title: 'Restaurant Menu Design',
        category: 'print',
        description: 'Menu design for fine dining restaurant',
        tags: ['Print', 'Typography', 'Layout'],
        image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'Le Gourmet',
        year: '2023'
      },
      {
        id: 11,
        title: 'Health App UI/UX',
        category: 'uiux',
        description: 'Health tracking app with wellness features',
        tags: ['UI Design', 'UX Research', 'Healthcare'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'HealthTrack',
        year: '2023'
      },
      {
        id: 12,
        title: 'Music Festival Branding',
        category: 'branding',
        description: 'Complete branding for annual music festival',
        tags: ['Branding', 'Print', 'Digital'],
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        client: 'SoundWave Festival',
        year: '2023'
      }
    ];

    if (filter === 'all') {
      setProjects(allProjects);
    } else {
      setProjects(allProjects.filter(project => project.category === filter));
    }
  }, [filter]);

  const categories = [
    { id: 'all', name: 'All Projects', icon: 'fas fa-th' },
    { id: 'branding', name: 'Brand Identity', icon: 'fas fa-paint-brush' },
    { id: 'uiux', name: 'UI/UX Design', icon: 'fas fa-mobile-alt' },
    { id: 'web', name: 'Web Design', icon: 'fas fa-desktop' },
    { id: 'packaging', name: 'Packaging', icon: 'fas fa-box-open' },
    { id: 'print', name: 'Print Design', icon: 'fas fa-print' }
  ];

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero section">
        <div className="container">
          <div className="portfolio-hero-content animate-on-scroll">
            <h1 className="portfolio-title">Our Creative Portfolio</h1>
            <p className="portfolio-subtitle">
              Discover our diverse collection of design projects that showcase creativity, 
              innovation, and attention to detail across various industries.
            </p>
            <div className="portfolio-stats">
              <div className="stat-item">
                <div className="stat-number">150+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Industries Served</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter section">
        <div className="container">
          <div className="filter-header animate-on-scroll">
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Filter our portfolio by design category to see specific types of work
            </p>
          </div>
          
          <div className="filter-buttons animate-on-scroll">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                <i className={category.icon}></i>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolio-projects section">
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`project-card animate-on-scroll ${project.category}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-meta">
                        <div className="meta-item">
                          <i className="fas fa-user"></i>
                          <span>{project.client}</span>
                        </div>
                        <div className="meta-item">
                          <i className="fas fa-calendar"></i>
                          <span>{project.year}</span>
                        </div>
                      </div>
                      <div className="project-tags">
                        {project.tags.map(tag => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <button className="btn btn-small">
                        <i className="fas fa-expand"></i> View Project
                      </button>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">
                      <i className={categories.find(c => c.id === project.category)?.icon}></i>
                      {categories.find(c => c.id === project.category)?.name}
                    </span>
                  </div>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {projects.length === 0 && (
            <div className="no-projects animate-on-scroll">
              <i className="fas fa-search"></i>
              <h3>No projects found in this category</h3>
              <p>Try selecting a different category or view all projects</p>
              <button 
                className="btn btn-outline" 
                onClick={() => setFilter('all')}
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="testimonials-section section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Client Testimonials</h2>
            <p className="section-subtitle">
              What our clients say about working with us
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="testimonial-text">
                  "Working with Fast Multimedia transformed our brand. Their attention 
                  to detail and creative vision resulted in a design that perfectly 
                  represents our values."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Alex Johnson"
                    />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Alex Johnson</h4>
                    <p className="author-role">CEO, EcoBrand</p>
                    <div className="author-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="testimonial-text">
                  "The team delivered beyond our expectations. Their UI/UX design 
                  significantly improved our app's user retention and satisfaction rates."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Maria Garcia"
                    />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Maria Garcia</h4>
                    <p className="author-role">Product Manager, FinTech Co</p>
                    <div className="author-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="testimonial-text">
                  "Professional, creative, and reliable. Our packaging design increased 
                  sales by 40% in the first quarter after launch. Highly recommended!"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="David Chen"
                    />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">David Chen</h4>
                    <p className="author-role">Marketing Director, Organic Foods</p>
                    <div className="author-rating">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta section">
        <div className="container">
          <div className="cta-content animate-on-scroll">
            <div className="cta-text">
              <h2 className="cta-title">Ready to Start Your Project?</h2>
              <p className="cta-description">
                Let's create something amazing together. Contact us to discuss your design needs 
                and get a free consultation and quote.
              </p>
            </div>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                <i className="fas fa-paper-plane"></i> Start a Project
              </a>
              <a href="/contact" className="btn btn-outline">
                <i className="fas fa-phone-alt"></i> Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
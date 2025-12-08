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
    // Mock projects data
    const allProjects = [
      {
        id: 1,
        title: 'EcoBrand Identity',
        category: 'branding',
        description: 'Complete brand identity for sustainable products company',
        tags: ['Logo', 'Branding', 'Packaging']
      },
      {
        id: 2,
        title: 'Finance Mobile App',
        category: 'uiux',
        description: 'UI/UX design for personal finance management app',
        tags: ['UI Design', 'UX Research', 'Mobile']
      },
      {
        id: 3,
        title: 'Organic Food Packaging',
        category: 'packaging',
        description: 'Packaging design for organic food product line',
        tags: ['Packaging', 'Print', 'Illustration']
      },
      {
        id: 4,
        title: 'Tech Startup Website',
        category: 'web',
        description: 'Modern website design for tech startup company',
        tags: ['Web Design', 'Development', 'Responsive']
      },
      {
        id: 5,
        title: 'Coffee Shop Branding',
        category: 'branding',
        description: 'Brand identity for local specialty coffee shop',
        tags: ['Branding', 'Print', 'Merchandise']
      },
      {
        id: 6,
        title: 'Fitness App Design',
        category: 'uiux',
        description: 'Mobile app design for fitness tracking platform',
        tags: ['UI Design', 'Prototyping', 'Mobile']
      },
      {
        id: 7,
        title: 'Book Cover Designs',
        category: 'print',
        description: 'Series of book cover designs for publishing house',
        tags: ['Print', 'Typography', 'Illustration']
      },
      {
        id: 8,
        title: 'Corporate Branding',
        category: 'branding',
        description: 'Complete rebranding for established corporation',
        tags: ['Brand Strategy', 'Identity', 'Guidelines']
      },
      {
        id: 9,
        title: 'E-commerce Website',
        category: 'web',
        description: 'Online store design for fashion retailer',
        tags: ['E-commerce', 'UI Design', 'Development']
      }
    ];

    if (filter === 'all') {
      setProjects(allProjects);
    } else {
      setProjects(allProjects.filter(project => project.category === filter));
    }
  }, [filter]);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'branding', name: 'Brand Identity' },
    { id: 'uiux', name: 'UI/UX Design' },
    { id: 'web', name: 'Web Design' },
    { id: 'packaging', name: 'Packaging' },
    { id: 'print', name: 'Print Design' }
  ];

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero section">
        <div className="container animate-on-scroll">
          <h1 className="portfolio-title">Our Portfolio</h1>
          <p className="portfolio-subtitle">
            Explore our diverse collection of design projects across various industries
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter section">
        <div className="container">
          <div className="filter-buttons animate-on-scroll">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
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
                  <div className="image-placeholder">
                    <i className={`fas ${
                      project.category === 'branding' ? 'fa-paint-brush' :
                      project.category === 'uiux' ? 'fa-mobile-alt' :
                      project.category === 'web' ? 'fa-desktop' :
                      project.category === 'packaging' ? 'fa-box-open' :
                      'fa-print'
                    }`}></i>
                  </div>
                  <div className="project-overlay">
                    <div className="overlay-content">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description">{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map(tag => (
                          <span key={tag} className="project-tag">{tag}</span>
                        ))}
                      </div>
                      <button className="btn btn-small">
                        <i className="fas fa-expand"></i> View Details
                      </button>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{categories.find(c => c.id === project.category)?.name}</p>
                </div>
              </div>
            ))}
          </div>
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
                <p className="testimonial-text">
                  "Working with Creative Studio transformed our brand. Their attention 
                  to detail and creative vision resulted in a design that perfectly 
                  represents our values."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Alex Johnson</h4>
                    <p className="author-role">CEO, EcoBrand</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "The team delivered beyond our expectations. Their UI/UX design 
                  significantly improved our app's user retention and satisfaction rates."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">Maria Garcia</h4>
                    <p className="author-role">Product Manager, FinTech Co</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll">
              <div className="testimonial-content">
                <p className="testimonial-text">
                  "Professional, creative, and reliable. Our packaging design increased 
                  sales by 40% in the first quarter after launch."
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">David Chen</h4>
                    <p className="author-role">Marketing Director, Organic Foods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta section">
        <div className="container animate-on-scroll">
          <h2 className="cta-title">Ready to Start Your Project?</h2>
          <p className="cta-text">
            Let's create something amazing together. Contact us to discuss your design needs.
          </p>
          <a href="/contact" className="btn btn-primary">
            <i className="fas fa-paper-plane"></i> Start a Project
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
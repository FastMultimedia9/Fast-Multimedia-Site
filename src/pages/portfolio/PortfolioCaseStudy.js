import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './PortfolioCaseStudy.css';

const PortfolioCaseStudy = () => {
  const { projectId } = useParams();
  
  // Generic project data - replace with actual data fetching if needed
  const projects = {
    'default': {
      title: "Project Title",
      category: "Brand Identity",
      description: "A comprehensive design project focused on delivering measurable business results.",
      year: "2025",
      duration: "4 weeks",
      client: "Client Name",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      stats: [
        { value: "40%", label: "Increase in Engagement" },
        { value: "95%", label: "Client Satisfaction" },
        { value: "2x", label: "Return on Investment" }
      ],
      sections: [
        {
          title: "The Challenge",
          content: "The client needed a modern, scalable solution that could adapt to their growing needs while maintaining a strong connection with their existing audience. The previous design was outdated and lacked a cohesive visual identity.",
          image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          title: "The Solution",
          content: "We developed a comprehensive design system that prioritized user experience and brand consistency. Through thorough research and iterative prototyping, we created a solution that not only looked great but also performed exceptionally well across all platforms.",
          image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ]
    }
  };

  // Use the default project if specific ID not found
  const project = projects[projectId] || projects['default'];

  return (
    <div className="case-study-page">
      {/* Hero Section */}
      <section className="case-study-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / 
            <Link to="/portfolio">Portfolio</Link> / 
            <span>{project.title}</span>
          </div>
          
          <div className="hero-content">
            <div className="case-study-badge">
              <span>Case Study</span>
            </div>
            <h1 className="case-study-title">{project.title}</h1>
            <p className="case-study-subtitle">{project.description}</p>
            
            <div className="project-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{project.year}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-tags"></i>
                <span>{project.category}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{project.duration}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-user"></i>
                <span>{project.client}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="project-hero-image">
        <div className="container">
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="project-stats">
        <div className="container">
          <div className="stats-grid">
            {project.stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Sections */}
      {project.sections && project.sections.map((section, index) => (
        <section key={index} className={`project-section ${index % 2 === 1 ? 'reverse' : ''}`}>
          <div className="container">
            <div className="section-content">
              <div className="section-text">
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </div>
              {section.image && (
                <div className="section-image">
                  <img src={section.image} alt={section.title} />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="case-study-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Want a Similar Project?</h2>
            <p>
              Let's create something amazing together. 
              Get your free design consultation today!
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-christmas">
                <i className="fas fa-paper-plane"></i> Start Your Project
              </Link>
              <Link to="/portfolio" className="btn btn-secondary">
                <i className="fas fa-images"></i> View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioCaseStudy;
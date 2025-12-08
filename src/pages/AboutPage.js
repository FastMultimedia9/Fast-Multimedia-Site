import React, { useEffect } from 'react';
import './AboutPage.css';

const AboutPage = () => {
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

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero section">
        <div className="about-hero-content animate-on-scroll">
          <h1 className="about-title">Our Story & Philosophy</h1>
          <p className="about-subtitle">
            We are passionate designers committed to creating meaningful 
            visual experiences that drive business success.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mission-values section">
        <div className="container">
          <div className="mission-content animate-on-scroll">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-description">
                To transform businesses through exceptional design that not only 
                looks beautiful but also solves real problems and creates value. 
                We believe that great design should be accessible to every business, 
                regardless of size or industry.
              </p>
              <div className="mission-stats">
                <div className="mission-stat">
                  <h3>5+</h3>
                  <p>Years of Excellence</p>
                </div>
                <div className="mission-stat">
                  <h3>50+</h3>
                  <p>Team Members</p>
                </div>
                <div className="mission-stat">
                  <h3>15+</h3>
                  <p>Industry Awards</p>
                </div>
              </div>
            </div>
            <div className="mission-image animate-on-scroll">
              <div className="image-placeholder">
                <i className="fas fa-bullseye"></i>
              </div>
            </div>
          </div>

          <div className="values-grid">
            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We constantly explore new ideas and techniques to deliver 
                cutting-edge design solutions.
              </p>
            </div>

            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="value-title">Collaboration</h3>
              <p className="value-description">
                We work closely with our clients to ensure their vision 
                is realized in every design detail.
              </p>
            </div>

            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-description">
                We maintain the highest standards in every project, 
                delivering quality that exceeds expectations.
              </p>
            </div>

            <div className="value-card animate-on-scroll">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3 className="value-title">Passion</h3>
              <p className="value-description">
                Our love for design drives us to create work that 
                inspires and makes a lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Meet Our Creative Team</h2>
            <p className="section-subtitle">
              Talented professionals dedicated to bringing your vision to life
            </p>
          </div>

          <div className="team-grid">
            <div className="team-member animate-on-scroll">
              <div className="member-image">
                <div className="image-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="member-info">
                <h3 className="member-name">Sarah Chen</h3>
                <p className="member-role">Creative Director</p>
                <p className="member-bio">
                  With 10+ years in design, Sarah leads our creative vision 
                  and ensures every project meets our high standards.
                </p>
                <div className="member-social">
                  <a href="#linkedin"><i className="fab fa-linkedin"></i></a>
                  <a href="#twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#dribbble"><i className="fab fa-dribbble"></i></a>
                </div>
              </div>
            </div>

            <div className="team-member animate-on-scroll">
              <div className="member-image">
                <div className="image-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="member-info">
                <h3 className="member-name">Marcus Rodriguez</h3>
                <p className="member-role">Senior UI/UX Designer</p>
                <p className="member-bio">
                  Marcus specializes in creating intuitive digital experiences 
                  that users love and businesses thrive on.
                </p>
                <div className="member-social">
                  <a href="#linkedin"><i className="fab fa-linkedin"></i></a>
                  <a href="#twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#behance"><i className="fab fa-behance"></i></a>
                </div>
              </div>
            </div>

            <div className="team-member animate-on-scroll">
              <div className="member-image">
                <div className="image-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="member-info">
                <h3 className="member-name">James Wilson</h3>
                <p className="member-role">Brand Strategist</p>
                <p className="member-bio">
                  James helps businesses define their identity and create 
                  powerful brand stories that resonate with audiences.
                </p>
                <div className="member-social">
                  <a href="#linkedin"><i className="fab fa-linkedin"></i></a>
                  <a href="#twitter"><i className="fab fa-twitter"></i></a>
                  <a href="#medium"><i className="fab fa-medium"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Our Design Process</h2>
            <p className="section-subtitle">
              A structured approach that ensures quality and efficiency
            </p>
          </div>

          <div className="process-steps">
            <div className="process-step animate-on-scroll">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3 className="step-title">Discovery</h3>
                <p className="step-description">
                  We begin by understanding your business, goals, 
                  and target audience through in-depth research.
                </p>
              </div>
            </div>

            <div className="process-step animate-on-scroll">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3 className="step-title">Strategy</h3>
                <p className="step-description">
                  We develop a comprehensive design strategy aligned 
                  with your business objectives and user needs.
                </p>
              </div>
            </div>

            <div className="process-step animate-on-scroll">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3 className="step-title">Design</h3>
                <p className="step-description">
                  Our team creates beautiful, functional designs 
                  based on the established strategy and requirements.
                </p>
              </div>
            </div>

            <div className="process-step animate-on-scroll">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3 className="step-title">Delivery</h3>
                <p className="step-description">
                  We deliver final assets and provide guidance for 
                  implementation to ensure successful deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta section">
        <div className="container animate-on-scroll">
          <h2 className="cta-title">Want to Join Our Team?</h2>
          <p className="cta-text">
            We're always looking for talented designers to join our growing team.
          </p>
          <a href="mailto:careers@creativestudio.com" className="btn btn-primary">
            <i className="fas fa-envelope"></i> Send Your Portfolio
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fallback text for each social media platform
  const socialPlatforms = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', fallback: 'FB' },
    { name: 'Twitter', icon: 'fab fa-twitter', fallback: 'TW' },
    { name: 'Instagram', icon: 'fab fa-instagram', fallback: 'IG' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', fallback: 'IN' },
    { name: 'YouTube', icon: 'fab fa-youtube', fallback: 'YT' },
    { name: 'Pinterest', icon: 'fab fa-pinterest-p', fallback: 'PN' },
    { name: 'Behance', icon: 'fab fa-behance', fallback: 'BE' },
    { name: 'Dribbble', icon: 'fab fa-dribbble', fallback: 'DR' }
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-about">
              <div className="footer-logo">
                <div className="logo-icon">
                  <span className="logo-icon-text">CS</span>
                </div>
                <div className="logo-text">
                  <span className="logo-primary">Fast</span>
                  <span className="logo-secondary">Multimedia</span>
                </div>
              </div>
              <p className="footer-about-text">
                We transform ideas into stunning visual experiences. 
                Professional graphic design services for businesses 
                looking to elevate their brand.
              </p>
              <div className="footer-social">
                {socialPlatforms.map((platform, index) => (
                  <a 
                    key={index}
                    href={`https://${platform.name.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={platform.name}
                  >
                    <i className={platform.icon}>
                      <span className="social-fallback">{platform.fallback}</span>
                    </i>
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-col footer-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-col footer-services">
              <h3 className="footer-title">Services</h3>
              <ul className="footer-menu">
                <li><a href="#branding">Brand Identity</a></li>
                <li><a href="#uiux">UI/UX Design</a></li>
                <li><a href="#web">Web Design</a></li>
                <li><a href="#packaging">Packaging Design</a></li>
                <li><a href="#print">Print Design</a></li>
              </ul>
            </div>

            <div className="footer-col footer-contact">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="footer-contact-info">
                <li>
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span>Kpong, Tema Akosombo Road</span>
                </li>
                <li>
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-details">
                    <span>+233 505-159-131</span>
                    <span>+233 548-890-306</span>
                  </div>
                </li>
                <li>
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span>fasttech227@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} Fast Multimedia. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
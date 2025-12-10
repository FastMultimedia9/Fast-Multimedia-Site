// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media platforms with proper icons
  const socialPlatforms = [
    { 
      name: 'Facebook', 
      icon: 'fab fa-facebook-f', 
      url: 'https://facebook.com/profile.php?id=100063646042170',
      color: '#1877f2'
    },
    { 
      name: 'Twitter', 
      icon: 'fab fa-twitter', 
      url: 'https://twitter.com',
      color: '#1da1f2'
    },
    { 
      name: 'Instagram', 
      icon: 'fab fa-instagram', 
      url: 'https://instagram.com/fastmultimedia9/',
      color: '#e4405f'
    },
    { 
      name: 'LinkedIn', 
      icon: 'fab fa-linkedin-in', 
      url: 'https://linkedin.com/fast-multimedia-bb548b285',
      color: '#0077b5'
    },
    { 
      name: 'YouTube', 
      icon: 'fab fa-youtube', 
      url: 'https://youtube.com/@FastTech2026',
      color: '#ff0000'
    },
    { 
      name: 'Pinterest', 
      icon: 'fab fa-pinterest-p', 
      url: 'https://pinterest.com/fasttech227/',
      color: '#bd081c'
    },
   
  ];

  const services = [
    { name: 'Brand Identity', path: '/services#branding' },
    { name: 'UI/UX Design', path: '/services#uiux' },
    { name: 'Web Design', path: '/services#web' },
    { name: 'Packaging Design', path: '/services#packaging' },
    { name: 'Print Design', path: '/services#print' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col footer-about">
              <div className="footer-logo">
                <div className="logo-icon">
                  <i className="fas fa-palette"></i>
                </div>
                <div className="logo-text">
                  <span className="logo-primary">Fast</span>
                  <span className="logo-secondary">Multimedia</span>
                </div>
              </div>
              <p className="footer-description">
                We transform ideas into stunning visual experiences. 
                Professional graphic design services for businesses 
                looking to elevate their brand.
              </p>
              
              <div className="footer-social">
                {socialPlatforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={`Follow us on ${platform.name}`}
                    style={{ '--hover-color': platform.color }}
                  >
                    <i className={platform.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col footer-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-menu">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>
                      <i className="fas fa-chevron-right"></i>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col footer-services">
              <h3 className="footer-title">Our Services</h3>
              <ul className="footer-menu">
                {services.map((service, index) => (
                  <li key={index}>
                    <a href={service.path}>
                      <i className="fas fa-chevron-right"></i>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col footer-contact">
              <h3 className="footer-title">Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <span>Kpong, Tema Akosombo Road</span>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-text">
                    <a href="tel:+233505159131">+233 505-159-131</a>
                    <a href="tel:+233548890306">+233 548-890-306</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <a href="mailto:fasttech227@gmail.com">fasttech227@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              <i className="far fa-copyright"></i> {currentYear} Fast Multimedia. All rights reserved.
            </p>
            
            <div className="footer-legal">
              <a href="/privacy-policy">
                <i className="fas fa-shield-alt"></i> Privacy Policy
              </a>
              <a href="/terms">
                <i className="fas fa-file-contract"></i> Terms of Service
              </a>
              <a href="/cookies">
                <i className="fas fa-cookie-bite"></i> Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
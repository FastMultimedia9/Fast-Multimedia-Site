// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

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
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.footerGrid}>
            {/* Company Info */}
            <div className={`${styles.footerCol} ${styles.footerAbout}`}>
              <div className={styles.footerLogo}>
                <div className={styles.logoIcon}>
                  <i className="fas fa-palette"></i>
                </div>
                <div className={styles.logoText}>
                  <span className={styles.logoPrimary}>Fast</span>
                  <span className={styles.logoSecondary}>Multimedia</span>
                </div>
              </div>
              <p className={styles.footerDescription}>
                We transform ideas into stunning visual experiences. 
                Professional graphic design services for businesses 
                looking to elevate their brand.
              </p>
              
              <div className={styles.footerSocial}>
                {socialPlatforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    title={`Follow us on ${platform.name}`}
                    style={{ '--hover-color': platform.color }}
                  >
                    <i className={platform.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className={`${styles.footerCol} ${styles.footerLinks}`}>
              <h3 className={styles.footerTitle}>Quick Links</h3>
              <ul className={styles.footerMenu}>
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
            <div className={`${styles.footerCol} ${styles.footerServices}`}>
              <h3 className={styles.footerTitle}>Our Services</h3>
              <ul className={styles.footerMenu}>
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
            <div className={`${styles.footerCol} ${styles.footerContact}`}>
              <h3 className={styles.footerTitle}>Contact Info</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className={styles.contactText}>
                    <span>Kpong, Tema Akosombo Road</span>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className={styles.contactText}>
                    <a href="tel:+233505159131">+233 505-159-131</a>
                    <a href="tel:+233548890306">+233 548-890-306</a>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon}>
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className={styles.contactText}>
                    <a href="mailto:fasttech227@gmail.com">fasttech227@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              <i className="far fa-copyright"></i> {currentYear} Fast Multimedia. All rights reserved.
            </p>
            
            <div className={styles.footerLegal}>
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
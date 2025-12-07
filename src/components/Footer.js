import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Golden Nest Hotel</h3>
          <p>Luxury accommodation with world-class amenities</p>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 123 Luxury Street, City</p>
          <p>📞 +1 (234) 567-8900</p>
          <p>✉️ info@goldennest.com</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Golden Nest Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
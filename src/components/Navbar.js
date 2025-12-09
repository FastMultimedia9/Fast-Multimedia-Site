// Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: 'fas fa-home' },
    { path: '/portfolio', name: 'Portfolio', icon: 'fas fa-images' },
    { path: '/services', name: 'Services', icon: 'fas fa-paint-brush' },
    { path: '/about', name: 'About', icon: 'fas fa-info-circle' },
    { path: '/contact', name: 'Contact', icon: 'fas fa-envelope' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-text">
            <i className="FM"></i>
          </div>
          <div className="logo-text">
            <span className="logo-primary">Fast</span>
            <span className="logo-secondary">Multimedia</span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="navbar-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              <i className={link.icon}></i>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="navbar-cta">
          <Link to="/contact" className="btn btn-primary">
            <i className="fas fa-rocket"></i>
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
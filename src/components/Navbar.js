// Navbar.js - RESOURCES AS STANDALONE LINK
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    navigate(path);
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: 'fas fa-home' },
    { path: '/services', name: 'Services', icon: 'fas fa-paint-brush' },
    { path: '/portfolio', name: 'Portfolio', icon: 'fas fa-images' },
    { path: '/about', name: 'About', icon: 'fas fa-info-circle' },
    { path: '/blog', name: 'Blog', icon: 'fas fa-blog' },
    { path: '/resources', name: 'Resources', icon: 'fas fa-book-open' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => handleNavigation('/')}>
          <div className="logo-icon">
            <i className="fas fa-palette"></i>
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
          aria-expanded={isMenuOpen}
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
              onClick={() => handleNavigation(link.path)}
              end
            >
              <i className={link.icon}></i>
              <span className="link-text">{link.name}</span>
            </NavLink>
          ))}
          
          {/* Contact as CTA Button */}
          <Link 
            to="/contact" 
            className="nav-link nav-cta-btn" 
            onClick={() => handleNavigation('/contact')}
          >
            <i className="fas fa-envelope"></i>
            <span className="link-text">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
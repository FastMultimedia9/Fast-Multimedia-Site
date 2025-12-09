// Navbar.js
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isResourcesOpen) setIsResourcesOpen(false);
  };

  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
    window.scrollTo(0, 0);
    navigate(path);
  };

  const navLinks = [
    { path: '/', name: 'Home', icon: 'fas fa-home' },
    { path: '/services', name: 'Services', icon: 'fas fa-paint-brush' },
    { path: '/portfolio', name: 'Portfolio', icon: 'fas fa-images' },
    { path: '/about', name: 'About', icon: 'fas fa-info-circle' },
    { path: '/blog', name: 'Blog', icon: 'fas fa-blog' },
    { 
      name: 'Resources', 
      icon: 'fas fa-book-open',
      submenu: [
        { path: '/resources/training', name: 'Training Courses', icon: 'fas fa-graduation-cap' },
        { path: '/resources/tutorials', name: 'Video Tutorials', icon: 'fas fa-video' },
        { path: '/resources/templates', name: 'Free Templates', icon: 'fas fa-file-download' },
        { path: '/resources/tools', name: 'Design Tools', icon: 'fas fa-tools' },
        { path: '/resources/ebooks', name: 'Free eBooks', icon: 'fas fa-book' },
        { path: '/resources/affiliates', name: 'Affiliate Products', icon: 'fas fa-star' }
      ]
    },
    { path: '/contact', name: 'Contact', icon: 'fas fa-envelope' },
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
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            link.submenu ? (
              <div 
                key={link.name} 
                className={`nav-link dropdown ${isResourcesOpen ? 'open' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setIsResourcesOpen(true)}
                onMouseLeave={() => window.innerWidth > 768 && setIsResourcesOpen(false)}
              >
                <button 
                  className="dropdown-toggle"
                  onClick={() => window.innerWidth <= 768 ? toggleResources() : null}
                >
                  <i className={link.icon}></i>
                  <span>{link.name} <i className="fas fa-chevron-down"></i></span>
                </button>
                
                <div className={`dropdown-menu ${isResourcesOpen ? 'show' : ''}`}>
                  {link.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className="dropdown-item"
                      onClick={() => handleNavigation(subitem.path)}
                    >
                      <i className={subitem.icon}></i>
                      <span>{subitem.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={() => handleNavigation(link.path)}
              >
                <i className={link.icon}></i>
                <span>{link.name}</span>
              </NavLink>
            )
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="navbar-cta">
          <Link to="/contact" className="btn btn-primary" onClick={() => handleNavigation('/contact')}>
            <i className="fas fa-rocket"></i>
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authAPI, supabase } from '../supabase';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authAPI.getCurrentUserWithProfile();
        setCurrentUser(user);
        setUserRole(user?.profile?.role || null);
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const user = await authAPI.getCurrentUserWithProfile();
          setCurrentUser(user);
          setUserRole(user?.profile?.role || null);
        } else {
          setCurrentUser(null);
          setUserRole(null);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await authAPI.logout();
    setCurrentUser(null);
    setUserRole(null);
    navigate('/');
    window.location.reload();
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
      hasDropdown: true,
      submenu: [
        { path: '/resources', name: 'All Resources', icon: 'fas fa-th' },
        { path: '/resources/training', name: 'Training', icon: 'fas fa-graduation-cap' },
        { path: '/resources/tutorials', name: 'Tutorials', icon: 'fas fa-video' },
        { path: '/resources/templates', name: 'Templates', icon: 'fas fa-file-download' },
        { path: '/resources/tools', name: 'Tools', icon: 'fas fa-tools' }
      ]
    },
    { path: '/contact', name: 'Contact', icon: 'fas fa-envelope' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => handleNavigation('/')}>
          <img 
            src="/logo.png" 
            alt="Fast Multimedia Logo" 
            className="navbar-logo-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="logo-text-fallback">
                  <div class="logo-icon">
                    <i class="fas fa-rocket"></i>
                  </div>
                  <div class="logo-text">
                    <span class="logo-primary">Fast Multimedia</span>
                    <span class="logo-secondary">Creative Solutions</span>
                  </div>
                </div>
              `;
            }}
          />
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
            link.hasDropdown ? (
              <div 
                key={link.name} 
                className={`nav-link dropdown ${isResourcesOpen ? 'open' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setIsResourcesOpen(true)}
                onMouseLeave={() => window.innerWidth > 768 && setIsResourcesOpen(false)}
              >
                <button 
                  className="dropdown-toggle"
                  onClick={() => {
                    if (window.innerWidth <= 768) {
                      toggleResources();
                    }
                  }}
                  aria-expanded={isResourcesOpen}
                  aria-haspopup="true"
                >
                  <i className={link.icon}></i>
                  <span className="link-text">{link.name}</span>
                  <i className="fas fa-chevron-down dropdown-arrow"></i>
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
                end
              >
                <i className={link.icon}></i>
                <span className="link-text">{link.name}</span>
              </NavLink>
            )
          ))}
        </div>

        {/* User Account Section - COMPACT VERSION */}
        <div className="navbar-account">
          {currentUser ? (
            <div className="user-dropdown">
              <button className="user-toggle compact">
                <i className="fas fa-user-circle"></i>
                <span className="user-name compact">
                  {currentUser.profile?.name?.split(' ')[0] || 
                   currentUser.email?.split('@')[0]?.substring(0, 10) ||
                   'User'}
                </span>
                <i className="fas fa-chevron-down compact-arrow"></i>
              </button>
              <div className="dropdown-menu user-menu compact">
                <div className="dropdown-header compact">
                  <div className="user-info compact">
                    <i className="fas fa-user-circle user-avatar compact"></i>
                    <div className="user-details-compact">
                      <strong className="compact">{currentUser.profile?.name || 'User'}</strong>
                      <small className="compact">{currentUser.email?.substring(0, 20)}...</small>
                      <span className={`role-badge compact ${userRole}`}>
                        {userRole === 'admin' ? 'Admin' : 'User'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={userRole === 'admin' ? '/admin' : '/user/dashboard'}
                  className="dropdown-item compact"
                  onClick={() => handleNavigation(userRole === 'admin' ? '/admin' : '/user/dashboard')}
                >
                  <i className="fas fa-columns"></i>
                  <span>{userRole === 'admin' ? 'Admin Panel' : 'My Dashboard'}</span>
                </Link>
                
                {userRole === 'user' && (
                  <Link 
                    to="/user/dashboard?tab=create-post"
                    className="dropdown-item compact"
                    onClick={() => handleNavigation('/user/dashboard?tab=create-post')}
                  >
                    <i className="fas fa-plus"></i>
                    <span>Create Post</span>
                  </Link>
                )}
                
                <Link 
                  to="/blog"
                  className="dropdown-item compact"
                  onClick={() => handleNavigation('/blog')}
                >
                  <i className="fas fa-newspaper"></i>
                  <span>Blog</span>
                </Link>
                
                <div className="dropdown-divider compact"></div>
                
                <button 
                  onClick={handleLogout}
                  className="dropdown-item logout compact"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-links compact">
              <Link 
                to="/admin/login" 
                className="btn btn-outline compact"
                onClick={() => handleNavigation('/admin/login')}
              >
                <i className="fas fa-sign-in-alt"></i>
                <span className="auth-text">Login</span>
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary compact"
                onClick={() => handleNavigation('/register')}
              >
                <i className="fas fa-user-plus"></i>
                <span className="auth-text">Register</span>
              </Link>
            </div>
          )}

          {/* Call to Action Button - COMPACT */}
          <div className="navbar-cta compact">
            <Link to="/contact" className="btn btn-primary compact" onClick={() => handleNavigation('/contact')}>
              <i className="fas fa-rocket"></i>
              <span className="cta-text">Get Quote</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
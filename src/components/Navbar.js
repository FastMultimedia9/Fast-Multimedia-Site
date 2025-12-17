import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authAPI, supabase } from '../supabase'; // Import supabase directly
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authAPI.getCurrentUserWithProfile();
      setCurrentUser(user);
      setUserRole(user?.profile?.role || null);
    };
    
    checkAuth();
    
    // Listen for auth state changes - FIXED: Use supabase directly, not authAPI.supabase
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

        {/* User Account Section */}
        <div className="navbar-account">
          {currentUser ? (
            <div className="user-dropdown">
              <button className="user-toggle">
                <i className="fas fa-user-circle"></i>
                <span className="user-name">
                  {currentUser.profile?.name || currentUser.email?.split('@')[0]}
                </span>
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="dropdown-menu user-menu">
                <div className="dropdown-header">
                  <div className="user-info">
                    <i className="fas fa-user-circle user-avatar"></i>
                    <div>
                      <strong>{currentUser.profile?.name || 'User'}</strong>
                      <small>{currentUser.email}</small>
                      <span className={`role-badge ${userRole}`}>
                        {userRole === 'admin' ? 'Administrator' : 'Regular User'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to={userRole === 'admin' ? '/admin' : '/user/dashboard'}
                  className="dropdown-item"
                  onClick={() => handleNavigation(userRole === 'admin' ? '/admin' : '/user/dashboard')}
                >
                  <i className="fas fa-columns"></i>
                  <span>{userRole === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}</span>
                </Link>
                
                {userRole === 'user' && (
                  <Link 
                    to="/user/dashboard?tab=create-post"
                    className="dropdown-item"
                    onClick={() => handleNavigation('/user/dashboard?tab=create-post')}
                  >
                    <i className="fas fa-plus-circle"></i>
                    <span>Create Post</span>
                  </Link>
                )}
                
                <Link 
                  to="/blog"
                  className="dropdown-item"
                  onClick={() => handleNavigation('/blog')}
                >
                  <i className="fas fa-newspaper"></i>
                  <span>View Blog</span>
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <button 
                  onClick={handleLogout}
                  className="dropdown-item logout"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link 
                to="/admin/login" 
                className="btn btn-outline"
                onClick={() => handleNavigation('/admin/login')}
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="btn btn-primary"
                onClick={() => handleNavigation('/register')}
              >
                <i className="fas fa-user-plus"></i>
                <span>Register</span>
              </Link>
            </div>
          )}

          {/* Call to Action Button */}
          <div className="navbar-cta">
            <Link to="/contact" className="btn btn-primary" onClick={() => handleNavigation('/contact')}>
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
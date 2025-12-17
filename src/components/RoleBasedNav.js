import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../supabase';
import './RoleBasedNav.css';

const RoleBasedNav = () => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await authAPI.getCurrentUserWithProfile();
      setUser(currentUser);
      setUserRole(currentUser?.profile?.role);
    };
    
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await authAPI.logout();
    navigate('/');
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="auth-nav">
        <Link to="/admin/login" className="nav-link">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
        <Link to="/register" className="nav-link register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </div>
    );
  }

  return (
    <div className="user-nav">
      <div className="user-dropdown">
        <button className="user-toggle">
          <i className="fas fa-user-circle"></i>
          <span>{user.profile?.name || user.email}</span>
          <i className="fas fa-chevron-down"></i>
        </button>
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <strong>{user.profile?.name || 'User'}</strong>
            <small>{user.email}</small>
            <span className={`role-badge ${userRole}`}>
              {userRole === 'admin' ? 'Administrator' : 'Regular User'}
            </span>
          </div>
          
          {userRole === 'admin' ? (
            <Link to="/admin" className="dropdown-item">
              <i className="fas fa-tachometer-alt"></i> Admin Dashboard
            </Link>
          ) : (
            <Link to="/user/dashboard" className="dropdown-item">
              <i className="fas fa-columns"></i> My Dashboard
            </Link>
          )}
          
          <Link to="/user/profile" className="dropdown-item">
            <i className="fas fa-user-cog"></i> My Profile
          </Link>
          
          {userRole === 'user' && (
            <Link to="/user/dashboard?tab=create-post" className="dropdown-item">
              <i className="fas fa-plus-circle"></i> Create New Post
            </Link>
          )}
          
          <div className="dropdown-divider"></div>
          
          <button onClick={handleLogout} className="dropdown-item logout">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleBasedNav;
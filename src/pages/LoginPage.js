import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../supabase';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await authAPI.adminLogin(username, password);
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('admin_remember', 'true');
        }
        
        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        setError(result.error || 'Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h1>Admin Portal</h1>
            <p>Sign in to manage your blog content</p>
            <div className="database-badge">
              <i className="fas fa-database"></i> Powered by Supabase
            </div>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {error && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="username">
                <i className="fas fa-user"></i> Username
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  disabled={isLoading}
                />
                <i className="fas fa-user input-icon"></i>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-key"></i> Password
              </label>
              <div className="input-with-icon">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <i className="fas fa-lock input-icon"></i>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo credentials: admin / admin123</p>
            <button 
              onClick={() => navigate('/')}
              className="back-link"
            >
              <i className="fas fa-arrow-left"></i>
              Back to Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
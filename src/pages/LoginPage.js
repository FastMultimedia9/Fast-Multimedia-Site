import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../supabase';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await authAPI.isLoggedIn();
      if (isLoggedIn || authAPI.checkLocalStorageAuth()) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setResetSuccess('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await authAPI.adminLogin(email, password);
      
      if (result.success) {
        if (rememberMe) {
          localStorage.setItem('admin_remember', 'true');
        }
        
        // Clear any previous errors
        setError('');
        
        // Show temporary success message
        setError('success:Login successful! Redirecting...');
        
        // Small delay for better UX
        setTimeout(() => {
          navigate('/admin');
        }, 1000);
      } else {
        // Check for specific error messages
        if (result.error.includes('check your email to confirm')) {
          setError(`Email not confirmed. Please check your inbox for the confirmation email. 
          If you didn't receive it, try registering again or contact support.`);
        } else {
          setError(result.error || 'Invalid email or password');
        }
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await authAPI.resetPassword(resetEmail);
      
      if (result.success) {
        setResetSuccess(result.message);
        setError('');
      } else {
        setError(result.error || 'Failed to send reset instructions');
      }
    } catch (error) {
      setError('Password reset failed. Please try again.');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowResetForm(false);
    setResetEmail('');
    setResetSuccess('');
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <div className="login-logo">
              <i className="fas fa-cogs"></i>
            </div>
            <h1>Admin Dashboard</h1>
            <p className="login-tagline">
              Secure login powered by Supabase authentication
            </p>
          </div>
          
          <div className="login-features">
            <h3><i className="fas fa-check-circle"></i> Security Features</h3>
            <ul>
              <li><i className="fas fa-shield-alt"></i> End-to-end encryption</li>
              <li><i className="fas fa-user-check"></i> Role-based access control</li>
              <li><i className="fas fa-history"></i> Session management</li>
              <li><i className="fas fa-key"></i> Secure password hashing</li>
              <li><i className="fas fa-bell"></i> Login activity monitoring</li>
            </ul>
          </div>
          
          <div className="login-info">
            <h3><i className="fas fa-info-circle"></i> Authentication</h3>
            <div className="tech-stack">
              <span className="tech-badge supabase">
                <i className="fas fa-database"></i> Supabase Auth
              </span>
              <span className="tech-badge jwt">
                <i className="fas fa-key"></i> JWT Tokens
              </span>
              <span className="tech-badge secure">
                <i className="fas fa-lock"></i> HTTPS Only
              </span>
            </div>
          </div>
        </div>
        
        <div className="login-right">
          <div className="login-card">
            {showResetForm ? (
              <>
                <div className="login-header">
                  <h2>Reset Password</h2>
                  <p>Enter your email to receive reset instructions</p>
                </div>
                
                <form onSubmit={handleResetPassword} className="login-form">
                  {error && (
                    <div className="alert alert-error">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>{error}</span>
                    </div>
                  )}
                  
                  {resetSuccess && (
                    <div className="alert alert-info">
                      <i className="fas fa-check-circle"></i>
                      <span>{resetSuccess}</span>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="resetEmail">
                      <i className="fas fa-envelope"></i> Email Address
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="resetEmail"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="login-input"
                        required
                        disabled={isLoading}
                      />
                      <div className="input-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="login-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Reset Instructions
                      </>
                    )}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={handleBackToLogin}
                    className="back-btn"
                    disabled={isLoading}
                  >
                    <i className="fas fa-arrow-left"></i> Back to Login
                  </button>
                </form>
              </>
            ) : (
              <>
                <div className="login-header">
                  <h2>Admin Sign In</h2>
                  <p>Enter your credentials to access the admin panel</p>
                </div>
                
                <form onSubmit={handleLogin} className="login-form">
                  {error && (
                    <div className={`alert ${error.includes('success:') ? 'alert-success' : 'alert-error'}`}>
                      <i className={`fas ${error.includes('success:') ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
                      <span>{error.includes('success:') ? error.replace('success:', '') : error}</span>
                    </div>
                  )}
                  
                  {resetSuccess && (
                    <div className="alert alert-info">
                      <i className="fas fa-check-circle"></i>
                      <span>{resetSuccess}</span>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i> Email Address
                    </label>
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="login-input"
                        required
                        disabled={isLoading}
                      />
                      <div className="input-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fas fa-key"></i> Password
                    </label>
                    <div className="input-group">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="login-input"
                        required
                        disabled={isLoading}
                      />
                      <div className="input-icon">
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-options">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={isLoading}
                      />
                      <label htmlFor="remember" className="checkbox-label">
                        <span className="checkmark"></span>
                        Remember me
                      </label>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="login-submit"
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

                  {/* Registration Link */}
                  <div className="register-link">
                    <p>Don't have an account? 
                      <button 
                        type="button"
                        onClick={() => navigate('/register')}
                        className="register-btn"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </form>
              </>
            )}
            
            <div className="login-footer">
              <div className="footer-links">
                <button 
                  onClick={() => navigate('/')}
                  className="back-home"
                >
                  <i className="fas fa-arrow-left"></i> Back to Home
                </button>
                
                {!showResetForm && (
                  <button 
                    onClick={() => setShowResetForm(true)}
                    className="forgot-password"
                  >
                    <i className="fas fa-question-circle"></i> Forgot Password?
                  </button>
                )}
              </div>
              
              <div className="security-notice">
                <i className="fas fa-shield-alt"></i>
                <span>Your session will expire after 24 hours of inactivity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
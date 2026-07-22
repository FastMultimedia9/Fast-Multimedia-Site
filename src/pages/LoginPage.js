import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, getUserProfile, getCurrentUser } from '../services/firebaseService';
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
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const profile = await getUserProfile(user.uid);
          if (profile) {
            const from = location.state?.from || '/dashboard';
            navigate(from, { replace: true });
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, [navigate, location]);

  // Pre-fill email if remembered
  useEffect(() => {
    const remembered = localStorage.getItem('login_remember_me');
    const rememberedEmail = localStorage.getItem('login_user_email');
    
    if (remembered === 'true' && rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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
      console.log('🔐 Attempting login...');
      const userCredential = await loginUser(email, password);
      
      // Get the user from the credential
      const user = userCredential?.user;
      
      if (!user) {
        setError('Login failed: No user data received');
        setIsLoading(false);
        return;
      }
      
      console.log('✅ User logged in:', user.uid);
      
      // Get user profile
      const profile = await getUserProfile(user.uid);
      
      if (profile) {
        console.log('✅ User profile found:', profile);
        
        if (rememberMe) {
          localStorage.setItem('login_remember_me', 'true');
          localStorage.setItem('login_user_email', email);
        } else {
          localStorage.removeItem('login_remember_me');
          localStorage.removeItem('login_user_email');
        }
        
        setError('success:Login successful! Redirecting...');
        
        setTimeout(() => {
          const role = profile.role || 'user';
          let redirectPath = '/dashboard';
          
          if (role === 'admin') {
            redirectPath = '/admin';
          } else if (role === 'staff') {
            redirectPath = '/staff';
          } else if (role === 'student') {
            redirectPath = '/student/portal';
          }
          
          const from = location.state?.from || redirectPath;
          console.log(`🎯 Final redirect to: ${from} (Role: ${role})`);
          navigate(from, { replace: true });
        }, 1000);
      } else {
        setError('User profile not found. Please contact support.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('User not found. Please ensure you have completed your application or contact support.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Invalid password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else if (error.code === 'auth/invalid-credential') {
        setError('Invalid credentials. Please check your email and password.');
      } else {
        setError(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setResetSuccess('');
    
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { sendPasswordResetEmail } = await import('../firebase');
      await sendPasswordResetEmail(auth, resetEmail);
      
      setResetSuccess('Password reset instructions sent to your email.');
      setError('');
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Password reset failed. Please try again.');
      }
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGuestBrowse = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left">
          <div className="login-brand">
            <div className="login-logo">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h1>Fast Multimedia</h1>
            <p className="login-tagline">
              Institute of Technology & Design
            </p>
          </div>
          
          <div className="login-features">
            <h3><i className="fas fa-check-circle"></i> What you can do:</h3>
            <ul>
              <li><i className="fas fa-user-graduate"></i> Access your student dashboard</li>
              <li><i className="fas fa-book-open"></i> Enroll in courses</li>
              <li><i className="fas fa-chart-line"></i> Track your progress</li>
              <li><i className="fas fa-comments"></i> Connect with instructors</li>
              <li><i className="fas fa-certificate"></i> Get certified</li>
            </ul>
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
                  {error && !resetSuccess && (
                    <div className="alert alert-error">
                      <i className="fas fa-exclamation-triangle"></i>
                      <span>{error}</span>
                    </div>
                  )}
                  
                  {resetSuccess && (
                    <div className="alert alert-success">
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
                  <h2>Welcome Back</h2>
                  <p>Sign in to access your dashboard</p>
                </div>
                
                <form onSubmit={handleLogin} className="login-form">
                  {error && (
                    <div className={`alert ${error.includes('success:') ? 'alert-success' : 'alert-error'}`}>
                      <i className={`fas ${error.includes('success:') ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
                      <span>{error.includes('success:') ? error.replace('success:', '') : error}</span>
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
                        autoComplete="username"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="fas fa-key"></i> Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="login-input"
                        required
                        disabled={isLoading}
                        autoComplete="current-password"
                      />
                      <button 
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                      >
                        <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                      </button>
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
                  
                  <div className="login-footer-actions">
                    <button 
                      onClick={() => setShowResetForm(true)}
                      className="forgot-password"
                    >
                      <i className="fas fa-question-circle"></i> Forgot Password?
                    </button>
                    <button 
                      type="button"
                      onClick={handleGuestBrowse}
                      className="guest-browse-btn"
                    >
                      <i className="fas fa-eye"></i> Browse as Guest
                    </button>
                  </div>
                </form>
              </>
            )}
            
            <div className="login-footer">
              <div className="footer-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <span>•</span>
                <a href="/terms">Terms of Service</a>
                <span>•</span>
                <a href="/contact">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
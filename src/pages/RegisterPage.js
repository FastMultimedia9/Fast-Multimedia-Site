import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI, supabase } from '../supabase';
import './RegisterPage.css';

const RegisterPage = () => {
  const [showPasscodeForm, setShowPasscodeForm] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isCheckingPasscode, setIsCheckingPasscode] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    agreedToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Secret passcode - you can change this to any code you want
  const SECRET_PASSCODE = 'ADMIN2024'; // Change this to your preferred passcode

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await authAPI.isLoggedIn();
      if (isLoggedIn) {
        navigate('/admin');
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Handle passcode verification
  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    setPasscodeError('');
    
    if (!passcode.trim()) {
      setPasscodeError('Please enter the passcode');
      return;
    }
    
    setIsCheckingPasscode(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      if (passcode === SECRET_PASSCODE) {
        setShowPasscodeForm(false);
        setPasscodeError('');
      } else {
        setPasscodeError('Invalid passcode. Please try again.');
      }
      setIsCheckingPasscode(false);
    }, 500);
  };

  // Handle registration form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Manual validation
    if (!formData.name || !formData.email || !formData.password || !formData.username) {
      setError('Please fill in all required fields');
      if (!formData.name) document.getElementById('name').focus();
      else if (!formData.username) document.getElementById('username').focus();
      else if (!formData.email) document.getElementById('email').focus();
      else if (!formData.password) document.getElementById('password').focus();
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      document.getElementById('password').focus();
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      document.getElementById('password').focus();
      return;
    }

    if (!formData.agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (formData.role === 'admin') {
        result = await authAPI.registerAdmin(
          formData.email,
          formData.password,
          formData.name,
          formData.username
        );
      } else {
        result = await authAPI.register(
          formData.email,
          formData.password,
          formData.name,
          formData.username
        );
      }

      if (result.success) {
        setSuccess(result.message || 'Registration successful!');
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: 'user',
          agreedToTerms: false
        });
        
        // Auto-login after registration
        if (result.user) {
          setTimeout(() => {
            navigate('/admin/login');
          }, 3000);
        } else {
          setTimeout(() => {
            navigate('/admin/login');
          }, 3000);
        }
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If showing passcode form
  if (showPasscodeForm) {
    return (
      <div className="register-page">
        <div className="register-container">
          <div className="register-card">
            <div className="register-header">
              <div className="passcode-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h2>Registration Access</h2>
              <p>Enter the passcode to access registration</p>
            </div>

            {passcodeError && (
              <div className="alert alert-error">
                <i className="fas fa-exclamation-triangle"></i>
                <span>{passcodeError}</span>
              </div>
            )}

            <form onSubmit={handlePasscodeSubmit} className="passcode-form">
              <div className="form-group">
                <label htmlFor="passcode">
                  <i className="fas fa-key"></i> Access Passcode
                </label>
                <div className="input-group">
                  <input
                    type="password"
                    id="passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter the secret passcode"
                    className="passcode-input"
                    required
                    disabled={isCheckingPasscode}
                  />
                  <div className="input-icon">
                    <i className="fas fa-lock"></i>
                  </div>
                </div>
                <small className="passcode-hint">
                  Contact the administrator if you don't have the passcode
                </small>
              </div>
              
              <button 
                type="submit" 
                className="passcode-submit"
                disabled={isCheckingPasscode}
              >
                {isCheckingPasscode ? (
                  <>
                    <span className="spinner"></span>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fas fa-unlock"></i>
                    Verify Passcode
                  </>
                )}
              </button>
            </form>

            <div className="passcode-footer">
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="back-home"
              >
                <i className="fas fa-arrow-left"></i> Back to Home
              </button>
              
              <button 
                type="button"
                onClick={() => navigate('/admin/login')}
                className="login-link"
              >
                Already have an account? <strong>Sign In</strong>
              </button>
            </div>
            
            <div className="security-notice">
              <i className="fas fa-shield-alt"></i>
              <span>Registration is restricted to authorized users only</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration form (shown after passcode verification)
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="success-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Create Account</h2>
            <p>Passcode verified ✓ You can now create your account</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle"></i>
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role">Account Type</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={isLoading}
                className="role-select"
              >
                <option value="user">Regular User</option>
                <option value="admin">Administrator</option>
              </select>
              <small className="role-hint">
                {formData.role === 'admin' 
                  ? 'Admin accounts can manage all content and users'
                  : 'Regular users can comment and save articles'}
              </small>
            </div>

            <div className="form-options">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="checkbox-label">
                  <span className="checkmark"></span>
                  I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button"
                onClick={() => {
                  setShowPasscodeForm(true);
                  setPasscode('');
                }}
                className="back-to-passcode"
                disabled={isLoading}
              >
                <i className="fas fa-arrow-left"></i> Back to Passcode
              </button>
              
              <button 
                type="submit" 
                className="register-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    Create Account
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="register-footer">
            <div className="footer-links">
              <p>Already have an account? 
                <button 
                  type="button"
                  onClick={() => navigate('/admin/login')}
                  className="login-link"
                >
                  Sign In
                </button>
              </p>
              
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="back-home"
              >
                <i className="fas fa-arrow-left"></i> Back to Home
              </button>
            </div>
            
            <div className="setup-instructions">
              <p><strong>Note:</strong> After registration, check your email to confirm your account if email confirmations are enabled.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
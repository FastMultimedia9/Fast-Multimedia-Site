import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, updateUserProfile, getCurrentUser } from '../services/firebaseService';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    role: 'student',
    adminPassword: '',
    agreedToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const navigate = useNavigate();

  // Secret admin password
  const ADMIN_SECRET_PASSWORD = 'yahooamaps';

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    // If role changes to user, clear admin password
    if (name === 'role' && value !== 'admin') {
      newFormData.adminPassword = '';
      setShowAdminPassword(false);
    }
    
    // If role changes to admin, show admin password field
    if (name === 'role' && value === 'admin') {
      setShowAdminPassword(true);
    }
    
    setFormData(newFormData);
  };

  const validateAdminPassword = () => {
    if (formData.role !== 'admin') return true;
    
    if (!formData.adminPassword.trim()) {
      setError('Admin authorization password is required for administrator registration');
      return false;
    }
    
    if (formData.adminPassword !== ADMIN_SECRET_PASSWORD) {
      setError('Invalid admin authorization password.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Manual validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Validate admin password if needed
    if (!validateAdminPassword()) {
      return;
    }

    if (!formData.agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);

    try {
      // Register with Firebase Auth
      const userCredential = await registerUser(
        formData.email.trim(),
        formData.password.trim(),
        {
          fullName: formData.fullName.trim(),
          role: formData.role,
          phone: formData.phone.trim(),
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          email: formData.email.trim()
        }
      );

      const user = userCredential.user;

      // Update user profile with additional data
      await updateUserProfile(user.uid, {
        fullName: formData.fullName.trim(),
        role: formData.role,
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        emailVerified: false,
        createdAt: new Date().toISOString()
      });

      setSuccess('Registration successful! Redirecting to login...');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        role: 'student',
        adminPassword: '',
        agreedToTerms: false
      });
      setShowAdminPassword(false);
      
      // Redirect to login page
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
      } else {
        setError(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="success-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h2>Create Account</h2>
            <p>Join Fast Multimedia Institute</p>
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
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                disabled={isLoading}
                required
              />
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
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="024XXXXXXX"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
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
                  required
                  minLength="6"
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
                  required
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
                <option value="student">Student</option>
                <option value="staff">Staff Member</option>
                <option value="admin">Administrator</option>
              </select>
              <small className="role-hint">
                {formData.role === 'admin' 
                  ? 'Admin accounts can manage all content and users. Requires special authorization.'
                  : formData.role === 'staff'
                  ? 'Staff members can manage courses and students.'
                  : 'Students can enroll in courses and access learning materials.'}
              </small>
            </div>

            {/* Admin Password Field - Only shown when admin is selected */}
            {showAdminPassword && (
              <div className="form-group admin-password-field">
                <label htmlFor="adminPassword">
                  <i className="fas fa-shield-alt"></i> Admin Authorization Password *
                </label>
                <input
                  type="password"
                  id="adminPassword"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                  placeholder="Enter admin authorization password"
                  disabled={isLoading}
                  className={formData.adminPassword ? 'has-value' : ''}
                  required
                />
                <small className="admin-password-hint">
                  <i className="fas fa-info-circle"></i> This password is required to register as an administrator.
                </small>
              </div>
            )}

            <div className="form-options">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <label htmlFor="terms" className="checkbox-label">
                  <span className="checkmark"></span>
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="back-to-login"
                disabled={isLoading}
              >
                <i className="fas fa-arrow-left"></i> Back to Login
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
            <p>Already have an account? 
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="login-link"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
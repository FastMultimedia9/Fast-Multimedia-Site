import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, authAPI } from '../supabase';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar_url: '',
    role: 'user',
    adminPassword: '',
    agreedToTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const navigate = useNavigate();

  // Secret admin password
  const ADMIN_SECRET_PASSWORD = 'yahooamaps';

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isLoggedIn = await authAPI.isLoggedIn();
        if (isLoggedIn) {
          const user = await authAPI.getCurrentUserWithProfile();
          if (user?.profile?.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/blog');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Handle registration form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    
    // If role changes to user, clear admin password
    if (name === 'role' && value === 'user') {
      newFormData.adminPassword = '';
      setShowAdminPassword(false);
    }
    
    // If role changes to admin, show admin password field
    if (name === 'role' && value === 'admin') {
      setShowAdminPassword(true);
    }
    
    // If avatar URL changes, update preview
    if (name === 'avatar_url') {
      if (value.trim()) {
        setAvatarPreview(value);
      } else {
        // Generate default avatar based on name or username
        const nameForAvatar = newFormData.name || newFormData.username || 'User';
        setAvatarPreview(`https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=6c63ff&color=fff&size=128`);
      }
    }
    
    setFormData(newFormData);
  };

  // Validate admin password
  const validateAdminPassword = () => {
    if (formData.role !== 'admin') return true;
    
    if (!formData.adminPassword.trim()) {
      setError('Admin password is required for administrator registration');
      return false;
    }
    
    if (formData.adminPassword !== ADMIN_SECRET_PASSWORD) {
      setError('Invalid admin password. Administrator registration requires special authorization.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Manual validation
    if (!formData.name || !formData.email || !formData.password || !formData.username) {
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
      // Register with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
        options: {
          data: {
            name: formData.name,
            username: formData.username
          }
        }
      });

      if (authError) {
        throw new Error(authError.message || 'Registration failed');
      }

      if (authData.user) {
        // Create user profile in users table
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email: formData.email.trim(),
              username: formData.username.trim(),
              name: formData.name.trim(),
              avatar_url: formData.avatar_url.trim() || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name.trim())}&background=6c63ff&color=fff`,
              role: formData.role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Still show success but log the error
        }

        setSuccess('Registration successful! You can now login with your credentials.');
        setFormData({
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          avatar_url: '',
          role: 'user',
          adminPassword: '',
          agreedToTerms: false
        });
        setShowAdminPassword(false);
        setAvatarPreview('');
        
        // Redirect to login page
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
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
            <p>Join our blog community and start sharing your thoughts</p>
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
                  required
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
                  required
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
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_url">Profile Picture URL (Optional)</label>
              <input
                type="url"
                id="avatar_url"
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleChange}
                placeholder="https://example.com/your-photo.jpg"
                disabled={isLoading}
              />
              <small>Leave blank to use a generated avatar</small>
              
              {avatarPreview && (
                <div className="avatar-preview">
                  <img src={avatarPreview} alt="Avatar preview" onError={(e) => {
                    e.target.onerror = null;
                    const nameForAvatar = formData.name || formData.username || 'User';
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(nameForAvatar)}&background=6c63ff&color=fff&size=128`;
                  }} />
                  <p>Preview of how your avatar will appear</p>
                </div>
              )}
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
                <option value="user">Regular User</option>
                <option value="admin">Administrator</option>
              </select>
              <small className="role-hint">
                {formData.role === 'admin' 
                  ? 'Admin accounts can manage all content and users. Requires special authorization.'
                  : 'Regular users can create posts and comment on articles.'}
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
                  Contact the system administrator if you need this access.
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
            <div className="footer-links">
              <p>Already have an account? 
                <button 
                  type="button"
                  onClick={() => navigate('/login')}
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
              <p><strong>Note:</strong> You will be automatically logged in after registration.</p>
              <p className="admin-note">
                <i className="fas fa-shield-alt"></i> Administrator registration requires special authorization.
                Please select "Regular User" if you don't have admin privileges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUserGraduate, 
  FaEnvelope, 
  FaLock, 
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaShieldAlt
} from 'react-icons/fa';
import './StudentLogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate login - In production, use Firebase Auth
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to appropriate dashboard based on login type
      if (loginType === 'student') {
        navigate('/student/portal');
      } else if (loginType === 'staff') {
        navigate('/staff/dashboard');
      } else if (loginType === 'admin') {
        navigate('/admin/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="student-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <FaUserGraduate />
            </div>
            <h1>Welcome Back</h1>
            <p>Login to access your portal</p>
          </div>

          {/* Login Type Selector */}
          <div className="login-type-selector">
            <button 
              className={`type-btn ${loginType === 'student' ? 'active' : ''}`}
              onClick={() => setLoginType('student')}
            >
              <FaUserGraduate /> Student
            </button>
            <button 
              className={`type-btn ${loginType === 'staff' ? 'active' : ''}`}
              onClick={() => setLoginType('staff')}
            >
              <FaUser /> Staff
            </button>
            <button 
              className={`type-btn ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => setLoginType('admin')}
            >
              <FaShieldAlt /> Admin
            </button>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">⏳</span>
              ) : (
                <>
                  Login <FaArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="register-link">
                Register here
              </Link>
            </p>
            <p className="login-note">
              <FaShieldAlt /> Secured by Firebase Authentication
            </p>
          </div>

          <div className="login-back">
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
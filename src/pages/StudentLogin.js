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
  FaShieldAlt,
  FaKey,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSpinner,
  FaHourglassHalf,
  FaTimesCircle,
  FaCheck
} from 'react-icons/fa';
import { 
  getStudentAdmissionStatus, 
  getStudentByEmail,
  loginUser,
  updateStudent
} from '../services/firebaseService';
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
  
  // Admission status states
  const [admissionStatus, setAdmissionStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [statusChecked, setStatusChecked] = useState(false);
  
  // Password change states
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  // Default password for all users
  const DEFAULT_PASSWORD = 'FastMultimedia2024@';

  // Check admission status before allowing login
  const checkAdmissionStatus = async (email) => {
    setCheckingStatus(true);
    setError('');
    setAdmissionStatus(null);
    setStatusChecked(false);

    try {
      const result = await getStudentAdmissionStatus(email);
      console.log('Admission status result:', result);

      if (result.exists && result.status) {
        setAdmissionStatus(result);
        setStatusChecked(true);
        return result;
      } else {
        setError(result.message || 'Student not found. Please complete your application first.');
        setStatusChecked(true);
        return null;
      }
    } catch (error) {
      console.error('Error checking admission status:', error);
      setError('Error checking admission status. Please try again.');
      setStatusChecked(true);
      return null;
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // First, check if the student exists and get admission status
    if (!statusChecked) {
      setIsLoading(true);
      const statusResult = await checkAdmissionStatus(email);
      setIsLoading(false);
      
      if (!statusResult || !statusResult.exists) {
        return;
      }

      // Check if status is approved or enrolled
      if (statusResult.status === 'pending') {
        setError('Your application is pending review. Please wait for approval before logging in.');
        return;
      }

      if (statusResult.status === 'rejected') {
        setError('Your application was not approved. Please contact admissions for more information.');
        return;
      }

      if (statusResult.status === 'approved' || statusResult.status === 'enrolled') {
        // Proceed with password validation
        setAdmissionStatus(statusResult);
        // Continue to password validation below
      } else {
        setError('Unknown application status. Please contact admissions.');
        return;
      }
    }

    // Now validate password
    setIsLoading(true);

    try {
      // Get student record
      const student = await getStudentByEmail(email);
      
      if (!student) {
        setError('Student not found. Please complete your application first.');
        setIsLoading(false);
        return;
      }

      // Check if using default password
      if (password === DEFAULT_PASSWORD) {
        // User is using default password - force password change
        setShowPasswordChange(true);
        setError('');
        setIsLoading(false);
        return;
      }

      // In production, use Firebase Auth to verify password
      // For now, simulate successful login with custom password
      if (password.length >= 6) {
        // Login successful - redirect to dashboard
        if (loginType === 'student') {
          navigate('/student/portal');
        } else if (loginType === 'staff') {
          navigate('/staff/dashboard');
        } else if (loginType === 'admin') {
          navigate('/admin/dashboard');
        }
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess(false);

    // Validate new password
    if (newPassword.length < 8) {
      setPasswordChangeError('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeError('Passwords do not match.');
      return;
    }

    if (newPassword === DEFAULT_PASSWORD) {
      setPasswordChangeError('Please choose a different password from the default.');
      return;
    }

    setIsPasswordUpdating(true);

    try {
      // Update password in Firebase
      const student = await getStudentByEmail(email);
      if (student) {
        await updateStudent(student.id, {
          passwordUpdated: true,
          updatedAt: new Date().toISOString()
        });
      }

      // Simulate password update delay
      setTimeout(() => {
        setIsPasswordUpdating(false);
        setPasswordChangeSuccess(true);
        
        // After success, redirect after 2 seconds
        setTimeout(() => {
          setShowPasswordChange(false);
          if (loginType === 'student') {
            navigate('/student/portal');
          } else if (loginType === 'staff') {
            navigate('/staff/dashboard');
          } else if (loginType === 'admin') {
            navigate('/admin/dashboard');
          }
        }, 2000);
      }, 1500);
    } catch (error) {
      console.error('Password update error:', error);
      setPasswordChangeError('Error updating password. Please try again.');
      setIsPasswordUpdating(false);
    }
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
              onClick={() => {
                setLoginType('student');
                setStatusChecked(false);
                setAdmissionStatus(null);
                setError('');
              }}
            >
              <FaUserGraduate /> Student
            </button>
            <button 
              className={`type-btn ${loginType === 'staff' ? 'active' : ''}`}
              onClick={() => {
                setLoginType('staff');
                setStatusChecked(false);
                setAdmissionStatus(null);
                setError('');
              }}
            >
              <FaUser /> Staff
            </button>
            <button 
              className={`type-btn ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setLoginType('admin');
                setStatusChecked(false);
                setAdmissionStatus(null);
                setError('');
              }}
            >
              <FaShieldAlt /> Admin
            </button>
          </div>

          {error && (
            <div className="login-error">
              <FaExclamationTriangle /> {error}
            </div>
          )}

          {/* Admission Status Display */}
          {statusChecked && admissionStatus && (
            <div className={`admission-status ${admissionStatus.status}`}>
              <div className="status-icon">
                {admissionStatus.status === 'pending' && <FaHourglassHalf />}
                {admissionStatus.status === 'approved' && <FaCheck />}
                {admissionStatus.status === 'enrolled' && <FaCheckCircle />}
                {admissionStatus.status === 'rejected' && <FaTimesCircle />}
              </div>
              <div className="status-content">
                <h4>Application Status: <strong>{admissionStatus.status.toUpperCase()}</strong></h4>
                <p>{admissionStatus.message}</p>
              </div>
            </div>
          )}

          {/* Password Change Form - Shown when default password is used */}
          {showPasswordChange ? (
            <div className="password-change-container">
              <div className="password-change-header">
                <FaKey className="password-change-icon" />
                <h3>Change Your Password</h3>
                <p className="password-change-subtitle">
                  You are using the default password. Please create a new password to secure your account.
                </p>
                <div className="default-password-info">
                  <FaInfoCircle /> Default Password: <strong>{DEFAULT_PASSWORD}</strong>
                </div>
              </div>

              {passwordChangeSuccess ? (
                <div className="password-change-success">
                  <FaCheckCircle className="success-icon" />
                  <h3>Password Changed Successfully!</h3>
                  <p>Redirecting to your dashboard...</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange} className="password-change-form">
                  {passwordChangeError && (
                    <div className="password-change-error">
                      <FaExclamationTriangle /> {passwordChangeError}
                    </div>
                  )}

                  <div className="form-group">
                    <label>New Password</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min 8 characters)"
                        required
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                      />
                      <button 
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="password-requirements">
                    <p>Password must:</p>
                    <ul>
                      <li>Be at least 8 characters long</li>
                      <li>Include at least one uppercase letter</li>
                      <li>Include at least one number</li>
                      <li>Include at least one special character</li>
                    </ul>
                  </div>

                  <button 
                    type="submit" 
                    className="login-btn"
                    disabled={isPasswordUpdating}
                  >
                    {isPasswordUpdating ? (
                      <FaSpinner className="spinner" /> Updating...
                    ) : (
                      <>
                        Update Password <FaArrowRight />
                      </>
                    )}
                  </button>

                  <button 
                    type="button"
                    className="skip-password-btn"
                    onClick={() => navigate('/')}
                  >
                    Skip for now
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setStatusChecked(false);
                        setAdmissionStatus(null);
                        setError('');
                      }}
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
                  <div className="default-password-hint">
                    <FaKey /> Default Password: <strong>{DEFAULT_PASSWORD}</strong>
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
                    <FaSpinner className="spinner" /> Checking...
                  ) : (
                    <>
                      Login <FaArrowRight />
                    </>
                  )}
                </button>
              </form>

              <div className="login-footer">
                <p className="login-note">
                  <FaShieldAlt /> Secured by Firebase Authentication
                </p>
                <p className="login-help">
                  <FaInfoCircle /> Default password: <strong>{DEFAULT_PASSWORD}</strong>
                </p>
              </div>

              <div className="login-back">
                <Link to="/" className="back-link">
                  ← Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
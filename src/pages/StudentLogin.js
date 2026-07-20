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
  FaCheck,
  FaUserTie
} from 'react-icons/fa';
import { 
  getStudentAdmissionStatus, 
  getStudentByEmail,
  getUserByEmail,
  updateStudent,
  updateUser
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
  
  // User role states
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  
  // Admission status states (for students only)
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

  // Check user role and admission status
  const checkUserAccess = async (email) => {
    setCheckingStatus(true);
    setError('');
    setAdmissionStatus(null);
    setStatusChecked(false);
    setUserRole(null);
    setUserData(null);

    try {
      // First, check if user exists in the users collection (for all roles)
      const userProfile = await getUserByEmail(email);
      
      if (userProfile) {
        const role = userProfile.role || 'student';
        setUserRole(role);
        setUserData(userProfile);
        
        // If user is admin or staff, skip admission status check
        if (role === 'admin' || role === 'staff') {
          setStatusChecked(true);
          setAdmissionStatus({
            exists: true,
            status: 'approved',
            message: `${role.charAt(0).toUpperCase() + role.slice(1)} account found.`,
            data: userProfile
          });
          return { exists: true, status: 'approved', data: userProfile };
        }
        
        // If role is student but in users collection, check admission
        if (role === 'student') {
          const result = await getStudentAdmissionStatus(email);
          if (result.exists) {
            setUserRole('student');
            setUserData(result.student);
            setAdmissionStatus(result);
            setStatusChecked(true);
            return result;
          }
        }
      }

      // If not found in users collection, check as student
      const result = await getStudentAdmissionStatus(email);
      console.log('Admission status result:', result);

      if (result.exists && result.status) {
        setUserRole('student');
        setUserData(result.student);
        setAdmissionStatus(result);
        setStatusChecked(true);
        return result;
      } else {
        setError(result.message || 'User not found. Please contact support.');
        setStatusChecked(true);
        return null;
      }
    } catch (error) {
      console.error('Error checking user access:', error);
      setError('Error checking user access. Please try again.');
      setStatusChecked(true);
      return null;
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email and password are not empty
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    
    // First, check user access and role
    if (!statusChecked) {
      setIsLoading(true);
      const accessResult = await checkUserAccess(email);
      setIsLoading(false);
      
      if (!accessResult || !accessResult.exists) {
        return;
      }

      // If user is admin or staff, skip admission status validation
      if (userRole === 'admin' || userRole === 'staff') {
        // Proceed with password validation
        setAdmissionStatus(accessResult);
        // Continue to password validation below
      } else if (userRole === 'student') {
        // Check student admission status
        if (accessResult.status === 'pending') {
          setError('Your application is pending review. Please wait for approval before logging in.');
          return;
        }

        if (accessResult.status === 'rejected') {
          setError('Your application was not approved. Please contact admissions for more information.');
          return;
        }

        if (accessResult.status !== 'approved' && accessResult.status !== 'enrolled') {
          setError('Unknown application status. Please contact admissions.');
          return;
        }
      } else {
        setError('User role not recognized. Please contact support.');
        return;
      }
    }

    // Now validate password
    setIsLoading(true);

    try {
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
      // IMPORTANT: In production, replace this with actual Firebase Auth
      if (password.length >= 6) {
        // Login successful - redirect based on role
        const role = userRole || 'student';
        redirectBasedOnRole(role);
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

  const redirectBasedOnRole = (role) => {
    // Clear any state before redirect
    setIsLoading(false);
    setError('');
    
    // Redirect based on role
    switch(role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'staff':
        navigate('/staff/dashboard');
        break;
      case 'student':
      default:
        navigate('/student/portal');
        break;
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

    // Check for uppercase letter
    if (!/[A-Z]/.test(newPassword)) {
      setPasswordChangeError('Password must include at least one uppercase letter.');
      return;
    }

    // Check for number
    if (!/[0-9]/.test(newPassword)) {
      setPasswordChangeError('Password must include at least one number.');
      return;
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      setPasswordChangeError('Password must include at least one special character.');
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
          password: newPassword, // In production, hash this password
          updatedAt: new Date().toISOString()
        });
      } else {
        // Try updating user profile
        const user = await getUserByEmail(email);
        if (user) {
          await updateUser(user.id, {
            passwordUpdated: true,
            password: newPassword, // In production, hash this password
            updatedAt: new Date().toISOString()
          });
        }
      }

      // Simulate password update delay
      setTimeout(() => {
        setIsPasswordUpdating(false);
        setPasswordChangeSuccess(true);
        
        // After success, redirect after 2 seconds
        setTimeout(() => {
          setShowPasswordChange(false);
          redirectBasedOnRole(userRole || 'student');
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
                setUserRole(null);
                setUserData(null);
                setShowPasswordChange(false);
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
                setUserRole(null);
                setUserData(null);
                setShowPasswordChange(false);
              }}
            >
              <FaUserTie /> Staff
            </button>
            <button 
              className={`type-btn ${loginType === 'admin' ? 'active' : ''}`}
              onClick={() => {
                setLoginType('admin');
                setStatusChecked(false);
                setAdmissionStatus(null);
                setError('');
                setUserRole(null);
                setUserData(null);
                setShowPasswordChange(false);
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

          {/* User Role Display */}
          {statusChecked && userRole && (
            <div className={`user-role-badge ${userRole}`}>
              <div className="role-icon">
                {userRole === 'admin' && <FaShieldAlt />}
                {userRole === 'staff' && <FaUserTie />}
                {userRole === 'student' && <FaUserGraduate />}
              </div>
              <div className="role-content">
                <h4>Logged in as: <strong>{userRole.toUpperCase()}</strong></h4>
                <p>{userData?.fullName || userData?.name || 'User'}</p>
              </div>
            </div>
          )}

          {/* Admission Status Display (for students only) */}
          {statusChecked && admissionStatus && userRole === 'student' && (
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

                  {/* FIXED: Password Change Submit Button */}
                  <button 
                    type="submit" 
                    className="login-btn"
                    disabled={isPasswordUpdating}
                  >
                    {isPasswordUpdating ? (
                      <>
                        <FaSpinner className="spinner" /> Updating...
                      </>
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
                        setUserRole(null);
                        setUserData(null);
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

                {/* FIXED: Login Submit Button */}
                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="spinner" /> Checking...
                    </>
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
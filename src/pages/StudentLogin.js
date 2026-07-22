import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUserGraduate, 
  FaLock, 
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaSpinner,
  FaHourglassHalf,
  FaTimesCircle,
  FaCheck,
  FaIdCard,
  FaShieldAlt,
  FaUniversity
} from 'react-icons/fa';
import { 
  getStudentAdmissionStatus, 
  getStudentByEmail,
  updateStudent,
  getUserByEmail,
  getStudentByStudentId,
  verifyStudentPassword,
  updateStudentPassword
} from '../services/firebaseService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './StudentLogin.css';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Student data states
  const [studentData, setStudentData] = useState(null);
  
  // Admission status states
  const [admissionStatus, setAdmissionStatus] = useState(null);
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

  // Check student admission status
  const checkStudentAccess = async (identifier) => {
    setError('');
    setAdmissionStatus(null);
    setStatusChecked(false);
    setStudentData(null);

    try {
      // Check if identifier is a student ID or email
      let student = null;
      
      // Try to find by student ID first
      if (!identifier.includes('@')) {
        student = await getStudentByStudentId(identifier.toUpperCase());
      }
      
      // If not found by student ID, try by email
      if (!student) {
        student = await getStudentByEmail(identifier);
      }

      // If student not found, check if they exist in users collection
      if (!student) {
        const user = await getUserByEmail(identifier);
        if (user && user.role === 'student') {
          // Convert user to student format
          student = {
            id: user.id,
            studentId: user.studentId || user.id,
            fullName: user.fullName || user.name,
            email: user.email,
            course: user.course || 'Not specified',
            admissionStatus: user.admissionStatus || 'approved',
            password: user.password || DEFAULT_PASSWORD,
            passwordUpdated: user.passwordUpdated || false
          };
        }
      }

      if (!student) {
        setError('Student not found. Please ensure you have completed your application or contact support.');
        setStatusChecked(true);
        return null;
      }

      // Ensure student has a password
      if (!student.password) {
        student.password = DEFAULT_PASSWORD;
      }

      setStudentData(student);

      // Check admission status
      const status = student.admissionStatus || 'pending';
      const statusMessages = {
        pending: 'Your application is pending review. Please wait for approval before logging in.',
        approved: 'Your application has been approved! You can now log in.',
        rejected: 'Your application was not approved. Please contact admissions for more information.',
        enrolled: 'You are enrolled! Welcome to Fast Multimedia Institute.'
      };

      const admissionInfo = {
        exists: true,
        status: status,
        message: statusMessages[status] || 'Application status unknown.',
        data: student
      };

      setAdmissionStatus(admissionInfo);
      setStatusChecked(true);

      // Check if student can login
      if (status === 'pending') {
        setError('Your application is pending review. Please wait for approval before logging in.');
        return null;
      }

      if (status === 'rejected') {
        setError('Your application was not approved. Please contact admissions for more information.');
        return null;
      }

      if (status !== 'approved' && status !== 'enrolled') {
        setError('Unknown application status. Please contact admissions.');
        return null;
      }

      return student;
    } catch (error) {
      console.error('Error checking student access:', error);
      setError('Error checking student access. Please try again.');
      setStatusChecked(true);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate identifier and password are not empty
    if (!identifier.trim()) {
      setError('Please enter your Student ID or Email Address.');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    
    // First, check student access
    if (!statusChecked) {
      setIsLoading(true);
      const student = await checkStudentAccess(identifier);
      setIsLoading(false);
      
      if (!student) {
        return;
      }
    }

    // Now validate password - use the studentData from state
    setIsLoading(true);

    try {
      // Get the student from state (should be set by checkStudentAccess)
      const student = studentData;
      
      if (!student) {
        setError('Student data not found. Please try again.');
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

      // Verify password with stored password
      const storedPassword = student.password || '';
      if (password !== storedPassword) {
        setError('Invalid password. Please try again.');
        setIsLoading(false);
        return;
      }

      // Login successful - redirect to student portal
      if (rememberMe) {
        localStorage.setItem('studentLogin', 'true');
        localStorage.setItem('studentId', student.studentId || student.id);
        localStorage.setItem('studentEmail', student.email);
      }
      
      redirectToPortal();
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const redirectToPortal = () => {
    setIsLoading(false);
    setError('');
    navigate('/student/portal');
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
      const student = studentData;
      
      if (!student) {
        setPasswordChangeError('Student data not found. Please try again.');
        setIsPasswordUpdating(false);
        return;
      }
      
      // Update student password
      await updateStudentPassword(student.id, newPassword);

      setTimeout(() => {
        setIsPasswordUpdating(false);
        setPasswordChangeSuccess(true);
        
        // After success, redirect after 2 seconds
        setTimeout(() => {
          setShowPasswordChange(false);
          redirectToPortal();
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
              <FaUniversity />
            </div>
            <h1>Student Login</h1>
            <p>Fast Multimedia Institute</p>
          </div>

          {error && (
            <div className="login-error">
              <FaExclamationTriangle /> {error}
            </div>
          )}

          {/* Student Info Display */}
          {statusChecked && studentData && (
            <div className="student-info-badge">
              <div className="student-info-icon">
                <FaUserGraduate />
              </div>
              <div className="student-info-content">
                <h4>Welcome, <strong>{studentData.fullName}</strong></h4>
                <p>Student ID: <strong>{studentData.studentId || studentData.id}</strong></p>
                <p>Course: <strong>{studentData.course || 'Not assigned'}</strong></p>
              </div>
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
                  <label>Student ID or Email Address</label>
                  <div className="input-wrapper">
                    <FaIdCard className="input-icon" />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => {
                        setIdentifier(e.target.value);
                        setStatusChecked(false);
                        setAdmissionStatus(null);
                        setError('');
                        setStudentData(null);
                      }}
                      placeholder="Enter your Student ID or Email"
                      required
                    />
                  </div>
                  <div className="input-hint">
                    <FaInfoCircle /> Enter your Student ID (e.g., JOHN260001) or Email Address
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
                </div>

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
                <p className="login-help-note">
                  First time logging in? Use the default password above and you'll be prompted to change it.
                </p>
                <p className="login-help-note">
                  <FaInfoCircle /> Need help? Contact us at <strong>fasttech227@gmail.com</strong>
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
import React, { useState, useRef } from 'react';
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
  getStudentByEmail,
  getUserByEmail,
  getStudentByStudentId,
  updateStudentPassword,
  getAdmissionBySerial,
  getAdmissionByEmail,
  createStudent,
  generateStudentId
} from '../services/firebaseService';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
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
  const studentDataRef = useRef(null);
  
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
  
  // Track student creation
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  // Default password for all users
  const DEFAULT_PASSWORD = 'FastMultimedia2024@';

  // Create Firebase Auth user for student
  const createFirebaseAuthUser = async (email, password, studentData) => {
    try {
      // Create the auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile
      await updateProfile(user, {
        displayName: studentData.fullName || 'Student'
      });
      
      // Create user document in Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: email,
        fullName: studentData.fullName,
        role: 'student',
        studentId: studentData.studentId,
        course: studentData.course,
        admissionStatus: studentData.admissionStatus || 'approved',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Firebase Auth user created for student:', user.uid);
      return user;
    } catch (error) {
      console.error('Error creating Firebase Auth user:', error);
      throw error;
    }
  };

  // Check student admission status and ensure Firebase Auth exists
  const checkStudentAccess = async (identifier) => {
    setError('');
    setAdmissionStatus(null);
    setStatusChecked(false);
    setStudentData(null);
    studentDataRef.current = null;

    try {
      let student = null;
      let admissionData = null;
      
      // Try to find by student ID first
      if (!identifier.includes('@')) {
        student = await getStudentByStudentId(identifier.toUpperCase());
        
        // If not found, try to find by serial number in admissions
        if (!student) {
          const admission = await getAdmissionBySerial(identifier.toUpperCase());
          if (admission) {
            admissionData = admission;
            // Check if student already exists
            const existingStudent = await getStudentByEmail(admission.email);
            if (existingStudent) {
              student = existingStudent;
            }
          }
        }
      }
      
      // If not found by student ID, try by email
      if (!student) {
        student = await getStudentByEmail(identifier);
      }

      // If student still not found, check if they exist in admissions
      if (!student) {
        const admission = await getAdmissionByEmail(identifier);
        if (admission) {
          admissionData = admission;
          const existingStudent = await getStudentByEmail(admission.email);
          if (existingStudent) {
            student = existingStudent;
          }
        }
      }

      // If we have admission data but no student, create the student
      if (admissionData && !student) {
        setIsCreatingAccount(true);
        try {
          if (admissionData.status !== 'approved' && admissionData.status !== 'enrolled') {
            setError(`Your application is ${admissionData.status || 'pending'}. Please wait for approval.`);
            setStatusChecked(true);
            setIsCreatingAccount(false);
            return null;
          }

          const generatedStudentId = await generateStudentId(admissionData.fullName);
          
          const newStudentData = {
            fullName: admissionData.fullName || 'N/A',
            email: admissionData.email || 'N/A',
            phone: admissionData.phone || 'N/A',
            dateOfBirth: admissionData.dateOfBirth || '',
            gender: admissionData.gender || '',
            course: admissionData.course || 'Not specified',
            admissionStatus: admissionData.status || 'approved',
            serialNumber: admissionData.serialNumber || '',
            studentId: generatedStudentId,
            admissionId: admissionData.admissionId || admissionData.id,
            enrolledCourses: [admissionData.course || 'Not specified'],
            status: 'active',
            password: DEFAULT_PASSWORD,
            passwordUpdated: false,
            paymentHistory: [],
            attendance: { total: 0, present: 0, absent: 0 },
            grades: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await createStudent(newStudentData);
          
          // Create Firebase Auth user
          await createFirebaseAuthUser(admissionData.email, DEFAULT_PASSWORD, newStudentData);
          
          student = await getStudentByStudentId(generatedStudentId);
          
        } catch (createError) {
          console.error('Error creating student:', createError);
          setError('Error creating student account. Please contact support.');
          setStatusChecked(true);
          setIsCreatingAccount(false);
          return null;
        }
        setIsCreatingAccount(false);
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

      // Ensure student has a studentId
      if (!student.studentId) {
        student.studentId = student.id || `STU${Date.now().toString().slice(-6)}`;
      }

      setStudentData(student);
      studentDataRef.current = student;

      const status = student.admissionStatus || 'pending';
      const statusMessages = {
        pending: 'Your application is pending review. Please wait for approval before logging in.',
        approved: 'Your application has been approved! You can now log in.',
        rejected: 'Your application was not approved. Please contact admissions.',
        enrolled: 'You are enrolled! Welcome to Fast Multimedia Institute.'
      };

      setAdmissionStatus({
        exists: true,
        status: status,
        message: statusMessages[status] || 'Application status unknown.',
        data: student
      });
      setStatusChecked(true);

      if (status === 'pending') {
        setError('Your application is pending review. Please wait for approval.');
        return null;
      }

      if (status === 'rejected') {
        setError('Your application was not approved. Please contact admissions.');
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
    
    if (!identifier.trim()) {
      setError('Please enter your Student ID or Email Address.');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    
    setIsLoading(true);

    try {
      // First, check if student exists and get their data
      let student = studentDataRef.current;
      if (!student) {
        student = await checkStudentAccess(identifier);
        if (!student) {
          setIsLoading(false);
          return;
        }
      }

      // Now try to sign in with Firebase Auth
      try {
        // Use email to sign in
        const userCredential = await signInWithEmailAndPassword(auth, student.email, password);
        console.log('✅ Firebase Auth login successful:', userCredential.user.uid);
        
        // Login successful
        if (rememberMe) {
          localStorage.setItem('studentLogin', 'true');
          localStorage.setItem('studentId', student.studentId || student.id);
          localStorage.setItem('studentEmail', student.email);
          localStorage.setItem('studentName', student.fullName);
        }
        
        setIsLoading(false);
        navigate('/student/portal');
        return;
      } catch (authError) {
        console.error('Firebase Auth login error:', authError);
        
        if (authError.code === 'auth/user-not-found') {
          // Student doesn't have Firebase Auth account - create one
          try {
            setIsCreatingAccount(true);
            await createFirebaseAuthUser(student.email, DEFAULT_PASSWORD, student);
            
            // Update student record to mark that auth was created
            await updateStudentPassword(student.id, DEFAULT_PASSWORD);
            
            setIsCreatingAccount(false);
            
            // Try login again with the new account
            const userCredential = await signInWithEmailAndPassword(auth, student.email, password);
            console.log('✅ Firebase Auth login successful after creation:', userCredential.user.uid);
            
            if (rememberMe) {
              localStorage.setItem('studentLogin', 'true');
              localStorage.setItem('studentId', student.studentId || student.id);
              localStorage.setItem('studentEmail', student.email);
              localStorage.setItem('studentName', student.fullName);
            }
            
            setIsLoading(false);
            navigate('/student/portal');
            return;
          } catch (createError) {
            console.error('Error creating auth user:', createError);
            setError('Error creating login account. Please contact support.');
            setIsLoading(false);
            return;
          }
        } else if (authError.code === 'auth/wrong-password') {
          setError('Invalid password. Please try again.');
          setIsLoading(false);
          return;
        } else if (authError.code === 'auth/invalid-credential') {
          // Check if using default password
          if (password === DEFAULT_PASSWORD) {
            setShowPasswordChange(true);
            setError('');
            setIsLoading(false);
            return;
          }
          setError('Invalid credentials. Please try again.');
          setIsLoading(false);
          return;
        } else {
          setError('Login failed: ' + (authError.message || 'Please try again.'));
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
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

    if (newPassword.length < 8) {
      setPasswordChangeError('Password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setPasswordChangeError('Password must include at least one uppercase letter.');
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setPasswordChangeError('Password must include at least one number.');
      return;
    }

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
      const student = studentDataRef.current || studentData;
      
      if (!student) {
        setPasswordChangeError('Student data not found. Please try again.');
        setIsPasswordUpdating(false);
        return;
      }
      
      // Update password in Firestore
      await updateStudentPassword(student.id, newPassword);

      // Update Firebase Auth password
      try {
        const user = auth.currentUser;
        if (user) {
          await user.updatePassword(newPassword);
          console.log('✅ Firebase Auth password updated');
        }
      } catch (authError) {
        console.warn('Could not update Firebase Auth password:', authError);
      }

      const updatedStudent = {
        ...student,
        password: newPassword,
        passwordUpdated: true
      };
      
      setStudentData(updatedStudent);
      studentDataRef.current = updatedStudent;

      setTimeout(() => {
        setIsPasswordUpdating(false);
        setPasswordChangeSuccess(true);
        
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

  const getDisplayStudent = () => {
    return studentDataRef.current || studentData;
  };

  const displayStudent = getDisplayStudent();

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

          {isCreatingAccount && (
            <div className="login-info creating">
              <FaSpinner className="spinner" /> Setting up your account...
            </div>
          )}

          {statusChecked && displayStudent && (
            <div className="student-info-badge">
              <div className="student-info-icon">
                <FaUserGraduate />
              </div>
              <div className="student-info-content">
                <h4>Welcome, <strong>{displayStudent.fullName}</strong></h4>
                <p>Student ID: <strong>{displayStudent.studentId || displayStudent.id}</strong></p>
                <p>Course: <strong>{displayStudent.course || 'Not assigned'}</strong></p>
                <p>Email: <strong>{displayStudent.email}</strong></p>
              </div>
            </div>
          )}

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
                        studentDataRef.current = null;
                      }}
                      placeholder="Enter your Student ID or Email"
                      required
                    />
                  </div>
                  <div className="input-hint">
                    <FaInfoCircle /> Enter your Student ID (e.g., KIKI260001) or Email Address
                  </div>
                  <div className="input-hint">
                    <FaInfoCircle /> You can also use your Admission Serial Number
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
                  disabled={isLoading || isCreatingAccount}
                >
                  {isLoading || isCreatingAccount ? (
                    <>
                      <FaSpinner className="spinner" /> {isCreatingAccount ? 'Setting up...' : 'Signing in...'}
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
                  First time logging in? Use the default password above.
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
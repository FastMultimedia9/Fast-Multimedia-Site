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
  FaUniversity,
  FaSync
} from 'react-icons/fa';
import { 
  getStudentByEmail,
  getUserByEmail,
  getStudentByStudentId,
  updateStudentPassword,
  getAdmissionBySerial,
  getAdmissionByEmail,
  createStudent,
  generateStudentId,
  updateUserProfile,
  updateStudent
} from '../services/firebaseService';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail
} from 'firebase/auth';
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
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Default password for all users
  const DEFAULT_PASSWORD = 'FastMultimedia2024@';

  // Create Firebase Auth user for student
  const createFirebaseAuthUser = async (email, password, studentData) => {
    try {
      console.log('🔐 Creating Firebase Auth user for:', email);
      
      // Check if user already exists
      try {
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods && signInMethods.length > 0) {
          console.log('⚠️ Auth user already exists for:', email);
          return null;
        }
      } catch (checkError) {
        console.log('Could not check existing user:', checkError.message);
      }
      
      // Create the auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ Firebase Auth user created:', user.uid);
      
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
      
      console.log('✅ User document created in Firestore');
      return user;
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('⚠️ Auth user already exists for:', email);
        return null;
      }
      console.error('Error creating Firebase Auth user:', error);
      throw error;
    }
  };

  // Reset password for student (send reset email)
  const resetStudentPassword = async (email) => {
    setIsResettingPassword(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showNotification('Password reset email sent! Check your inbox.', 'success');
      return true;
    } catch (error) {
      console.error('Error sending reset email:', error);
      if (error.code === 'auth/user-not-found') {
        // User doesn't exist, try to create them
        try {
          const student = studentDataRef.current;
          if (student) {
            await createFirebaseAuthUser(email, DEFAULT_PASSWORD, student);
            showNotification('Account created! Check your email for password reset.', 'success');
            return true;
          }
        } catch (createError) {
          console.error('Error creating user:', createError);
        }
      }
      showNotification('Error sending reset email: ' + error.message, 'error');
      return false;
    } finally {
      setIsResettingPassword(false);
    }
  };

  // Force reset password in Firebase Auth
  const forceResetPassword = async (student) => {
    setIsResettingPassword(true);
    try {
      console.log('🔄 Force resetting password for:', student.email);
      
      // Try to set password directly by creating a new user (if user doesn't exist)
      try {
        // First check if user exists
        const signInMethods = await fetchSignInMethodsForEmail(auth, student.email);
        if (!signInMethods || signInMethods.length === 0) {
          // User doesn't exist, create them
          await createFirebaseAuthUser(student.email, DEFAULT_PASSWORD, student);
          showNotification('Account created! Try logging in with default password.', 'success');
          setIsResettingPassword(false);
          return true;
        }
      } catch (checkError) {
        console.log('Could not check user:', checkError.message);
      }
      
      // If user exists, try to reset password via email
      try {
        await sendPasswordResetEmail(auth, student.email);
        showNotification('Password reset email sent to ' + student.email, 'success');
        setIsResettingPassword(false);
        return true;
      } catch (resetError) {
        console.error('Error sending reset email:', resetError);
        // If email reset fails, try to re-create user
        try {
          // Delete and re-create (this is a fallback)
          // Note: This requires admin privileges, might not work in client
          showNotification('Please contact admin to reset your password.', 'warning');
        } catch (recreateError) {
          console.error('Error recreating user:', recreateError);
        }
      }
      
      setIsResettingPassword(false);
      return false;
    } catch (error) {
      console.error('Error in forceResetPassword:', error);
      setIsResettingPassword(false);
      showNotification('Error resetting password. Please contact support.', 'error');
      return false;
    }
  };

  // Check student admission status
  const checkStudentAccess = async (identifier) => {
    setError('');
    setAdmissionStatus(null);
    setStatusChecked(false);
    setStudentData(null);
    studentDataRef.current = null;

    try {
      let student = null;
      let admissionData = null;
      
      console.log('🔍 Checking student access for:', identifier);
      
      // Try to find by student ID first
      if (!identifier.includes('@')) {
        student = await getStudentByStudentId(identifier.toUpperCase());
        console.log('📚 Student lookup by ID result:', student ? 'Found' : 'Not found');
        
        if (!student) {
          const admission = await getAdmissionBySerial(identifier.toUpperCase());
          if (admission) {
            console.log('📚 Admission found by serial');
            admissionData = admission;
            const existingStudent = await getStudentByEmail(admission.email);
            if (existingStudent) {
              student = existingStudent;
              console.log('📚 Existing student found from admission');
            }
          }
        }
      }
      
      // If not found by student ID, try by email
      if (!student) {
        student = await getStudentByEmail(identifier);
        console.log('📚 Student lookup by email result:', student ? 'Found' : 'Not found');
      }

      // If student still not found, check if they exist in admissions
      if (!student) {
        const admission = await getAdmissionByEmail(identifier);
        if (admission) {
          console.log('📚 Admission found by email');
          admissionData = admission;
          const existingStudent = await getStudentByEmail(admission.email);
          if (existingStudent) {
            student = existingStudent;
            console.log('📚 Existing student found from admission');
          }
        }
      }

      // If we have admission data but no student, create the student
      if (admissionData && !student) {
        console.log('🆕 Creating new student from admission');
        setIsCreatingAccount(true);
        try {
          if (admissionData.status !== 'approved' && admissionData.status !== 'enrolled') {
            setError(`Your application is ${admissionData.status || 'pending'}. Please wait for approval.`);
            setStatusChecked(true);
            setIsCreatingAccount(false);
            return null;
          }

          const generatedStudentId = await generateStudentId(admissionData.fullName);
          console.log('📝 Generated Student ID:', generatedStudentId);
          
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
            authCreated: false,
            paymentHistory: [],
            attendance: { total: 0, present: 0, absent: 0 },
            grades: {},
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          await createStudent(newStudentData);
          console.log('✅ Student created in Firestore');
          
          // Create Firebase Auth user
          await createFirebaseAuthUser(admissionData.email, DEFAULT_PASSWORD, newStudentData);
          console.log('✅ Firebase Auth user created');
          
          // Update authCreated status
          await updateStudent(generatedStudentId, { authCreated: true });
          
          student = await getStudentByStudentId(generatedStudentId);
          console.log('✅ Student fetched after creation');
          
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

      console.log('🔐 Attempting Firebase Auth login for:', student.email);
      
      // Try to sign in with Firebase Auth
      try {
        const userCredential = await signInWithEmailAndPassword(auth, student.email, password);
        console.log('✅ Firebase Auth login successful:', userCredential.user.uid);
        
        // Login successful - store session
        if (rememberMe) {
          localStorage.setItem('studentLogin', 'true');
          localStorage.setItem('studentId', student.studentId || student.id);
          localStorage.setItem('studentEmail', student.email);
          localStorage.setItem('studentName', student.fullName);
        }
        
        sessionStorage.setItem('studentAuthenticated', 'true');
        sessionStorage.setItem('studentId', student.studentId || student.id);
        
        setIsLoading(false);
        console.log('🚀 Redirecting to /student/portal');
        navigate('/student/portal', { replace: true });
        return;
        
      } catch (authError) {
        console.error('Firebase Auth login error:', authError.code, authError.message);
        
        // Handle specific auth errors
        if (authError.code === 'auth/user-not-found') {
          // Student doesn't have Firebase Auth account - create one
          console.log('🆕 Auth user not found, creating...');
          try {
            setIsCreatingAccount(true);
            await createFirebaseAuthUser(student.email, DEFAULT_PASSWORD, student);
            await updateStudent(student.id, { authCreated: true });
            setIsCreatingAccount(false);
            console.log('✅ Auth user created, trying login again...');
            
            // Try login again with the new account
            const userCredential = await signInWithEmailAndPassword(auth, student.email, DEFAULT_PASSWORD);
            console.log('✅ Firebase Auth login successful after creation:', userCredential.user.uid);
            
            if (rememberMe) {
              localStorage.setItem('studentLogin', 'true');
              localStorage.setItem('studentId', student.studentId || student.id);
              localStorage.setItem('studentEmail', student.email);
              localStorage.setItem('studentName', student.fullName);
            }
            
            sessionStorage.setItem('studentAuthenticated', 'true');
            sessionStorage.setItem('studentId', student.studentId || student.id);
            
            setIsLoading(false);
            console.log('🚀 Redirecting to /student/portal');
            navigate('/student/portal', { replace: true });
            return;
            
          } catch (createError) {
            console.error('Error creating auth user:', createError);
            setError('Error creating login account. Please use "Forgot Password" or contact support.');
            setIsCreatingAccount(false);
            setIsLoading(false);
            return;
          }
        } else if (authError.code === 'auth/wrong-password') {
          // Check if using default password
          if (password === DEFAULT_PASSWORD && !student.passwordUpdated) {
            setShowPasswordChange(true);
            setError('');
            setIsLoading(false);
            return;
          }
          setError('Invalid password. Please try again or use "Forgot Password".');
          setIsLoading(false);
          return;
        } else if (authError.code === 'auth/invalid-credential') {
          // This often means the password in Firebase Auth doesn't match
          // Try to reset/sync the password
          console.log('⚠️ Invalid credential, attempting to reset password...');
          try {
            // Check if this is the default password
            if (password === DEFAULT_PASSWORD) {
              // Try to create a new auth user (if email not in use)
              try {
                await createFirebaseAuthUser(student.email, DEFAULT_PASSWORD, student);
                await updateStudent(student.id, { authCreated: true });
                
                // Try login again
                const userCredential = await signInWithEmailAndPassword(auth, student.email, DEFAULT_PASSWORD);
                console.log('✅ Login successful after recreation');
                
                if (rememberMe) {
                  localStorage.setItem('studentLogin', 'true');
                  localStorage.setItem('studentId', student.studentId || student.id);
                  localStorage.setItem('studentEmail', student.email);
                  localStorage.setItem('studentName', student.fullName);
                }
                
                sessionStorage.setItem('studentAuthenticated', 'true');
                sessionStorage.setItem('studentId', student.studentId || student.id);
                
                setIsLoading(false);
                navigate('/student/portal', { replace: true });
                return;
              } catch (recreateError) {
                console.error('Error recreating auth user:', recreateError);
              }
            }
            
            // If we can't fix it, offer password reset
            setError('Invalid credentials. Please use "Forgot Password" to reset your password.');
            setIsLoading(false);
            return;
          } catch (resetError) {
            console.error('Error during credential fix:', resetError);
            setError('Invalid credentials. Please use "Forgot Password" to reset your password.');
            setIsLoading(false);
            return;
          }
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

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    // You can implement a proper notification system here
    console.log(`${type}: ${message}`);
    // For now, we'll use alert for demo
    alert(message);
  };

  const redirectToPortal = () => {
    setIsLoading(false);
    setError('');
    navigate('/student/portal', { replace: true });
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
        } else {
          // If no current user, try to sign in first
          console.log('⚠️ No current user, signing in to update password...');
          try {
            // First try with default password
            let userCredential;
            try {
              userCredential = await signInWithEmailAndPassword(auth, student.email, DEFAULT_PASSWORD);
            } catch (defaultLoginError) {
              // If default doesn't work, try the new password
              userCredential = await signInWithEmailAndPassword(auth, student.email, newPassword);
            }
            await userCredential.user.updatePassword(newPassword);
            console.log('✅ Firebase Auth password updated after sign in');
          } catch (signInError) {
            console.error('Error signing in to update password:', signInError);
            // Try to create auth user as fallback
            await createFirebaseAuthUser(student.email, newPassword, student);
          }
        }
      } catch (authError) {
        console.warn('Could not update Firebase Auth password:', authError);
        // Try to create auth user as fallback
        await createFirebaseAuthUser(student.email, newPassword, student);
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
          // Try to sign in with new password
          signInWithEmailAndPassword(auth, student.email, newPassword)
            .then(() => {
              console.log('✅ Auto-login after password change successful');
              redirectToPortal();
            })
            .catch(() => {
              // If auto-login fails, just redirect to login
              navigate('/student/login');
            });
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
                <p>Password Status: <strong>{displayStudent.passwordUpdated ? '✅ Changed' : '⚠️ Default'}</strong></p>
                <p>Auth Status: <strong>{displayStudent.authCreated ? '✅ Active' : '⚠️ Not Created'}</strong></p>
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
                    <FaInfoCircle /> Enter your Student ID (e.g., TEYE260001) or Email Address
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

              {/* Forgot Password / Reset Password Section */}
              <div className="login-footer">
                <div className="password-reset-section">
                  <button 
                    type="button"
                    className="forgot-password-btn"
                    onClick={async () => {
                      if (!identifier.trim()) {
                        setError('Please enter your Student ID or Email first.');
                        return;
                      }
                      
                      try {
                        let student = studentDataRef.current;
                        if (!student) {
                          student = await checkStudentAccess(identifier);
                          if (!student) {
                            setError('Student not found. Please check your Student ID or Email.');
                            return;
                          }
                        }
                        
                        if (window.confirm(`Send password reset email to ${student.email}?`)) {
                          await resetStudentPassword(student.email);
                        }
                      } catch (error) {
                        console.error('Error during password reset:', error);
                        setError('Error sending reset email. Please contact support.');
                      }
                    }}
                    disabled={isResettingPassword}
                  >
                    {isResettingPassword ? (
                      <>
                        <FaSpinner className="spinner" /> Sending...
                      </>
                    ) : (
                      <>
                        <FaKey /> Forgot Password?
                      </>
                    )}
                  </button>
                </div>

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
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserGraduate,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaCog,
  FaBell,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaInfoCircle,
  FaChevronDown,
  FaChevronRight,
  FaEdit,
  FaSave,
  FaTimes,
  FaCreditCard,
  FaFileAlt,
  FaDownload,
  FaPrint,
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaTrophy,
  FaUsers,
  FaChalkboardTeacher,
  FaClipboardList,
  FaHistory,
  FaArrowRight,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaLock,
  FaUnlock,
  FaShieldAlt,
  FaUniversity,
  FaWallet,
  FaReceipt,
  FaPercent,
  FaCalendar,
  FaCheck,
  FaPlus,
  FaMinus,
  FaEye,
  FaEyeSlash,
  FaSync
} from 'react-icons/fa';
import { auth, db } from '../firebase';
import {
  getStudentByStudentId,
  getStudentByEmail,
  updateStudent,
  getStudentGrades,
  getPaymentsByStudent,
  getStudent,
  updateStudentPassword,
  logoutUser,
  getCurrentUser,
  getUserProfile,
  sendNotification,
  getAllCourses,
  createPayment,
  updatePaymentStatus,
  getPayment
} from '../services/firebaseService';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import './StudentPortal.css';

// Paystack integration
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your key

const StudentPortal = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [grades, setGrades] = useState([]);
  const [payments, setPayments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notification, setNotification] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedSections, setExpandedSections] = useState({
    payments: true,
    courses: true,
    fees: true
  });
  const [gradeStats, setGradeStats] = useState({
    average: 0,
    highest: 0,
    lowest: 0,
    total: 0
  });
  const [paymentStats, setPaymentStats] = useState({
    totalPaid: 0,
    totalDue: 0,
    pending: 0,
    completed: 0,
    outstanding: 0
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentEmail, setPaymentEmail] = useState('');
  const [paymentName, setPaymentName] = useState('');
  const [paymentReference, setPaymentReference] = useState('');

  // Default password
  const DEFAULT_PASSWORD = 'FastMultimedia2024@';

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          navigate('/student/login', { state: { from: '/student/portal' } });
          return;
        }
        
        setCurrentUser(user);
        
        // Get user profile
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
        }
        
        // Get student data
        const studentId = sessionStorage.getItem('studentId') || localStorage.getItem('studentId');
        let studentData = null;
        
        if (studentId) {
          studentData = await getStudentByStudentId(studentId);
        }
        
        if (!studentData && user.email) {
          studentData = await getStudentByEmail(user.email);
        }
        
        if (!studentData) {
          if (profile && profile.studentId) {
            studentData = await getStudentByStudentId(profile.studentId);
          }
        }
        
        if (!studentData) {
          showNotification('Student data not found. Please contact support.', 'error');
          setIsLoading(false);
          return;
        }
        
        // Set student data BEFORE loading other data
        setStudent(studentData);
        setEditFormData(studentData);
        setPaymentEmail(studentData.email || '');
        setPaymentName(studentData.fullName || '');
        
        // Load all data
        await loadStudentData(studentData);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        showNotification('Error loading profile: ' + error.message, 'error');
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  // Load all student data
  const loadStudentData = async (studentData) => {
    try {
      const studentId = studentData?.studentId || studentData?.id;
      if (!studentId) {
        console.warn('No student ID found');
        return;
      }
      
      // Get grades
      try {
        const gradesData = await getStudentGrades(studentId);
        setGrades(gradesData || []);
        calculateGradeStats(gradesData || []);
      } catch (error) {
        console.error('Error loading grades:', error);
      }
      
      // Get payments - FIXED: now handles errors gracefully
      try {
        const paymentsData = await getPaymentsByStudent(studentId);
        setPayments(paymentsData || []);
        calculatePaymentStats(paymentsData || []);
      } catch (error) {
        console.error('Error loading payments:', error);
        // Set empty payments on error
        setPayments([]);
        calculatePaymentStats([]);
      }
      
      // Get courses
      try {
        const coursesData = await getAllCourses();
        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error loading courses:', error);
      }
      
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  // Calculate grade statistics
  const calculateGradeStats = (data) => {
    if (!data || data.length === 0) {
      setGradeStats({ average: 0, highest: 0, lowest: 0, total: 0 });
      return;
    }
    
    const scores = data.filter(g => g.score !== undefined && g.score !== null).map(g => g.score);
    if (scores.length === 0) {
      setGradeStats({ average: 0, highest: 0, lowest: 0, total: 0 });
      return;
    }
    
    const total = scores.length;
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = sum / total;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    
    setGradeStats({
      average: Math.round(average * 10) / 10,
      highest,
      lowest,
      total
    });
  };

  // Calculate payment statistics
  const calculatePaymentStats = (data) => {
    let totalPaid = 0;
    let totalDue = 0;
    let pending = 0;
    let completed = 0;
    
    (data || []).forEach(payment => {
      if (payment.status === 'completed' || payment.status === 'paid') {
        completed++;
        totalPaid += payment.amount || 0;
      } else if (payment.status === 'pending') {
        pending++;
        totalDue += payment.amount || 0;
      }
    });
    
    // Calculate outstanding (course fee - total paid)
    const courseFee = student?.courseFee || 600;
    const outstanding = courseFee - totalPaid;
    
    setPaymentStats({
      totalPaid,
      totalDue,
      pending,
      completed,
      outstanding: outstanding > 0 ? outstanding : 0
    });
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      sessionStorage.removeItem('studentAuthenticated');
      sessionStorage.removeItem('studentId');
      localStorage.removeItem('studentLogin');
      localStorage.removeItem('studentId');
      localStorage.removeItem('studentEmail');
      localStorage.removeItem('studentName');
      navigate('/student/login');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Error logging out: ' + error.message, 'error');
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsEditing(true);
    
    try {
      if (!student?.id) {
        showNotification('Student ID not found', 'error');
        setIsEditing(false);
        return;
      }
      
      await updateStudent(student.id, editFormData);
      setStudent({ ...student, ...editFormData });
      showNotification('Profile updated successfully!', 'success');
      setShowEditProfile(false);
      
      if (currentUser) {
        try {
          await updateProfile(currentUser, {
            displayName: editFormData.fullName || student.fullName
          });
        } catch (error) {
          console.error('Error updating user profile:', error);
        }
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      showNotification('Error updating profile: ' + error.message, 'error');
    } finally {
      setIsEditing(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      setIsChangingPassword(false);
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      showNotification('Password must be at least 8 characters long.', 'error');
      setIsChangingPassword(false);
      return;
    }
    
    try {
      if (!student?.email) {
        showNotification('Student email not found', 'error');
        setIsChangingPassword(false);
        return;
      }
      
      try {
        await signInWithEmailAndPassword(auth, student.email, passwordData.currentPassword);
      } catch (error) {
        showNotification('Current password is incorrect.', 'error');
        setIsChangingPassword(false);
        return;
      }
      
      await updateStudentPassword(student.id, passwordData.newPassword);
      
      if (currentUser) {
        await currentUser.updatePassword(passwordData.newPassword);
      }
      
      showNotification('Password changed successfully!', 'success');
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Error changing password:', error);
      showNotification('Error changing password: ' + error.message, 'error');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return 'GH₵ 0.00';
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'paid': return 'status-completed';
      default: return 'status-default';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'present': return <FaCheckCircle />;
      case 'absent': return <FaTimesCircle />;
      case 'late': return <FaClock />;
      case 'completed': return <FaCheckCircle />;
      case 'pending': return <FaClock />;
      case 'approved': return <FaCheckCircle />;
      case 'rejected': return <FaTimesCircle />;
      case 'active': return <FaCheckCircle />;
      case 'inactive': return <FaTimesCircle />;
      case 'paid': return <FaCheckCircle />;
      default: return <FaInfoCircle />;
    }
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Initialize Paystack payment
  const initializePayment = async () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      showNotification('Please enter a valid amount', 'error');
      return;
    }

    // Check if Paystack is loaded
    if (typeof window.PaystackPop === 'undefined') {
      showNotification('Payment system is loading. Please try again.', 'error');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Generate reference
      const reference = `PAY-${Date.now()}-${student?.studentId || 'STU'}`;
      setPaymentReference(reference);

      // Create payment record in Firestore
      const paymentData = {
        studentId: student?.id || '',
        studentName: student?.fullName || '',
        studentEmail: student?.email || '',
        amount: parseFloat(paymentAmount),
        description: `School Fees Payment - ${student?.course || 'Course'}`,
        reference: reference,
        status: 'pending',
        paymentType: 'school_fees',
        method: 'paystack',
        createdAt: new Date().toISOString()
      };

      await createPayment(paymentData);

      // Initialize Paystack
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: paymentEmail || student?.email || '',
        amount: parseFloat(paymentAmount) * 100, // Convert to pesewas
        currency: 'GHS',
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Student ID",
              variable_name: "student_id",
              value: student?.studentId || ''
            },
            {
              display_name: "Course",
              variable_name: "course",
              value: student?.course || ''
            }
          ]
        },
        callback: async (response) => {
          console.log('Payment successful:', response);
          
          try {
            // Update payment status
            await updatePaymentStatus(reference, 'completed');
            
            // Send notification
            await sendNotification({
              userId: student?.id || '',
              title: 'Payment Successful',
              message: `Your payment of ${formatCurrency(parseFloat(paymentAmount))} for ${student?.course || 'Course'} has been confirmed.`,
              type: 'payment',
              link: '/student/portal'
            });

            showNotification(`Payment of ${formatCurrency(parseFloat(paymentAmount))} successful!`, 'success');
          } catch (error) {
            console.error('Error processing successful payment:', error);
            showNotification('Payment was successful but there was an error updating your record. Please contact support.', 'warning');
          }
          
          // Reload data
          if (student) {
            await loadStudentData(student);
          }
          setShowPaymentModal(false);
          setPaymentAmount('');
          setIsProcessingPayment(false);
        },
        onClose: async () => {
          console.log('Payment window closed');
          try {
            // Update payment as failed if not completed
            await updatePaymentStatus(reference, 'failed');
          } catch (error) {
            console.error('Error updating payment status on close:', error);
          }
          showNotification('Payment was cancelled', 'warning');
          setIsProcessingPayment(false);
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment initialization error:', error);
      showNotification('Error initializing payment: ' + error.message, 'error');
      setIsProcessingPayment(false);
    }
  };

  // Render Dashboard
  const renderDashboard = () => {
    if (!student) return null;
    
    return (
      <div className="dashboard-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h2>Welcome back, {student.fullName || 'Student'}!</h2>
            <p>Student ID: <strong>{student.studentId || 'N/A'}</strong> | Course: <strong>{student.course || 'Not Enrolled'}</strong></p>
          </div>
          <div className="welcome-date">
            <FaCalendarAlt />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FaUserGraduate />
            </div>
            <div className="stat-info">
              <h3>{student.studentId || 'N/A'}</h3>
              <p>Student ID</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <FaBookOpen />
            </div>
            <div className="stat-info">
              <h3>{student.course || 'Not Enrolled'}</h3>
              <p>Current Course</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <h3>{gradeStats.average}%</h3>
              <p>Average Grade</p>
              <div className="stat-detail">
                {gradeStats.total} Subjects
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>{formatCurrency(paymentStats.totalPaid)}</h3>
              <p>Total Paid</p>
              <div className="stat-detail">
                Outstanding: {formatCurrency(paymentStats.outstanding)}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon teal">
              <FaWallet />
            </div>
            <div className="stat-info">
              <h3>{formatCurrency(paymentStats.outstanding)}</h3>
              <p>Outstanding Balance</p>
              <div className="stat-detail">
                Course Fee: {formatCurrency(student.courseFee || 600)}
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">
              <FaReceipt />
            </div>
            <div className="stat-info">
              <h3>{paymentStats.completed}</h3>
              <p>Payments Made</p>
              <div className="stat-detail">
                {paymentStats.pending} Pending
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-grid">
            <button className="action-btn" onClick={() => setActiveTab('account')}>
              <FaWallet /> Pay Fees
            </button>
            <button className="action-btn" onClick={() => setActiveTab('grades')}>
              <FaChartLine /> Check Grades
            </button>
            <button className="action-btn" onClick={() => setActiveTab('account')}>
              <FaReceipt /> Payment History
            </button>
            <button className="action-btn" onClick={() => setActiveTab('profile')}>
              <FaUserCircle /> Edit Profile
            </button>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="recent-activity">
          <h3>Recent Payments</h3>
          <div className="activity-list">
            {payments.length > 0 ? (
              payments.slice(0, 5).map((payment, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${payment.status}`}>
                    {getStatusIcon(payment.status)}
                  </div>
                  <div className="activity-content">
                    <p>
                      <strong>{formatCurrency(payment.amount)}</strong> - {payment.description || 'Payment'}
                    </p>
                    <span className="activity-date">
                      {new Date(payment.createdAt?.seconds * 1000 || payment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activity">No payment records found</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render Grades
  const renderGrades = () => (
    <div className="grades-content">
      <div className="content-header">
        <h2>Academic Performance</h2>
        <div className="header-actions">
          <div className="grades-summary">
            <span className="summary-item">
              <FaChartLine /> Average: <strong>{gradeStats.average}%</strong>
            </span>
            <span className="summary-item">
              <FaTrophy /> Highest: <strong>{gradeStats.highest}%</strong>
            </span>
            <span className="summary-item">
              <FaArrowRight /> Lowest: <strong>{gradeStats.lowest}%</strong>
            </span>
            <span className="summary-item">
              <FaBookOpen /> Subjects: <strong>{gradeStats.total}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="grades-grid">
        {grades.length > 0 ? (
          grades.map((grade, index) => (
            <div key={index} className="grade-card">
              <div className="grade-header">
                <h4>{grade.course || grade.subject || 'Subject'}</h4>
                <span className={`grade-score ${grade.score >= 70 ? 'high' : grade.score >= 50 ? 'medium' : 'low'}`}>
                  {grade.score}%
                </span>
              </div>
              <div className="grade-details">
                <p><strong>Grade:</strong> {grade.grade || grade.letter || 'N/A'}</p>
                <p><strong>Points:</strong> {grade.points || grade.gpa || 'N/A'}</p>
                <p><strong>Status:</strong> 
                  <span className={`grade-status ${grade.score >= 50 ? 'passed' : 'failed'}`}>
                    {grade.score >= 50 ? '✅ Passed' : '❌ Failed'}
                  </span>
                </p>
                {grade.remarks && <p><strong>Remarks:</strong> {grade.remarks}</p>}
              </div>
              <div className="grade-progress">
                <div className="progress-track">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${grade.score || 0}%`,
                      background: grade.score >= 70 ? '#27ae60' : grade.score >= 50 ? '#f39c12' : '#e74c3c'
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-data-message">
            <FaInfoCircle /> No grades available yet
          </div>
        )}
      </div>
    </div>
  );

  // Render Account (Payments + Fees)
  const renderAccount = () => {
    if (!student) return null;
    
    return (
      <div className="account-content">
        <div className="content-header">
          <h2>Account & Fees</h2>
          <div className="header-actions">
            <button className="btn-pay-fees" onClick={() => setShowPaymentModal(true)}>
              <FaPlus /> Pay Fees
            </button>
          </div>
        </div>

        {/* Fee Summary */}
        <div className="fee-summary">
          <div className="fee-card">
            <div className="fee-icon blue">
              <FaWallet />
            </div>
            <div className="fee-info">
              <h3>{formatCurrency(student.courseFee || 600)}</h3>
              <p>Course Fee</p>
            </div>
          </div>
          <div className="fee-card">
            <div className="fee-icon green">
              <FaCheckCircle />
            </div>
            <div className="fee-info">
              <h3>{formatCurrency(paymentStats.totalPaid)}</h3>
              <p>Total Paid</p>
            </div>
          </div>
          <div className="fee-card">
            <div className="fee-icon orange">
              <FaClock />
            </div>
            <div className="fee-info">
              <h3>{formatCurrency(paymentStats.outstanding)}</h3>
              <p>Outstanding Balance</p>
            </div>
          </div>
          <div className="fee-card">
            <div className="fee-icon purple">
              <FaReceipt />
            </div>
            <div className="fee-info">
              <h3>{paymentStats.completed}</h3>
              <p>Payments Made</p>
            </div>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="fee-breakdown">
          <h3>Fee Breakdown</h3>
          <div className="breakdown-item">
            <span>Course Fee</span>
            <span>{formatCurrency(student.courseFee || 600)}</span>
          </div>
          <div className="breakdown-item">
            <span>Registration Fee</span>
            <span>{formatCurrency(0)}</span>
          </div>
          <div className="breakdown-item">
            <span>Total Paid</span>
            <span className="paid">{formatCurrency(paymentStats.totalPaid)}</span>
          </div>
          <div className="breakdown-item total">
            <span>Outstanding Balance</span>
            <span className="outstanding">{formatCurrency(paymentStats.outstanding)}</span>
          </div>
        </div>

        {/* Payment History */}
        <div className="payment-history">
          <h3>Payment History</h3>
          <div className="payments-grid">
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <div key={index} className="payment-card">
                  <div className="payment-header">
                    <div className="payment-icon">
                      {payment.status === 'completed' || payment.status === 'paid' ? 
                        <FaCheckCircle className="icon-success" /> : 
                        <FaClock className="icon-pending" />
                      }
                    </div>
                    <div className="payment-info">
                      <h4>{payment.description || payment.paymentType || 'Payment'}</h4>
                      <p className="payment-date">
                        {new Date(payment.createdAt?.seconds * 1000 || payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`payment-amount ${payment.status === 'completed' || payment.status === 'paid' ? 'paid' : 'pending'}`}>
                      {formatCurrency(payment.amount)}
                    </span>
                  </div>
                  <div className="payment-details">
                    <p><strong>Method:</strong> {payment.method || 'N/A'}</p>
                    <p><strong>Reference:</strong> {payment.reference || payment.paymentId || 'N/A'}</p>
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)} {payment.status}
                      </span>
                    </p>
                    {payment.remarks && <p><strong>Remarks:</strong> {payment.remarks}</p>}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data-message">
                <FaInfoCircle /> No payment records found
              </div>
            )}
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
            <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowPaymentModal(false)}>×</button>
              <h2><FaWallet /> Make Payment</h2>
              
              <div className="payment-summary-info">
                <p><strong>Student:</strong> {student.fullName || 'N/A'}</p>
                <p><strong>Course:</strong> {student.course || 'N/A'}</p>
                <p><strong>Outstanding Balance:</strong> {formatCurrency(paymentStats.outstanding)}</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); initializePayment(); }}>
                <div className="form-group">
                  <label>Amount to Pay (GH₵)</label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                    min="1"
                    max={paymentStats.outstanding || 600}
                  />
                  <small>Max: {formatCurrency(paymentStats.outstanding || 600)}</small>
                </div>

                <div className="form-group">
                  <label>Email (for receipt)</label>
                  <input
                    type="email"
                    value={paymentEmail}
                    onChange={(e) => setPaymentEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={paymentName}
                    onChange={(e) => setPaymentName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="payment-info-note">
                  <FaInfoCircle /> You will be redirected to Paystack to complete your payment securely.
                </div>

                <div className="modal-actions">
                  <button 
                    type="submit" 
                    className="btn-pay-now"
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <FaSpinner className="spinner" /> Processing...
                      </>
                    ) : (
                      <>
                        <FaCreditCard /> Pay Now
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => setShowPaymentModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Profile
  const renderProfile = () => {
    if (!student) return null;
    
    return (
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <FaUserGraduate size={60} />
          </div>
          <div className="profile-info">
            <h2>{student.fullName || 'Student'}</h2>
            <p>Student ID: <strong>{student.studentId || 'N/A'}</strong></p>
            <p>Course: <strong>{student.course || 'Not Enrolled'}</strong></p>
            <p>Status: 
              <span className={`status-badge ${getStatusColor(student.status)}`}>
                {getStatusIcon(student.status)} {student.status || 'Active'}
              </span>
            </p>
          </div>
          <div className="profile-actions">
            <button className="btn-edit-profile" onClick={() => setShowEditProfile(true)}>
              <FaEdit /> Edit Profile
            </button>
            <button className="btn-change-password" onClick={() => setShowChangePassword(true)}>
              <FaLock /> Change Password
            </button>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3><FaUserCircle /> Personal Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Full Name</label>
                <p>{student.fullName || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <p>{student.email || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <p>{student.phone || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Date of Birth</label>
                <p>{student.dateOfBirth || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Gender</label>
                <p>{student.gender || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Address</label>
                <p>{student.address || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FaBookOpen /> Academic Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Course</label>
                <p>{student.course || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Student ID</label>
                <p>{student.studentId || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Admission Status</label>
                <p>
                  <span className={`status-badge ${getStatusColor(student.admissionStatus)}`}>
                    {getStatusIcon(student.admissionStatus)} {student.admissionStatus || 'Pending'}
                  </span>
                </p>
              </div>
              <div className="detail-item">
                <label>Enrolled Date</label>
                <p>{student.createdAt ? new Date(student.createdAt?.seconds * 1000 || student.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FaShieldAlt /> Emergency Contact</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label>Name</label>
                <p>{student.guardianName || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <p>{student.guardianPhone || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <p>{student.guardianEmail || 'N/A'}</p>
              </div>
              <div className="detail-item">
                <label>Relationship</label>
                <p>{student.guardianRelationship || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
            <div className="modal-content edit-profile-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowEditProfile(false)}>×</button>
              <h2>Edit Profile</h2>
              <form onSubmit={handleUpdateProfile}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editFormData.fullName || ''}
                      onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editFormData.email || ''}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      required
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={editFormData.phone || ''}
                      onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={editFormData.dateOfBirth || ''}
                      onChange={(e) => setEditFormData({...editFormData, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={editFormData.gender || ''}
                      onChange={(e) => setEditFormData({...editFormData, gender: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      type="text"
                      value={editFormData.address || ''}
                      onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Guardian Name</label>
                    <input
                      type="text"
                      value={editFormData.guardianName || ''}
                      onChange={(e) => setEditFormData({...editFormData, guardianName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Guardian Phone</label>
                    <input
                      type="tel"
                      value={editFormData.guardianPhone || ''}
                      onChange={(e) => setEditFormData({...editFormData, guardianPhone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-actions">
                  <button type="submit" className="btn-save" disabled={isEditing}>
                    {isEditing ? <FaSpinner className="spinner" /> : <FaSave />} 
                    {isEditing ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button type="button" className="btn-cancel" onClick={() => setShowEditProfile(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePassword && (
          <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
            <div className="modal-content change-password-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowChangePassword(false)}>×</button>
              <h2><FaLock /> Change Password</h2>
              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label>Current Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
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
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                    minLength={8}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                    minLength={8}
                  />
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
                <div className="modal-actions">
                  <button type="submit" className="btn-save" disabled={isChangingPassword}>
                    {isChangingPassword ? <FaSpinner className="spinner" /> : <FaLock />}
                    {isChangingPassword ? 'Changing...' : 'Change Password'}
                  </button>
                  <button type="button" className="btn-cancel" onClick={() => setShowChangePassword(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', icon: <FaHome />, label: 'Dashboard' },
    { id: 'account', icon: <FaWallet />, label: 'Account' },
    { id: 'grades', icon: <FaChartLine />, label: 'Grades' },
    { id: 'profile', icon: <FaUserCircle />, label: 'Profile' }
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="student-portal-loading">
        <div className="loading-spinner">
          <FaSpinner className="spinner" />
        </div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  // No student data
  if (!student) {
    return (
      <div className="student-portal-error">
        <FaExclamationTriangle className="error-icon" />
        <h2>Student Data Not Found</h2>
        <p>We couldn't find your student profile. Please contact support.</p>
        <button className="btn-primary" onClick={() => navigate('/student/login')}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="student-portal">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="portal-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaUniversity />
            <h2>Student Portal</h2>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-avatar">
              {student.fullName?.charAt(0) || 'S'}
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-username">{student.fullName || 'Student'}</span>
              <span className="sidebar-userid">{student.studentId || 'N/A'}</span>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="portal-main">
        <div className="portal-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="portal-user">
            <span className="portal-avatar">
              {student.fullName?.charAt(0) || 'S'}
            </span>
            <div>
              <strong>{student.fullName || 'Student'}</strong>
              <span>{student.studentId || 'N/A'}</span>
            </div>
          </div>
        </div>
        <div className="portal-content">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'account' && renderAccount()}
          {activeTab === 'grades' && renderGrades()}
          {activeTab === 'profile' && renderProfile()}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
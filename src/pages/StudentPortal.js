import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaGraduationCap,
  FaBookOpen,
  FaClock,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaArrowRight,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaDownload,
  FaPrint,
  FaUserGraduate,
  FaChartLine,
  FaAward,
  FaTasks,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaCreditCard,
  FaFileAlt,
  FaAddressCard,
  FaEdit,
  FaSave,
  FaLock,
  FaUnlock,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaCalendarCheck,
  FaHistory,
  FaStar,
  FaUsers,
  FaChalkboardTeacher,
  FaLaptop,
  FaHome,
  FaBullhorn,
  FaClipboardList,
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import {
  getCurrentUser,
  getUserProfile,
  getStudentByEmail,
  getStudentByStudentId,
  updateStudent,
  logoutUser,
  updateStudentPassword
} from '../services/firebaseService';
import './StudentPortal.css';

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showNotifications, setShowNotifications] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load student data from Firebase
  useEffect(() => {
    const loadStudentData = async () => {
      setIsLoading(true);
      setError('');

      try {
        // Get current user from Firebase Auth
        const user = await getCurrentUser();
        
        if (!user) {
          navigate('/student/login');
          return;
        }

        // Get user profile from Firestore
        const profile = await getUserProfile(user.uid);
        
        if (!profile) {
          setError('Student profile not found. Please contact support.');
          setIsLoading(false);
          return;
        }

        // Check if user is a student
        if (profile.role && profile.role !== 'student') {
          setError('Access denied. Student portal is for students only.');
          setIsLoading(false);
          return;
        }

        // Get student data by email or student ID
        let student = null;
        
        if (profile.email) {
          student = await getStudentByEmail(profile.email);
        }
        
        if (!student && profile.studentId) {
          student = await getStudentByStudentId(profile.studentId);
        }

        if (!student) {
          student = {
            id: user.uid,
            studentId: profile.studentId || user.uid,
            fullName: profile.fullName || profile.name || 'Student',
            email: profile.email || user.email,
            phone: profile.phone || '',
            address: profile.address || '',
            dateOfBirth: profile.dateOfBirth || '',
            gender: profile.gender || '',
            emergencyContact: profile.emergencyContact || '',
            emergencyPhone: profile.emergencyPhone || '',
            course: profile.course || 'Not assigned',
            enrolledCourses: profile.enrolledCourses || [],
            paymentHistory: profile.paymentHistory || [],
            attendance: profile.attendance || { total: 0, present: 0, absent: 0, percentage: 0 },
            notifications: profile.notifications || [],
            achievements: profile.achievements || [],
            upcomingEvents: profile.upcomingEvents || [],
            admissionStatus: profile.admissionStatus || 'approved',
            serialNumber: profile.serialNumber || '',
            applicationDate: profile.applicationDate || new Date().toISOString(),
            passwordUpdated: profile.passwordUpdated || false
          };
        }

        // Ensure the course is set
        if (!student.course || student.course === 'Not specified') {
          student.course = profile.course || 'Not assigned';
        }

        setStudentData(student);
        setProfileData({
          fullName: student.fullName || '',
          email: student.email || '',
          phone: student.phone || '',
          address: student.address || '',
          dateOfBirth: student.dateOfBirth || '',
          gender: student.gender || '',
          emergencyContact: student.emergencyContact || '',
          emergencyPhone: student.emergencyPhone || ''
        });

      } catch (error) {
        console.error('Error loading student data:', error);
        setError('Error loading your data. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, [navigate]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!/[A-Z]/.test(passwordData.newPassword)) {
      setError('Password must include at least one uppercase letter.');
      return;
    }

    if (!/[0-9]/.test(passwordData.newPassword)) {
      setError('Password must include at least one number.');
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
      setError('Password must include at least one special character.');
      return;
    }

    try {
      await updateStudentPassword(studentData.id, passwordData.newPassword);
      setSuccess('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setShowPasswordChange(false);
        setSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Error updating password. Please try again.');
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await updateStudent(studentData.id, {
        fullName: profileData.fullName,
        phone: profileData.phone,
        address: profileData.address,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        emergencyContact: profileData.emergencyContact,
        emergencyPhone: profileData.emergencyPhone,
        updatedAt: new Date().toISOString()
      });

      setStudentData({
        ...studentData,
        fullName: profileData.fullName,
        phone: profileData.phone,
        address: profileData.address,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        emergencyContact: profileData.emergencyContact,
        emergencyPhone: profileData.emergencyPhone
      });

      setSuccess('Profile updated successfully!');
      setEditingProfile(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/student/login');
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Error logging out. Please try again.');
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi Fast Multimedia Institute! I need assistance with my student portal.`;
    window.open(`https://wa.me/233505159131?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="student-portal-loading">
        <div className="loading-spinner">
          <FaSpinner className="spinner" />
        </div>
        <p>Loading your portal...</p>
      </div>
    );
  }

  if (error && !studentData) {
    return (
      <div className="student-portal-error">
        <div className="error-container">
          <FaExclamationTriangle className="error-icon" />
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Retry
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Get the student's single course
  const getStudentCourse = () => {
    // If student has enrolled courses array, get the first one
    if (studentData?.enrolledCourses && studentData.enrolledCourses.length > 0) {
      const course = studentData.enrolledCourses[0];
      return {
        id: course.id || 'course-1',
        name: course.name || studentData.course || 'Not assigned',
        progress: course.progress || 0,
        grade: course.grade || 'N/A',
        instructor: course.instructor || 'Not assigned yet',
        status: course.status || 'active',
        startDate: course.startDate || studentData.applicationDate || new Date().toISOString().split('T')[0],
        endDate: course.endDate || 'In Progress',
        assignments: course.assignments || []
      };
    }
    
    // If only course field exists
    if (studentData?.course && studentData.course !== 'Not specified' && studentData.course !== 'Not assigned') {
      return {
        id: 'course-1',
        name: studentData.course,
        progress: 0,
        grade: 'N/A',
        instructor: 'Not assigned yet',
        status: 'active',
        startDate: studentData.applicationDate || new Date().toISOString().split('T')[0],
        endDate: 'In Progress',
        assignments: []
      };
    }
    
    // No course assigned
    return null;
  };

  const studentCourse = getStudentCourse();

  return (
    <div className="student-portal">
      {/* Header */}
      <div className="portal-header">
        <div className="container">
          <div className="header-content">
            <div className="user-greeting">
              <div className="user-avatar-large">
                {studentData?.fullName?.charAt(0) || 'S'}
              </div>
              <div>
                <h1>Welcome back, {studentData?.fullName?.split(' ')[0] || 'Student'}!</h1>
                <p className="student-id">
                  <FaIdCard /> Student ID: <strong>{studentData?.studentId || studentData?.id}</strong>
                </p>
                <p className="student-course">
                  <FaBookOpen /> Course: <strong className="course-name-highlight">{studentData?.course || 'Not assigned'}</strong>
                </p>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FaBell />
                {studentData?.notifications?.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {studentData.notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button className="help-btn" onClick={handleWhatsAppClick}>
                <FaWhatsapp /> Help
              </button>
              <button className="logout-btn-header" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button className="mark-all-read">Mark all as read</button>
          </div>
          {studentData?.notifications?.map(notification => (
            <div key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}>
              <div className="notification-content">
                <h4>{notification.title}</h4>
                <p>{notification.message}</p>
                <span className="notification-date">{notification.date}</span>
              </div>
            </div>
          ))}
          {(!studentData?.notifications || studentData.notifications.length === 0) && (
            <div className="no-notifications">
              <p>No notifications yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="portal-tabs">
        <div className="container">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaHome /> Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
            onClick={() => setActiveTab('course')}
          >
            <FaBookOpen /> My Course
          </button>
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
        </div>
      </div>

      <div className="container">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            {/* Success/Error Messages */}
            {success && (
              <div className="alert alert-success">
                <FaCheckCircle /> {success}
              </div>
            )}
            {error && (
              <div className="alert alert-error">
                <FaTimesCircle /> {error}
              </div>
            )}

            {/* Student Info Card */}
            <div className="student-info-card">
              <h3><FaUserGraduate /> Student Information</h3>
              <div className="info-row">
                <span className="info-label">Student ID:</span>
                <span className="info-value">{studentData?.studentId || studentData?.id}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Course:</span>
                <span className="info-value course-name">
                  <FaBookOpen /> {studentData?.course || 'Not assigned'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Status:</span>
                <span className={`status-badge ${studentData?.admissionStatus || 'pending'}`}>
                  {studentData?.admissionStatus === 'approved' ? '✅ Approved' :
                   studentData?.admissionStatus === 'enrolled' ? '✅ Enrolled' :
                   studentData?.admissionStatus || 'Pending'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Application Date:</span>
                <span className="info-value">{new Date(studentData?.applicationDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Course Overview Card */}
            {studentCourse && (
              <div className="course-overview-card">
                <h3><FaBookOpen /> Your Course</h3>
                <div className="course-overview-content">
                  <div className="course-name-large">{studentCourse.name}</div>
                  <div className="course-meta">
                    <span><FaUserGraduate /> {studentCourse.instructor}</span>
                    <span><FaCalendarAlt /> Started: {studentCourse.startDate}</span>
                    <span><FaClock /> Status: {studentCourse.status}</span>
                  </div>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${studentCourse.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{studentCourse.progress}% Complete</span>
                  </div>
                  <button 
                    className="view-course-btn"
                    onClick={() => setActiveTab('course')}
                  >
                    View Course Details <FaArrowRight />
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-grid">
                <button className="action-btn" onClick={() => setActiveTab('course')}>
                  <FaBookOpen /> My Course
                </button>
                <button className="action-btn" onClick={handleWhatsAppClick}>
                  <FaWhatsapp /> Contact Support
                </button>
                <button className="action-btn" onClick={() => setActiveTab('profile')}>
                  <FaUser /> Update Profile
                </button>
                <button className="action-btn" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Course Tab - Shows only the student's single course */}
        {activeTab === 'course' && (
          <div className="courses-content">
            <h2>My Course</h2>
            {studentCourse ? (
              <div className="course-card-detailed single-course">
                <div className="course-header">
                  <h3>{studentCourse.name}</h3>
                  <span className={`course-status ${studentCourse.status || 'active'}`}>
                    {studentCourse.status || 'Active'}
                  </span>
                </div>
                <div className="course-details">
                  <p><FaUserGraduate /> Instructor: {studentCourse.instructor || 'Not assigned'}</p>
                  <p><FaCalendarAlt /> Start Date: {studentCourse.startDate || 'Pending'}</p>
                  <p><FaCalendarCheck /> End Date: {studentCourse.endDate || 'In Progress'}</p>
                  <p><FaStar /> Grade: {studentCourse.grade || 'N/A'}</p>
                </div>
                <div className="course-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${studentCourse.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{studentCourse.progress}% Complete</span>
                </div>
                <div className="course-assignments">
                  <h4>Assignments</h4>
                  {studentCourse.assignments && studentCourse.assignments.length > 0 ? (
                    studentCourse.assignments.map((assignment, idx) => (
                      <div key={idx} className="assignment-item">
                        <span className="assignment-title">{assignment.title}</span>
                        <span className={`assignment-status ${assignment.status === 'submitted' ? 'status-submitted' : 'status-pending'}`}>
                          {assignment.status || 'pending'}
                        </span>
                        <span className="assignment-grade">{assignment.grade ? `${assignment.grade}%` : '—'}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-assignments">No assignments available yet.</p>
                  )}
                </div>
                <div className="course-support">
                  <h4>Need Help?</h4>
                  <button className="support-btn" onClick={handleWhatsAppClick}>
                    <FaWhatsapp /> Contact Your Instructor
                  </button>
                </div>
              </div>
            ) : (
              <div className="no-course-message">
                <FaBookOpen className="no-course-icon" />
                <h3>No Course Assigned Yet</h3>
                <p>Your course will be assigned upon admission approval.</p>
                <p className="contact-support-text">
                  If you believe this is an error, please contact support.
                </p>
                <button className="support-btn" onClick={handleWhatsAppClick}>
                  <FaWhatsapp /> Contact Support
                </button>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-content">
            <div className="profile-header">
              <h2>My Profile</h2>
              <button 
                className="edit-profile-btn"
                onClick={() => setEditingProfile(!editingProfile)}
              >
                {editingProfile ? <FaSave /> : <FaEdit />} 
                {editingProfile ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            {success && (
              <div className="alert alert-success">
                <FaCheckCircle /> {success}
              </div>
            )}
            {error && (
              <div className="alert alert-error">
                <FaTimesCircle /> {error}
              </div>
            )}

            {!editingProfile ? (
              <div className="profile-display">
                <div className="profile-section">
                  <h3><FaUser /> Personal Information</h3>
                  <div className="profile-grid">
                    <div><strong>Student ID:</strong> {studentData?.studentId || studentData?.id}</div>
                    <div><strong>Full Name:</strong> {studentData?.fullName}</div>
                    <div><strong>Email:</strong> {studentData?.email}</div>
                    <div><strong>Phone:</strong> {studentData?.phone || 'N/A'}</div>
                    <div><strong>Date of Birth:</strong> {studentData?.dateOfBirth || 'N/A'}</div>
                    <div><strong>Gender:</strong> {studentData?.gender || 'N/A'}</div>
                    <div><strong>Address:</strong> {studentData?.address || 'N/A'}</div>
                    <div><strong>Course:</strong> <span className="course-highlight">{studentData?.course || 'Not assigned'}</span></div>
                  </div>
                </div>
                <div className="profile-section">
                  <h3><FaUsers /> Emergency Contact</h3>
                  <div className="profile-grid">
                    <div><strong>Name:</strong> {studentData?.emergencyContact || 'N/A'}</div>
                    <div><strong>Phone:</strong> {studentData?.emergencyPhone || 'N/A'}</div>
                  </div>
                </div>
                <div className="profile-section">
                  <h3><FaAward /> Achievements</h3>
                  <div className="achievements-grid">
                    {studentData?.achievements?.map((achievement, index) => (
                      <div key={index} className="achievement-card">
                        <span className="achievement-icon">{achievement.icon || '🏆'}</span>
                        <span className="achievement-title">{achievement.title}</span>
                        <span className="achievement-date">{achievement.date}</span>
                      </div>
                    ))}
                    {(!studentData?.achievements || studentData.achievements.length === 0) && (
                      <p className="no-achievements">No achievements yet. Keep learning!</p>
                    )}
                  </div>
                </div>
                <button 
                  className="change-password-btn"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                >
                  <FaLock /> Change Password
                </button>
              </div>
            ) : (
              <form className="profile-edit-form" onSubmit={handleProfileUpdate}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName || ''}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone || ''}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth || ''}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={profileData.gender || ''}
                      onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      value={profileData.address || ''}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <input
                      type="text"
                      value={profileData.emergencyContact || ''}
                      onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Phone</label>
                    <input
                      type="tel"
                      value={profileData.emergencyPhone || ''}
                      onChange={(e) => setProfileData({...profileData, emergencyPhone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    <FaSave /> Save Changes
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setEditingProfile(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Change Password Modal */}
            {showPasswordChange && (
              <div className="password-change-modal">
                <div className="modal-content">
                  <h3><FaLock /> Change Password</h3>
                  <form onSubmit={handlePasswordChange}>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        placeholder="Enter new password (min 8 characters)"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        placeholder="Confirm your new password"
                        required
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
                      <button type="submit" className="save-btn">Update Password</button>
                      <button type="button" className="cancel-btn" onClick={() => setShowPasswordChange(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="portal-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Fast Multimedia Institute. All rights reserved.</p>
          <div className="footer-links">
            <button onClick={handleWhatsAppClick}><FaWhatsapp /> Support</button>
            <button onClick={() => navigate('/')}><FaHome /> Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
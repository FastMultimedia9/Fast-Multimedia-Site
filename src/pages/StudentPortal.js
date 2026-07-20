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
  FaClipboardList
} from 'react-icons/fa';
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

  // Mock student data - In production, fetch from Firebase
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStudentData({
        id: 'STU-2026-001',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+233 24 123 4567',
        address: '123 Main Street, Accra, Ghana',
        dateOfBirth: '1995-05-15',
        gender: 'Male',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+233 24 765 4321',
        enrolledCourses: [
          {
            id: 'web-dev',
            name: 'Web Development',
            progress: 75,
            grade: 'A',
            instructor: 'Mr. Kwame Appiah',
            status: 'active',
            startDate: '2026-01-15',
            endDate: '2026-03-15',
            assignments: [
              { title: 'HTML Project', dueDate: '2026-02-01', status: 'submitted', grade: 85 },
              { title: 'CSS Project', dueDate: '2026-02-15', status: 'submitted', grade: 90 },
              { title: 'JavaScript Project', dueDate: '2026-03-01', status: 'pending', grade: null }
            ]
          },
          {
            id: 'graphic-design',
            name: 'Graphic Design',
            progress: 60,
            grade: 'B+',
            instructor: 'Ms. Abena Osei',
            status: 'active',
            startDate: '2026-01-15',
            endDate: '2026-03-15',
            assignments: [
              { title: 'Logo Design', dueDate: '2026-02-10', status: 'submitted', grade: 88 },
              { title: 'Poster Design', dueDate: '2026-02-28', status: 'pending', grade: null }
            ]
          }
        ],
        paymentHistory: [
          { id: 'PAY-001', amount: 600, date: '2026-01-10', status: 'completed', method: 'Mobile Money' },
          { id: 'PAY-002', amount: 400, date: '2026-02-10', status: 'completed', method: 'Mobile Money' }
        ],
        attendance: {
          total: 20,
          present: 18,
          absent: 2,
          percentage: 90
        },
        notifications: [
          { id: 1, title: 'Assignment Due Soon', message: 'JavaScript project is due on March 1st', date: '2026-02-20', read: false },
          { id: 2, title: 'Payment Reminder', message: 'Your next installment of GH₵ 400 is due on March 10th', date: '2026-02-25', read: false },
          { id: 3, title: 'Class Schedule Update', message: 'Web Development class rescheduled to 3:00 PM', date: '2026-02-18', read: true }
        ],
        achievements: [
          { title: 'First Assignment Submitted', icon: '📝', date: '2026-01-20' },
          { title: 'Perfect Attendance Week', icon: '⭐', date: '2026-02-05' },
          { title: 'Top Performer in Web Dev', icon: '🏆', date: '2026-02-15' }
        ],
        upcomingEvents: [
          { title: 'Web Development Workshop', date: '2026-03-05', time: '2:00 PM - 4:00 PM' },
          { title: 'Career Guidance Session', date: '2026-03-10', time: '10:00 AM - 12:00 PM' }
        ]
      });
      setIsLoading(false);
    }, 1500);
  }, []);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // In production, call Firebase to update password
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In production, update Firebase
    setStudentData({ ...studentData, ...profileData });
    setEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleWhatsAppClick = () => {
    const message = `Hi Fast Multimedia Institute! I need assistance with my student portal.`;
    window.open(`https://wa.me/233505159131?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'failed': return 'status-failed';
      default: return '';
    }
  };

  const getAssignmentStatusColor = (status) => {
    switch(status) {
      case 'submitted': return 'status-submitted';
      case 'pending': return 'status-pending';
      case 'graded': return 'status-graded';
      default: return '';
    }
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
                <p className="student-id">Student ID: {studentData?.id}</p>
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
            className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <FaBookOpen /> My Courses
          </button>
          <button 
            className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <FaCreditCard /> Payments
          </button>
          <button 
            className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            <FaCalendarCheck /> Attendance
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
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon blue">
                  <FaBookOpen />
                </div>
                <div className="stat-info">
                  <h3>{studentData?.enrolledCourses?.length || 0}</h3>
                  <p>Active Courses</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">
                  <FaTasks />
                </div>
                <div className="stat-info">
                  <h3>5</h3>
                  <p>Assignments Completed</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon gold">
                  <FaAward />
                </div>
                <div className="stat-info">
                  <h3>3</h3>
                  <p>Achievements</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon purple">
                  <FaChartLine />
                </div>
                <div className="stat-info">
                  <h3>{studentData?.attendance?.percentage || 0}%</h3>
                  <p>Attendance Rate</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-grid">
                <button className="action-btn" onClick={() => setActiveTab('courses')}>
                  <FaBookOpen /> View Courses
                </button>
                <button className="action-btn" onClick={() => setActiveTab('payments')}>
                  <FaCreditCard /> Make Payment
                </button>
                <button className="action-btn" onClick={handleWhatsAppClick}>
                  <FaWhatsapp /> Contact Support
                </button>
                <button className="action-btn" onClick={() => setActiveTab('profile')}>
                  <FaUser /> Update Profile
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {studentData?.notifications?.slice(0, 3).map(notification => (
                  <div key={notification.id} className="activity-item">
                    <div className="activity-icon">
                      {notification.read ? <FaCheckCircle /> : <FaBell />}
                    </div>
                    <div className="activity-content">
                      <h4>{notification.title}</h4>
                      <p>{notification.message}</p>
                      <span className="activity-date">{notification.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="upcoming-events">
              <h2>Upcoming Events</h2>
              <div className="events-list">
                {studentData?.upcomingEvents?.map((event, index) => (
                  <div key={index} className="event-card">
                    <div className="event-date">
                      <span className="event-day">{new Date(event.date).getDate()}</span>
                      <span className="event-month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p><FaClock /> {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="courses-content">
            <h2>My Courses</h2>
            <div className="courses-grid">
              {studentData?.enrolledCourses?.map((course, index) => (
                <div key={index} className="course-card-detailed">
                  <div className="course-header">
                    <h3>{course.name}</h3>
                    <span className={`course-status ${course.status}`}>{course.status}</span>
                  </div>
                  <div className="course-details">
                    <p><FaUserGraduate /> Instructor: {course.instructor}</p>
                    <p><FaCalendarAlt /> {course.startDate} - {course.endDate}</p>
                    <p><FaStar /> Grade: {course.grade || 'N/A'}</p>
                  </div>
                  <div className="course-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="progress-text">{course.progress}% Complete</span>
                  </div>
                  <div className="course-assignments">
                    <h4>Assignments</h4>
                    {course.assignments.map((assignment, idx) => (
                      <div key={idx} className="assignment-item">
                        <span className="assignment-title">{assignment.title}</span>
                        <span className={`assignment-status ${getAssignmentStatusColor(assignment.status)}`}>
                          {assignment.status}
                        </span>
                        <span className="assignment-grade">{assignment.grade ? `${assignment.grade}%` : '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="payments-content">
            <div className="payments-header">
              <h2>Payment History</h2>
              <button className="make-payment-btn">
                <FaCreditCard /> Make Payment
              </button>
            </div>
            <div className="payments-table">
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData?.paymentHistory?.map(payment => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>GH₵ {payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>{payment.method}</td>
                      <td>
                        <span className={`payment-status ${getPaymentStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="attendance-content">
            <h2>Attendance Record</h2>
            <div className="attendance-summary">
              <div className="attendance-stat">
                <span className="stat-label">Total Classes</span>
                <span className="stat-value">{studentData?.attendance?.total || 0}</span>
              </div>
              <div className="attendance-stat present">
                <span className="stat-label">Present</span>
                <span className="stat-value">{studentData?.attendance?.present || 0}</span>
              </div>
              <div className="attendance-stat absent">
                <span className="stat-label">Absent</span>
                <span className="stat-value">{studentData?.attendance?.absent || 0}</span>
              </div>
              <div className="attendance-stat percentage">
                <span className="stat-label">Attendance Rate</span>
                <span className="stat-value">{studentData?.attendance?.percentage || 0}%</span>
              </div>
            </div>
            <div className="attendance-chart-placeholder">
              <p>Attendance chart will be displayed here</p>
            </div>
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

            {!editingProfile ? (
              <div className="profile-display">
                <div className="profile-section">
                  <h3><FaUser /> Personal Information</h3>
                  <div className="profile-grid">
                    <div><strong>Full Name:</strong> {studentData?.fullName}</div>
                    <div><strong>Email:</strong> {studentData?.email}</div>
                    <div><strong>Phone:</strong> {studentData?.phone}</div>
                    <div><strong>Date of Birth:</strong> {studentData?.dateOfBirth}</div>
                    <div><strong>Gender:</strong> {studentData?.gender}</div>
                    <div><strong>Address:</strong> {studentData?.address}</div>
                  </div>
                </div>
                <div className="profile-section">
                  <h3><FaUsers /> Emergency Contact</h3>
                  <div className="profile-grid">
                    <div><strong>Name:</strong> {studentData?.emergencyContact}</div>
                    <div><strong>Phone:</strong> {studentData?.emergencyPhone}</div>
                  </div>
                </div>
                <div className="profile-section">
                  <h3><FaAward /> Achievements</h3>
                  <div className="achievements-grid">
                    {studentData?.achievements?.map((achievement, index) => (
                      <div key={index} className="achievement-card">
                        <span className="achievement-icon">{achievement.icon}</span>
                        <span className="achievement-title">{achievement.title}</span>
                        <span className="achievement-date">{achievement.date}</span>
                      </div>
                    ))}
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
                      value={profileData.fullName || studentData?.fullName || ''}
                      onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={profileData.email || studentData?.email || ''}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone || studentData?.phone || ''}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth || studentData?.dateOfBirth || ''}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={profileData.gender || studentData?.gender || ''}
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
                      value={profileData.address || studentData?.address || ''}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Contact</label>
                    <input
                      type="text"
                      value={profileData.emergencyContact || studentData?.emergencyContact || ''}
                      onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Emergency Phone</label>
                    <input
                      type="tel"
                      value={profileData.emergencyPhone || studentData?.emergencyPhone || ''}
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
                      <label>Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        required
                      />
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
          <p>© 2026 Fast Multimedia Institute. All rights reserved.</p>
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
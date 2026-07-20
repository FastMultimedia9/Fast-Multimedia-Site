import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaGraduationCap,
  FaMoneyBillWave,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaSearch,
  FaFilter,
  FaDownload,
  FaPrint,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserCheck,
  FaUserTimes,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaChartLine,
  FaTrophy,
  FaBookOpen,
  FaUniversity,
  FaUserGraduate,
  FaUserTie,
  FaBuilding,
  FaClipboardList,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaArrowRight,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaShieldAlt,
  FaHome, // <-- REPLACED FaDashboard with FaHome
  FaUsersCog,
  FaCreditCard,
  FaIdCard,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaUpload,
  FaDownload as FaDownloadIcon,
  FaChartPie // <-- Alternative for dashboard
} from 'react-icons/fa';
import {
  getAllStudents,
  getStudentByEmail,
  updateStudent,
  getAllAdmissions,
  updateAdmissionStatus,
  getAllPayments,
  getDashboardStats,
  sendNotification,
  getAllStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  getStudentsByAdmissionStatus,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  generateSerialNumber,
  getAllSerials
} from '../services/firebaseService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [courses, setCourses] = useState([]);
  const [serials, setSerials] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notification, setNotification] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [staffData, setStaffData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'instructor',
    department: '',
    hireDate: ''
  });
  const [courseData, setCourseData] = useState({
    name: '',
    code: '',
    description: '',
    duration: '',
    price: '',
    department: '',
    maxStudents: 50
  });
  const [editFormData, setEditFormData] = useState({});
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsData, studentsData, admissionsData, paymentsData, staffData, coursesData, serialsData] = await Promise.all([
        getDashboardStats(),
        getAllStudents(),
        getAllAdmissions(),
        getAllPayments(),
        getAllStaff(),
        getAllCourses(),
        getAllSerials()
      ]);
      
      setStats(statsData);
      setStudents(studentsData || []);
      setAdmissions(admissionsData || []);
      setPayments(paymentsData || []);
      setStaff(staffData || []);
      setCourses(coursesData || []);
      setSerials(serialsData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      showNotification('Error loading dashboard data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle student admission status update
  const handleUpdateAdmissionStatus = async (studentId, status) => {
    try {
      await updateStudent(studentId, { admissionStatus: status });
      await updateAdmissionStatus(studentId, status);
      
      await sendNotification({
        userId: studentId,
        title: 'Admission Status Updated',
        message: `Your admission status has been updated to ${status}`,
        type: 'admission'
      });
      
      showNotification(`Student admission status updated to ${status}`, 'success');
      loadDashboardData();
    } catch (error) {
      console.error('Error updating admission status:', error);
      showNotification('Error updating admission status', 'error');
    }
  };

  // Handle student deletion
  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(studentId);
        showNotification('Student deleted successfully', 'success');
        loadDashboardData();
      } catch (error) {
        console.error('Error deleting student:', error);
        showNotification('Error deleting student', 'error');
      }
    }
  };

  // Handle staff creation
  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      await createStaff(staffData);
      showNotification('Staff created successfully', 'success');
      setShowAddStaffModal(false);
      setStaffData({
        fullName: '',
        email: '',
        phone: '',
        role: 'instructor',
        department: '',
        hireDate: ''
      });
      loadDashboardData();
    } catch (error) {
      console.error('Error creating staff:', error);
      showNotification('Error creating staff', 'error');
    }
  };

  // Handle course creation
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await createCourse(courseData);
      showNotification('Course created successfully', 'success');
      setShowAddCourseModal(false);
      setCourseData({
        name: '',
        code: '',
        description: '',
        duration: '',
        price: '',
        department: '',
        maxStudents: 50
      });
      loadDashboardData();
    } catch (error) {
      console.error('Error creating course:', error);
      showNotification('Error creating course', 'error');
    }
  };

  // Export data to CSV
  const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) {
      showNotification('No data to export', 'warning');
      return;
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully', 'success');
  };

  // Filter students
  const getFilteredStudents = () => {
    let filtered = students;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.fullName?.toLowerCase().includes(query) ||
        s.email?.toLowerCase().includes(query) ||
        s.studentId?.toLowerCase().includes(query)
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.admissionStatus === filterStatus);
    }
    
    return filtered;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      case 'enrolled': return 'status-enrolled';
      default: return 'status-default';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <FaCheckCircle />;
      case 'pending': return <FaClock />;
      case 'rejected': return <FaTimesCircle />;
      case 'enrolled': return <FaGraduationCap />;
      default: return <FaInfoCircle />;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="loading-spinner">
          <FaSpinner className="spinner" />
        </div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Render different tabs
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'students':
        return renderStudents();
      case 'admissions':
        return renderAdmissions();
      case 'payments':
        return renderPayments();
      case 'staff':
        return renderStaff();
      case 'courses':
        return renderCourses();
      case 'serials':
        return renderSerials();
      case 'reports':
        return renderReports();
      default:
        return renderDashboard();
    }
  };

  // Render Dashboard
  const renderDashboard = () => (
    <div className="dashboard-content">
      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats?.totalStudents || 0}</h3>
            <p>Total Students</p>
            <div className="stat-change positive">
              <FaArrowRight /> +12% this month
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <FaUserCheck />
          </div>
          <div className="stat-info">
            <h3>{stats?.approvedStudents || 0}</h3>
            <p>Approved Students</p>
            <div className="stat-change positive">
              <FaArrowRight /> +5% this month
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>{stats?.pendingStudents || 0}</h3>
            <p>Pending Applications</p>
            <div className="stat-change neutral">
              <FaArrowRight /> Awaiting review
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">
            <FaMoneyBillWave />
          </div>
          <div className="stat-info">
            <h3>GH₵ {stats?.totalRevenue?.toLocaleString() || 0}</h3>
            <p>Total Revenue</p>
            <div className="stat-change positive">
              <FaArrowRight /> +8% this month
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <FaUserTimes />
          </div>
          <div className="stat-info">
            <h3>{stats?.rejectedStudents || 0}</h3>
            <p>Rejected Applications</p>
            <div className="stat-change neutral">
              <FaArrowRight /> Needs attention
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon teal">
            <FaGraduationCap />
          </div>
          <div className="stat-info">
            <h3>{stats?.enrolledStudents || 0}</h3>
            <p>Enrolled Students</p>
            <div className="stat-change positive">
              <FaArrowRight /> +3% this month
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <button className="action-btn" onClick={() => setActiveTab('students')}>
            <FaUserPlus /> Manage Students
          </button>
          <button className="action-btn" onClick={() => setActiveTab('admissions')}>
            <FaClipboardList /> Review Applications
          </button>
          <button className="action-btn" onClick={() => setShowAddStaffModal(true)}>
            <FaUserTie /> Add Staff
          </button>
          <button className="action-btn" onClick={() => setShowAddCourseModal(true)}>
            <FaBookOpen /> Add Course
          </button>
          <button className="action-btn" onClick={() => setActiveTab('reports')}>
            <FaChartLine /> View Reports
          </button>
          <button className="action-btn" onClick={() => setActiveTab('serials')}>
            <FaFileAlt /> View Serials
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {students?.slice(0, 5).map((student, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {student.admissionStatus === 'approved' ? <FaCheckCircle className="green" /> :
                 student.admissionStatus === 'pending' ? <FaClock className="orange" /> :
                 <FaTimesCircle className="red" />}
              </div>
              <div className="activity-content">
                <h4>{student.fullName}</h4>
                <p>Application {student.admissionStatus || 'pending'}</p>
                <span className="activity-date">{new Date(student.createdAt?.seconds * 1000).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Students
  const renderStudents = () => (
    <div className="students-content">
      <div className="content-header">
        <h2>Student Management</h2>
        <div className="header-actions">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="enrolled">Enrolled</option>
          </select>
          <button className="export-btn" onClick={() => exportToCSV(getFilteredStudents(), 'students')}>
            <FaDownloadIcon /> Export
          </button>
        </div>
      </div>

      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredStudents().map((student) => (
              <tr key={student.id}>
                <td><strong>{student.studentId || 'N/A'}</strong></td>
                <td>{student.fullName}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course || student.enrolledCourses?.[0] || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${getStatusColor(student.admissionStatus)}`}>
                    {getStatusIcon(student.admissionStatus)} {student.admissionStatus || 'pending'}
                  </span>
                </td>
                <td>{new Date(student.createdAt?.seconds * 1000).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn-icon view"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowStudentModal(true);
                      }}
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn-icon edit"
                      onClick={() => {
                        setEditingStudent(student);
                        setEditFormData(student);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="action-btn-icon delete"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Admissions
  const renderAdmissions = () => (
    <div className="admissions-content">
      <div className="content-header">
        <h2>Admission Management</h2>
        <div className="header-actions">
          <button className="export-btn" onClick={() => exportToCSV(admissions, 'admissions')}>
            <FaDownloadIcon /> Export
          </button>
        </div>
      </div>

      <div className="admissions-grid">
        {admissions.map((admission) => (
          <div key={admission.id} className="admission-card">
            <div className="admission-header">
              <div className="admission-user">
                <div className="user-avatar">
                  {admission.fullName?.charAt(0) || 'A'}
                </div>
                <div>
                  <h4>{admission.fullName}</h4>
                  <p>{admission.email}</p>
                </div>
              </div>
              <span className={`status-badge ${getStatusColor(admission.status)}`}>
                {getStatusIcon(admission.status)} {admission.status || 'pending'}
              </span>
            </div>
            <div className="admission-details">
              <p><FaPhone /> {admission.phone}</p>
              <p><FaCalendarAlt /> {new Date(admission.createdAt?.seconds * 1000).toLocaleDateString()}</p>
              <p><FaBookOpen /> {admission.course || 'Not specified'}</p>
            </div>
            <div className="admission-actions">
              <button
                className="btn-approve"
                onClick={() => handleUpdateAdmissionStatus(admission.id, 'approved')}
              >
                <FaCheck /> Approve
              </button>
              <button
                className="btn-enroll"
                onClick={() => handleUpdateAdmissionStatus(admission.id, 'enrolled')}
              >
                <FaGraduationCap /> Enroll
              </button>
              <button
                className="btn-reject"
                onClick={() => handleUpdateAdmissionStatus(admission.id, 'rejected')}
              >
                <FaTimesCircle /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Payments
  const renderPayments = () => (
    <div className="payments-content">
      <div className="content-header">
        <h2>Payment Management</h2>
        <div className="header-actions">
          <div className="date-range">
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            />
          </div>
          <button className="export-btn" onClick={() => exportToCSV(payments, 'payments')}>
            <FaDownloadIcon /> Export
          </button>
        </div>
      </div>

      <div className="payments-table">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.paymentId || payment.id}</td>
                <td>{payment.name || payment.studentName}</td>
                <td>GH₵ {payment.amount}</td>
                <td>{new Date(payment.createdAt?.seconds * 1000).toLocaleDateString()}</td>
                <td>{payment.method || 'Mobile Money'}</td>
                <td>
                  <span className={`status-badge ${payment.status === 'completed' ? 'status-approved' : 'status-pending'}`}>
                    {payment.status === 'completed' ? <FaCheckCircle /> : <FaClock />}
                    {payment.status || 'pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Staff
  const renderStaff = () => (
    <div className="staff-content">
      <div className="content-header">
        <h2>Staff Management</h2>
        <button className="add-btn" onClick={() => setShowAddStaffModal(true)}>
          <FaUserPlus /> Add Staff
        </button>
      </div>

      <div className="staff-grid">
        {staff.map((member) => (
          <div key={member.id} className="staff-card">
            <div className="staff-avatar">
              {member.fullName?.charAt(0) || 'S'}
            </div>
            <h4>{member.fullName}</h4>
            <p>{member.role || 'Staff'}</p>
            <p className="staff-department">{member.department || 'General'}</p>
            <div className="staff-contact">
              <p><FaEnvelope /> {member.email}</p>
              <p><FaPhone /> {member.phone}</p>
            </div>
            <div className="staff-actions">
              <button className="btn-edit-sm" onClick={() => {}}>
                <FaEdit /> Edit
              </button>
              <button className="btn-delete-sm" onClick={() => {}}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Courses
  const renderCourses = () => (
    <div className="courses-content">
      <div className="content-header">
        <h2>Course Management</h2>
        <button className="add-btn" onClick={() => setShowAddCourseModal(true)}>
          <FaPlus /> Add Course
        </button>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h3>{course.name}</h3>
              <span className="course-code">{course.code}</span>
            </div>
            <p className="course-description">{course.description}</p>
            <div className="course-details">
              <span><FaClock /> {course.duration || '2 Months'}</span>
              <span><FaMoneyBillWave /> GH₵ {course.price || '0'}</span>
              <span><FaUsers /> {course.enrolledStudents || 0}/{course.maxStudents || 50}</span>
            </div>
            <div className="course-actions">
              <button className="btn-edit-sm">Edit</button>
              <button className="btn-delete-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Serials
  const renderSerials = () => (
    <div className="serials-content">
      <div className="content-header">
        <h2>Serial Number Management</h2>
        <button className="add-btn" onClick={async () => {
          const serial = await generateSerialNumber();
          showNotification(`Serial generated: ${serial}`, 'success');
          loadDashboardData();
        }}>
          <FaPlus /> Generate Serial
        </button>
      </div>

      <div className="serials-table">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Owner</th>
              <th>Course</th>
              <th>Status</th>
              <th>Generated</th>
              <th>Used</th>
            </tr>
          </thead>
          <tbody>
            {serials.map((serial) => (
              <tr key={serial.id}>
                <td><strong>{serial.serial}</strong></td>
                <td>{serial.ownerName || serial.studentName || 'N/A'}</td>
                <td>{serial.courseName || serial.course || 'N/A'}</td>
                <td>
                  <span className={`status-badge ${serial.isUsed ? 'status-approved' : 'status-pending'}`}>
                    {serial.isUsed ? <FaCheckCircle /> : <FaClock />}
                    {serial.isUsed ? 'Used' : 'Available'}
                  </span>
                </td>
                <td>{new Date(serial.createdAt).toLocaleDateString()}</td>
                <td>{serial.usedAt ? new Date(serial.usedAt).toLocaleDateString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render Reports
  const renderReports = () => (
    <div className="reports-content">
      <h2>Reports & Analytics</h2>
      
      <div className="report-cards">
        <div className="report-card">
          <h3>Admission Statistics</h3>
          <div className="report-stats">
            <div className="report-stat">
              <span className="label">Total Applications</span>
              <span className="value">{stats?.totalApplications || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Approved</span>
              <span className="value green">{stats?.approvedStudents || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Pending</span>
              <span className="value orange">{stats?.pendingStudents || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Rejected</span>
              <span className="value red">{stats?.rejectedStudents || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Enrolled</span>
              <span className="value blue">{stats?.enrolledStudents || 0}</span>
            </div>
          </div>
        </div>

        <div className="report-card">
          <h3>Revenue Summary</h3>
          <div className="report-stats">
            <div className="report-stat">
              <span className="label">Total Revenue</span>
              <span className="value">GH₵ {stats?.totalRevenue?.toLocaleString() || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Pending Payments</span>
              <span className="value orange">GH₵ {stats?.pendingPayments?.toLocaleString() || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Total Payments</span>
              <span className="value">{payments.length}</span>
            </div>
            <div className="report-stat">
              <span className="label">Serial Numbers</span>
              <span className="value">{stats?.totalSerials || 0}</span>
            </div>
          </div>
        </div>

        <div className="report-card">
          <h3>Student Distribution</h3>
          <div className="report-stats">
            <div className="report-stat">
              <span className="label">Total Students</span>
              <span className="value">{stats?.totalStudents || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Total Staff</span>
              <span className="value">{stats?.totalStaff || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Total Courses</span>
              <span className="value">{stats?.totalCourses || 0}</span>
            </div>
            <div className="report-stat">
              <span className="label">Available Serials</span>
              <span className="value green">{stats?.availableSerials || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', icon: <FaHome />, label: 'Dashboard' },
    { id: 'students', icon: <FaUsers />, label: 'Students' },
    { id: 'admissions', icon: <FaClipboardList />, label: 'Admissions' },
    { id: 'payments', icon: <FaCreditCard />, label: 'Payments' },
    { id: 'staff', icon: <FaUserTie />, label: 'Staff' },
    { id: 'courses', icon: <FaBookOpen />, label: 'Courses' },
    { id: 'serials', icon: <FaFileAlt />, label: 'Serials' },
    { id: 'reports', icon: <FaChartLine />, label: 'Reports' }
  ];

  return (
    <div className="admin-dashboard">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
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
          <button className="nav-item logout" onClick={() => navigate('/admin/login')}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="admin-user">
            <span className="admin-avatar">A</span>
            <div>
              <strong>Administrator</strong>
              <span>admin@fastmultimedia.com</span>
            </div>
          </div>
        </div>
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div className="modal-overlay" onClick={() => setShowStudentModal(false)}>
          <div className="modal-content student-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowStudentModal(false)}>×</button>
            <div className="student-detail-header">
              <div className="student-avatar-large">
                {selectedStudent.fullName?.charAt(0) || 'S'}
              </div>
              <div>
                <h2>{selectedStudent.fullName}</h2>
                <p>{selectedStudent.studentId || 'Student ID not assigned'}</p>
              </div>
              <span className={`status-badge ${getStatusColor(selectedStudent.admissionStatus)}`}>
                {getStatusIcon(selectedStudent.admissionStatus)} {selectedStudent.admissionStatus || 'pending'}
              </span>
            </div>
            <div className="student-detail-body">
              <div className="detail-section">
                <h3>Personal Information</h3>
                <div className="detail-grid">
                  <div><strong>Email:</strong> {selectedStudent.email}</div>
                  <div><strong>Phone:</strong> {selectedStudent.phone}</div>
                  <div><strong>Date of Birth:</strong> {selectedStudent.dateOfBirth || 'N/A'}</div>
                  <div><strong>Gender:</strong> {selectedStudent.gender || 'N/A'}</div>
                  <div><strong>Address:</strong> {selectedStudent.address || 'N/A'}</div>
                  <div><strong>City:</strong> {selectedStudent.city || 'N/A'}</div>
                </div>
              </div>
              <div className="detail-section">
                <h3>Academic Information</h3>
                <div className="detail-grid">
                  <div><strong>Course:</strong> {selectedStudent.course || selectedStudent.enrolledCourses?.[0] || 'N/A'}</div>
                  <div><strong>Education Level:</strong> {selectedStudent.educationLevel || 'N/A'}</div>
                  <div><strong>Previous School:</strong> {selectedStudent.previousSchool || 'N/A'}</div>
                  <div><strong>Preferred Study Mode:</strong> {selectedStudent.preferredStudyMode || 'N/A'}</div>
                </div>
              </div>
              <div className="detail-section">
                <h3>Emergency Contact</h3>
                <div className="detail-grid">
                  <div><strong>Name:</strong> {selectedStudent.guardianName || selectedStudent.emergencyContact || 'N/A'}</div>
                  <div><strong>Phone:</strong> {selectedStudent.guardianPhone || selectedStudent.emergencyPhone || 'N/A'}</div>
                  <div><strong>Email:</strong> {selectedStudent.guardianEmail || 'N/A'}</div>
                </div>
              </div>
            </div>
            <div className="student-detail-actions">
              <button 
                className="btn-approve"
                onClick={() => {
                  handleUpdateAdmissionStatus(selectedStudent.id, 'approved');
                  setShowStudentModal(false);
                }}
              >
                <FaCheck /> Approve
              </button>
              <button 
                className="btn-enroll"
                onClick={() => {
                  handleUpdateAdmissionStatus(selectedStudent.id, 'enrolled');
                  setShowStudentModal(false);
                }}
              >
                <FaGraduationCap /> Enroll
              </button>
              <button 
                className="btn-reject"
                onClick={() => {
                  handleUpdateAdmissionStatus(selectedStudent.id, 'rejected');
                  setShowStudentModal(false);
                }}
              >
                <FaTimesCircle /> Reject
              </button>
              <button 
                className="btn-edit"
                onClick={() => {
                  setShowStudentModal(false);
                  setEditingStudent(selectedStudent);
                  setEditFormData(selectedStudent);
                  setShowEditModal(true);
                }}
              >
                <FaEdit /> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            <h2>Edit Student</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await updateStudent(editingStudent.id, editFormData);
                showNotification('Student updated successfully', 'success');
                setShowEditModal(false);
                loadDashboardData();
              } catch (error) {
                console.error('Error updating student:', error);
                showNotification('Error updating student', 'error');
              }
            }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editFormData.fullName || ''}
                    onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
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
                  <label>Admission Status</label>
                  <select
                    value={editFormData.admissionStatus || 'pending'}
                    onChange={(e) => setEditFormData({...editFormData, admissionStatus: e.target.value})}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="enrolled">Enrolled</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save"><FaSave /> Save Changes</button>
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="modal-overlay" onClick={() => setShowAddStaffModal(false)}>
          <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddStaffModal(false)}>×</button>
            <h2><FaUserTie /> Add Staff Member</h2>
            <form onSubmit={handleCreateStaff}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={staffData.fullName}
                    onChange={(e) => setStaffData({...staffData, fullName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={staffData.email}
                    onChange={(e) => setStaffData({...staffData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={staffData.phone}
                    onChange={(e) => setStaffData({...staffData, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={staffData.role}
                    onChange={(e) => setStaffData({...staffData, role: e.target.value})}
                  >
                    <option value="instructor">Instructor</option>
                    <option value="admin">Administrator</option>
                    <option value="manager">Manager</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={staffData.department}
                    onChange={(e) => setStaffData({...staffData, department: e.target.value})}
                    placeholder="e.g., IT, Design"
                  />
                </div>
                <div className="form-group">
                  <label>Hire Date</label>
                  <input
                    type="date"
                    value={staffData.hireDate}
                    onChange={(e) => setStaffData({...staffData, hireDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save"><FaUserPlus /> Add Staff</button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddStaffModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="modal-overlay" onClick={() => setShowAddCourseModal(false)}>
          <div className="modal-content add-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddCourseModal(false)}>×</button>
            <h2><FaBookOpen /> Add Course</h2>
            <form onSubmit={handleCreateCourse}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Course Name *</label>
                  <input
                    type="text"
                    value={courseData.name}
                    onChange={(e) => setCourseData({...courseData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    value={courseData.code}
                    onChange={(e) => setCourseData({...courseData, code: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={courseData.description}
                    onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                    placeholder="e.g., 2 Months"
                  />
                </div>
                <div className="form-group">
                  <label>Price (GH₵)</label>
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    value={courseData.department}
                    onChange={(e) => setCourseData({...courseData, department: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Max Students</label>
                  <input
                    type="number"
                    value={courseData.maxStudents}
                    onChange={(e) => setCourseData({...courseData, maxStudents: parseInt(e.target.value) || 50})}
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save"><FaPlus /> Create Course</button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddCourseModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
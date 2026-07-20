import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaFileAlt, 
  FaKey, 
  FaCheckCircle, 
  FaArrowRight,
  FaWhatsapp,
  FaInfoCircle,
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaGlobe,
  FaUser,
  FaMapMarkerAlt,
  FaBookOpen,
  FaGraduationCap,
  FaLock,
  FaUnlock,
  FaHome,
  FaBuilding,
  FaUserTie,
  FaUsers
} from 'react-icons/fa';
import { 
  verifySerial, 
  markSerialAsUsed, 
  saveApplication, 
  createStudent,
  sendNotification,
  updateApplicationStatus 
} from '../services/firebaseService';
import './ApplicationForm.css';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serialNumber, setSerialNumber] = useState('');
  const [isSerialValid, setIsSerialValid] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [serialError, setSerialError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    city: '',
    region: '',
    course: '',
    educationLevel: '',
    previousSchool: '',
    yearsCompleted: '',
    message: '',
    hearAbout: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalInfo: '',
    preferredStudyMode: 'online',
    hasLaptop: 'no',
    internetAccess: 'no',
    motivation: '',
    experience: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const whatsappNumber = '233505159131';

  const courses = [
    'Basic I.C.T & Office - GH₵ 600',
    'Graphic Design - GH₵ 750',
    'Web Development - GH₵ 800',
    'Networking Basics - GH₵ 650',
    'Full I.T Support - GH₵ 850'
  ];

  const educationLevels = ['JHS', 'SHS', 'Diploma', 'Degree', 'Masters', 'Other'];
  const genders = ['Male', 'Female', 'Other'];
  const regions = ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central', 'Volta', 'Northern', 'Upper East', 'Upper West', 'Bono', 'Ahafo', 'Bono East', 'Oti', 'Western North', 'Savannah', 'North East'];
  const hearAboutOptions = ['Social Media', 'Friend/Family', 'School', 'Church', 'Radio/TV', 'WhatsApp Group', 'Online Search', 'Other'];
  const studyModes = ['online', 'in-person', 'hybrid'];

  useEffect(() => {
    // Check if serial number was passed from admissions page
    const state = location.state;
    if (state && state.serialNumber) {
      setSerialNumber(state.serialNumber);
      // Auto-verify the serial
      handleAutoVerify(state.serialNumber);
    }
  }, [location]);

  const handleAutoVerify = async (serial) => {
    try {
      const result = await verifySerial(serial);
      if (result.valid) {
        setIsSerialValid(true);
        setFormStep(2);
      } else {
        setSerialError('Invalid serial number. Please check and try again.');
      }
    } catch (error) {
      console.error('Auto-verify error:', error);
      setSerialError('Error verifying serial number. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const verifySerialNumber = async () => {
    setIsVerifying(true);
    setSerialError('');

    try {
      const result = await verifySerial(serialNumber.toUpperCase());
      
      if (result.valid) {
        setIsSerialValid(true);
        setFormStep(2);
        setSerialError('');
      } else {
        setIsSerialValid(false);
        setSerialError('Invalid or already used serial number. Please check and try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setSerialError('Error verifying serial number. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare student data
      const studentData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        nationality: formData.nationality,
        address: formData.address,
        city: formData.city,
        region: formData.region,
        guardianName: formData.guardianName,
        guardianPhone: formData.guardianPhone,
        guardianEmail: formData.guardianEmail,
        emergencyContact: formData.emergencyContact,
        emergencyPhone: formData.emergencyPhone,
        medicalInfo: formData.medicalInfo,
        preferredStudyMode: formData.preferredStudyMode,
        hasLaptop: formData.hasLaptop,
        internetAccess: formData.internetAccess,
        enrolledCourses: [formData.course],
        status: 'pending',
        applicationStatus: 'applied'
      };

      // Create student record
      const studentId = await createStudent(studentData);

      // Save application
      const appId = await saveApplication({
        ...formData,
        serialNumber: serialNumber,
        applicationDate: new Date().toISOString(),
        status: 'pending',
        studentId: studentId,
        applicationType: 'new'
      });

      setApplicationId(appId);

      // Mark serial as used
      await markSerialAsUsed(serialNumber, formData.email, studentId);

      // Update application status
      await updateApplicationStatus(appId, 'submitted', 'Application submitted successfully');

      // Send notification
      await sendNotification({
        userId: formData.email,
        title: 'Application Submitted',
        message: `Your application has been submitted successfully. Application ID: ${appId}`,
        type: 'application',
        link: '/school/application-status'
      });

      // Send to WhatsApp
      const message = `ADMISSION APPLICATION\n\nSerial Number: ${serialNumber}\nApplication ID: ${appId}\nStudent ID: ${studentId}\n\nPersonal Information:\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDate of Birth: ${formData.dateOfBirth || 'Not provided'}\nGender: ${formData.gender || 'Not provided'}\nNationality: ${formData.nationality || 'Not provided'}\n\nAddress:\nAddress: ${formData.address || 'Not provided'}\nCity: ${formData.city || 'Not provided'}\nRegion: ${formData.region || 'Not provided'}\n\nAcademic Information:\nCourse: ${formData.course}\nEducation Level: ${formData.educationLevel || 'Not provided'}\nPrevious School: ${formData.previousSchool || 'Not provided'}\nYears Completed: ${formData.yearsCompleted || 'Not provided'}\n\nAdditional Information:\nHow did you hear about us? ${formData.hearAbout || 'Not provided'}\nPreferred Study Mode: ${formData.preferredStudyMode || 'Not provided'}\nHas Laptop: ${formData.hasLaptop || 'Not provided'}\nInternet Access: ${formData.internetAccess || 'Not provided'}\n\nMessage: ${formData.message || 'No additional message'}`;
    
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setSubmissionSuccess(true);
      setFormStep(3);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi Fast Multimedia Institute! I need help with my application.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const goToAdmissions = () => {
    navigate('/school/admissions');
  };

  return (
    <div className="application-form-page">
      {/* Header */}
      <div className="form-header">
        <div className="container">
          <h1>
            <FaFileAlt className="header-icon" />
            Admission Application Form
          </h1>
          <p>Complete your application to join Fast Multimedia Institute</p>
          <div className="form-progress">
            <div className={`progress-step ${formStep >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Verify Serial</span>
            </div>
            <div className={`progress-line ${formStep >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${formStep >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Fill Form</span>
            </div>
            <div className={`progress-line ${formStep >= 3 ? 'active' : ''}`}></div>
            <div className={`progress-step ${formStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Submit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Step 1: Serial Verification */}
        {formStep === 1 && (
          <div className="form-card verify-card">
            <div className="verify-icon">
              <FaKey />
            </div>
            <h2>Enter Your Serial Number</h2>
            <p className="verify-description">
              Enter the serial number you received after purchasing the admission form.
            </p>
            <div className="verify-input-group">
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                placeholder="e.g., FM-ADM-2026-001"
                className={serialError ? 'error' : ''}
                disabled={isSerialValid}
              />
              {serialError && <span className="error-message">{serialError}</span>}
            </div>
            <div className="verify-actions">
              <button
                className="verify-submit-btn"
                onClick={verifySerialNumber}
                disabled={!serialNumber || isVerifying || isSerialValid}
              >
                {isVerifying ? 'Verifying...' : <><FaUnlock /> Verify Serial</>}
              </button>
              <button
                className="buy-form-btn"
                onClick={goToAdmissions}
              >
                Don't have a serial? Buy Form
              </button>
            </div>
            <div className="verify-help">
              <FaInfoCircle /> Need help? <button className="help-link" onClick={handleWhatsAppClick}>Contact us on WhatsApp</button>
            </div>
          </div>
        )}

        {/* Step 2: Application Form */}
        {formStep === 2 && (
          <div className="form-card">
            <div className="form-success-badge">
              <FaCheckCircle /> Serial Verified: {serialNumber}
            </div>
            <h2>Fill Your Application</h2>
            <p className="form-description">
              Please fill in all required fields. We'll contact you within 24 hours.
            </p>

            <form className="application-form" onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div className="form-section">
                <h3><FaUser /> Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="024XXXXXXX"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Nationality</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      placeholder="e.g., Ghanaian"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="form-section">
                <h3><FaMapMarkerAlt /> Address Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House number and street"
                    />
                  </div>
                  <div className="form-group">
                    <label>City/Town</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g., Accra"
                    />
                  </div>
                  <div className="form-group">
                    <label>Region</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="form-section">
                <h3><FaUsers /> Guardian Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Guardian/Next of Kin</label>
                    <input
                      type="text"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleInputChange}
                      placeholder="Guardian's full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Guardian Phone</label>
                    <input
                      type="tel"
                      name="guardianPhone"
                      value={formData.guardianPhone}
                      onChange={handleInputChange}
                      placeholder="Guardian's phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Guardian Email</label>
                    <input
                      type="email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleInputChange}
                      placeholder="Guardian's email"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Emergency Contact</label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Emergency Phone</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      placeholder="Emergency contact phone"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="form-section">
                <h3><FaGraduationCap /> Academic Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Select Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a course</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Highest Education Level</label>
                    <select
                      name="educationLevel"
                      value={formData.educationLevel}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Education Level</option>
                      {educationLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Years Completed</label>
                    <input
                      type="number"
                      name="yearsCompleted"
                      value={formData.yearsCompleted}
                      onChange={handleInputChange}
                      placeholder="e.g., 3"
                      min="0"
                      max="20"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Previous School (if any)</label>
                    <input
                      type="text"
                      name="previousSchool"
                      value={formData.previousSchool}
                      onChange={handleInputChange}
                      placeholder="Name of previous school"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="form-section">
                <h3><FaInfoCircle /> Additional Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>How did you hear about us?</label>
                    <select
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an option</option>
                      {hearAboutOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Study Mode</label>
                    <select
                      name="preferredStudyMode"
                      value={formData.preferredStudyMode}
                      onChange={handleInputChange}
                    >
                      <option value="online">Online</option>
                      <option value="in-person">In-Person</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Do you have a laptop?</label>
                    <select
                      name="hasLaptop"
                      value={formData.hasLaptop}
                      onChange={handleInputChange}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Do you have internet access?</label>
                    <select
                      name="internetAccess"
                      value={formData.internetAccess}
                      onChange={handleInputChange}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Why do you want to join this course?</label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Tell us why you're interested in this course"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Any relevant experience?</label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Share any relevant experience you have"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>What are your career goals?</label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="What do you hope to achieve after completing this course?"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Medical Information (if any)</label>
                    <textarea
                      name="medicalInfo"
                      value={formData.medicalInfo}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Any medical conditions we should be aware of?"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any additional information or questions"
                    />
                  </div>
                </div>
              </div>

              <div className="form-note">
                <FaInfoCircle /> We'll contact you via WhatsApp within 24 hours with your application status.
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setFormStep(1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success */}
        {formStep === 3 && submissionSuccess && (
          <div className="form-card success-card">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2>Application Submitted Successfully!</h2>
            <p className="success-message">
              Thank you for applying to Fast Multimedia Institute. We have received your application and will review it within 24-48 hours.
            </p>
            <div className="success-details">
              <div className="detail-item">
                <FaKey /> Serial Number: <strong>{serialNumber}</strong>
              </div>
              <div className="detail-item">
                <FaUser /> Applicant: <strong>{formData.fullName}</strong>
              </div>
              <div className="detail-item">
                <FaBookOpen /> Course: <strong>{formData.course}</strong>
              </div>
              <div className="detail-item">
                <FaFileAlt /> Application ID: <strong>{applicationId}</strong>
              </div>
            </div>
            <div className="success-actions">
              <button
                className="whatsapp-success-btn"
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp /> Contact Us on WhatsApp
              </button>
              <button
                className="home-btn"
                onClick={() => navigate('/')}
              >
                <FaHome /> Go to Homepage
              </button>
            </div>
            <div className="success-note">
              <FaInfoCircle /> You will receive a confirmation email shortly. Please check your spam folder if you don't see it.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="form-footer">
        <div className="container">
          <p>Need help with your application? <button className="footer-help-btn" onClick={handleWhatsAppClick}><FaWhatsapp /> Chat with us</button></p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
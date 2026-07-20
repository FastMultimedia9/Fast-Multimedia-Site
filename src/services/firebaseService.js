import { 
  db, 
  auth, 
  storage,
  COLLECTIONS,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  addDoc,
  writeBatch,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from '../firebase';

// ============================================
// STUDENT MANAGEMENT
// ============================================

// Create a new student
export const createStudent = async (studentData) => {
  try {
    const studentId = studentData.studentId || `STU-${Date.now()}`;
    const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
    
    await setDoc(studentRef, {
      ...studentData,
      studentId: studentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'active',
      enrolledCourses: studentData.enrolledCourses || [],
      paymentHistory: studentData.paymentHistory || [],
      attendance: studentData.attendance || { total: 0, present: 0, absent: 0 },
      grades: studentData.grades || {},
      admissionStatus: studentData.admissionStatus || 'pending',
      passwordUpdated: studentData.passwordUpdated || false
    });
    
    return studentId;
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
};

// Get student by ID
export const getStudent = async (studentId) => {
  try {
    const docRef = doc(db, COLLECTIONS.STUDENTS, studentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting student:', error);
    throw error;
  }
};

// Get student by email
export const getStudentByEmail = async (email) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.STUDENTS),
      where('email', '==', email)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting student by email:', error);
    throw error;
  }
};

// Get all students with filters
export const getAllStudents = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.STUDENTS);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.course) {
      constraints.push(where('enrolledCourses', 'array-contains', filters.course));
    }
    
    if (filters.class) {
      constraints.push(where('class', '==', filters.class));
    }
    
    if (filters.admissionStatus) {
      constraints.push(where('admissionStatus', '==', filters.admissionStatus));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.STUDENTS), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const students = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (filters.search && !data.fullName.toLowerCase().includes(filters.search.toLowerCase())) {
        return;
      }
      students.push({ id: doc.id, ...data });
    });
    
    return students;
  } catch (error) {
    console.error('Error getting all students:', error);
    throw error;
  }
};

// Update student
export const updateStudent = async (studentId, updateData) => {
  try {
    const docRef = doc(db, COLLECTIONS.STUDENTS, studentId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Delete student
export const deleteStudent = async (studentId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.STUDENTS, studentId));
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Enroll student in course
export const enrollStudentInCourse = async (studentId, courseId, classId = null) => {
  try {
    const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
    await updateDoc(studentRef, {
      enrolledCourses: arrayUnion(courseId),
      class: classId || null,
      enrollmentDate: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error enrolling student:', error);
    throw error;
  }
};

// Get student attendance
export const getStudentAttendance = async (studentId, month = null) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ATTENDANCE),
      where('studentId', '==', studentId)
    );
    
    const snapshot = await getDocs(q);
    const records = [];
    snapshot.forEach(doc => {
      records.push({ id: doc.id, ...doc.data() });
    });
    
    return records;
  } catch (error) {
    console.error('Error getting student attendance:', error);
    throw error;
  }
};

// Get student grades
export const getStudentGrades = async (studentId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.GRADES),
      where('studentId', '==', studentId)
    );
    
    const snapshot = await getDocs(q);
    const grades = [];
    snapshot.forEach(doc => {
      grades.push({ id: doc.id, ...doc.data() });
    });
    
    return grades;
  } catch (error) {
    console.error('Error getting student grades:', error);
    throw error;
  }
};

// ============================================
// STAFF MANAGEMENT
// ============================================

// Create a new staff member
export const createStaff = async (staffData) => {
  try {
    const staffId = staffData.staffId || `STF-${Date.now()}`;
    const staffRef = doc(db, COLLECTIONS.STAFF, staffId);
    
    await setDoc(staffRef, {
      ...staffData,
      staffId: staffId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: staffData.status || 'active',
      assignedCourses: staffData.assignedCourses || [],
      departments: staffData.departments || []
    });
    
    return staffId;
  } catch (error) {
    console.error('Error creating staff:', error);
    throw error;
  }
};

// Get staff by ID
export const getStaff = async (staffId) => {
  try {
    const docRef = doc(db, COLLECTIONS.STAFF, staffId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting staff:', error);
    throw error;
  }
};

// Get all staff
export const getAllStaff = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.STAFF);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.department) {
      constraints.push(where('departments', 'array-contains', filters.department));
    }
    
    if (filters.role) {
      constraints.push(where('role', '==', filters.role));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.STAFF), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const staff = [];
    snapshot.forEach(doc => {
      staff.push({ id: doc.id, ...doc.data() });
    });
    
    return staff;
  } catch (error) {
    console.error('Error getting all staff:', error);
    throw error;
  }
};

// Update staff
export const updateStaff = async (staffId, updateData) => {
  try {
    const docRef = doc(db, COLLECTIONS.STAFF, staffId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

// Delete staff
export const deleteStaff = async (staffId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.STAFF, staffId));
    return true;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};

// ============================================
// ADMISSION MANAGEMENT
// ============================================

export const createAdmission = async (admissionData) => {
  try {
    const admissionId = admissionData.admissionId || `ADM-${Date.now()}`;
    const admissionRef = doc(db, COLLECTIONS.ADMISSIONS, admissionId);
    
    await setDoc(admissionRef, {
      ...admissionData,
      admissionId: admissionId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: admissionData.status || 'pending',
      documents: admissionData.documents || [],
      notes: admissionData.notes || []
    });
    
    return admissionId;
  } catch (error) {
    console.error('Error creating admission:', error);
    throw error;
  }
};

// Get admission by ID
export const getAdmission = async (admissionId) => {
  try {
    const docRef = doc(db, COLLECTIONS.ADMISSIONS, admissionId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting admission:', error);
    throw error;
  }
};

// Get admission by email
export const getAdmissionByEmail = async (email) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ADMISSIONS),
      where('email', '==', email)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting admission by email:', error);
    throw error;
  }
};

// Get admission by serial number
export const getAdmissionBySerial = async (serialNumber) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.ADMISSIONS),
      where('serialNumber', '==', serialNumber)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting admission by serial:', error);
    throw error;
  }
};

// Get all admissions with filters
export const getAllAdmissions = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.ADMISSIONS);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.course) {
      constraints.push(where('course', '==', filters.course));
    }
    
    if (filters.year) {
      constraints.push(where('year', '==', filters.year));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.ADMISSIONS), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const admissions = [];
    snapshot.forEach(doc => {
      admissions.push({ id: doc.id, ...doc.data() });
    });
    
    return admissions;
  } catch (error) {
    console.error('Error getting all admissions:', error);
    throw error;
  }
};

// Update admission status
export const updateAdmissionStatus = async (admissionId, status, notes = null) => {
  try {
    const docRef = doc(db, COLLECTIONS.ADMISSIONS, admissionId);
    const updateData = { 
      status: status,
      updatedAt: serverTimestamp()
    };
    
    if (notes) {
      updateData.notes = arrayUnion({
        text: notes,
        timestamp: new Date().toISOString()
      });
    }
    
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating admission status:', error);
    throw error;
  }
};

// ============================================
// ADMISSION STATUS CHECK FUNCTIONS (NEW)
// ============================================

// Get student admission status by email
export const getStudentAdmissionStatus = async (email) => {
  try {
    // Check if student exists
    const student = await getStudentByEmail(email);
    if (!student) {
      return {
        exists: false,
        status: null,
        message: 'Student not found. Please ensure you have completed your application.'
      };
    }

    // Check admission status
    const admission = await getAdmissionByEmail(email);
    if (!admission) {
      return {
        exists: true,
        status: student.admissionStatus || 'pending',
        message: 'Your application is pending review. Please wait for approval.',
        student: student
      };
    }

    const status = admission.status || student.admissionStatus || 'pending';
    const statusMessages = {
      pending: 'Your application is pending review. Please wait for approval.',
      approved: 'Your application has been approved! You can now log in.',
      rejected: 'Your application was not approved. Please contact admissions for more information.',
      enrolled: 'You are enrolled! Welcome to Fast Multimedia Institute.'
    };

    return {
      exists: true,
      status: status,
      message: statusMessages[status] || 'Application status unknown.',
      data: admission,
      student: student
    };
  } catch (error) {
    console.error('Error checking admission status:', error);
    return {
      exists: false,
      status: null,
      error: error.message,
      message: 'Error checking admission status. Please try again.'
    };
  }
};

// Get student with admission status
export const getStudentWithAdmissionStatus = async (email) => {
  try {
    const student = await getStudentByEmail(email);
    if (!student) {
      return null;
    }

    const admission = await getAdmissionByEmail(email);
    
    return {
      ...student,
      admission: admission || null,
      admissionStatus: admission?.status || student.admissionStatus || 'pending'
    };
  } catch (error) {
    console.error('Error getting student with admission status:', error);
    throw error;
  }
};

// Update student admission status
export const updateStudentAdmissionStatus = async (email, status, notes = null) => {
  try {
    // Find student by email
    const student = await getStudentByEmail(email);
    if (!student) {
      throw new Error('Student not found');
    }

    // Update student status
    await updateStudent(student.id, {
      admissionStatus: status,
      updatedAt: serverTimestamp()
    });

    // Update admission record
    const admission = await getAdmissionByEmail(email);
    if (admission) {
      await updateAdmissionStatus(admission.id, status, notes);
    }

    return true;
  } catch (error) {
    console.error('Error updating admission status:', error);
    throw error;
  }
};

// Get all students by admission status
export const getStudentsByAdmissionStatus = async (status) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.STUDENTS),
      where('admissionStatus', '==', status)
    );
    const snapshot = await getDocs(q);
    
    const students = [];
    snapshot.forEach(doc => {
      students.push({ id: doc.id, ...doc.data() });
    });
    
    return students;
  } catch (error) {
    console.error('Error getting students by admission status:', error);
    throw error;
  }
};

// ============================================
// PAYMENT MANAGEMENT
// ============================================

// Create payment record
export const createPayment = async (paymentData) => {
  try {
    const paymentId = paymentData.paymentId || `PAY-${Date.now()}`;
    const paymentRef = doc(db, COLLECTIONS.PAYMENTS, paymentId);
    
    await setDoc(paymentRef, {
      ...paymentData,
      paymentId: paymentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: paymentData.status || 'pending',
      receipt: paymentData.receipt || null
    });
    
    if (paymentData.studentId) {
      const studentRef = doc(db, COLLECTIONS.STUDENTS, paymentData.studentId);
      await updateDoc(studentRef, {
        paymentHistory: arrayUnion(paymentId),
        updatedAt: serverTimestamp()
      });
    }
    
    return paymentId;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
};

export const savePayment = createPayment;

// Get payment by ID
export const getPayment = async (paymentId) => {
  try {
    const docRef = doc(db, COLLECTIONS.PAYMENTS, paymentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting payment:', error);
    throw error;
  }
};

// Get payments by student
export const getPaymentsByStudent = async (studentId) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.PAYMENTS),
      where('studentId', '==', studentId),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    const payments = [];
    snapshot.forEach(doc => {
      payments.push({ id: doc.id, ...doc.data() });
    });
    
    return payments;
  } catch (error) {
    console.error('Error getting payments by student:', error);
    throw error;
  }
};

// Get all payments with filters
export const getAllPayments = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.PAYMENTS);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.paymentType) {
      constraints.push(where('paymentType', '==', filters.paymentType));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.PAYMENTS), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const payments = [];
    snapshot.forEach(doc => {
      payments.push({ id: doc.id, ...doc.data() });
    });
    
    return payments;
  } catch (error) {
    console.error('Error getting all payments:', error);
    throw error;
  }
};

// Update payment status
export const updatePaymentStatus = async (paymentId, status, receipt = null) => {
  try {
    const docRef = doc(db, COLLECTIONS.PAYMENTS, paymentId);
    const updateData = { 
      status: status,
      updatedAt: serverTimestamp()
    };
    
    if (receipt) {
      updateData.receipt = receipt;
    }
    
    if (status === 'completed') {
      updateData.completedAt = serverTimestamp();
    }
    
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};

// ============================================
// COURSE MANAGEMENT
// ============================================

// Create course
export const createCourse = async (courseData) => {
  try {
    const courseId = courseData.courseId || `CRS-${Date.now()}`;
    const courseRef = doc(db, COLLECTIONS.COURSES, courseId);
    
    await setDoc(courseRef, {
      ...courseData,
      courseId: courseId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: courseData.status || 'active',
      enrolledStudents: courseData.enrolledStudents || 0,
      maxStudents: courseData.maxStudents || 50
    });
    
    return courseId;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

// Get all courses
export const getAllCourses = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.COURSES);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.department) {
      constraints.push(where('department', '==', filters.department));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.COURSES), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const courses = [];
    snapshot.forEach(doc => {
      courses.push({ id: doc.id, ...doc.data() });
    });
    
    return courses;
  } catch (error) {
    console.error('Error getting all courses:', error);
    throw error;
  }
};

// Update course
export const updateCourse = async (courseId, updateData) => {
  try {
    const docRef = doc(db, COLLECTIONS.COURSES, courseId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

// ============================================
// CLASS MANAGEMENT
// ============================================

// Create class
export const createClass = async (classData) => {
  try {
    const classId = classData.classId || `CLS-${Date.now()}`;
    const classRef = doc(db, COLLECTIONS.CLASSES, classId);
    
    await setDoc(classRef, {
      ...classData,
      classId: classId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: classData.status || 'active',
      students: classData.students || [],
      schedule: classData.schedule || {}
    });
    
    return classId;
  } catch (error) {
    console.error('Error creating class:', error);
    throw error;
  }
};

// Get all classes
export const getAllClasses = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.CLASSES);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.courseId) {
      constraints.push(where('courseId', '==', filters.courseId));
    }
    
    if (filters.teacherId) {
      constraints.push(where('teacherId', '==', filters.teacherId));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.CLASSES), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const classes = [];
    snapshot.forEach(doc => {
      classes.push({ id: doc.id, ...doc.data() });
    });
    
    return classes;
  } catch (error) {
    console.error('Error getting all classes:', error);
    throw error;
  }
};

// ============================================
// SERIAL NUMBER MANAGEMENT - WITH NAME HASHES
// ============================================

// Generate serial number with name hash
export const generateSerialNumber = async (course = null, studentName = null) => {
  try {
    const year = new Date().getFullYear();
    
    // Create a name hash from the student's name
    let nameHash = 'GEN';
    if (studentName) {
      // Remove special characters, take first 6 letters
      nameHash = studentName
        .toUpperCase()
        .replace(/[^A-Z]/g, '') // Remove special characters
        .substring(0, 6);
      
      // If name hash is too short, pad with random
      if (nameHash.length < 3) {
        const pad = Math.random().toString(36).substring(2, 5).toUpperCase();
        nameHash = nameHash + pad;
      }
    }
    
    // Generate a random 6-character alphanumeric string
    const randomPart = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    
    // Create the serial number with name hash
    const serial = `FM-ADM-${year}-${nameHash}-${randomPart}`;
    
    // Verify uniqueness
    const existing = await verifySerial(serial);
    if (existing.valid && existing.data) {
      // Serial exists, regenerate with different random
      const newRandom = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      const newSerial = `FM-ADM-${year}-${nameHash}-${newRandom}`;
      
      await setDoc(doc(db, COLLECTIONS.SERIAL_NUMBERS, newSerial), {
        serial: newSerial,
        course: course || '',
        studentName: studentName || '',
        isUsed: false,
        generatedAt: serverTimestamp(),
        status: 'available',
        createdAt: new Date().toISOString(),
        ownerName: studentName || '',
        courseName: course || '',
        nameHash: nameHash
      });
      
      console.log('✅ Serial generated (regenerated):', newSerial);
      return newSerial;
    }
    
    await setDoc(doc(db, COLLECTIONS.SERIAL_NUMBERS, serial), {
      serial: serial,
      course: course || '',
      studentName: studentName || '',
      isUsed: false,
      generatedAt: serverTimestamp(),
      status: 'available',
      createdAt: new Date().toISOString(),
      ownerName: studentName || '',
      courseName: course || '',
      nameHash: nameHash
    });
    
    console.log('✅ Serial generated:', serial);
    return serial;
  } catch (error) {
    console.error('Error generating serial number:', error);
    // Fallback to simple generation
    const year = new Date().getFullYear();
    const count = await getSerialCount();
    const serial = `FM-ADM-${year}-${String(count + 1).padStart(3, '0')}`;
    
    await setDoc(doc(db, COLLECTIONS.SERIAL_NUMBERS, serial), {
      serial: serial,
      course: course || '',
      studentName: studentName || '',
      isUsed: false,
      generatedAt: serverTimestamp(),
      status: 'available',
      createdAt: new Date().toISOString(),
      ownerName: studentName || '',
      courseName: course || ''
    });
    
    return serial;
  }
};

// Get serial count
export const getSerialCount = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.SERIAL_NUMBERS));
    return snapshot.size;
  } catch (error) {
    console.error('Error getting serial count:', error);
    return 0;
  }
};

// Verify serial number
export const verifySerial = async (serialNumber) => {
  try {
    if (!serialNumber) {
      return {
        valid: false,
        data: null,
        error: 'Serial number is required'
      };
    }
    
    console.log('🔍 Verifying serial:', serialNumber);
    
    // Try direct lookup
    const docRef = doc(db, COLLECTIONS.SERIAL_NUMBERS, serialNumber);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('📋 Serial found:', data);
      
      if (data.isUsed === true) {
        return {
          valid: false,
          data: data,
          error: 'This serial number has already been used'
        };
      }
      
      return {
        valid: true,
        data: data,
        error: null
      };
    }
    
    // If not found, try query
    const q = query(
      collection(db, COLLECTIONS.SERIAL_NUMBERS),
      where('serial', '==', serialNumber)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const data = doc.data();
      if (data.isUsed === true) {
        return {
          valid: false,
          data: data,
          error: 'This serial number has already been used'
        };
      }
      return {
        valid: true,
        data: data,
        error: null
      };
    }
    
    console.log('❌ Serial not found:', serialNumber);
    return {
      valid: false,
      data: null,
      error: 'Invalid serial number. Please check and try again.'
    };
  } catch (error) {
    console.error('Error verifying serial:', error);
    return {
      valid: false,
      data: null,
      error: 'Error verifying serial number. Please try again.'
    };
  }
};

// Mark serial as used
export const markSerialAsUsed = async (serialNumber, applicantEmail, studentId = null) => {
  try {
    const docRef = doc(db, COLLECTIONS.SERIAL_NUMBERS, serialNumber);
    await updateDoc(docRef, {
      isUsed: true,
      usedBy: applicantEmail,
      studentId: studentId,
      usedAt: serverTimestamp(),
      status: 'used'
    });
    return true;
  } catch (error) {
    console.error('Error marking serial as used:', error);
    throw error;
  }
};

// Get all serials
export const getAllSerials = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.SERIAL_NUMBERS);
    const constraints = [];
    
    if (filters.isUsed !== undefined) {
      constraints.push(where('isUsed', '==', filters.isUsed));
    }
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.SERIAL_NUMBERS), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const serials = [];
    snapshot.forEach(doc => {
      serials.push({ id: doc.id, ...doc.data() });
    });
    
    return serials;
  } catch (error) {
    console.error('Error getting all serials:', error);
    throw error;
  }
};

// ============================================
// APPLICATION MANAGEMENT
// ============================================

// Save application
export const saveApplication = async (applicationData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), {
      ...applicationData,
      submittedAt: serverTimestamp(),
      status: applicationData.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving application:', error);
    throw error;
  }
};

// Get application by serial
export const getApplicationBySerial = async (serialNumber) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.APPLICATIONS),
      where('serialNumber', '==', serialNumber)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting application:', error);
    return null;
  }
};

// Get all applications
export const getAllApplications = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.APPLICATIONS);
    const constraints = [];
    
    if (filters.status) {
      constraints.push(where('status', '==', filters.status));
    }
    
    if (filters.course) {
      constraints.push(where('course', '==', filters.course));
    }
    
    constraints.push(orderBy('createdAt', 'desc'));
    
    const qRef = query(collection(db, COLLECTIONS.APPLICATIONS), ...constraints);
    const snapshot = await getDocs(qRef);
    
    const applications = [];
    snapshot.forEach(doc => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    
    return applications;
  } catch (error) {
    console.error('Error getting all applications:', error);
    throw error;
  }
};

// Update application status
export const updateApplicationStatus = async (applicationId, status, notes = null) => {
  try {
    const docRef = doc(db, COLLECTIONS.APPLICATIONS, applicationId);
    const updateData = { 
      status: status,
      updatedAt: serverTimestamp()
    };
    
    if (notes) {
      updateData.notes = arrayUnion({
        text: notes,
        timestamp: new Date().toISOString(),
        type: 'status_update'
      });
    }
    
    await updateDoc(docRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

// ============================================
// DEPARTMENT MANAGEMENT
// ============================================

// Create department
export const createDepartment = async (departmentData) => {
  try {
    const departmentId = departmentData.departmentId || `DEPT-${Date.now()}`;
    const deptRef = doc(db, COLLECTIONS.DEPARTMENTS, departmentId);
    
    await setDoc(deptRef, {
      ...departmentData,
      departmentId: departmentId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      staff: departmentData.staff || [],
      courses: departmentData.courses || [],
      status: departmentData.status || 'active'
    });
    
    return departmentId;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error;
  }
};

// Get all departments
export const getAllDepartments = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTIONS.DEPARTMENTS));
    const departments = [];
    snapshot.forEach(doc => {
      departments.push({ id: doc.id, ...doc.data() });
    });
    return departments;
  } catch (error) {
    console.error('Error getting all departments:', error);
    throw error;
  }
};

// ============================================
// NOTIFICATION MANAGEMENT
// ============================================

// Send notification
export const sendNotification = async (notificationData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
      ...notificationData,
      createdAt: serverTimestamp(),
      read: false,
      readBy: []
    });
    return docRef.id;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};

// Get notifications by user
export const getNotificationsByUser = async (userId, limit = 50) => {
  try {
    const q = query(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );
    
    const snapshot = await getDocs(q);
    const notifications = [];
    snapshot.forEach(doc => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId, userId) => {
  try {
    const docRef = doc(db, COLLECTIONS.NOTIFICATIONS, notificationId);
    await updateDoc(docRef, {
      read: true,
      readBy: arrayUnion(userId)
    });
    return true;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Register user
export const registerUser = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, {
      displayName: userData.fullName || ''
    });
    
    await sendEmailVerification(user);
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: email,
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      emailVerified: false
    });
    
    return user;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// Get user profile
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (uid, updateData) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};



// ============================================
// USER MANAGEMENT (for all roles)
// ============================================

// Get user by email (for admins, staff, and students)
export const getUserByEmail = async (email) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return null;
    
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

// Update user
export const updateUser = async (userId, updateData) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// ============================================
// DASHBOARD STATISTICS
// ============================================

// Get dashboard statistics
export const getDashboardStats = async () => {
  try {
    const [students, staff, courses, payments, applications, serials] = await Promise.all([
      getDocs(collection(db, COLLECTIONS.STUDENTS)),
      getDocs(collection(db, COLLECTIONS.STAFF)),
      getDocs(collection(db, COLLECTIONS.COURSES)),
      getDocs(collection(db, COLLECTIONS.PAYMENTS)),
      getDocs(collection(db, COLLECTIONS.APPLICATIONS)),
      getDocs(collection(db, COLLECTIONS.SERIAL_NUMBERS))
    ]);

    let totalRevenue = 0;
    let pendingPayments = 0;
    payments.forEach(doc => {
      const data = doc.data();
      if (data.status === 'completed') {
        totalRevenue += data.amount || 0;
      } else if (data.status === 'pending') {
        pendingPayments += data.amount || 0;
      }
    });

    return {
      totalStudents: students.size,
      totalStaff: staff.size,
      totalCourses: courses.size,
      totalRevenue: totalRevenue,
      pendingPayments: pendingPayments,
      totalApplications: applications.size,
      totalSerials: serials.size,
      usedSerials: serials.docs.filter(doc => doc.data().isUsed).length,
      availableSerials: serials.docs.filter(doc => !doc.data().isUsed).length,
      // New: Admission status breakdown
      pendingStudents: students.docs.filter(doc => doc.data().admissionStatus === 'pending').length,
      approvedStudents: students.docs.filter(doc => doc.data().admissionStatus === 'approved').length,
      enrolledStudents: students.docs.filter(doc => doc.data().admissionStatus === 'enrolled').length,
      rejectedStudents: students.docs.filter(doc => doc.data().admissionStatus === 'rejected').length
    };
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    throw error;
  }
};

// ============================================
// EXPORT ALL FUNCTIONS
// ============================================

export default {
  // Student functions
  createStudent,
  getStudent,
  getStudentByEmail,
  getAllStudents,
  updateStudent,
  deleteStudent,
  enrollStudentInCourse,
  getStudentAttendance,
  getStudentGrades,
  
  // Staff functions
  createStaff,
  getStaff,
  getAllStaff,
  updateStaff,
  deleteStaff,
  
  // Admission functions
  createAdmission,
  getAdmission,
  getAdmissionByEmail,
  getAdmissionBySerial,
  getAllAdmissions,
  updateAdmissionStatus,
  
  // Admission Status functions (NEW)
  getStudentAdmissionStatus,
  getStudentWithAdmissionStatus,
  updateStudentAdmissionStatus,
  getStudentsByAdmissionStatus,
  
  // Payment functions
  createPayment,
  savePayment,
  getPayment,
  getPaymentsByStudent,
  getAllPayments,
  updatePaymentStatus,
  
  // Course functions
  createCourse,
  getAllCourses,
  updateCourse,
  
  // Class functions
  createClass,
  getAllClasses,
  
  // Serial number functions
  generateSerialNumber,
  getSerialCount,
  verifySerial,
  markSerialAsUsed,
  getAllSerials,
  
  // Application functions
  saveApplication,
  getApplicationBySerial,
  getAllApplications,
  updateApplicationStatus,
  
  // Department functions
  createDepartment,
  getAllDepartments,
  
  // Notification functions
  sendNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  
  // Auth functions
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  getCurrentUser,
  getUserProfile,
  updateUserProfile,
  
  // Dashboard
  getDashboardStats
};
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  doc, 
  getDoc,
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Serial Numbers Collection
const SERIAL_COLLECTION = 'serialNumbers';
const APPLICATION_COLLECTION = 'applications';
const PAYMENT_COLLECTION = 'payments';

// Generate a new serial number
export const generateSerialNumber = async (course) => {
  const year = new Date().getFullYear();
  const count = await getSerialCount();
  const serial = `FM-ADM-${year}-${String(count + 1).padStart(3, '0')}`;
  
  // Save to Firebase
  await setDoc(doc(db, SERIAL_COLLECTION, serial), {
    serial: serial,
    course: course || '',
    isUsed: false,
    generatedAt: serverTimestamp(),
    status: 'available'
  });
  
  return serial;
};

// Get serial count
export const getSerialCount = async () => {
  const snapshot = await getDocs(collection(db, SERIAL_COLLECTION));
  return snapshot.size;
};

// Verify serial number
export const verifySerial = async (serialNumber) => {
  const docRef = doc(db, SERIAL_COLLECTION, serialNumber);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      valid: !data.isUsed,
      data: data
    };
  }
  
  return {
    valid: false,
    data: null
  };
};

// Mark serial as used
export const markSerialAsUsed = async (serialNumber, applicantEmail) => {
  const docRef = doc(db, SERIAL_COLLECTION, serialNumber);
  await updateDoc(docRef, {
    isUsed: true,
    usedBy: applicantEmail,
    usedAt: serverTimestamp()
  });
};

// Save application
export const saveApplication = async (applicationData) => {
  try {
    const docRef = await addDoc(collection(db, APPLICATION_COLLECTION), {
      ...applicationData,
      submittedAt: serverTimestamp(),
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving application:', error);
    throw error;
  }
};

// Get application by serial
export const getApplicationBySerial = async (serialNumber) => {
  const q = query(
    collection(db, APPLICATION_COLLECTION), 
    where('serialNumber', '==', serialNumber)
  );
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    return null;
  }
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  };
};

// Save payment record
export const savePayment = async (paymentData) => {
  try {
    const docRef = await addDoc(collection(db, PAYMENT_COLLECTION), {
      ...paymentData,
      createdAt: serverTimestamp(),
      status: 'completed'
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving payment:', error);
    throw error;
  }
};

// Get all serials (for admin)
export const getAllSerials = async () => {
  const snapshot = await getDocs(collection(db, SERIAL_COLLECTION));
  const serials = [];
  snapshot.forEach(doc => {
    serials.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return serials;
};

// Get all applications (for admin)
export const getAllApplications = async () => {
  const snapshot = await getDocs(collection(db, APPLICATION_COLLECTION));
  const applications = [];
  snapshot.forEach(doc => {
    applications.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return applications;
};
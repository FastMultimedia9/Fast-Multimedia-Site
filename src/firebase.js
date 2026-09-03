import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { 
  getFirestore, 
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
  writeBatch
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey) {
  console.error('❌ Missing Firebase configuration. Check your .env file.');
  throw new Error('Firebase configuration is incomplete');
}

console.log('✅ Firebase initialized with environment variables');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('⚠️ Analytics not available');
  }
}

const COLLECTIONS = {
  STUDENTS: 'students',
  STAFF: 'staff',
  ADMISSIONS: 'admissions',
  PAYMENTS: 'payments',
  COURSES: 'courses',
  CLASSES: 'classes',
  ATTENDANCE: 'attendance',
  GRADES: 'grades',
  SERIAL_NUMBERS: 'serialNumbers',
  APPLICATIONS: 'applications',
  DEPARTMENTS: 'departments',
  FEES: 'fees',
  SCHEDULE: 'schedule',
  NOTIFICATIONS: 'notifications',
  SETTINGS: 'settings',
  USERS: 'users'
};

export { 
  app, db, auth, storage, analytics, COLLECTIONS,
  collection, doc, setDoc, getDoc, getDocs, query,
  where, orderBy, limit, updateDoc, deleteDoc,
  serverTimestamp, increment, arrayUnion, arrayRemove,
  onSnapshot, addDoc, writeBatch, getFirestore,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, onAuthStateChanged, updateProfile,
  sendPasswordResetEmail, sendEmailVerification,
  ref, uploadBytes, getDownloadURL, deleteObject
};

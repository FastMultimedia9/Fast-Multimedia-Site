// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC-xVT9qqgUZGBGGHvf_XWA9lZYm9gF7Xw",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID || "123456789012",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Collection References
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
  SETTINGS: 'settings'
};

export { 
  app, 
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
};
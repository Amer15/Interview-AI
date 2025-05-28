import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTwGtVIKurS9V5QuVD_jr5oEjfutX2lqc",
  authDomain: "interview-ai-e4fc8.firebaseapp.com",
  projectId: "interview-ai-e4fc8",
  storageBucket: "interview-ai-e4fc8.firebasestorage.app",
  messagingSenderId: "1057312643850",
  appId: "1:1057312643850:web:b6c71f6815c76551f938f3",
  measurementId: "G-WRBZRQKX0K",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhoEi0vrxkHNZtU8oj2I8K9wqM2cDYUp8",
  authDomain: "language-learning-databa-ad724.firebaseapp.com",
  projectId: "language-learning-databa-ad724",
  storageBucket: "language-learning-databa-ad724.appspot.com",
  messagingSenderId: "139659801457",
  appId: "1:139659801457:web:d6de9d42aa0249f79f3cd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { db, storage };

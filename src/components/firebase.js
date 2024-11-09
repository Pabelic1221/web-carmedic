// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getStorage } from "firebase/storage"; // For Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnNYYtllwo9dfOF636KcGXfNhiBC6EYQI",
  authDomain: "carmedicdb.firebaseapp.com",
  databaseURL: "https://carmedicdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carmedicdb",
  storageBucket: "carmedicdb.firebasestorage.app",
  messagingSenderId: "873364370703",
  appId: "1:873364370703:web:dc2a463af427cd271d3a7a",
  measurementId: "G-G6WTDZB2Z9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
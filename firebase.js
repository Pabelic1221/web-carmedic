// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnNYYtllwo9dfOF636KcGXfNhiBC6EYQI",
  authDomain: "carmedicdb.firebaseapp.com",
  databaseURL:
    "https://carmedicdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carmedicdb",
  storageBucket: "carmedicdb.appspot.com",
  messagingSenderId: "873364370703",
  appId: "1:873364370703:web:dc2a463af427cd271d3a7a",
  measurementId: "G-G6WTDZB2Z9",
};

const firebaseConfig2 = {
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

const app2 = initializeApp(firebaseConfig2);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app2);

export { auth, db, storage }; // Export storage alongside auth and db

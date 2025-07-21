// src/firebase.js (or firebase.jsx)
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD43C3qepfkO8gGiOT4jmtEV1W3fSjyObw",
  authDomain: "e-commerce-a6b67.firebaseapp.com",
  projectId: "e-commerce-a6b67",
  storageBucket: "e-commerce-a6b67.appspot.com",
  messagingSenderId: "348808944658",
  appId: "1:348808944658:web:5ad31f2ea00a0578040ccb",
  measurementId: "G-SP2TQ2QK0S"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Listen to user state and store it in localStorage
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("firebaseUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("firebaseUser");
  }
});

export { auth };

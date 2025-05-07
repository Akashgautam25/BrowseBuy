// firebase/firebase.js (or firebaseConfig.js)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD43C3qepfkO8gGiOT4jmtEV1W3fSjyObw",
  authDomain: "e-commerce-a6b67.firebaseapp.com",
  projectId: "e-commerce-a6b67",
  storageBucket: "e-commerce-a6b67.appspot.com", // ✅ Corrected here
  messagingSenderId: "348808944658",
  appId: "1:348808944658:web:5ad31f2ea00a0578040ccb",
  measurementId: "G-SP2TQ2QK0S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

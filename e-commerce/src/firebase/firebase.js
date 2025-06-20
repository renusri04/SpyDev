// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgmizYpLghdIQXG5ChaUoc95Najjn0My8",
  authDomain: "login-2d7d1.firebaseapp.com",
  projectId: "login-2d7d1",
  storageBucket: "login-2d7d1.firebasestorage.app",
  messagingSenderId: "390831004506",
  appId: "1:390831004506:web:2b567169371aaaa3573163",
  measurementId: "G-1RKJNZWN24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Make sure this includes db
export { auth, provider, db };

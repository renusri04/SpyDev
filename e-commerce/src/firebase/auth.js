// src/firebase/auth.js
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

/**
 * Sign up with email and password
 */
export const doCreateUserWithEmailAndPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

/**
 * Sign in with email and password
 */
export const doSignInWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

/**
 * Sign in with Google popup
 */
export const doSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/**
 * Send password reset email
 */
export const doPasswordReset = (email) =>
  sendPasswordResetEmail(auth, email);

/**
 * Sign out current user
 */
export const doSignOut = () => signOut(auth);

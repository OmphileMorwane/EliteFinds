"use client";
import { auth } from "../../firebaseConfig"; // Import the initialized auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Sign Up Function
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Return the created user
  } catch (error) {
    throw new Error(error.message); // Handle error
  }
};

// Sign In Function
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; // Return the signed-in user
  } catch (error) {
    throw new Error(error.message); // Handle error
  }
};

// Sign Out Function
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message); // Handle error
  }
};

// Monitor Auth State
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

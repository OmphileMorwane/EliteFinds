"use client";
import { auth } from "../../firebaseConfig"; // Import the initialized auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/**
 * Sign up a new user using email and password.
 * 
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<Object>} The user credentials object.
 * @throws {Error} If there is an error during the sign-up process.
 */
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

/**
 * Sign in an existing user with email and password.
 * 
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<Object>} The user credentials object.
 * @throws {Error} If there is an error during the sign-in process.
 */
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

/**
 * Sign out the current user.
 * 
 * @returns {Promise<void>} A promise that resolves once the user has been signed out.
 * @throws {Error} If there is an error during the sign-out process.
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message); // Handle error
  }
};

/**
 * Listen for changes in the authentication state.
 * 
 * @param {function} callback - A function to execute when the auth state changes.
 * @returns {function} A function to unsubscribe from the listener.
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

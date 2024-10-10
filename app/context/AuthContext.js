"use client";
// app/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Adjust the import based on your folder structure

// Create the AuthContext
const AuthContext = createContext();

/**
 * AuthProvider component that wraps around children components to provide
 * authentication context, including current user, loading state, error state,
 * and functions for sign-in and sign-out.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {React.ReactNode} props.children - The child components that will consume the auth context.
 * @returns {JSX.Element} The AuthProvider component.
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // Optional error state

  useEffect(() => {
    // Set up the listener to track auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Set loading to false once auth state is determined
    }, (error) => {
      console.error("Error with auth state change: ", error);
      setError(error); // Set error if there's an issue with onAuthStateChanged
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  /**
   * Function to sign in a user with email and password.
   *
   * @async
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @throws Will throw an error if the sign-in fails.
   */
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message); // Capture and set error message
      console.error("Error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to sign out the current user.
   *
   * @async
   * @throws Will throw an error if the sign-out fails.
   */
  const signOutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setCurrentUser(null); // Reset currentUser to null
    } catch (error) {
      setError(error.message);
      console.error("Error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Provide the authentication state and functions to the context consumers
  return (
    <AuthContext.Provider value={{ currentUser, loading, error, signIn, signOutUser }}>
      {!loading ? children : <div>Loading...</div>} {/* Show children or loading indicator */}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 *
 * @returns {Object} The authentication context, including current user, loading state,
 * error state, and functions for sign-in and sign-out.
 */
export const useAuth = () => useContext(AuthContext);

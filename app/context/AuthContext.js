"use client"; 
// app/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Adjust the import based on your folder structure

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
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

  // Function to handle user sign-in
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

  // Function to handle user sign-out
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

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);


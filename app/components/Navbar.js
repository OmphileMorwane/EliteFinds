"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook to access auth state
import { auth } from "../../firebaseConfig"; // Import the Firebase auth instance
import SignIn from "../components/SignIn"; // Import your Login component
import SignUp from "../components/SignUp"; // Import your SignUp component
import Modal from "./Modal";

const Navbar = () => {
  const { currentUser } = useAuth(); // Get the current user from the AuthContext
  const [showLogin, setShowLogin] = useState(false); // State to show or hide Login component
  const [showSignUp, setShowSignUp] = useState(false); // State to show or hide SignUp component

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="bg-green-600 text-white py-1 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="h-10 cursor-pointer">
              <img
                src="/images/logo (2).png"
                alt="Logo"
                className="h-full w-auto transform scale-150"
              />
            </div>
          </Link>
          <Link href="/">
            <h1 className="text-white text-2xl font-bold">EliteFinds</h1>
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/">
            <span className="hover:text-gray-300 cursor-pointer">Products</span>
          </Link>
          <Link href="/about">
            <span className="hover:text-gray-300 cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-gray-300 cursor-pointer">Contact</span>
          </Link>

          {/* Conditionally render links based on user's authentication state */}
          {currentUser ? (
            <>
              <span className="hover:text-gray-300 cursor-pointer">
                Welcome, {currentUser.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-green-800 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <span
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setShowLogin(true);
                  setShowSignUp(false);
                }}
              >
                Sign In
              </span>
              <span
                className="hover:text-gray-300 cursor-pointer"
                onClick={() => {
                  setShowSignUp(true);
                  setShowLogin(false);
                }}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
      </div>

      <Modal show={showLogin} onClose={() => setShowLogin(false)}>
  <SignIn />
</Modal>

<Modal show={showSignUp} onClose={() => setShowSignUp(false)}>
  <SignUp />
</Modal>


    </nav>
  );
};

export default Navbar;

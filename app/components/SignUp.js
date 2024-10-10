"use client";
import { useState } from "react";
import { signUp } from "../firebase/auth"; 
 // Import the signUp function

/**
 * SignUp component for user registration.
 *
 * @returns {JSX.Element} The SignUp form component.
 */
const SignUp = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages

  /**
   * Handles the sign-up form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   */
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await signUp(email, password); // Attempt to sign up the user
      // Redirect or show success message here
    } catch (error) {
      setError(error.message); // Set error message if sign up fails
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="max-w-md mx-auto mt-8 p-4 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-center">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mt-4 w-full p-2 border border-gray-400 rounded-md bg-gray-300 text-white placeholder-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-4 w-full p-2 border border-gray-400 rounded-md bg-gray-300 text-white placeholder-white"
      />
      <button
        type="submit"
        className="mt-6 w-full p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        Sign Up
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>} {/* Display error message if any */}
    </form>
  );
};

export default SignUp;

"use client";
import { useState } from "react";
import { signUp } from "../firebase/auth"; // Import the signUp function

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      // Redirect or show success message here
    } catch (error) {
      setError(error.message);
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
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
};

export default SignUp;

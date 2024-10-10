import { useState } from "react";
import { signIn } from "../firebase/auth"; // Import the signIn function

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      // Redirect or show success message here
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
      className="max-w-md mx-auto mt-8 p-4 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-center">Sign In</h2>
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
        Log In
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </form>
  );
};

export default SignIn;

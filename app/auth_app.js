import React from "react";
import { AuthProvider } from "../context/AuthContext"; // Adjust the path as needed
import ParentComponent from "./components/ParentComponent"; // Adjust the path as needed

/**
 * App component that serves as the root component of the application.
 * 
 * This component wraps the application with the `AuthProvider` to provide
 * authentication state throughout the app. It also renders the `ParentComponent`
 * which can be replaced with the main component of your application.
 * 
 * @returns {JSX.Element} The rendered root app component.
 */
const App = () => {
  return (
    <AuthProvider>
      <ParentComponent />
    </AuthProvider>
  );
};

export default App;

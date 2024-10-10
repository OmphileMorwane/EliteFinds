// App.js or _app.js
import React from "react";
import { AuthProvider } from "../context/AuthContext"; // Adjust the path as needed
import ParentComponent from "./components/ParentComponent"; // Adjust the path as needed

const App = () => {
  return (
    <AuthProvider>
      <ParentComponent />
    </AuthProvider>
  );
};

export default App;

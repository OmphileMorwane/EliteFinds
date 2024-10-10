// /pages/_app.js
import { useEffect } from "react";
import { onAuthStateChangedListener } from "../firebase/auth"; // Make sure to import your Firebase Auth listener

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log("User is signed in:", user);
        // Set user in context or state management (e.g., Redux, Context API)
      } else {
        console.log("No user is signed in.");
        // Clear user from context or state management
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, []);
  <AuthProvider>
    return <Component {...pageProps} />
  </AuthProvider>;
}
export default MyApp;

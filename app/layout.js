import localFont from "next/font/local";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider

// Load custom fonts for the application
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata for the application, including title, description, and favicon
export const metadata = {
  title: "EliteFinds",
  description: "Your premier source for all things shopping",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * RootLayout component that provides the overall structure of the application.
 * 
 * This layout includes the global settings such as fonts, stylesheets, the
 * authentication context provider, and the navigation bar.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout of the application.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap with AuthProvider to provide authentication state */}
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

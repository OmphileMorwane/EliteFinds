import Link from "next/link";

/**
 * Custom404 component renders the 404 error page when a user navigates to a
 * non-existent route.
 * 
 * @returns {JSX.Element} The rendered 404 error page with a message and a link to go back to the home page.
 */
export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-4 bg-gray-100 pt-20">
      <div className="pb-12"> 
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/" className="text-green-500 underline">Go back to Products</Link>
      </div>
    </div>
  );
}


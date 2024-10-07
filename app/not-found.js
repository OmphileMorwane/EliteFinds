import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-4 bg-gray-100 pt-20"> {/* Added pt-20 for top padding */}
      <div className="pb-12"> 
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/" className="text-green-500 underline">Go back to Products
        </Link>
      </div>
    </div>
  );
}


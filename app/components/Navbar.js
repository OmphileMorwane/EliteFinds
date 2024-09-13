// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white py-1 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10">
            <img
              src="/images/logo (2).png"
              alt="Logo"
              className="h-full w-auto transform scale-150"
            />
          </div>
          <h1 className="text-white text-2xl font-bold">EliteFinds
            
          </h1>
        </div>
        <div className="space-x-4">
          <Link href="/products" className="hover:text-gray-300">
            Products
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

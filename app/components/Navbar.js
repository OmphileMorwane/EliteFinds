import Link from "next/link";

/**
 * A navigation bar component for the application.
 *
 * This component renders a fixed navigation bar at the top of the page
 * with links to different sections of the site. It includes a logo, a
 * title, and navigation links for Products, About, and Contact pages.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white py-1 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <div className="h-10 cursor-pointer">
              <img
                src="/images/logo (2).png"
                alt="Logo"
                className="h-full w-auto transform scale-150"
              />
            </div>
            
          </Link>
          <Link href="/">
          <h1 className="text-white text-2xl font-bold">EliteFinds</h1>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/">
            <span className="hover:text-gray-300 cursor-pointer">Products</span>
          </Link>
          <Link href="/about">
            <span className="hover:text-gray-300 cursor-pointer">About</span>
          </Link>
          <Link href="/contact">
            <span className="hover:text-gray-300 cursor-pointer">Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

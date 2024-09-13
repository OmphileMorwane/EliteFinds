// pages/products.js
import Link from "next/link";
import SkeletonLoader from "../components/SkeletonLoader";
import ProductsImageCarousel from "../components/ProductsImageCorousel";
import Pagination from "../components/Pagination";
import "../globals.css";

/**
 * Fetches a list of products from an API (server-side).
 *
 * @param {number} page - The page number for pagination (default is 1).
 * @returns {Promise<{ products: Array, hasMore: boolean }>} - A promise that resolves to an object containing the products and a flag indicating if there are more products to load.
 */
async function fetchProducts(page = 1) {
  const skip = (page - 1) * 20;

  try {
    const res = await fetch(
      `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return {
      products: data,
      hasMore: data.length === 20, // If we get 20 products, assume there are more
    };
  } catch (err) {
    // Handle network or parsing errors
    throw new Error(`Error fetching products: ${err.message}`);
  }
}

export default function ProductsPage({ products, hasMore, currentPage }) {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-stone-100">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-stone-200 bg-stone-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            {product.images.length > 1 ? (
              <ProductsImageCarousel images={product.images} />
            ) : (
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-40 w-full object-contain"
              />
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.title}
              </h2>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <Link
                href={`/${product.id}`}
                className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-900"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} hasMore={hasMore} />
    </div>
  );
}

// Server-Side Data Fetching
export async function getServerSideProps({ query }) {
  const page = parseInt(query.page || "1", 10);

  try {
    const { products, hasMore } = await fetchProducts(page);

    return {
      props: {
        products,
        hasMore,
        currentPage: page,
      },
    };
  } catch (err) {
    return {
      props: {
        error: "Failed to load products.",
        products: [],
        hasMore: false,
        currentPage: page,
      },
    };
  }
}

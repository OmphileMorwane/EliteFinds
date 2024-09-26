import Link from "next/link";
import SkeletonLoader from "./components/SkeletonLoader";
import ProductsImageCorousel from "./components/ProductsImageCorousel";
import SearchBar from "./components/SearchBar";
import Sort from "./components/Sort";
import Filter from "./components/Filter";
import Pagination from "./components/pagination";
import "./globals.css";

export const dynamic = "force-dynamic";

// Fetch products function
/**
 * Fetches a list of products from an API.
 * 
 * @param {number} page - The page number for pagination (default is 1).
 * @param {string} searchQuery - The search query for filtering products.
 * @returns {Promise<{ products: Array, hasMore: boolean }>} - A promise that resolves to an object containing the products and a flag indicating if there are more products to load.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
async function fetchProducts(page = 1, searchQuery = "", sortBy = "id", order = "asc", category = "") {
  const skip = (page - 1) * 20;
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20&search=${encodeURIComponent(
      searchQuery
    )}&sortBy=${sortBy}&order=${order}&category=${category}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return {
    products: data,
    hasMore: data.length === 20, // If we get 20 products, assume there are more
  };
}

/**
 * ProductsPage component to display a list of products.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.searchParams - The search parameters, including the page number and search query.
 * @returns {JSX.Element} - The rendered component.
 */
export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const selectedSort = searchParams.sort || 'default';
  const selectedCategory = searchParams.category || "";

  // Initialize default sort parameters
  let sortBy = 'id';
  let order = 'asc';

  // Update sortBy and order based on selectedSort
  if (selectedSort === 'price_asc') {
    sortBy = 'price';
    order = 'asc';
  } else if (selectedSort === 'price_desc') {
    sortBy = 'price';
    order = 'desc';
  }

  let products = [];
  let hasMore = false;
  let error = null;

  try {
    const { products: fetchedProducts, hasMore: more } = await fetchProducts(
      page,
      searchQuery,
      sortBy,
      order,
      selectedCategory
    );
    products = fetchedProducts;
    hasMore = more;
  } catch (err) {
    error = 'Failed to load products. Please try again later.';
    console.error(err);
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-stone-100">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} />

      {/* Sort and Filter components */}
      <div className="flex justify-between mb-4">
        <Sort selectedSort={selectedSort} />
        <Filter categories={['Category1', 'Category2']} selectedCategory={selectedCategory} />
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-stone-200 bg-stone-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              {product.images.length > 1 ? (
                <ProductsImageCorousel images={product.images} />
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
                  className="inline-block mt-2 px-1 py-1 bg-green-600 text-white rounded hover:bg-green-900"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination currentPage={page} hasMore={hasMore} />
    </div>
  );
}

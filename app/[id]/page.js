// ProductPage.js

import "../globals.css";
import BackButton from "../components/BackButton";
import ImageCarousel from "../components/ImageCarousel";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReviewList from "../components/ReviewList"; // Import the ReviewList component

// Dynamically import ClientSideImage to ensure it runs on the client side
const ClientSideImage = dynamic(() => import("../components/ClientSideImage"), {
  ssr: false, // This line ensures it is only rendered on the client
});

/**
 * Fetches product details from an API based on the product ID.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the product data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
async function fetchProduct(id) {
  try {
    const res = await fetch(
      `https://next-ecommerce-api.vercel.app/products/${id}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error.message);
    throw error;
  }
}

/**
 * ProductPage component to display detailed information about a single product.
 *
 * @param {Object} params - The dynamic route params.
 * @returns {JSX.Element} - The rendered component.
 */
export default async function ProductPage({ params }) {
  const { id } = params;

  let product;
  try {
    // Fetch the product data
    product = await fetchProduct(id);
  } catch (error) {
    return (
      <div>
        <p className="text-red-500">
          Failed to load product. Please try again later.
        </p>
        <Link href="/products" className="text-blue-500 underline">
          Back to Products
        </Link>
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 py-20">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          {product.images && product.images.length > 1 ? (
            <ImageCarousel images={product.images} />
          ) : product.images && product.images.length === 1 ? (
            <ClientSideImage
              src={product.images[0]}
              alt={product.title}
              fallback="/fallback-image.jpg"
            />
          ) : (
            <p>No images available for this product.</p>
          )}
        </div>
        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <p className="text-lg text-gray-700 mb-4">
            {product.description || "No description available."}
          </p>
          <p className="text-xl font-semibold mb-2">
            Price:{" "}
            <span className="text-green-600">
              ${product.price.toFixed(2) || "N/A"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category || "Uncategorized"}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Tags:{" "}
            {product.tags && product.tags.length > 0
              ? product.tags.join(", ")
              : "No tags available."}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Rating:{" "}
            {product.rating
              ? product.rating.toFixed(1)
              : "No rating available."}
          </p>
          <p
            className={`text-sm font-medium mb-6 ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `In stock (${product.stock} available)`
              : "Out of stock"}
          </p>
          {/* Pass the reviews to the ReviewList component */}
          <ReviewList reviews={product.reviews || []} />
        </div>
      </div>
    </div>
  );
}

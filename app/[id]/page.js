import "../globals.css";
import BackButton from "../components/BackButton";
import ImageCarousel from "../components/ImageCarousel";
import Link from "next/link";
import dynamic from 'next/dynamic';


// Dynamically import ClientSideImage to ensure it runs on the client side
const ClientSideImage = dynamic(() => import('../components/ClientSideImage'), {
  ssr: false, // Ensure this component is not server-side rendered
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
            <span className="text-green-600">${product.price || "N/A"}</span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category || "Uncategorized"}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Tags:{" "}
            {product.tags ? product.tags.join(", ") : "No tags available."}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Rating: {product.rating || "No rating available."}
          </p>
          <p
            className={`text-sm font-medium mb-6 ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>
          <div className="bg-stone-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <p className="font-medium">
                    {review.reviewerName || "Anonymous"} -{" "}
                    <span className="text-gray-500">
                      {review.date
                        ? new Date(review.date).toLocaleString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })
                        : "Date unknown"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {review.comment || "No comment provided."}
                  </p>
                  <p className="text-sm font-semibold">
                    Rating: ⭐ {review.rating || "No rating"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

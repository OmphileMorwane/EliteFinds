// Import necessary modules
import { notFound } from "next/navigation"; // Next.js function to trigger 404
import "../globals.css";
import BackButton from "../components/BackButton";
import ImageCarousel from "../components/ImageCarousel";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReviewList from "../components/ReviewList"; // Import the ReviewList component
import ProductSkeletonLoader from "../components/ProductSkeletonLoader"; // Import the ProductSkeletonLoader
import { fetchProduct } from "../api/productApi"; // Import the fetchProduct function from your API

// Dynamically import ClientSideImage to ensure it runs on the client side
const ClientSideImage = dynamic(() => import("../components/ClientSideImage"), {
  ssr: false, // This line ensures it is only rendered on the client
});

export async function generateMetadata({ params }) {
  try {
    const product = await fetchProduct(params.id);
    return {
      title: product.title || "Product",
      description: product.description || "No description available",
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductPage({ params }) {
  const { id } = params;

  let product;
  try {
    product = await fetchProduct(id);
  } catch (error) {
    // Error handling for different error messages
    return (
      <div className="flex flex-col min-h-screen justify-between">
      
        <div className="flex-grow" /> {/* This div takes up available space */}
        <div className="text-center p-8">
          <p className="text-red-700 text-2xl">
            There was an issue loading the page. Please try again later.
          </p>
          <Link href="/" className="text-green-600 underline mt-4">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    // While waiting for the product, show the skeleton loader
    return <ProductSkeletonLoader />;
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

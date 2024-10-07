import { fetchProductFromFirestore } from "../api/firebaseApi"; // Import the function from the Firebase API file
import { notFound } from "next/navigation"; // Import notFound function from next/navigation
import "../globals.css";
import BackButton from "../components/BackButton";
import ImageCarousel from "../components/ImageCarousel";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReviewList from "../components/ReviewList";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader";

const ClientSideImage = dynamic(() => import("../components/ClientSideImage"), {
  ssr: false,
});

// Function to generate the metadata for the product page
export async function generateMetadata({ params }) {
  try {
    const product = await fetchProductFromFirestore(params.id);
    return {
      title: product?.title || "Product",
      description: product?.description || "No description available",
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

// ProductPage component that fetches and displays a single product
export default async function ProductPage({ params }) {
  const { id } = params;
  let product;

  try {
    // Fetch the product from Firestore using the product ID
    product = await fetchProductFromFirestore(id);

    // If the product doesn't exist, trigger the 404 page
    if (!product) {
      notFound(); // This will navigate to the 404 page
    }
  } catch (error) {
    // If there's an issue fetching the product, show an error message
    return (
      <div className="flex flex-col min-h-screen justify-between">
        <div className="flex-grow" />
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

  // Show a loading skeleton if the product hasn't been loaded yet
  if (!product) {
    return <ProductSkeletonLoader />;
  }

  // Render the product details page
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
              ${product.price ? product.price.toFixed(2) : "N/A"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category || "Uncategorized"}
          </p>
          <ReviewList reviews={product.reviews || []} />
        </div>
      </div>
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import BackButton from "../components/BackButton";
import ImageCarousel from "../components/ImageCarousel";
import { useState, useEffect } from "react";
import ProductSkeletonLoader from "../components/ProductSkeletonLoader"; // Import the skeleton loader

async function fetchProduct(id) {
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const { id } = useParams();

  useEffect(() => {
    async function getProductData(id) {
      try {
        const productIdData = await fetchProduct(id);
        setProduct(productIdData);
      } catch (error) {
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getProductData(id);
    }
  }, [id]);

  if (loading) {
    return <ProductSkeletonLoader />; // Show loading state
  }

  if (error) {
    return <p className="text-red-500">{error}</p>; // Show error message if fetching fails
  }

  if (!product) {
    return <p>Product not found.</p>; // Fallback if product is not found
  }

  return (
    <div className="max-w-5xl mx-auto p-8 py-20">
      <BackButton />
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 " >
          {product.images.length > 1 ? (
            <ImageCarousel images={product.images} />
          ) : (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-96 object-contain rounded-lg shadow-lg bg-stone-200"
            />
          )}
        </div>
        <div className="mt-6 md:mt-0 md:ml-8 flex-1">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">
            Price: <span className="text-green-600">${product.price}</span>
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Tags: {product.tags.join(", ")}
          </p>
          <p className="text-sm text-gray-500 mb-4">Rating: {product.rating}</p>
          <p
            className={`text-sm font-medium mb-6 ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>
          <div className="bg-stone-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Reviews</h3>
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="mb-4 border-b pb-4">
                  <p className="font-medium">
                    {review.reviewerName} -{" "}
                    <span className="text-gray-500">
                      {new Date(review.date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <p className="text-sm font-semibold">
                    Rating: ⭐ {review.rating}
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


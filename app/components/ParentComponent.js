"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Next.js routing
import { useAuth } from "../context/AuthContext"; // Import your AuthContext
import ReviewList from "./ReviewList"; // Import ReviewList component
import { fetchProductReviews, postProductReview } from "../api/reviewsApi"; // API calls

/**
 * ParentComponent fetches and manages product reviews.
 *
 * This component retrieves reviews for a specific product based on the
 * product ID from the URL query parameters. It allows authenticated users
 * to add reviews, handling the authentication state and redirection to
 * the sign-in page when necessary.
 *
 * @returns {JSX.Element} The rendered ParentComponent.
 */
const ParentComponent = () => {
  const router = useRouter();
  const { productId } = router.query; // Extract productId from query params
  const { currentUser } = useAuth(); // Access current user from AuthContext

  const [reviews, setReviews] = useState([]);

  // Fetch reviews for the current product when the component mounts or productId changes
  useEffect(() => {
    if (productId) {
      fetchProductReviews(productId)
        .then((fetchedReviews) => setReviews(fetchedReviews))
        .catch((err) => console.error(err));
    }
  }, [productId]);

  /**
   * Redirects the user to the sign-in page if not authenticated.
   */
  const handleSignInRedirect = () => {
    console.log("User not authenticated. Redirecting to sign-in.");
    router.push("/signin"); // Redirect to the sign-in page in Next.js
  };

  /**
   * Handles adding a review for the product.
   *
   * @param {Object} reviewData - The data of the review to be added.
   */
  const handleAddReview = (reviewData) => {
    if (currentUser && productId) {
      postProductReview(productId, reviewData, currentUser.token)
        .then((newReview) => setReviews((prevReviews) => [...prevReviews, newReview]))
        .catch((err) => console.error(err));
    } else {
      handleSignInRedirect();
    }
  };

  return (
    <ReviewList
      productId={productId}
      reviews={reviews}
      isAuthenticated={!!currentUser}
      onAddReview={handleAddReview}
      onSignInRedirect={handleSignInRedirect}
    />
  );
};

export default ParentComponent;

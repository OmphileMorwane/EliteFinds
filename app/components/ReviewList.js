"use client";
// ReviewList.js
import React, { useState, useEffect } from "react";

/**
 * ReviewList Component - Renders a list of reviews sorted by date.
 *
 * @param {Object[]} reviews - Array of review objects.
 * @returns {JSX.Element} - The rendered list of reviews.
 */
const ReviewList = ({ reviews }) => {
  // State to manage sorting order: true for descending, false for ascending
  const [sortDescending, setSortDescending] = useState(true);

  // Effect to log the current reviews when they change
  useEffect(() => {
    console.log("Current reviews:", reviews);
  }, [reviews]);

  // Sort the reviews by date based on the sortDescending state
  const sortedReviews = reviews
    ? [...reviews].sort((a, b) => {
        return sortDescending
          ? new Date(b.date) - new Date(a.date) // Newest first
          : new Date(a.date) - new Date(b.date); // Oldest first
      })
    : [];

  // Toggle sorting order
  const handleSortToggle = () => {
    setSortDescending((prev) => !prev);
  };

  return (
    <div className="bg-stone-200 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <button
        onClick={handleSortToggle}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        Sort by date: {sortDescending ? "Newest First" : "Oldest First"}
      </button>
      {sortedReviews.length > 0 ? (
        sortedReviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-4">
            <p className="font-medium">
              {review.reviewerName || "Anonymous"} -{" "}
              <span className="text-gray-500">
                {review.date
                  ? new Date(review.date).toLocaleDateString("en-US", {
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
              Rating: ⭐{" "}
              {review.rating !== undefined ? review.rating : "No rating"}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;

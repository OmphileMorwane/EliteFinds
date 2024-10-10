"use client";
import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown"; // Adjust the path as needed
import ReviewForm from "./ReviewForm"; // Ensure ReviewForm is correctly imported
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

/**
 * ReviewList component to display and manage user reviews.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.reviews - Array of review objects to display.
 * @param {Function} props.onSignInRedirect - Callback function to handle sign-in redirection.
 * @returns {JSX.Element} The ReviewList component.
 */
const ReviewList = ({ reviews, onSignInRedirect }) => {
  const [sortDescending, setSortDescending] = useState(true);
  const [ratingDescending, setRatingDescending] = useState(true);
  const [sortType, setSortType] = useState("date");
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  useEffect(() => {}, [reviews]); // Add relevant side-effects if needed

  // Sort the reviews based on the selected criteria
  const sortedReviews = reviews
    ? [...reviews].sort((a, b) => {
        if (sortType === "date") {
          return sortDescending
            ? new Date(b.date) - new Date(a.date)
            : new Date(a.date) - new Date(b.date);
        } else if (sortType === "rating") {
          return ratingDescending ? b.rating - a.rating : a.rating - b.rating;
        }
        return 0;
      })
    : [];

  // Handle sort type change
  const handleSortTypeChange = (event) => {
    setSortType(event);
  };

  // Handle sort order change
  const handleSortOrderChange = (event) => {
    const isDescending = event === "desc";
    if (sortType === "date") {
      setSortDescending(isDescending);
    } else if (sortType === "rating") {
      setRatingDescending(isDescending);
    }
  };

  // Toggle the visibility of the review form based on authentication
  const handleAddReviewClick = () => {
    if (currentUser) {
      setIsFormVisible((prev) => !prev); // Toggle form visibility
    } else {
      // If the user is not logged in, redirect or show a message
      if (typeof onSignInRedirect === "function") {
        onSignInRedirect(); // Redirect to sign-in page
      } else {
        alert("Please sign in to add a review."); // Show an alert if no redirect function is provided
      }
    }
  };

  return (
    <div className="bg-stone-200 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label htmlFor="sortType" className="mr-2 font-medium">
            Sort by:
          </label>
          <CustomDropdown
            id="sortType"
            options={[
              { value: "date", label: "Date" },
              { value: "rating", label: "Rating" },
            ]}
            value={sortType}
            onChange={handleSortTypeChange}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="sortOrder" className="mr-2 font-medium">
            Order:
          </label>
          <CustomDropdown
            id="sortOrder"
            options={[
              {
                value: "desc",
                label: sortType === "date" ? "Newest First" : "Highest First",
              },
              {
                value: "asc",
                label: sortType === "date" ? "Oldest First" : "Lowest First",
              },
            ]}
            value={sortDescending ? "desc" : "asc"}
            onChange={handleSortOrderChange}
          />
        </div>
      </div>

      {/* Render sorted reviews */}
      {sortedReviews.length > 0 ? (
        sortedReviews.map((review) => (
          <div key={review.reviewerEmail} className="mb-4 border-b pb-4">
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
        <p>No reviews available.</p>
      )}

      {/* Add a review button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleAddReviewClick}
      >
        {currentUser ? "Add a Review" : "Sign In to Add a Review"}
      </button>

      {/* Conditionally render the ReviewForm if the form is visible */}
      {isFormVisible && <ReviewForm onClose={() => setIsFormVisible(false)} />}
    </div>
  );
};

export default ReviewList;

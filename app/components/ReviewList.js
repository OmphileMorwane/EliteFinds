"use client";
import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown"; // Adjust the path as needed

/**
 * ReviewList component displays a list of reviews with options to sort them.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.reviews - Array of review objects containing reviewer information and ratings.
 * @returns {JSX.Element} Rendered ReviewList component.
 */
const ReviewList = ({ reviews }) => {
  // State to manage sorting order and type
  const [sortDescending, setSortDescending] = useState(true); // Determines if the list is sorted in descending order by date
  const [ratingDescending, setRatingDescending] = useState(true); // Determines if the list is sorted in descending order by rating
  const [sortType, setSortType] = useState("date"); // Current sorting type (date or rating)

  // Effect to handle changes when reviews change
  useEffect(() => {}, [reviews]);

  /**
   * Sorts reviews based on selected sort type and order.
   * 
   * @returns {Array} Sorted array of reviews.
   */
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

  /**
   * Handles change in sort type from dropdown.
   * 
   * @param {string} event - Selected sort type.
   */
  const handleSortTypeChange = (event) => {
    setSortType(event);
  };

  /**
   * Handles change in sort order from dropdown.
   * 
   * @param {string} event - Selected sort order (asc or desc).
   */
  const handleSortOrderChange = (event) => {
    const isDescending = event === "desc";
    if (sortType === "date") {
      setSortDescending(isDescending);
    } else if (sortType === "rating") {
      setRatingDescending(isDescending);
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
            id="sortType" // Assigning ID for accessibility
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
            id="sortOrder" // Assigning ID for accessibility
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
        <p className="text-sm text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;

"use client";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const ReviewForm = ({ onClose, onReviewAdded }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const review = {
        reviewerName: currentUser?.name || "Anonymous",
        reviewerEmail: currentUser?.email || "anonymous@example.com",
        comment,
        rating,
        date: new Date().toISOString(),
      };

      // Save the review to Firestore
      const reviewsCollection = collection(db, "reviews"); // Adjust the collection name
      await addDoc(reviewsCollection, review);

      // Pass the newly added review back to the parent component
      onReviewAdded(review);

      // Optionally, close the form
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
      <button
        className="text-gray-500 mt-2 underline"
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

export default ReviewForm;

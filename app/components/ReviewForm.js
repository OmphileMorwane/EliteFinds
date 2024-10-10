// ReviewForm.js
"use client"; // This line makes it a client component

import { useState } from "react";

const ReviewForm = ({ productId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(productId, rating, comment);
    setRating(0); // Reset rating
    setComment(""); // Reset comment
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Add a Review:</h2>
      <div className="mb-4">
        <label className="block mb-2">Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border border-gray-300 rounded p-2"
        >
          <option value={0}>Select Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          rows="4"
          placeholder="Write your review here..."
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;

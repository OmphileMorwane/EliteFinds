"use client";
// components/ResetButton.js
import React from "react";
import { useRouter } from "next/navigation";

/**
 * ResetButton component to reset all search filters and sorting options.
 *
 * @returns {JSX.Element} - The rendered ResetButton component.
 */
export default function ResetButton() {
  const router = useRouter();

  // Handle reset functionality
  const handleReset = () => {
    // Reset the route to the base products path without any query parameters
    router.push(`/`);
  };

  return (
    <button
      onClick={handleReset}
      className="px-4 py-2 bg-gray-300 border border-gray-400 text-gray-700 rounded-md shadow-md hover:bg-green-500 hover:text-white transition-colors duration-200 ease-in-out flex items-center justify-center"
    >
      Reset to Default
    </button>
  );
}

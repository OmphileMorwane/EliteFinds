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
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors"
    >
      Reset to Default
    </button>
  );
}

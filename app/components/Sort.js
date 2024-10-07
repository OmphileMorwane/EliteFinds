"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CustomDropdown from "./CustomDropdown"; // Adjust the import path as necessary

export default function Sort({ selectedSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();
  const selectedCategory = searchParams.get("category") || ""; // Get the current category

  useEffect(() => {
    console.log("Current sort selected:", selectedSort); // Log when the sort changes
  }, [selectedSort]);

  const handleSortChange = (sort) => {
    // Create a new URL with the current category and updated sort
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", sort); // Update sort parameter
    currentUrl.searchParams.set("page", "1"); // Reset to the first page
    router.push(currentUrl.toString()); // Navigate to the new URL
  };

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price_asc", label: "Low to High" },
    { value: "price_desc", label: "High to Low" },
  ];

  return (
    <div className="filter">
      <label htmlFor="sort-select" className="font-semibold text-gray-700">
        Price Sort:
      </label>
      <CustomDropdown
        id="sort-select" // Assigning ID for accessibility
        options={sortOptions}
        value={selectedSort}
        onChange={handleSortChange}
      />
    </div>
  );
}

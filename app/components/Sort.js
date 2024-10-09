"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdown"; // Adjust the import path as necessary

export default function Sort({ selectedSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || ""; // Get the current category
  const [sort, setSort] = useState(selectedSort); // Manage local sort state

  // Sync local state with prop changes
  useEffect(() => {
    setSort(selectedSort);
  }, [selectedSort]);

  // Log when the sort changes
  useEffect(() => {
    console.log("Current sort selected:", sort);
  }, [sort]);

  // Function to handle sort changes
  const handleSortChange = (newSort) => {
    setSort(newSort); // Update local state with the new sort value

    // Create a new URL with the current category and updated sort
    const currentUrl = new URL(window.location.href);
    const [sortKey, order] = newSort.split('_'); // Split sort into key and order
    currentUrl.searchParams.set("sort", sortKey); // Update sort parameter
    currentUrl.searchParams.set("order", order); // Update order parameter
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
        value={sort} // Use local state for the dropdown value
        onChange={handleSortChange}
      />
    </div>
  );
}

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import CustomDropdown from "./CustomDropdown"; // Adjust the import path as necessary

export default function Sort({ selectedSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  useEffect(() => {
    console.log("Current sort selected:", selectedSort); // Log when the sort changes
  }, [selectedSort]);

  const handleSortChange = (sort) => {
    router.push(`${path}?page=1&sort=${sort}`);
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

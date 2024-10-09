"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomDropdown from "./CustomDropdown"; // Adjust the import path as necessary

function Filter() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use the environment variable for the API base URL
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${baseUrl}/api/categories`);
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data.map(category => ({ value: category, label: category })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  
  // Handle category selection
  const handleCategoryChange = (newCategory) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("category", newCategory);
    currentUrl.searchParams.set("page", "1"); // Reset to the first page
    router.push(currentUrl.toString());
  };

  return (
    <div className="filter">
      <label htmlFor="category-select" className="font-semibold text-gray-700">
        Category:
      </label>
      <CustomDropdown
        id="category-select"
        options={[{ value: "", label: "All Categories" }, ...categories]}
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
    </div>
  );
}

export default Filter;

// Filter.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomDropdown from './CustomDropdown'; // Adjust the import path as necessary

function Filter() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const selectedSort = searchParams.get('sort') || 'default'; // Get the current sort

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://next-ecommerce-api.vercel.app/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data.map(category => ({ value: category, label: category }))); // Format options
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (newCategory) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('category', newCategory);
    // Keep the existing sort parameter
    currentUrl.searchParams.set('page', '1'); // Reset to the first page
    router.push(currentUrl.toString());
  };

  return (
    <div className="filter">
      <label htmlFor="category-select" className="font-semibold text-gray-700">Category:</label>
      <CustomDropdown 
        id="category-select" 
        options={[{ value: '', label: 'All Categories' }, ...categories]} 
        value={selectedCategory} 
        onChange={handleCategoryChange} 
      />
    </div>
  );
}

export default Filter;



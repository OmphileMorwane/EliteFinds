'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://next-ecommerce-api.vercel.app/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category selection
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;

    // Update the URL with the new category filter and reset page to 1
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('category', newCategory);
    currentUrl.searchParams.set('page', '1'); // Reset to the first page

    // Trigger a URL update
    router.push(currentUrl.toString());
  };

  return (
    <div className="filter">
      <label htmlFor="category-select" className="font-semibold text-gray-700">Category:</label>
      <select
        id="category-select"
        className="border border-gray-300 p-2 rounded ml-2"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;

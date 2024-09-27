// components/SearchBar.js
import React from 'react';

export default function SearchBar({ searchQuery }) {
  return (
    <form action="/" method="get" className="mb-4 flex items-center">
      <input
        type="text"
        name="query"
        defaultValue={searchQuery}
        placeholder="Search products..."
        className="bg-gray-100 border border-gray-400 p-2 rounded-md shadow-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out w-full mr-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-300 border border-gray-400 text-gray-700 rounded-md shadow-md hover:bg-green-500 hover:text-white transition-colors duration-200 ease-in-out"
      >
        Search
      </button>
    </form>
  );
}

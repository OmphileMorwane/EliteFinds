// components/SearchBar.js
import React from 'react';

export default function SearchBar({ searchQuery }) {
  return (
    <form action="/" method="get" className="mb-4">
      <input
        type="text"
        name="query"
        defaultValue={searchQuery}
        placeholder="Search products..."
        className="border border-stone-300 p-2 mr-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}

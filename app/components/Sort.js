"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Sort({ selectedSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = usePathname();

  useEffect(() => {
    console.log('Current sort selected:', selectedSort); // Log when the sort changes
  }, [selectedSort]);
  

  const handleSortChange = (event) => {
    const sort = event.target.value;


    // // Create a new URL object based on the current URL
   
    router.push(`${path}?page=1&sort=${sort}`);
  };

  return (
    <select value={selectedSort} onChange={handleSortChange}>
      <option value="default">Default</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}


"use client"
import { useRouter } from 'next/navigation';

export default function Sort({ selectedSort }) {
  const router = useRouter();
  
  const handleSortChange = (event) => {
    const sort = event.target.value;
    router.push({
      pathname: '/',
      query: { ...router.query, sort }
    });
  };

  return (
    <select value={selectedSort} onChange={handleSortChange}>
      <option value="default">Default</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}


import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/**
 * Pagination component for navigating between pages.
 * 
 * @param {Object} props - Component props.
 * @param {number} props.currentPage - The current page number.
 * @param {boolean} props.hasMore - Flag indicating if there are more pages to load.
 * @returns {JSX.Element} - The rendered component.
 */
function Pagination({ currentPage, hasMore }) {
  const searchParams = useSearchParams();
  const pageNum = parseInt(currentPage, 10);
  const prevPage = pageNum > 1 ? pageNum - 1 : null;
  const nextPage = pageNum + 1;

  // Get the current category from URL parameters
  const category = searchParams.get('category') || '';

  return (
    <div className="flex justify-between items-center mt-8">
      {prevPage && (
        <Link href={`/?page=${prevPage}${category ? `&category=${category}` : ''}`}>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
            Previous Page
          </button>
        </Link>
      )}
      <div className="text-gray-700">Page {currentPage}</div>
      {hasMore && (
        <Link href={`/?page=${nextPage}${category ? `&category=${category}` : ''}`}>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
            Next Page
          </button>
        </Link>
      )}
    </div>
  );
}

export default Pagination;

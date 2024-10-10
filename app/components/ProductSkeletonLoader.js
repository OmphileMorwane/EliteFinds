// ../components/ProductSkeletonLoader.js

/**
 * ProductSkeletonLoader component serves as a placeholder 
 * while product details are being loaded.
 *
 * @returns {JSX.Element} - The rendered skeleton loader for a product.
 */
const ProductSkeletonLoader = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 py-20">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 animate-pulse">
          <div className="h-72 bg-gray-200 rounded mb-4"></div> {/* Placeholder for image carousel */}
        </div>
        <div className="mt-6 md:mt-0 md:ml-8 flex-1 animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div> {/* Placeholder for product title */}
          <div className="h-4 bg-gray-200 rounded mb-4"></div> {/* Placeholder for description */}
          <div className="h-5 bg-gray-200 rounded mb-2"></div> {/* Placeholder for price */}
          <div className="h-4 bg-gray-200 rounded mb-2"></div> {/* Placeholder for category */}
          <div className="h-4 bg-gray-200 rounded mb-2"></div> {/* Placeholder for tags */}
          <div className="h-4 bg-gray-200 rounded mb-2"></div> {/* Placeholder for rating */}
          <div className="h-5 bg-gray-200 rounded mb-4"></div> {/* Placeholder for stock status */}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeletonLoader;

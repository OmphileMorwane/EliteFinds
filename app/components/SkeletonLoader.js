// SkeletonLoader.js
"use client"; // This makes the component a client component

/**
 * A skeleton loader component for displaying placeholders while product data is loading.
 *
 * This component shows a grid of skeleton cards that simulate the layout of product items.
 * Each card includes a placeholder for an image and text fields to mimic product information.
 * The cards use a pulsing animation to indicate loading, providing a visual cue that content
 * is being fetched.
 *
 * @returns {JSX.Element} The rendered skeleton loader component.
 */
const SkeletonLoader = () => (
  <div className="max-w-6xl mx-auto p-8 bg-stone-100">
    <h1 className="text-3xl font-bold mb-8">Products</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array(8)
        .fill("")
        .map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse border border-stone-200 bg-stone-200 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="h-40 bg-gray-300"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
    </div>
  </div>
);

export default SkeletonLoader;

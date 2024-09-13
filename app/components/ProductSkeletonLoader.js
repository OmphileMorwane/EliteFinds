const ProductSkeletonLoader = () => (
        <div className="max-w-5xl mx-auto p-8 py-20">
          <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <div className="h-96 bg-gray-300 rounded-lg shadow-lg"></div>
            </div>
            <div className="flex-1 md:ml-8">
              <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      export default ProductSkeletonLoader;
      
/**
 * Fetches a list of products from an API.
 *
 * @param {number} page - The page number for pagination (default is 1).
 * @param {string} searchQuery - The search query for filtering products.
 * @param {string} sortBy - The criteria for sorting the products.
 * @param {string} order - The order of sorting (ascending or descending).
 * @param {string} category - The selected product category.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the products and a flag indicating if there are more products to load.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export async function fetchProducts(page = 1, searchQuery = "", sortBy = "id", order = "asc", category = "") {
        const skip = (page - 1) * 20;
        const url = `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20&search=${encodeURIComponent(searchQuery)}&sortBy=${sortBy}&order=${order}&category=${category}`;
      
        const res = await fetch(url, {
          cache: "force-cache", // Adjust caching as needed
        });
      
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
        }
      
        const data = await res.json();
        return {
          products: data,
          hasMore: data.length === 20, // If we get 20 products, assume there are more
        };
      }
      
      /**
       * Fetches product details from an API based on the product ID.
       *
       * @param {string} id - The ID of the product to fetch.
       * @returns {Promise<Object>} - A promise that resolves to the product data.
       * @throws {Error} - Throws an error if the fetch operation fails.
       */
      export async function fetchProduct(id) {
        const url = `https://next-ecommerce-api.vercel.app/products/${id}`;
      
        const res = await fetch(url, {
          next: { revalidate: 60 }, // Cache for 60 seconds
        });
      
        if (res.status === 404) {
          throw new Error("Product not found");
        }
      
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
        }
      
        return await res.json();
      }
      
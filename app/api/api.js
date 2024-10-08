// api/productApi.js

// Fetch a single product by ID
export async function fetchProduct(id) {
        try {
          const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`, {
            next: { revalidate: 60 }, // Cache for 60 seconds
          });
      
          if (res.status === 404) {
            throw new Error("Product not found");
          }
      
          if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.status} ${res.statusText}`);
          }
      
          return await res.json();
        } catch (error) {
          console.error("Error fetching product:", error.message);
          throw error; // Rethrow to let the caller handle the error
        }
      }
      
      // Fetch multiple products with query parameters
      export async function fetchProducts(
        page = 1,
        searchQuery = "",
        sortBy = "id",
        order = "asc",
        category = ""
      ) {
        const skip = (page - 1) * 20;
      
        try {
          const res = await fetch(
            `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20&search=${encodeURIComponent(
              searchQuery
            )}&sortBy=${sortBy}&order=${order}&category=${category}`,
            {
              cache: "force-cache",
            }
          );
      
          if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
          }
      
          const data = await res.json();
          return {
            products: data,
            hasMore: data.length === 20, // If we get 20 products, assume there are more
          };
        } catch (error) {
          console.error("Error fetching products:", error.message);
          throw error; // Rethrow to let the caller handle the error
        }
      }
      
      // Fetch categories
      export async function fetchCategories() {
        try {
          const res = await fetch('https://next-ecommerce-api.vercel.app/categories', {
            cache: "force-cache", // Optional: Add cache strategy if needed
          });
      
          if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
          }
      
          return await res.json();
        } catch (error) {
          console.error("Error fetching categories:", error.message);
          throw error; // Rethrow to let the caller handle the error
        }
      }
      
// /**
//  * Fetches all available product categories from the API.
//  *
//  * @returns {Promise<Array>} - A promise that resolves to an array of category names.
//  * @throws {Error} - Throws an error if the fetch operation fails.
//  */
// export async function fetchCategories() {
//         const url = `https://next-ecommerce-api.vercel.app/categories`;

//         const res = await fetch(url, {
//           cache: "force-cache", // Adjust caching as needed
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
//         }

//         return await res.json();
//       }

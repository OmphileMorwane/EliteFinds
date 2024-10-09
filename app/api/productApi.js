// Base URL for API requests
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch a single product by ID from Firestore via your Next.js API
export async function fetchProduct(id) {
  try {
    const res = await fetch(`${apiUrl}/api/products/${id}`); // Use apiUrl as base

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

// Fetch multiple products with query parameters from Firestore via your Next.js API
export async function fetchProducts(
  page = 1,
  searchQuery = "",
  sortBy = "id",
  order = "asc",
  category = "",
  itemsPerPage = 20 // Number of items per page
) {
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * itemsPerPage;

    // Fetch products from your API
    const res = await fetch(
      `${apiUrl}/api/products?page=${page}&limit=${itemsPerPage}&offset=${offset}&search=${encodeURIComponent(searchQuery)}&sortBy=${sortBy}&order=${order}&category=${category}`,
      { cache: 'force-cache' }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Format IDs as three-digit strings
    const formattedProducts = data.products.map(product => ({
      ...product,
      id: String(product.id).padStart(3, '0'), // Ensure ID is a three-digit string
    }));

    return {
      products: formattedProducts,
      hasMore: data.hasMore, // This should indicate if there are more products
    };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error; // Rethrow to let the caller handle the error
  }
}
// Fetch categories from Firestore via your Next.js API
export async function fetchCategories() {
  try {
    const res = await fetch(`${apiUrl}/api/categories`); // Use apiUrl as base

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error; // Rethrow to let the caller handle the error
  }
}

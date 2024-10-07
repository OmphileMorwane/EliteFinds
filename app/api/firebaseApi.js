// firebaseApi.js

import { collection, getDocs, doc, getDoc, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Import your Firebase configuration

// Fetch multiple products with filters, search, and pagination
export const fetchProductsFromFirestore = async (page, searchQuery, sortBy, order, category) => {
  const productsCollection = collection(db, "products");
  let productsQuery = query(productsCollection);

  // Filter by category if provided
  if (category) {
    productsQuery = query(productsQuery, where("category", "==", category));
  }

  // Apply search query if provided
  if (searchQuery) {
    productsQuery = query(productsQuery, where("title", ">=", searchQuery), where("title", "<=", searchQuery + "\uf8ff"));
  }

  // Sort the products
  productsQuery = query(productsQuery, orderBy(sortBy, order));

  // Implement pagination
  productsQuery = query(productsQuery, limit(20)); // Adjust limit based on your needs

  // Fetch the products
  const productSnapshot = await getDocs(productsQuery);
  const products = productSnapshot.docs.map((doc) => doc.data());

  return { products, hasMore: products.length === 20 }; // Adjust `hasMore` logic based on your setup
};

// Fetch a single product from Firestore by its ID
export const fetchProductFromFirestore = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      throw new Error(`Product with ID ${productId} not found`);
    }
  } catch (error) {
    console.error("Error fetching product from Firestore:", error);
    throw error;
  }
};

// Fetch categories from Firestore
export const fetchCategoriesFromFirestore = async () => {
  const categoriesCollection = collection(db, "categories");
  const categorySnapshot = await getDocs(categoriesCollection);
  const categories = categorySnapshot.docs.map((doc) => doc.id);
  return categories;
};

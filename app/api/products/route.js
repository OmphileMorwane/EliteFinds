// src/app/api/products/route.js

import { db } from "../../../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

// Fetch products from Firestore with pagination, search, sort, and filter functionalities
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Extract query parameters
  const page = parseInt(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "id";
  const order = searchParams.get("order") || "asc";
  const category = searchParams.get("category") || "";

  try {
    const productsRef = collection(db, "products");

    let filter = [];
    // Dynamically build the query
    let productsQuery = query(productsRef);

    // Apply search filter if present
    if (searchQuery) {
      filter.push(where("title", "==", searchQuery));
    }

    // Apply category filter if present
    if (category) {
      filter.push(where("category", "==", category));
    }

    const itemsPerPage = 20;

    // Apply sorting
    productsQuery = query(
      productsQuery,
      ...filter,
      orderBy(sortBy, order),
      limit(itemsPerPage)
    );

    // Pagination: Limit the number of documents returned

    console.log("queries", productsQuery);
    // Fetch products
    const productsSnapshot = await getDocs(productsQuery);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("db data", products);

    // Determine if there are more products to fetch
    const hasMore = products.length === itemsPerPage;

    return new Response(JSON.stringify({ products, hasMore }), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch products from Firestore:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

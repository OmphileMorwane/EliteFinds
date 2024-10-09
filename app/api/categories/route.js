// src/app/api/categories/route.js

import { db } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Fetch product categories from Firestore
export async function GET() {
  try {
    const categoriesRef = collection(db, "categories");
    const categoriesSnapshot = await getDocs(categoriesRef);

    const categories = categoriesSnapshot.docs.map(doc => doc.data());
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch categories from Firestore:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch categories" }), { status: 500 });
  }
}

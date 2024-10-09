// src/app/api/products/[id]/route.js

import { db } from "../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Fetch a single product by ID from Firestore
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const productRef = doc(db, "products", id);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ id: productSnapshot.id, ...productSnapshot.data() }), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch product from Firestore:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), { status: 500 });
  }
}

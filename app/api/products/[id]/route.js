// src/app/api/products/[id]/route.js

import { db } from "../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Fetch a single product by ID from Firestore
export async function GET(request, { params }) {
  let { id } = params;

  try {
    // Format the ID as a three-digit string (e.g., 1 -> 001, 2 -> 002)
    const paddedId = id.padStart(3, "0");

    // Reference the product in Firestore using the padded ID
    const productRef = doc(db, "products", paddedId);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ id: productSnapshot.id, ...productSnapshot.data() }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch product from Firestore:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch product" }), {
      status: 500,
    });
  }
}

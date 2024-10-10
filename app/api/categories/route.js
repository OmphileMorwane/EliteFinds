// src/app/api/categories/route.js

import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Define the GET handler for this route
/**
 * Handles GET requests for fetching categories from Firestore.
 *
 * @returns {Promise<Response>} A Promise that resolves to a Response object containing the categories or an error message.
 */
export async function GET() {
  try {
    // Reference to the "allCategories" document in the "categories" collection
    const docRef = doc(db, "categories", "allCategories");

    // Fetch the document from Firestore
    const categoriesSnapshot = await getDoc(docRef);

    // Check if the document exists and fetch the data
    if (!categoriesSnapshot.exists()) {
      throw new Error("Document does not exist");
    }

    // Extract categories from the document data
    const categories = categoriesSnapshot.data().categories;

    // Return a successful JSON response with the categories
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    // Return a JSON error response
    return new Response(
      JSON.stringify({
        message: "Error fetching categories",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

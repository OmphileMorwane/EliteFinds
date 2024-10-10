import { db } from "../../firebaseConfig"; // Adjust the path as necessary
import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default async function handler(req, res) {
  const user = getAuth().currentUser; // Check if user is authenticated

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  switch (method) {
    case 'POST':
      return await addReview(req, res);
    case 'PUT':
      return await editReview(req, res);
    case 'DELETE':
      return await deleteReview(req, res);
    case 'GET':
      return await fetchReviews(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}

// Add a new review
async function addReview(req, res) {
  try {
    const { productId, rating, comment, reviewerEmail, reviewerName } = req.body;

    // Add a new review to Firestore
    await addDoc(collection(db, `products/${productId}/reviews`), {
      rating,
      comment,
      reviewerEmail,
      reviewerName,
      date: Timestamp.fromDate(new Date()),
    });

    return res.status(201).json({ message: 'Review added successfully!' });
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ message: 'Error adding review' });
  }
}

// Edit an existing review
async function editReview(req, res) {
  try {
    const { productId, reviewId, rating, comment } = req.body;

    // Update the review in Firestore
    await updateDoc(doc(db, `products/${productId}/reviews`, reviewId), {
      rating,
      comment,
      date: Timestamp.fromDate(new Date()),
    });

    return res.status(200).json({ message: 'Review updated successfully!' });
  } catch (error) {
    console.error('Error updating review:', error);
    return res.status(500).json({ message: 'Error updating review' });
  }
}

// Delete a review
async function deleteReview(req, res) {
  try {
    const { productId, reviewId } = req.body;

    // Delete the review from Firestore
    await deleteDoc(doc(db, `products/${productId}/reviews`, reviewId));

    return res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Error deleting review' });
  }
}

// Fetch reviews for a specific product
async function fetchReviews(req, res) {
  const { productId } = req.query;

  try {
    const reviewsRef = collection(db, `products/${productId}/reviews`);
    const reviewsSnapshot = await getDocs(reviewsRef);
    const reviews = reviewsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Error fetching reviews' });
  }
}

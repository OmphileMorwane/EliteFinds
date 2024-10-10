// pages/api/reviews/addReview.js
import { db, auth } from '../../../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { productId, rating, comment, reviewerEmail, reviewerName } = req.body;
      
      // Ensure the user is authenticated
      const user = getAuth().currentUser;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Add a new review to the specified product's reviews collection
      await addDoc(collection(db, `products/${productId}/reviews`), {
        rating,
        comment,
        reviewerEmail,
        reviewerName,
        date: Timestamp.fromDate(new Date()), // Save current timestamp
      });

      return res.status(201).json({ message: 'Review added successfully!' });
    } catch (error) {
      console.error('Error adding review:', error);
      return res.status(500).json({ message: 'Error adding review' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

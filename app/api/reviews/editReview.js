import { db, auth } from '../../../firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { productId, reviewId, rating, comment } = req.body;

      // Ensure the user is authenticated
      const user = getAuth().currentUser;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Update the specified review
      await updateDoc(doc(db, `products/${productId}/reviews`, reviewId), {
        rating,
        comment,
        date: Timestamp.fromDate(new Date()), // Save the updated timestamp
      });

      return res.status(200).json({ message: 'Review updated successfully!' });
    } catch (error) {
      console.error('Error updating review:', error);
      return res.status(500).json({ message: 'Error updating review' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

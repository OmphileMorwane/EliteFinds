import { db, auth } from '../../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const { productId, reviewId } = req.body;

      // Ensure the user is authenticated
      const user = getAuth().currentUser;
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Delete the specified review
      await deleteDoc(doc(db, `products/${productId}/reviews`, reviewId));

      return res.status(200).json({ message: 'Review deleted successfully!' });
    } catch (error) {
      console.error('Error deleting review:', error);
      return res.status(500).json({ message: 'Error deleting review' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

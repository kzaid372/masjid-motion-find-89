
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db';
import { verifyAuth } from '../middleware/auth';

const router = express.Router();

// Get current user's saved masjids
router.get('/saved-masjids', verifyAuth, async (req: Request, res: Response) => {
  try {
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId as string) });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get the actual masjid documents for the saved IDs
    const savedMasjids = await db.collection('masjids')
      .find({ _id: { $in: user.savedMasjids || [] } })
      .toArray();
    
    res.json(savedMasjids);
  } catch (error) {
    console.error('Error getting saved masjids:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle a masjid in user's saved list (add if not present, remove if present)
router.post('/toggle-saved/:masjidId', verifyAuth, async (req: Request, res: Response) => {
  try {
    const { masjidId } = req.params;
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    // Check if the masjid exists
    const masjid = await db.collection('masjids').findOne({ _id: new ObjectId(masjidId) });
    if (!masjid) {
      return res.status(404).json({ message: 'Masjid not found' });
    }
    
    // Check if the user has already saved this masjid
    const user = await db.collection('users').findOne({
      _id: new ObjectId(userId as string),
      savedMasjids: new ObjectId(masjidId),
    });
    
    if (user) {
      // Masjid is already saved, so remove it
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId as string) },
        { $pull: { savedMasjids: new ObjectId(masjidId) } }
      );
      res.json({ success: true, action: 'removed' });
    } else {
      // Masjid is not saved, so add it
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId as string) },
        { $addToSet: { savedMasjids: new ObjectId(masjidId) } }
      );
      res.json({ success: true, action: 'added' });
    }
  } catch (error) {
    console.error('Error toggling saved masjid:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

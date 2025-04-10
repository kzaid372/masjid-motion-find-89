
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db';
import { verifyAuth } from '../middleware/auth';
import { Masjid, User } from '../models/types';

const router = express.Router();

// Update user profile (requires authentication)
router.put('/profile', verifyAuth, async (req: Request, res: Response) => {
  try {
    const { userId } = req; // From verifyAuth middleware
    const { displayName, photoURL } = req.body;
    const db = getDb();
    
    await db.collection<User>('users').updateOne(
      { _id: new ObjectId(userId as string) },
      { 
        $set: { 
          displayName,
          photoURL,
          updatedAt: new Date(),
        } 
      }
    );
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get user's saved masjids (requires authentication)
router.get('/saved-masjids', verifyAuth, async (req: Request, res: Response) => {
  try {
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    // Get user with saved masjids
    const user = await db.collection<User>('users').findOne({
      _id: new ObjectId(userId as string),
    });
    
    if (!user || !user.savedMasjids || user.savedMasjids.length === 0) {
      return res.json([]);
    }
    
    // Get masjid details for each saved masjid
    const savedMasjids = await db.collection<Masjid>('masjids').find({
      _id: { $in: user.savedMasjids }
    }).toArray();
    
    return res.json(savedMasjids);
  } catch (error) {
    console.error('Error getting saved masjids:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;


import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db';
import { verifyAuth } from '../middleware/auth';
import { Masjid } from '../models/types';

const router = express.Router();

// Get all masjids
router.get('/', async (req: Request, res: Response) => {
  try {
    const db = getDb();
    const masjids = await db.collection('masjids').find({}).toArray();
    res.json(masjids);
  } catch (error) {
    console.error('Error getting masjids:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get nearby masjids
router.get('/nearby', async (req: Request, res: Response) => {
  try {
    const { lat, lng, limit = '10', distance = '10' } = req.query;
    
    // Validate parameters
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const db = getDb();
    
    // In a real app, you'd use geospatial queries
    // For this example, we'll simulate by fetching all and computing distance
    const masjids = await db.collection<Masjid>('masjids').find({}).toArray();
    
    // Calculate distance (very basic approximation)
    const nearbyMasjids = masjids.map(masjid => {
      // Get coordinates from the location object
      const masjidLat = masjid.location ? masjid.location.coordinates[1] : 0;
      const masjidLng = masjid.location ? masjid.location.coordinates[0] : 0;
      
      const latDiff = parseFloat(lat as string) - masjidLat;
      const lngDiff = parseFloat(lng as string) - masjidLng;
      const d = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
      const kmDistance = d * 111; // Rough conversion to km
      
      return {
        ...masjid,
        distance: `${kmDistance.toFixed(1)} km away`
      };
    })
    // Filter by distance
    .filter(masjid => {
      const distanceValue = parseFloat(masjid.distance.split(' ')[0]);
      return distanceValue <= parseFloat(distance as string);
    })
    // Sort by distance
    .sort((a, b) => {
      const distA = parseFloat(a.distance.split(' ')[0]);
      const distB = parseFloat(b.distance.split(' ')[0]);
      return distA - distB;
    })
    // Limit results
    .slice(0, parseInt(limit as string));
    
    res.json(nearbyMasjids);
  } catch (error) {
    console.error('Error getting nearby masjids:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single masjid by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = getDb();
    
    const masjid = await db.collection<Masjid>('masjids').findOne({ _id: new ObjectId(id) });
    
    if (!masjid) {
      return res.status(404).json({ message: 'Masjid not found' });
    }
    
    res.json(masjid);
  } catch (error) {
    console.error('Error getting masjid:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Save a masjid to user's saved list (requires authentication)
router.post('/save/:id', verifyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    // Check if masjid exists
    const masjid = await db.collection<Masjid>('masjids').findOne({ _id: new ObjectId(id) });
    
    if (!masjid) {
      return res.status(404).json({ message: 'Masjid not found' });
    }
    
    // Add masjid to user's saved list
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId as string) },
      { $addToSet: { savedMasjids: new ObjectId(id) } }
    );
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Error saving masjid:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Remove a masjid from user's saved list (requires authentication)
router.delete('/save/:id', verifyAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    // Remove masjid from user's saved list
    await db.collection('users').updateOne(
      { _id: new ObjectId(userId as string) },
      { $pull: { savedMasjids: new ObjectId(id) } }
    );
    
    return res.json({ success: true });
  } catch (error) {
    console.error('Error removing saved masjid:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;

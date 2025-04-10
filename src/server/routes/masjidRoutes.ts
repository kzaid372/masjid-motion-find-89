
import express from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db';
import { Masjid } from '../models/types';
import { verifyAuth } from '../middleware/auth';

const router = express.Router();

// Get nearby masjids
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5 } = req.query;
    const db = getDb();
    
    // Validate parameters
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    // Convert parameters to numbers
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    const radiusInKm = parseFloat(radius as string);
    
    // Find masjids within the radius
    const masjids = await db.collection<Masjid>('masjids').find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusInKm * 1000, // Convert km to meters
        },
      },
    }).toArray();
    
    // Calculate distances
    const masjidsWithDistance = masjids.map(masjid => {
      const [masjidLng, masjidLat] = masjid.location.coordinates;
      const distance = calculateDistance(latitude, longitude, masjidLat, masjidLng);
      return {
        ...masjid,
        distance: `${distance.toFixed(1)} km`,
      };
    });
    
    res.json(masjidsWithDistance);
  } catch (error) {
    console.error('Error getting nearby masjids:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get masjid by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDb();
    
    const masjid = await db.collection<Masjid>('masjids').findOne({
      _id: new ObjectId(id),
    });
    
    if (!masjid) {
      return res.status(404).json({ message: 'Masjid not found' });
    }
    
    res.json(masjid);
  } catch (error) {
    console.error('Error getting masjid:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search masjids
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const db = getDb();
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const masjids = await db.collection<Masjid>('masjids').find({
      $or: [
        { name: { $regex: q as string, $options: 'i' } },
        { address: { $regex: q as string, $options: 'i' } },
      ],
    }).toArray();
    
    res.json(masjids);
  } catch (error) {
    console.error('Error searching masjids:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle save masjid (requires authentication)
router.post('/save', verifyAuth, async (req, res) => {
  try {
    const { masjidId } = req.body;
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    if (!masjidId) {
      return res.status(400).json({ message: 'Masjid ID is required' });
    }
    
    // Check if masjid exists
    const masjid = await db.collection<Masjid>('masjids').findOne({
      _id: new ObjectId(masjidId),
    });
    
    if (!masjid) {
      return res.status(404).json({ message: 'Masjid not found' });
    }
    
    // Check if masjid is already saved
    const user = await db.collection('users').findOne({
      _id: new ObjectId(userId),
      savedMasjids: new ObjectId(masjidId),
    });
    
    if (user) {
      // Masjid is already saved, remove it
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { savedMasjids: new ObjectId(masjidId) } }
      );
      res.json({ saved: false });
    } else {
      // Masjid is not saved, add it
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $addToSet: { savedMasjids: new ObjectId(masjidId) } }
      );
      res.json({ saved: true });
    }
  } catch (error) {
    console.error('Error toggling saved masjid:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get saved masjids (requires authentication)
router.get('/saved', verifyAuth, async (req, res) => {
  try {
    const { userId } = req; // From verifyAuth middleware
    const db = getDb();
    
    // Get user's saved masjids
    const user = await db.collection('users').findOne({
      _id: new ObjectId(userId),
    });
    
    if (!user || !user.savedMasjids || user.savedMasjids.length === 0) {
      return res.json([]);
    }
    
    // Get masjid details
    const savedMasjids = await db.collection<Masjid>('masjids').find({
      _id: { $in: user.savedMasjids },
    }).toArray();
    
    res.json(savedMasjids);
  } catch (error) {
    console.error('Error getting saved masjids:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}

export default router;

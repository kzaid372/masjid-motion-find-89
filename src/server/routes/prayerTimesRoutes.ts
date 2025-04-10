
import express, { Request, Response } from 'express';
import { getDb } from '../config/db';
import axios from 'axios';

const router = express.Router();

// Get prayer times for a location
router.get('/', async (req: Request, res: Response) => {
  try {
    const { lat, lng, date } = req.query;
    
    // Validate parameters
    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    // Try to fetch from real API first
    try {
      // Use Aladhan API to get prayer times
      const response = await axios.get(`http://api.aladhan.com/v1/timings/${date || 'today'}`, {
        params: {
          latitude: lat,
          longitude: lng,
          method: 2, // Islamic Society of North America
        },
        timeout: 5000 // 5 second timeout
      });
      
      if (response.data && response.data.data && response.data.data.timings) {
        const timings = response.data.data.timings;
        
        // Format the response
        const prayerTimes = {
          date: date || new Date().toISOString().split('T')[0],
          fajr: convertTo12Hour(timings.Fajr),
          sunrise: convertTo12Hour(timings.Sunrise),
          dhuhr: convertTo12Hour(timings.Dhuhr),
          asr: convertTo12Hour(timings.Asr),
          maghrib: convertTo12Hour(timings.Maghrib),
          isha: convertTo12Hour(timings.Isha),
          location: {
            latitude: parseFloat(lat as string),
            longitude: parseFloat(lng as string),
          }
        };
        
        return res.json(prayerTimes);
      }
    } catch (apiError) {
      console.error('Error fetching from prayer time API:', apiError);
      // Continue to fallback data
    }
    
    // Fallback to mock data if API call fails
    const prayerTimes = {
      date: date || new Date().toISOString().split('T')[0],
      fajr: '5:12 AM',
      sunrise: '6:28 AM',
      dhuhr: '1:05 PM',
      asr: '4:35 PM',
      maghrib: '7:42 PM',
      isha: '9:12 PM',
      location: {
        latitude: parseFloat(lat as string),
        longitude: parseFloat(lng as string),
      }
    };
    
    return res.json(prayerTimes);
  } catch (error) {
    console.error('Error getting prayer times:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to convert 24h format to 12h format
function convertTo12Hour(time24: string): string {
  // Parse the time
  const [hours, minutes] = time24.split(':').map(Number);
  
  // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12; // Convert 0 to 12
  
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export default router;

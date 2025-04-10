
import { connectToDatabase } from '../config/db';
import { Masjid, User, Review } from '../models/types';

async function seedDatabase() {
  try {
    const db = await connectToDatabase();
    
    // Check if data already exists
    const masjidCount = await db.collection('masjids').countDocuments();
    if (masjidCount > 0) {
      console.log('Database already seeded');
      return;
    }
    
    // Create indexes
    await db.collection('masjids').createIndex({ location: '2dsphere' });
    await db.collection('users').createIndex({ firebaseId: 1 }, { unique: true });
    await db.collection('reviews').createIndex({ masjidId: 1 });
    await db.collection('reviews').createIndex({ userId: 1 });
    
    // Sample masjids
    const masjids: Partial<Masjid>[] = [
      {
        name: 'Al-Noor Mosque',
        address: '123 Islamic Way, New York, NY 10001',
        location: {
          type: 'Point',
          coordinates: [-74.0060, 40.7128] // [longitude, latitude]
        },
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        facilities: ['Parking', 'Wudhu Area', 'Women Section'],
        prayerTimes: {
          fajr: '5:30 AM',
          dhuhr: '1:00 PM',
          asr: '4:30 PM',
          maghrib: '7:15 PM',
          isha: '8:45 PM',
          jummah: '1:30 PM'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Masjid Al-Rahman',
        address: '456 Faith Street, New York, NY 10002',
        location: {
          type: 'Point',
          coordinates: [-74.0053, 40.7145] // [longitude, latitude]
        },
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        facilities: ['Library', 'Prayer Mats', 'AC'],
        prayerTimes: {
          fajr: '5:25 AM',
          dhuhr: '1:05 PM',
          asr: '4:35 PM',
          maghrib: '7:10 PM',
          isha: '8:40 PM',
          jummah: '1:20 PM'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Islamic Center',
        address: '789 Deen Avenue, New York, NY 10003',
        location: {
          type: 'Point',
          coordinates: [-73.9957, 40.7315] // [longitude, latitude]
        },
        rating: 4.2,
        imageUrl: 'https://images.unsplash.com/photo-1609158762357-c6f0c931ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        facilities: ['Quran Classes', 'Cafe', 'Wheelchair Access'],
        prayerTimes: {
          fajr: '5:20 AM',
          dhuhr: '1:10 PM',
          asr: '4:32 PM',
          maghrib: '7:12 PM',
          isha: '8:50 PM',
          jummah: '1:15 PM'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Al-Falah Mosque',
        address: '101 Barakah Blvd, New York, NY 10004',
        location: {
          type: 'Point',
          coordinates: [-74.0125, 40.6995] // [longitude, latitude]
        },
        rating: 4.0,
        imageUrl: 'https://images.unsplash.com/photo-1591022364707-34ee5cffecdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
        facilities: ['Parking', 'Kids Area'],
        prayerTimes: {
          fajr: '5:18 AM',
          dhuhr: '1:15 PM',
          asr: '4:33 PM',
          maghrib: '7:13 PM',
          isha: '8:55 PM',
          jummah: '1:25 PM'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    const result = await db.collection('masjids').insertMany(masjids);
    console.log(`${result.insertedCount} masjids inserted`);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
}

seedDatabase();

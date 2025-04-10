
import React from 'react';
import MasjidCard from './MasjidCard';

// Mock data for recommended masjids
const recommendedMasjids = [
  {
    id: '1',
    name: 'Al-Noor Mosque',
    address: '123 Islamic Way, New York, NY 10001',
    distance: '1.2 km',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: "Al-Noor Mosque serves as a vibrant community center with daily prayers, Quran classes, and regular community events. The mosque welcomes Muslims from all backgrounds.",
    facilities: ['Parking', 'Wudhu Area', 'Women Section'],
    nextPrayer: {
      name: 'Asr',
      time: '4:30 PM',
    },
    prayerTimes: {
      fajr: '5:30 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '7:15 PM',
      isha: '8:45 PM',
      jummah: '1:30 PM'
    }
  },
  {
    id: '2',
    name: 'Masjid Al-Rahman',
    address: '456 Faith Street, New York, NY 10002',
    distance: '2.5 km',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: "Masjid Al-Rahman is known for its beautiful architecture and spacious prayer halls. The mosque provides educational programs and social services to the community.",
    facilities: ['Library', 'Prayer Mats', 'AC'],
    nextPrayer: {
      name: 'Asr',
      time: '4:35 PM',
    },
    prayerTimes: {
      fajr: '5:25 AM',
      dhuhr: '1:05 PM',
      asr: '4:35 PM',
      maghrib: '7:10 PM',
      isha: '8:40 PM',
      jummah: '1:20 PM'
    }
  },
  {
    id: '3',
    name: 'Islamic Center',
    address: '789 Deen Avenue, New York, NY 10003',
    distance: '3.0 km',
    rating: 4.2,
    imageUrl: 'https://images.unsplash.com/photo-1609158762357-c6f0c931ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description: "The Islamic Center combines modern facilities with traditional Islamic values. It offers a wide range of activities including youth programs and interfaith dialogues.",
    facilities: ['Quran Classes', 'Cafe', 'Wheelchair Access'],
    nextPrayer: {
      name: 'Asr',
      time: '4:32 PM',
    },
    prayerTimes: {
      fajr: '5:20 AM',
      dhuhr: '1:10 PM',
      asr: '4:32 PM',
      maghrib: '7:12 PM',
      isha: '8:50 PM',
      jummah: '1:15 PM'
    }
  },
];

const RecommendedMasjids = () => {
  return (
    <section className="py-16 bg-gray-50 pattern-bg dark:bg-gray-900/50 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-masjid-dark dark:text-gray-100 mb-4">
            Recommended <span className="text-masjid-green">Masjids</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover top-rated mosques near you with excellent facilities and services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedMasjids.map((masjid) => (
            <MasjidCard key={masjid.id} {...masjid} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedMasjids;

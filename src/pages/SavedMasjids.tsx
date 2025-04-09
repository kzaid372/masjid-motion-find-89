
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MasjidCard from '@/components/MasjidCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Heart, List, Grid, Trash2 } from 'lucide-react';

// Mock data for saved masjids
const savedMasjids = [
  {
    id: '1',
    name: 'Al-Noor Mosque',
    address: '123 Islamic Way, New York, NY 10001',
    distance: '1.2 km',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    facilities: ['Parking', 'Wudhu Area', 'Women Section'],
    nextPrayer: {
      name: 'Asr',
      time: '4:30 PM',
    },
  },
  {
    id: '2',
    name: 'Masjid Al-Rahman',
    address: '456 Faith Street, New York, NY 10002',
    distance: '2.5 km',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    facilities: ['Library', 'Prayer Mats', 'AC'],
    nextPrayer: {
      name: 'Asr',
      time: '4:35 PM',
    },
  },
];

const SavedMasjids = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-masjid-dark">
              Your Saved <span className="text-masjid-green">Masjids</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Quickly access your favorite mosques and prayer times
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 animate-fade-in">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search saved masjids..." 
                className="pl-10 pr-4 border-masjid-green/20 focus:border-masjid-green focus:ring-masjid-green/20 w-full md:w-80"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                <List className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                <Grid className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                <Heart className="h-4 w-4 mr-2 fill-masjid-green" />
                Favorites
              </Button>
              <Button variant="outline" className="border-masjid-green/20 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
          
          {savedMasjids.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {savedMasjids.map((masjid) => (
                <MasjidCard key={masjid.id} {...masjid} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-masjid-dark">No saved masjids yet</h3>
              <p className="text-gray-600 mb-6">Start saving your favorite mosques to access them quickly</p>
              <Button asChild className="bg-masjid-green hover:bg-masjid-green/90">
                <a href="/find">Find Masjids</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedMasjids;


import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import SimpleMap from '@/components/SimpleMap';
import MasjidCard from '@/components/MasjidCard';
import FilterPanel, { FilterOptions } from '@/components/FilterPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, List, MapIcon, Filter, Navigation } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const nearbyMasjids = [
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
  {
    id: '4',
    name: 'Al-Falah Mosque',
    address: '101 Barakah Blvd, New York, NY 10004',
    distance: '3.8 km',
    rating: 4.0,
    imageUrl: 'https://images.unsplash.com/photo-1591022364707-34ee5cffecdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    facilities: ['Parking', 'Kids Area'],
    nextPrayer: {
      name: 'Asr',
      time: '4:33 PM',
    },
    prayerTimes: {
      fajr: '5:18 AM',
      dhuhr: '1:15 PM',
      asr: '4:33 PM',
      maghrib: '7:13 PM',
      isha: '8:55 PM',
      jummah: '1:25 PM'
    }
  },
];

const FindMasjid = () => {
  const [searchResults, setSearchResults] = useState(nearbyMasjids);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setSearchResults(nearbyMasjids);
  };

  const findNearbyMasjids = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Found Nearby Masjids",
        description: "We've found 4 masjids near your current location.",
      });
      setSearchResults(nearbyMasjids);
      setIsLoading(false);
    }, 1500);
  };

  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    
    console.log('Applied filters:', filters);
    
    const filteredResults = nearbyMasjids.filter(masjid => {
      const distanceNum = parseFloat(masjid.distance.split(' ')[0]);
      return distanceNum <= filters.distance;
    });
    
    setSearchResults(filteredResults);
    
    toast({
      title: "Filters Applied",
      description: `Showing masjids within ${filters.distance}km of your location.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-950">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <motion.div 
          className="container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Find <span className="text-masjid-green">Masjids</span> Near You
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Search for mosques in your area, check prayer times, and get directions
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
              <SearchBar onSearch={handleSearch} className="w-full" />
              <Button 
                onClick={findNearbyMasjids}
                className="w-full sm:w-auto bg-masjid-gold hover:bg-masjid-gold/90 text-white" 
                disabled={isLoading}
              >
                <Navigation className="mr-2 h-4 w-4" />
                {isLoading ? 'Finding...' : 'Find Nearby'}
              </Button>
            </div>
            
            <div className="flex justify-between items-center gap-2 mb-6">
              <Tabs defaultValue="map" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger 
                    value="map" 
                    onClick={() => setView('map')}
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    <MapIcon className="h-4 w-4 mr-2" />
                    Map View
                  </TabsTrigger>
                  <TabsTrigger 
                    value="list" 
                    onClick={() => setView('list')}
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    <List className="h-4 w-4 mr-2" />
                    List View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 border-masjid-green text-masjid-green hover:bg-masjid-green/10"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
            
            {activeFilters && (
              <div className="bg-masjid-green/10 rounded-lg p-2 mb-4 flex items-center justify-between">
                <p className="text-sm text-masjid-green">
                  Showing masjids within {activeFilters.distance}km
                  {activeFilters.prayerTime !== 'any' && `, prayer: ${activeFilters.prayerTime}`}
                  {activeFilters.openNow && ', currently open'}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setActiveFilters(null);
                    setSearchResults(nearbyMasjids);
                  }}
                  className="text-masjid-green hover:text-masjid-green/80 h-8"
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
          
          {view === 'map' ? (
            <div className="space-y-8">
              <SimpleMap />
              
              <div>
                <h2 className="text-xl font-semibold mb-4 text-masjid-dark dark:text-white">Mosques Near You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((masjid) => (
                    <motion.div 
                      key={masjid.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MasjidCard {...masjid} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((masjid) => (
                  <motion.div 
                    key={masjid.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MasjidCard {...masjid} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No masjids found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setActiveFilters(null);
                      setSearchResults(nearbyMasjids);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
      
      <FilterPanel 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApplyFilters={applyFilters}
      />
      
      <Footer />
    </div>
  );
};

export default FindMasjid;

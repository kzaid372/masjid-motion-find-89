import React, { useState, useEffect } from 'react';
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
import { MasjidApi } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';

const FindMasjid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [view, setView] = useState<'map' | 'list'>('map');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not access your location. Using default location.",
            variant: "destructive",
          });
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    }
  }, []);
  
  const { data: nearbyMasjids, isLoading: isLoadingNearby, refetch } = useQuery({
    queryKey: ['nearbyMasjids', userLocation],
    queryFn: () => userLocation ? MasjidApi.getNearby(userLocation.lat, userLocation.lng, 5) : Promise.resolve([]),
    enabled: !!userLocation,
    onSuccess: (data) => {
      setSearchResults(data);
    },
    onError: (error) => {
      console.error("Error fetching nearby masjids:", error);
      toast({
        title: "Error",
        description: "Failed to fetch nearby masjids. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      if (nearbyMasjids) {
        setSearchResults(nearbyMasjids);
      }
      return;
    }
    
    setIsLoading(true);
    try {
      const results = await MasjidApi.search(query);
      setSearchResults(results);
      toast({
        title: "Search Results",
        description: `Found ${results.length} masjids matching "${query}"`,
      });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const findNearbyMasjids = () => {
    setIsLoading(true);
    
    if (userLocation) {
      refetch().then(() => {
        toast({
          title: "Found Nearby Masjids",
          description: `We've found ${nearbyMasjids?.length || 0} masjids near your current location.`,
        });
        setIsLoading(false);
      });
    } else {
      toast({
        title: "Location Error",
        description: "Could not access your location. Please enable location services.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    
    console.log('Applied filters:', filters);
    
    if (!nearbyMasjids) return;
    
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
                disabled={isLoading || isLoadingNearby}
              >
                <Navigation className="mr-2 h-4 w-4" />
                {isLoading || isLoadingNearby ? 'Finding...' : 'Find Nearby'}
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
                    if (nearbyMasjids) setSearchResults(nearbyMasjids);
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
              <SimpleMap masjids={searchResults} userLocation={userLocation} />
              
              <div>
                <h2 className="text-xl font-semibold mb-4 text-masjid-dark dark:text-white">Mosques Near You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.length > 0 ? (
                    searchResults.map((masjid) => (
                      <motion.div 
                        key={masjid._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <MasjidCard {...masjid} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        {isLoadingNearby ? 'Loading masjids...' : 'No masjids found in this area.'}
                      </p>
                      {!isLoadingNearby && (
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={findNearbyMasjids}
                        >
                          Retry Search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((masjid) => (
                  <motion.div 
                    key={masjid._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MasjidCard {...masjid} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    {isLoadingNearby ? 'Loading masjids...' : 'No masjids found matching your criteria.'}
                  </p>
                  {!isLoadingNearby && activeFilters && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setActiveFilters(null);
                        if (nearbyMasjids) setSearchResults(nearbyMasjids);
                      }}
                    >
                      Reset Filters
                    </Button>
                  )}
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

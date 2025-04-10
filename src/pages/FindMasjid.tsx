
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterPanel, { FilterOptions } from '@/components/FilterPanel';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { MasjidApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

// Import the extracted components
import SearchSection from '@/components/find-masjid/SearchSection';
import ViewToggle from '@/components/find-masjid/ViewToggle';
import ActiveFiltersDisplay from '@/components/find-masjid/ActiveFiltersDisplay';
import MapView from '@/components/find-masjid/MapView';
import ListView from '@/components/find-masjid/ListView';
import { useNearbyMasjids } from '@/components/find-masjid/useNearbyMasjids';

const FindMasjid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'map' | 'list'>('map');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  
  const {
    userLocation,
    nearbyMasjids,
    isLoadingNearby,
    searchResults,
    setSearchResults,
    refetch
  } = useNearbyMasjids();
  
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

  const handleClearFilters = () => {
    setActiveFilters(null);
    if (nearbyMasjids) setSearchResults(nearbyMasjids);
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
          <SearchSection 
            onSearch={handleSearch} 
            onFindNearby={findNearbyMasjids} 
            isLoading={isLoading || isLoadingNearby} 
          />
          
          <ViewToggle 
            view={view} 
            onViewChange={setView} 
            onFilterClick={() => setIsFilterOpen(true)} 
          />
          
          <ActiveFiltersDisplay 
            activeFilters={activeFilters} 
            onClearFilters={handleClearFilters} 
          />
          
          {view === 'map' ? (
            <MapView 
              masjids={searchResults} 
              userLocation={userLocation} 
              isLoading={isLoadingNearby}
              onRetrySearch={findNearbyMasjids}
            />
          ) : (
            <ListView 
              masjids={searchResults} 
              isLoading={isLoadingNearby} 
              activeFilters={activeFilters}
              onResetFilters={handleClearFilters}
            />
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

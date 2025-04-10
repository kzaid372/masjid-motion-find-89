
import React from 'react';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  onFindNearby: () => void;
  isLoading: boolean;
}

const SearchSection = ({ onSearch, onFindNearby, isLoading }: SearchSectionProps) => {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Find <span className="text-masjid-green">Masjids</span> Near You
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Search for mosques in your area, check prayer times, and get directions
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <SearchBar onSearch={onSearch} className="w-full" />
          <Button 
            onClick={onFindNearby}
            className="w-full sm:w-auto bg-masjid-gold hover:bg-masjid-gold/90 text-white" 
            disabled={isLoading}
          >
            <Navigation className="mr-2 h-4 w-4" />
            {isLoading ? 'Finding...' : 'Find Nearby'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchSection;


import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for mosques nearby...",
  className = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };
  
  const clearSearch = () => {
    setQuery('');
  };
  
  const useCurrentLocation = () => {
    // In a real app, this would use the browser's geolocation API
    console.log('Using current location');
    if (onSearch) {
      onSearch('CURRENT_LOCATION');
    }
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden border border-gray-200 focus-within:border-masjid-green focus-within:ring-1 focus-within:ring-masjid-green/50 transition-all duration-300">
          <div className="pl-4">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
          />
          
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-9 w-9 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            type="button"
            onClick={useCurrentLocation}
            variant="ghost"
            className="p-2 text-masjid-green hover:text-masjid-green/80"
          >
            <MapPin className="h-5 w-5" />
            <span className="ml-1 hidden sm:inline">Current Location</span>
          </Button>
          
          <Button type="submit" className="h-full px-5 py-2 bg-masjid-green hover:bg-masjid-green/90 text-white rounded-none">
            <span className="hidden sm:inline mr-1">Search</span>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

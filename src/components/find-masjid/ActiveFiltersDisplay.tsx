
import React from 'react';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/components/FilterPanel';

interface ActiveFiltersDisplayProps {
  activeFilters: FilterOptions | null;
  onClearFilters: () => void;
}

const ActiveFiltersDisplay = ({ activeFilters, onClearFilters }: ActiveFiltersDisplayProps) => {
  if (!activeFilters) return null;
  
  return (
    <div className="bg-masjid-green/10 rounded-lg p-2 mb-4 flex items-center justify-between">
      <p className="text-sm text-masjid-green">
        Showing masjids within {activeFilters.distance}km
        {activeFilters.prayerTime !== 'any' && `, prayer: ${activeFilters.prayerTime}`}
        {activeFilters.openNow && ', currently open'}
      </p>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearFilters}
        className="text-masjid-green hover:text-masjid-green/80 h-8"
      >
        Clear
      </Button>
    </div>
  );
};

export default ActiveFiltersDisplay;

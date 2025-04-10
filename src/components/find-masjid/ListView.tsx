
import React from 'react';
import MasjidCard from '@/components/MasjidCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FilterOptions } from '@/components/FilterPanel';

interface ListViewProps {
  masjids: any[];
  isLoading: boolean;
  activeFilters: FilterOptions | null;
  onResetFilters: () => void;
}

const ListView = ({ masjids, isLoading, activeFilters, onResetFilters }: ListViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {masjids.length > 0 ? (
        masjids.map((masjid) => (
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
            {isLoading ? 'Loading masjids...' : 'No masjids found matching your criteria.'}
          </p>
          {!isLoading && activeFilters && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onResetFilters}
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ListView;

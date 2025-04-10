
import React from 'react';
import SimpleMap from '@/components/SimpleMap';
import MasjidCard from '@/components/MasjidCard';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface MapViewProps {
  masjids: any[];
  userLocation: { lat: number; lng: number } | null;
  isLoading: boolean;
  onRetrySearch: () => void;
}

const MapView = ({ masjids, userLocation, isLoading, onRetrySearch }: MapViewProps) => {
  return (
    <div className="space-y-8">
      <SimpleMap masjids={masjids} userLocation={userLocation} />
      
      <div>
        <h2 className="text-xl font-semibold mb-4 text-masjid-dark dark:text-white">Mosques Near You</h2>
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
                {isLoading ? 'Loading masjids...' : 'No masjids found in this area.'}
              </p>
              {!isLoading && (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={onRetrySearch}
                >
                  Retry Search
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;

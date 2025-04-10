
import React from 'react';
import { MapPin } from 'lucide-react';

interface SimpleMapProps {
  masjids?: any[];
  userLocation?: { lat: number; lng: number } | null;
}

// In a real application, this would be an actual map using Google Maps, Mapbox, etc.
const SimpleMap = ({ masjids = [], userLocation }: SimpleMapProps) => {
  return (
    <div className="relative w-full h-[70vh] bg-gray-100 rounded-xl overflow-hidden shadow-md">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-masjid-green mx-auto animate-pulse-gentle" />
          <p className="mt-4 text-gray-600">
            Map component would be integrated here with a real mapping API like Google Maps or Mapbox.
          </p>
          {userLocation && (
            <p className="mt-2 text-sm text-masjid-green">
              Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          )}
        </div>
      </div>
      
      {/* This overlay simulates a map */}
      <div className="absolute inset-0 pattern-bg opacity-30"></div>
      
      {/* Pins simulation */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-12 -translate-y-6">
        <div className="bg-masjid-green text-white p-1 rounded-full shadow-lg animate-bounce-slow">
          <MapPin className="h-6 w-6" />
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/3 transform -translate-x-3 -translate-y-8">
        <div className="bg-masjid-gold text-white p-1 rounded-full shadow-lg">
          <MapPin className="h-5 w-5" />
        </div>
      </div>
      
      <div className="absolute bottom-1/3 right-1/3 transform translate-x-5 translate-y-4">
        <div className="bg-masjid-green text-white p-1 rounded-full shadow-lg">
          <MapPin className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;

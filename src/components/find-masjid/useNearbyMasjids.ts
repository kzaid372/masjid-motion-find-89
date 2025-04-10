
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MasjidApi } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

export const useNearbyMasjids = () => {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
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
          setUserLocation({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
        }
      );
    }
  }, []);
  
  const { data: nearbyMasjids, isLoading: isLoadingNearby, refetch } = useQuery({
    queryKey: ['nearbyMasjids', userLocation],
    queryFn: () => userLocation ? MasjidApi.getNearby(userLocation.lat, userLocation.lng, 5) : Promise.resolve([]),
    enabled: !!userLocation,
    meta: {
      onSuccess: (data: any[]) => {
        setSearchResults(data);
      },
      onError: (error: Error) => {
        console.error("Error fetching nearby masjids:", error);
        // Toast notification already handled in the API call
      }
    }
  });

  return {
    userLocation,
    nearbyMasjids,
    isLoadingNearby,
    searchResults,
    setSearchResults,
    refetch
  };
};

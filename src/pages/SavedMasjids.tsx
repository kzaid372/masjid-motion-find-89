
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MasjidCard from '@/components/MasjidCard';
import { useAuth } from '@/context/AuthContext';
import AuthButton from '@/components/AuthButton';
import { Loader2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MasjidApi } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

const SavedMasjids = () => {
  const { user } = useAuth();
  
  // Fetch saved masjids using react-query with our API service
  const { data: savedMasjids, isLoading, isError, refetch } = useQuery({
    queryKey: ['savedMasjids', user?.id],
    queryFn: () => MasjidApi.getSaved(),
    enabled: !!user, // Only run query if user is logged in
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle the case when a user removes a masjid from saved
  const handleUnsave = async (masjidId: string) => {
    if (!user) return;
    
    try {
      await MasjidApi.toggleSaved(masjidId);
      // Optimistically update the UI by refetching saved masjids
      refetch();
      
      toast({
        title: "Masjid removed",
        description: "The masjid has been removed from your saved list.",
      });
    } catch (error) {
      console.error("Error removing masjid:", error);
      toast({
        title: "Error",
        description: "Failed to remove the masjid. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-masjid-dark dark:text-white mb-8">
          Your Saved <span className="text-masjid-green">Masjids</span>
        </h1>
        
        {!user ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <Heart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-masjid-dark dark:text-white mb-4">
              Sign in to save your favorite masjids
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Create an account or sign in to save masjids, track prayer times, and receive notifications.
            </p>
            <div className="flex justify-center">
              <AuthButton variant="default" size="lg" fullWidth={false} />
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-masjid-green" />
                <span className="ml-2 text-masjid-dark dark:text-white">Loading your saved masjids...</span>
              </div>
            ) : isError ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  There was an error loading your saved masjids. Please try again.
                </p>
                <Button onClick={() => refetch()}>Retry</Button>
              </div>
            ) : savedMasjids && savedMasjids.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedMasjids.map((masjid) => (
                  <MasjidCard 
                    key={masjid._id} 
                    id={masjid._id}
                    name={masjid.name}
                    address={masjid.address}
                    distance={masjid.distance}
                    rating={masjid.rating}
                    imageUrl={masjid.imageUrl}
                    description={masjid.description}
                    facilities={masjid.facilities}
                    isFavorite={true}
                    nextPrayer={masjid.nextPrayer}
                    prayerTimes={masjid.prayerTimes}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                <Heart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h2 className="text-xl font-semibold text-masjid-dark dark:text-white mb-4">
                  You haven't saved any masjids yet
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Browse masjids and click the heart icon to add them to your saved list.
                </p>
                <Button asChild>
                  <Link to="/find">Find Masjids</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedMasjids;

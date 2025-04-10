
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MasjidCard from '@/components/MasjidCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Heart, List, Grid, Trash2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MasjidApi, UserApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const SavedMasjids = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch saved masjids
  const { data: savedMasjids = [], isLoading } = useQuery({
    queryKey: ['savedMasjids', user?.id],
    queryFn: () => UserApi.getSavedMasjids(),
    enabled: !!user,
  });

  // Mutation for clearing all saved masjids
  const clearAllMutation = useMutation({
    mutationFn: async () => {
      const promises = savedMasjids.map((masjid: any) => 
        MasjidApi.toggleSave(masjid._id)
      );
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedMasjids'] });
      toast({
        title: "Success",
        description: "All saved masjids have been removed",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to clear saved masjids",
        variant: "destructive",
      });
    }
  });

  // Filter masjids by search term
  const filteredMasjids = searchTerm
    ? savedMasjids.filter((masjid: any) => 
        masjid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        masjid.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : savedMasjids;

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved masjids?')) {
      clearAllMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-masjid-dark">
              Your Saved <span className="text-masjid-green">Masjids</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Quickly access your favorite mosques and prayer times
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 animate-fade-in">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search saved masjids..." 
                className="pl-10 pr-4 border-masjid-green/20 focus:border-masjid-green focus:ring-masjid-green/20 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className={`border-masjid-green/20 ${viewMode === 'list' ? 'bg-masjid-green/10 text-masjid-green' : 'text-gray-500'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`border-masjid-green/20 ${viewMode === 'grid' ? 'bg-masjid-green/10 text-masjid-green' : 'text-gray-500'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-masjid-green/20 text-destructive hover:bg-destructive/10" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-masjid-green"></div>
            </div>
          ) : filteredMasjids.length > 0 ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6 animate-fade-in`}>
              {filteredMasjids.map((masjid: any) => (
                <MasjidCard key={masjid._id} {...masjid} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-masjid-dark">
                {searchTerm ? 'No matching masjids found' : 'No saved masjids yet'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'Try a different search term' : 'Start saving your favorite mosques to access them quickly'}
              </p>
              <Button asChild className="bg-masjid-green hover:bg-masjid-green/90">
                <a href="/find">Find Masjids</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedMasjids;

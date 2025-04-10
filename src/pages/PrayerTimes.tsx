
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar, Bell, Clock, MapPin, ChevronDown, ChevronRight, Settings, Moon, Sun, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import { PrayerTimesApi, MasjidApi } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const PrayerTimes = () => {
  const [location, setLocation] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  const { theme, toggleTheme } = useTheme();
  
  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          // Reverse geocode to get location name
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then(res => res.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || 'Unknown';
              const state = data.address.state || '';
              setLocation(`${city}, ${state}`);
            })
            .catch(err => {
              console.error('Error getting location name:', err);
              setLocation('New York, NY'); // Default
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('New York, NY'); // Default
          setCoordinates({ lat: 40.7128, lng: -74.0060 }); // NYC coordinates
        }
      );
    } else {
      setLocation('New York, NY');
      setCoordinates({ lat: 40.7128, lng: -74.0060 }); // NYC coordinates
    }
  }, []);
  
  // Query for prayer times
  const { data: prayerTimesData, isLoading: isLoadingPrayerTimes } = useQuery({
    queryKey: ['prayerTimes', coordinates?.lat, coordinates?.lng],
    queryFn: () => coordinates ? PrayerTimesApi.getForLocation(coordinates.lat, coordinates.lng) : Promise.resolve(null),
    enabled: !!coordinates,
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to fetch prayer times. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Query for nearby masjids
  const { data: nearbyMasjids, isLoading: isLoadingMasjids } = useQuery({
    queryKey: ['nearbyMasjidsForPrayerTimes', coordinates?.lat, coordinates?.lng],
    queryFn: () => coordinates ? MasjidApi.getNearby(coordinates.lat, coordinates.lng, 3) : Promise.resolve([]),
    enabled: !!coordinates,
  });
  
  // Get current date and time
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Find the next prayer time
  const getCurrentNextPrayer = () => {
    if (!prayerTimesData) return { name: 'Loading...', time: '...' };
    
    const prayerOrder = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const currentTime = new Date();
    
    for (const prayer of prayerOrder) {
      const prayerTime = new Date(`${currentDate} ${prayerTimesData[prayer]}`);
      if (prayerTime > currentTime) {
        return { 
          name: prayer.charAt(0).toUpperCase() + prayer.slice(1), 
          time: prayerTimesData[prayer] 
        };
      }
    }
    
    // If all prayers have passed, return the first prayer of tomorrow
    return { name: 'Fajr (Tomorrow)', time: prayerTimesData.fajr };
  };
  
  // Get the status of each prayer time (past, next, upcoming)
  const getPrayerStatus = (prayerName: string) => {
    if (!prayerTimesData) return 'upcoming';
    
    const currentTime = new Date();
    const prayerTime = new Date(`${currentDate} ${prayerTimesData[prayerName.toLowerCase()]}`);
    
    const nextPrayer = getCurrentNextPrayer().name.toLowerCase();
    
    if (prayerTime < currentTime) return 'past';
    if (prayerName.toLowerCase() === nextPrayer) return 'next';
    return 'upcoming';
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-masjid-dark">
              Prayer <span className="text-masjid-green">Times</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Check accurate prayer times for your location
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 animate-fade-in">
              <div className="flex items-center mb-4 md:mb-0">
                <MapPin className="h-5 w-5 text-masjid-green mr-2" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-[200px] border-masjid-green/20 focus:ring-masjid-green/20">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={location}>{location}</SelectItem>
                    <SelectItem value="New York, NY">New York, NY</SelectItem>
                    <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
                    <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
                    <SelectItem value="Houston, TX">Houston, TX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Button>
              </div>
            </div>
            
            {isLoadingPrayerTimes ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-masjid-green" />
                <span className="ml-2 text-masjid-green">Loading prayer times...</span>
              </div>
            ) : prayerTimesData ? (
              <Card className="mb-6 overflow-hidden shadow-md border-masjid-green/10 animate-scale-in">
                <div className="bg-gradient-to-r from-masjid-green to-masjid-green/80 text-white p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">{currentDate}</h2>
                      <p className="text-white/80">{prayerTimesData.date}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <Clock className="h-6 w-6 mr-2 animate-pulse-gentle" />
                      <div>
                        <p className="text-sm">Next Prayer</p>
                        <p className="text-xl font-bold">
                          {getCurrentNextPrayer().name} - {getCurrentNextPrayer().time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <Accordion type="single" collapsible className="w-full" defaultValue="prayer-times">
                    <AccordionItem value="prayer-times">
                      <AccordionTrigger className="py-2 px-4 font-medium text-masjid-dark">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-masjid-green" />
                          <span>Prayer Times</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 gap-2 p-2">
                          {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((prayer, index) => {
                            const status = getPrayerStatus(prayer.toLowerCase());
                            return (
                              <div 
                                key={index} 
                                className={`flex justify-between items-center p-3 rounded-md ${
                                  status === 'next' ? 'bg-green-50 border border-masjid-green/20' : 'border border-gray-100'
                                }`}
                              >
                                <div className="flex items-center">
                                  {status === 'next' && (
                                    <ChevronRight className="h-5 w-5 text-masjid-green mr-2 animate-pulse-gentle" />
                                  )}
                                  <span className={`${status === 'next' ? 'font-bold text-masjid-green' : 'text-masjid-dark'}`}>
                                    {prayer}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className={`${status === 'next' ? 'font-bold text-masjid-green' : 'text-gray-600'}`}>
                                    {prayerTimesData[prayer.toLowerCase()]}
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="ml-2 text-gray-400 hover:text-masjid-green"
                                    onClick={() => {
                                      toast({
                                        title: "Notification Set",
                                        description: `You will be notified before ${prayer} prayer at ${prayerTimesData[prayer.toLowerCase()]}`,
                                      });
                                    }}
                                  >
                                    <Bell className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ) : (
              <Card className="mb-6 overflow-hidden shadow-md border-red-200">
                <CardContent className="p-6">
                  <div className="text-center text-red-600">
                    <p>Failed to load prayer times. Please check your connection or try again later.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="mt-8 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-masjid-dark">Nearby Mosques</h3>
              
              {isLoadingMasjids ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-5 w-5 animate-spin text-masjid-green mr-2" />
                  <span>Loading nearby masjids...</span>
                </div>
              ) : nearbyMasjids && nearbyMasjids.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nearbyMasjids.map((masjid: any) => (
                    <Card key={masjid._id} className="overflow-hidden shadow-sm border-masjid-green/10">
                      <CardHeader className="p-4 flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-base font-semibold">{masjid.name}</CardTitle>
                          <CardDescription className="text-sm">{masjid.distance}</CardDescription>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-masjid-green text-xs border-masjid-green/20 hover:bg-masjid-green/10"
                          onClick={() => window.location.href = `/masjid/${masjid._id}`}
                        >
                          View Times
                        </Button>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No nearby masjids found</p>
                </div>
              )}
            </div>
            
            <div className="mt-8 text-center animate-fade-in">
              <p className="text-gray-500 text-sm">
                Prayer times are calculated using the MWL method.
              </p>
              <Button 
                variant="link" 
                className="text-masjid-green"
                onClick={() => {
                  toast({
                    title: "Settings",
                    description: "Prayer calculation method settings will be available soon.",
                  });
                }}
              >
                <Settings className="h-4 w-4 mr-1" />
                Adjust Calculation Method
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrayerTimes;

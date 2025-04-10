import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Calendar, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Users, 
  Wifi, 
  Car,
  Info,
  Book,
  UserCheck,
  Languages,
  Utensils,
  ChevronRight,
  ParkingCircle,
  Accessibility,
  School,
  DollarSign,
  CreditCard,
  QrCode,
  Banknote
} from 'lucide-react';
import Globe from '@/components/Globe';
import SimpleMap from '@/components/SimpleMap';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MasjidApi, PrayerTimesApi } from '@/services/api';

const MasjidDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  
  const { data: masjid, isLoading } = useQuery({
    queryKey: ['masjid', id],
    queryFn: () => id ? MasjidApi.getById(id) : Promise.reject('No ID provided'),
    enabled: !!id,
  });
  
  const { data: prayerTimes } = useQuery({
    queryKey: ['prayerTimes', masjid?.location],
    queryFn: () => {
      if (!masjid?.location) return Promise.reject('No location available');
      const lat = masjid.location.coordinates?.[1] || 0;
      const lng = masjid.location.coordinates?.[0] || 0;
      return PrayerTimesApi.getForLocation(lat, lng);
    },
    enabled: !!masjid?.location,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 container mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!masjid) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-masjid-dark">Masjid Not Found</h1>
            <p className="mt-4 text-gray-600">The masjid you are looking for could not be found.</p>
            <Button asChild className="mt-6 bg-masjid-green hover:bg-masjid-green/90">
              <a href="/find">Find Masjids</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? 'text-masjid-gold fill-masjid-gold' 
              : i < rating 
                ? 'text-masjid-gold fill-masjid-gold/50' 
                : 'text-gray-300'
          }`}
        />
      ));
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? `${masjid.name} has been removed from your favorites.` : `${masjid.name} has been added to your favorites.`,
    });
  };
  
  const shareMasjid = () => {
    toast({
      title: "Share Masjid",
      description: `Sharing ${masjid.name} information.`,
    });
  };
  
  const getDirections = () => {
    toast({
      title: "Getting Directions",
      description: `Directions to ${masjid.name} at ${masjid.address}.`,
    });
  };

  const handleDonate = (amount: number) => {
    toast({
      title: "Donation Started",
      description: `Processing your donation of $${amount} to ${masjid.name}.`,
    });
    // In a real app, this would redirect to a payment processor
  };
  
  const getResponsiveTabsList = () => {
    const allTabs = [
      { value: 'info', label: 'Info', icon: <Info className="h-4 w-4 mr-2" /> },
      { value: 'prayer-times', label: 'Prayer Times', icon: <Clock className="h-4 w-4 mr-2" /> },
      { value: 'events', label: 'Events', icon: <Calendar className="h-4 w-4 mr-2" /> },
      { value: 'community', label: 'Community', icon: <Users className="h-4 w-4 mr-2" /> },
      { value: 'donate', label: 'Donate', icon: <DollarSign className="h-4 w-4 mr-2" /> },
      { value: 'photos', label: 'Photos', icon: <Book className="h-4 w-4 mr-2" /> }
    ];
    
    if (screenWidth < 640) {
      return (
        <TabsList className="grid w-full grid-cols-6">
          {allTabs.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} className="px-2">
              {tab.icon}
              <span className="sr-only">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      );
    }
    
    if (screenWidth < 768) {
      return (
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">
            <Info className="h-4 w-4 mr-2" />
            Info
          </TabsTrigger>
          <TabsTrigger value="prayer-times">
            <Clock className="h-4 w-4 mr-2" />
            Prayer Times
          </TabsTrigger>
          <TabsTrigger value="more" onClick={() => {
            toast({
              title: "More Options",
              description: "Select from Events, Community, Donate, or Photos",
              action: (
                <div className="flex flex-wrap gap-2 mt-2">
                  {['events', 'community', 'donate', 'photos'].map(tab => (
                    <Button 
                      key={tab} 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  ))}
                </div>
              )
            });
          }}>
            <ChevronRight className="h-4 w-4 mr-2" />
            More
          </TabsTrigger>
        </TabsList>
      );
    }
    
    return (
      <TabsList className="grid w-full grid-cols-6">
        {allTabs.map(tab => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
          <img 
            src={masjid.imageUrl} 
            alt={masjid.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70">
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
              <div className="flex items-center space-x-2 text-white">
                <div className="flex">{renderStars(masjid.rating)}</div>
                <span className="text-sm font-medium">{masjid.rating}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{masjid.name}</h1>
              <div className="flex items-center text-white/90 mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{masjid.address}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-masjid-green text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span className="text-sm">Next: {masjid.nextPrayer?.name || 'Fajr'} {masjid.nextPrayer?.time || prayerTimes?.fajr || '5:30 AM'}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Jummah: {masjid.prayerTimes?.jummah || '1:30 PM'}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span className="text-sm">{masjid.community?.size || 'Community'}</span>
              </div>
              <div className="flex items-center">
                <Navigation className="h-4 w-4 mr-2" />
                <span className="text-sm">{masjid.distance} away</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between overflow-x-auto">
            <Button variant="outline" onClick={getDirections} className="whitespace-nowrap">
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </Button>
            <Button variant="outline" onClick={toggleFavorite} className="whitespace-nowrap">
              <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            <Button variant="outline" onClick={shareMasjid} className="whitespace-nowrap">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {getResponsiveTabsList()}
            
            <TabsContent value="info" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-gray-600">{masjid.description}</p>
                      
                      {masjid.history && (
                        <div className="mt-4">
                          <h4 className="text-base font-medium text-masjid-dark mb-1">History</h4>
                          <p className="text-gray-600">{masjid.history}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Facilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {masjid.facilities.map((facility, index) => (
                          <Badge key={index} variant="outline" className="bg-green-50 text-masjid-green border-masjid-green/20">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Location</h3>
                      <div className="rounded-xl overflow-hidden h-64">
                        <SimpleMap />
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600">{masjid.address}</span>
                        <Button variant="outline" onClick={getDirections} size="sm">
                          <Navigation className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {masjid.imams && masjid.imams.length > 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Imams & Staff</h3>
                        <div className="space-y-4">
                          {masjid.imams.map((imam, index) => (
                            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                              <div className="w-12 h-12 bg-masjid-green/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <UserCheck className="h-6 w-6 text-masjid-green" />
                              </div>
                              <div>
                                <h4 className="font-medium text-masjid-dark">{imam.name}</h4>
                                <p className="text-sm text-masjid-green">{imam.role}</p>
                                <p className="text-sm text-gray-600 mt-1">{imam.bio}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Contact</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Phone className="h-5 w-5 mr-3 text-masjid-green mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-gray-600">{masjid.contact.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-5 w-5 mr-3 text-masjid-green mt-0.5" />
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-gray-600">{masjid.contact.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Globe className="h-5 w-5 mr-3 text-masjid-green mt-0.5" />
                          <div>
                            <p className="font-medium">Website</p>
                            <p className="text-gray-600">{masjid.contact.website}</p>
                          </div>
                        </div>
                        
                        {masjid.contact.socialMedia && (
                          <div className="flex items-center mt-2 gap-3 border-t pt-3">
                            {Object.entries(masjid.contact.socialMedia).map(([platform, url]) => (
                              <Button key={platform} variant="ghost" size="sm" className="p-1 h-auto">
                                <a href={url as string} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-masjid-green">
                                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                </a>
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {masjid.facilities.includes('Parking') && (
                          <div className="flex items-center">
                            <ParkingCircle className="h-5 w-5 mr-2 text-masjid-green" />
                            <span>Parking Available</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Women Section') && (
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2 text-masjid-green" />
                            <span>Women's Prayer Area</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Free Wifi') && (
                          <div className="flex items-center">
                            <Wifi className="h-5 w-5 mr-2 text-masjid-green" />
                            <span>Free Wifi</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Wheelchair Access') && (
                          <div className="flex items-center">
                            <Accessibility className="h-5 w-5 mr-2 text-masjid-green" />
                            <span>Wheelchair Access</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Library') && (
                          <div className="flex items-center">
                            <Book className="h-5 w-5 mr-2 text-masjid-green" />
                            <span>Library</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Cafeteria') && (
                          <div className="flex items-center">
                            <Utensils className="h-5 w-5 mr-2 text-masjid-green" />
                            <span>Cafeteria</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {masjid.classes && masjid.classes.length > 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Classes & Education</h3>
                        <div className="space-y-3">
                          {masjid.classes.map((cls, index) => (
                            <div key={index} className="border-b pb-2 last:border-0 last:pb-0">
                              <div className="flex justify-between">
                                <p className="font-medium">{cls.name}</p>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 p-0">
                                      <Info className="h-4 w-4 text-masjid-green" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <div>
                                      <h4 className="font-medium">{cls.name}</h4>
                                      <p className="text-sm text-gray-600">Instructor: {cls.instructor}</p>
                                      <p className="text-sm text-gray-600 mt-1">Schedule: {cls.schedule}</p>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <p className="text-sm text-gray-600">{cls.schedule}</p>
                            </div>
                          ))}
                        </div>
                        <Button variant="link" className="mt-2 text-masjid-green p-0 h-auto">
                          <School className="h-4 w-4 mr-1" /> View All Educational Programs
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="prayer-times" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6 text-center">Daily Prayer Times</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(prayerTimes || masjid.prayerTimes || {}).map(([prayer, time]) => {
                      if (['date', 'location'].includes(prayer)) return null;
                      
                      return (
                        <div key={prayer} className="bg-green-50 rounded-lg p-4 text-center border border-masjid-green/20">
                          <h4 className="text-masjid-green font-medium capitalize">{prayer}</h4>
                          <p className="text-lg font-bold mt-1">{time as string}</p>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-masjid-green" />
                      Prayer Time Information
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-masjid-green flex-shrink-0" />
                        Prayer times are updated daily based on astronomical calculations for this location.
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-masjid-green flex-shrink-0" />
                        Jumu'ah prayer includes a khutbah (sermon) that starts 15 minutes before the prayer.
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="h-4 w-4 mr-1 mt-0.5 text-masjid-green flex-shrink-0" />
                        During Ramadan, additional Taraweeh prayers are held after Isha.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">Last updated: Today</p>
                    <Button variant="outline" className="mt-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      Download Prayer Timetable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className="animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Upcoming Events</h3>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
                
                {masjid.events.length > 0 ? (
                  <div className="space-y-4">
                    {masjid.events.map((event) => (
                      <Card key={event.id} className="overflow-hidden transition-all hover:shadow-md">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="bg-masjid-green/10 p-4 md:w-1/4 flex flex-col justify-center items-center">
                              <Calendar className="h-8 w-8 text-masjid-green" />
                              <p className="text-masjid-green font-medium mt-2 text-center">{event.date}</p>
                            </div>
                            <div className="p-4 md:w-3/4">
                              <h4 className="text-lg font-semibold">{event.title}</h4>
                              <p className="text-gray-600 mt-2">{event.description}</p>
                              <div className="mt-3 flex">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Learn More
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Add to Calendar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <div className="text-center mt-6">
                      <Button variant="default" className="bg-masjid-green hover:bg-masjid-green/90">
                        View All Events
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="mt-4 text-gray-500">No upcoming events at this time</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="animate-fade-in">
              {masjid.community ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Community Information</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-masjid-dark">Size</h4>
                          <p className="text-gray-600">{masjid.community.size}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-masjid-dark">Demographics</h4>
                          <p className="text-gray-600">{masjid.community.demographics}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-masjid-dark">Languages</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {masjid.community.languages.map((language, index) => (
                              <Badge key={index} variant="outline" className="flex items-center">
                                <Languages className="h-3 w-3 mr-1" />
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-masjid-green">Volunteer Opportunities</h4>
                          <p className="text-sm text-gray-600 mt-1">Join our team of volunteers to help with events, classes, and general operations.</p>
                          <Button variant="link" className="text-masjid-green p-0 mt-1 h-auto text-sm">Learn more</Button>
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-masjid-green">Donation & Charity</h4>
                          <p className="text-sm text-gray-600 mt-1">Support the masjid and community through donations and zakat contributions.</p>
                          <Button variant="link" className="text-masjid-green p-0 mt-1 h-auto text-sm">Donate now</Button>
                        </div>
                        
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-masjid-green">Membership</h4>
                          <p className="text-sm text-gray-600 mt-1">Become a member to participate in community decisions and receive updates.</p>
                          <Button variant="link" className="text-masjid-green p-0 mt-1 h-auto text-sm">Join today</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Committees & Leadership</h3>
                      <p className="text-gray-600 mb-4">
                        The masjid is managed by a board of trustees and various committees that handle different aspects of community operations.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-masjid-dark">Board of Trustees</h4>
                          <p className="text-sm text-gray-600 mt-1">Oversees general management and strategic direction.</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-masjid-dark">Education Committee</h4>
                          <p className="text-sm text-gray-600 mt-1">Manages all educational programs and classes.</p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-masjid-dark">Youth Committee</h4>
                          <p className="text-sm text-gray-600 mt-1">Organizes activities and programs for young Muslims.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="mt-4 text-gray-500">Community information not available</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="donate" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6 text-center">Support {masjid.name}</h3>
                  <p className="text-center text-gray-600 mb-6">
                    Your generous donations help maintain our masjid and support community programs.
                    All donations are tax-deductible.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium mb-4 text-masjid-dark">One-Time Donation</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[10, 25, 50, 100, 250, 500].map((amount) => (
                          <Button 
                            key={amount} 
                            variant="outline" 
                            onClick={() => handleDonate(amount)}
                            className="border-masjid-green text-masjid-green hover:bg-masjid-green/10 h-16"
                          >
                            <DollarSign className="mr-1 h-4 w-4" />
                            {amount}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h5 className="font-medium text-sm mb-2">Custom Amount</h5>
                        <div className="flex">
                          <div className="relative flex-grow">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <input 
                              type="number" 
                              className="w-full pl-10 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                              placeholder="Other amount"
                            />
                          </div>
                          <Button 
                            className="bg-masjid-green hover:bg-masjid-green/90 rounded-l-none"
                            onClick={() => handleDonate(0)}
                          >
                            Donate
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4 text-masjid-dark">Payment Details</h4>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Card Information</h5>
                          <div className="space-y-3">
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                              placeholder="Card number"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input 
                                type="text" 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                                placeholder="MM/YY"
                              />
                              <input 
                                type="text" 
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                                placeholder="CVC"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium mb-2">Billing Information</h5>
                          <div className="space-y-3">
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                              placeholder="Name on card"
                            />
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                              placeholder="Email address"
                            />
                            <input 
                              type="text" 
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-masjid-green" 
                              placeholder="Billing address"
                            />
                          </div>
                        </div>
                        
                        <Button className="w-full bg-masjid-green hover:bg-masjid-green/90 py-6">
                          Complete Donation
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t pt-6">
                    <h4 className="text-lg font-medium mb-4 text-center text-masjid-dark">Where Your Donations Go</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Book className="h-8 w-8 mx-auto text-masjid-green mb-2" />
                        <h5 className="font-medium text-masjid-green">Educational Programs</h5>
                        <p className="text-sm text-gray-600 mt-1">Supporting Quran classes and Islamic education.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Users className="h-8 w-8 mx-auto text-masjid-green mb-2" />
                        <h5 className="font-medium text-masjid-green">Community Services</h5>
                        <p className="text-sm text-gray-600 mt-1">Providing resources and aid to community members.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <ParkingCircle className="h-8 w-8 mx-auto text-masjid-green mb-2" />
                        <h5 className="font-medium text-masjid-green">Facility Maintenance</h5>
                        <p className="text-sm text-gray-600 mt-1">Keeping our masjid beautiful and functional.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="photos" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6 text-center">Photo Gallery</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {masjid.gallery.map((photo, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
                      >
                        <img src={photo} alt={`${masjid.name} - ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="mt-2">
                      <Book className="h-4 w-4 mr-2" />
                      View All Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MasjidDetails;

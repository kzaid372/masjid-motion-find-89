
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Calendar, 
  Star, 
  Heart, 
  Share2, 
  Bookmark, 
  Phone, 
  Mail, 
  Users, 
  Wifi, 
  Car,
  Info
} from 'lucide-react';
import Globe from '@/components/Globe';
import SimpleMap from '@/components/SimpleMap';
import { toast } from '@/components/ui/use-toast';

// Mock data - in a real app, this would come from an API
const masjidData = {
  '1': {
    id: '1',
    name: 'Al-Noor Mosque',
    address: '123 Islamic Way, New York, NY 10001',
    description: 'A beautiful mosque serving the local Muslim community with daily prayers, educational programs, and community events.',
    distance: '1.2 km',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    facilities: ['Parking', 'Wudhu Area', 'Women Section', 'Library', 'Quran Classes', 'Wheelchair Access', 'Free Wifi'],
    prayerTimes: {
      fajr: '5:30 AM',
      dhuhr: '1:00 PM',
      asr: '4:30 PM',
      maghrib: '7:15 PM',
      isha: '8:45 PM',
      jummah: '1:30 PM'
    },
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@alnoor.mosque',
      website: 'www.alnoor.mosque'
    },
    events: [
      { id: '1', title: 'Ramadan Iftar', date: 'Every day during Ramadan', description: 'Community iftar gathering' },
      { id: '2', title: 'Quran Study Circle', date: 'Tuesdays, 7:00 PM', description: 'Weekly Quran study and discussion' },
      { id: '3', title: 'Youth Program', date: 'Saturdays, 4:00 PM', description: 'Activities for Muslim youth' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609158762357-c6f0c931ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  },
  '2': {
    id: '2',
    name: 'Masjid Al-Rahman',
    address: '456 Faith Street, New York, NY 10002',
    description: 'Masjid Al-Rahman is dedicated to serving the religious, social, and educational needs of Muslims in the New York area.',
    distance: '2.5 km',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    facilities: ['Library', 'Prayer Mats', 'AC', 'Women Section', 'Parking'],
    prayerTimes: {
      fajr: '5:25 AM',
      dhuhr: '1:05 PM',
      asr: '4:35 PM',
      maghrib: '7:10 PM',
      isha: '8:40 PM',
      jummah: '1:20 PM'
    },
    contact: {
      phone: '+1 (555) 987-6543',
      email: 'contact@alrahman.mosque',
      website: 'www.alrahman.mosque'
    },
    events: [
      { id: '1', title: 'Islamic Studies Class', date: 'Wednesdays, 7:30 PM', description: 'Weekly lessons on Islamic teachings' },
      { id: '2', title: 'Community Dinner', date: 'Last Saturday of each month', description: 'Monthly community gathering' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590517783952-87dd33983454?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588855318558-b34127079006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ]
  }
};

const MasjidDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  
  // Get the masjid data from the mock data using the ID
  const masjid = masjidData[id as keyof typeof masjidData];
  
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
    // In a real app, this would use the Web Share API
    toast({
      title: "Share Masjid",
      description: `Sharing ${masjid.name} information.`,
    });
  };
  
  const saveMasjid = () => {
    toast({
      title: "Masjid Saved",
      description: `${masjid.name} has been saved to your list.`,
    });
  };
  
  const getDirections = () => {
    toast({
      title: "Getting Directions",
      description: `Directions to ${masjid.name} at ${masjid.address}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section with Masjid Image */}
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
        
        {/* Action Buttons */}
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
            <Button variant="outline" onClick={saveMasjid} className="whitespace-nowrap">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">
                <Info className="h-4 w-4 mr-2" />
                Info
              </TabsTrigger>
              <TabsTrigger value="prayer-times">
                <Clock className="h-4 w-4 mr-2" />
                Prayer Times
              </TabsTrigger>
              <TabsTrigger value="events">
                <Calendar className="h-4 w-4 mr-2" />
                Events
              </TabsTrigger>
              <TabsTrigger value="photos">
                <Users className="h-4 w-4 mr-2" />
                Photos
              </TabsTrigger>
            </TabsList>
            
            {/* Info Tab */}
            <TabsContent value="info" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-gray-600">{masjid.description}</p>
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
                    </CardContent>
                  </Card>
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
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                      <div className="space-y-3">
                        {masjid.facilities.includes('Parking') && (
                          <div className="flex items-center">
                            <Car className="h-5 w-5 mr-3 text-masjid-green" />
                            <span>Parking Available</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Women Section') && (
                          <div className="flex items-center">
                            <Users className="h-5 w-5 mr-3 text-masjid-green" />
                            <span>Women's Prayer Area</span>
                          </div>
                        )}
                        {masjid.facilities.includes('Free Wifi') && (
                          <div className="flex items-center">
                            <Wifi className="h-5 w-5 mr-3 text-masjid-green" />
                            <span>Free Wifi</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Prayer Times Tab */}
            <TabsContent value="prayer-times" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-6 text-center">Daily Prayer Times</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(masjid.prayerTimes).map(([prayer, time]) => (
                      <div key={prayer} className="bg-green-50 rounded-lg p-4 text-center border border-masjid-green/20">
                        <h4 className="text-masjid-green font-medium capitalize">{prayer}</h4>
                        <p className="text-lg font-bold mt-1">{time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">Prayer times are updated daily based on location</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Upcoming Events</h3>
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
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="mt-4 text-gray-500">No upcoming events at this time</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Photos Tab */}
            <TabsContent value="photos" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Photo Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {masjid.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden aspect-video hover:opacity-90 transition-opacity cursor-pointer">
                      <img src={image} alt={`${masjid.name} - ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MasjidDetails;

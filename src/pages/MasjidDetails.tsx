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

const masjidData = {
  '1': {
    id: '1',
    name: 'Al-Noor Mosque',
    address: '123 Islamic Way, New York, NY 10001',
    description: 'A beautiful mosque serving the local Muslim community with daily prayers, educational programs, and community events. The masjid was established in 1995 and has since been a cornerstone of the Muslim community in New York. The architecture features traditional Islamic design elements with modern amenities to serve the needs of all worshippers.',
    distance: '1.2 km',
    rating: 4.5,
    imageUrl: 'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    facilities: ['Parking', 'Wudhu Area', 'Women Section', 'Library', 'Quran Classes', 'Wheelchair Access', 'Free Wifi', 'Shoe Racks', 'Islamic Bookstore', 'Cafeteria'],
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
      website: 'www.alnoor.mosque',
      socialMedia: {
        facebook: 'facebook.com/alnoor',
        instagram: 'instagram.com/alnoor',
        twitter: 'twitter.com/alnoor'
      }
    },
    events: [
      { id: '1', title: 'Ramadan Iftar', date: 'Every day during Ramadan', description: 'Community iftar gathering' },
      { id: '2', title: 'Quran Study Circle', date: 'Tuesdays, 7:00 PM', description: 'Weekly Quran study and discussion' },
      { id: '3', title: 'Youth Program', date: 'Saturdays, 4:00 PM', description: 'Activities for Muslim youth' },
      { id: '4', title: 'Islamic History Class', date: 'Sundays, 11:00 AM', description: 'Learn about Islamic history and civilization' },
      { id: '5', title: 'Women\'s Halaqah', date: 'Wednesdays, 6:00 PM', description: 'Women\'s religious discussion group' }
    ],
    classes: [
      { name: 'Quran Recitation', schedule: 'Mon-Fri, 6:00 PM', instructor: 'Sheikh Ahmad' },
      { name: 'Fiqh Basics', schedule: 'Saturdays, 2:00 PM', instructor: 'Dr. Fatima Hassan' },
      { name: 'Arabic Language', schedule: 'Tue & Thu, 7:00 PM', instructor: 'Ustadh Khalid' },
      { name: 'Islamic History', schedule: 'Sundays, 11:00 AM', instructor: 'Prof. Ibrahim' }
    ],
    imams: [
      { name: 'Imam Abdullah Hasan', role: 'Head Imam', bio: 'Graduate of Al-Azhar University with 15 years of experience.' },
      { name: 'Sheikh Muhammad Ali', role: 'Assistant Imam', bio: 'Graduate of Islamic University of Madinah, specializing in Hadith studies.' }
    ],
    community: {
      size: 'Approximately 500 families',
      demographics: 'Diverse community with members from various cultural backgrounds',
      languages: ['English', 'Arabic', 'Urdu', 'Turkish']
    },
    history: 'Founded in 1995 by a group of local Muslim families seeking a place of worship. The current building was constructed in 2005 after extensive fundraising efforts. The masjid has expanded its services over the years to include educational programs, community services, and various facilities.',
    gallery: [
      'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609158762357-c6f0c931ace5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585129918930-69bae9bb0b04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626079651101-d4eeff9c9be9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576439243014-f4732fbcb5fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
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
      website: 'www.alrahman.mosque',
      socialMedia: {
        facebook: 'facebook.com/alrahman',
        instagram: 'instagram.com/alrahman'
      }
    },
    events: [
      { id: '1', title: 'Islamic Studies Class', date: 'Wednesdays, 7:30 PM', description: 'Weekly lessons on Islamic teachings' },
      { id: '2', title: 'Community Dinner', date: 'Last Saturday of each month', description: 'Monthly community gathering' }
    ],
    classes: [
      { name: 'Quran Hifz', schedule: 'Mon-Fri, 5:00 PM', instructor: 'Hafiz Yusuf' },
      { name: 'Islamic Studies', schedule: 'Sundays, 10:00 AM', instructor: 'Imam Ali' }
    ],
    imams: [
      { name: 'Imam Ali Rahman', role: 'Head Imam', bio: 'Graduate of Islamic University with 10 years of experience.' }
    ],
    community: {
      size: 'Approximately 300 families',
      demographics: 'Diverse community with members from various cultural backgrounds',
      languages: ['English', 'Arabic', 'Bengali']
    },
    history: 'Founded in 2005 by local community leaders. The masjid has grown significantly over the years.',
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

  const handleDonate = (amount: number) => {
    toast({
      title: "Donation Started",
      description: `Processing your donation of $${amount} to ${masjid.name}.`,
    });
    // In a real app, this would redirect to a payment processor
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
                <span className="text-sm">Next: {Object.keys(masjid.prayerTimes)[0]} {masjid.prayerTimes.fajr}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">Jummah: {masjid.prayerTimes.jummah}</span>
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
            <Button variant="outline" onClick={saveMasjid} className="whitespace-nowrap">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
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
              <TabsTrigger value="community">
                <Users className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger value="donate">
                <DollarSign className="h-4 w-4 mr-2" />
                Donate
              </TabsTrigger>
              <TabsTrigger value="photos">
                <Book className="h-4 w-4 mr-2" />
                Photos
              </TabsTrigger>
            </TabsList>
            
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
                    {Object.entries(masjid.prayerTimes).map(([prayer, time]) => (
                      <div key={prayer} className="bg-green-50 rounded-lg p-4 text-center border border-masjid-green/20">
                        <h4 className="text-masjid-green font-medium capitalize">{prayer}</h4>
                        <p className="text-lg font-bold mt-1">{time}</p>
                      </div>
                    ))}
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
                      <h4 className="text-lg font-medium mb-4 text-masjid-dark">Payment Methods</h4>
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-3 text-masjid-green" />
                            <div>
                              <p className="font-medium">Credit/Debit Card</p>
                              <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <Banknote className="h-5 w-5 mr-3 text-masjid-green" />
                            <div>
                              <p className="font-medium">Bank Transfer</p>
                              <p className="text-sm text-gray-600">Direct deposit to our account</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center">
                            <QrCode className="h-5 w-5 mr-3 text-masjid-green" />
                            <div>
                              <p className="font-medium">QR Code Payment</p>
                              <p className="text-sm text-gray-600">Scan with your banking app</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-green-50 p-4 rounded-lg">
                        <h5 className="font-medium flex items-center text-masjid-green">
                          <Info className="h-4 w-4 mr-2" />
                          Monthly Giving Program
                        </h5>
                        <p className="text-sm text-gray-600 mt-1">
                          Support our masjid consistently by joining our monthly donation program.
                        </p>
                        <Button variant="outline" className="mt-3 border-masjid-green text-masjid-green hover:bg-masjid-green/10">
                          Learn More
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
                        <p className="text-sm text-gray-600 mt-1">
                          Supporting Quran classes and Islamic education for all ages
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <ParkingCircle className="h-8 w-8 mx-auto text-masjid-green mb-2" />
                        <h5 className="font-medium text-masjid-green">Facility Maintenance</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          Keeping our masjid clean, beautiful, and well-maintained
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <Users className="h-8 w-8 mx-auto text-masjid-green mb-2" />
                        <h5 className="font-medium text-masjid-green">Community Services</h5>
                        <p className="text-sm text-gray-600 mt-1">
                          Support for community events, programs, and charitable services
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="photos" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Photo Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {masjid.gallery.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden aspect-video hover:opacity-90 transition-opacity cursor-pointer shadow-sm">
                      <img src={image} alt={`${masjid.name} - ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-gray-600 mb-3">View our complete gallery to see more of our beautiful masjid and community events.</p>
                  <Button variant="default" className="bg-masjid-green hover:bg-masjid-green/90">
                    View Full Gallery
                  </Button>
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

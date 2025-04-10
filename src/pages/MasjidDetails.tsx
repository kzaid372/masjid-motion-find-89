
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  MapPin, Phone, Mail, Globe, Star, Info, Clock, Calendar, 
  Navigation, Heart, Share2, Loader2, ChevronLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MasjidApi } from '@/services/api';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Component for prayer time display
const PrayerTimeCard = ({ name, time }: { name: string, time: string }) => (
  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="text-masjid-dark dark:text-gray-300 text-sm mb-1">{name}</div>
    <div className="text-masjid-green font-bold">{time}</div>
  </div>
);

// Component for review item
const ReviewItem = ({ review }: { review: any }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 mb-4">
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-masjid-green/20 text-masjid-green flex items-center justify-center mr-3">
          {review.user.photoURL ? (
            <img src={review.user.photoURL} alt={review.user.displayName} className="w-full h-full rounded-full" />
          ) : (
            review.user.displayName.charAt(0)
          )}
        </div>
        <div>
          <div className="font-medium text-masjid-dark dark:text-white">{review.user.displayName}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${
              i < review.rating 
                ? 'text-masjid-gold fill-masjid-gold' 
                : 'text-gray-300 dark:text-gray-600'
            }`} 
          />
        ))}
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{review.text}</p>
  </div>
);

const MasjidDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const isMobile = useIsMobile();
  
  // Fetch masjid details
  const { data: masjid, isLoading, isError } = useQuery({
    queryKey: ['masjid', id],
    queryFn: () => MasjidApi.getById(id || '1'),
    enabled: !!id,
  });
  
  // Fetch reviews
  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => MasjidApi.getReviews(id || '1'),
    enabled: !!id,
  });
  
  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save this masjid to your favorites.",
      });
      return;
    }
    
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${masjid?.name} has been removed from your favorites` 
        : `${masjid?.name} has been added to your favorites`,
    });
    
    // In a real app, this would call the API
    if (id) {
      MasjidApi.toggleSaved(id);
    }
  };
  
  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: masjid?.name,
        text: `Check out ${masjid?.name}`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Masjid link copied to clipboard",
      });
    }
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-masjid-green" />
        </div>
        <Footer />
      </div>
    );
  }
  
  if (isError || !masjid) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error Loading Masjid</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">Failed to load masjid details. Please try again.</p>
          <Button asChild>
            <Link to="/find">Back to Search</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" className="pl-0" asChild>
            <Link to="/find">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Link>
          </Button>
        </div>
        
        {/* Masjid Header */}
        <div className="mb-8">
          <div className="relative">
            <div className="aspect-[21/9] overflow-hidden rounded-xl">
              <img 
                src={masjid.imageUrl} 
                alt={masjid.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{masjid.name}</h1>
                  <div className="flex items-center text-white mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm md:text-base">{masjid.address}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < Math.floor(masjid.rating) 
                              ? 'text-masjid-gold fill-masjid-gold' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-white text-sm">
                      {masjid.reviewCount} reviews
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={shareLocation}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="default"
                    className="bg-masjid-green hover:bg-masjid-green/90"
                  >
                    <Navigation className="h-5 w-5 mr-2" />
                    <span>Directions</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content with Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8 overflow-hidden">
            <TabsList className="w-full overflow-x-auto flex-nowrap justify-start bg-gray-100 dark:bg-gray-750 p-0 h-auto rounded-none">
              <div className="flex w-full min-w-max">  {/* This wrapper prevents tab merging */}
                <TabsTrigger 
                  value="info" 
                  className="flex-1 min-w-[100px] py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-masjid-green data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Info className="h-4 w-4 mr-2" />
                  <span className={isMobile ? "text-xs" : "text-sm"}>Info</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="prayer-times" 
                  className="flex-1 min-w-[140px] py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-masjid-green data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  <span className={isMobile ? "text-xs" : "text-sm"}>Prayer Times</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="programs" 
                  className="flex-1 min-w-[120px] py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-masjid-green data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className={isMobile ? "text-xs" : "text-sm"}>Programs</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="flex-1 min-w-[120px] py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-masjid-green data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <Star className="h-4 w-4 mr-2" />
                  <span className={isMobile ? "text-xs" : "text-sm"}>Reviews</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="gallery" 
                  className="flex-1 min-w-[120px] py-4 rounded-none border-b-2 border-transparent data-[state=active]:border-masjid-green data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <span className={isMobile ? "text-xs" : "text-sm"}>Gallery</span>
                </TabsTrigger>
              </div>
            </TabsList>
            
            {/* Info Tab Content */}
            <TabsContent value="info" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-masjid-dark dark:text-white mb-4">About {masjid.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{masjid.description}</p>
                  
                  <h3 className="text-lg font-semibold text-masjid-dark dark:text-white mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {masjid.facilities.map((facility, index) => (
                      <span 
                        key={index}
                        className="bg-masjid-green/10 text-masjid-green px-3 py-1 rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-masjid-dark dark:text-white mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-masjid-green mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-masjid-dark dark:text-white">Address</h4>
                        <p className="text-gray-600 dark:text-gray-300">{masjid.address}</p>
                      </div>
                    </div>
                    
                    {masjid.phone && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-masjid-green mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-masjid-dark dark:text-white">Phone</h4>
                          <p className="text-gray-600 dark:text-gray-300">{masjid.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {masjid.email && (
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-masjid-green mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-masjid-dark dark:text-white">Email</h4>
                          <p className="text-gray-600 dark:text-gray-300">{masjid.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {masjid.website && (
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 text-masjid-green mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-masjid-dark dark:text-white">Website</h4>
                          <a 
                            href={masjid.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-masjid-green hover:underline"
                          >
                            {masjid.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {masjid.socialMedia && (
                      <div className="flex items-start">
                        <div className="h-5 w-5 text-masjid-green mr-3 mt-0.5">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="h-5 w-5"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-masjid-dark dark:text-white">Social Media</h4>
                          <div className="flex gap-3 mt-2">
                            {masjid.socialMedia.facebook && (
                              <a 
                                href={masjid.socialMedia.facebook}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="h-5 w-5"
                                >
                                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                              </a>
                            )}
                            
                            {masjid.socialMedia.instagram && (
                              <a 
                                href={masjid.socialMedia.instagram}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-pink-600 hover:text-pink-700"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="h-5 w-5"
                                >
                                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                              </a>
                            )}
                            
                            {masjid.socialMedia.twitter && (
                              <a 
                                href={masjid.socialMedia.twitter}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-400 hover:text-blue-500"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="h-5 w-5"
                                >
                                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                </svg>
                              </a>
                            )}
                            
                            {masjid.socialMedia.youtube && (
                              <a 
                                href={masjid.socialMedia.youtube}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-red-600 hover:text-red-700"
                              >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="h-5 w-5"
                                >
                                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Prayer Times Tab Content */}
            <TabsContent value="prayer-times" className="p-6">
              <h2 className="text-xl font-semibold text-masjid-dark dark:text-white mb-6">
                Prayer Times for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <PrayerTimeCard name="Fajr" time={masjid.prayerTimes.fajr} />
                <PrayerTimeCard name="Dhuhr" time={masjid.prayerTimes.dhuhr} />
                <PrayerTimeCard name="Asr" time={masjid.prayerTimes.asr} />
                <PrayerTimeCard name="Maghrib" time={masjid.prayerTimes.maghrib} />
                <PrayerTimeCard name="Isha" time={masjid.prayerTimes.isha} />
                <PrayerTimeCard name="Jummah" time={masjid.prayerTimes.jummah} />
              </div>
              
              <div className="mt-8 p-4 bg-masjid-green/10 dark:bg-masjid-green/5 rounded-lg border border-masjid-green/20 dark:border-masjid-green/10">
                <h3 className="text-lg font-semibold text-masjid-dark dark:text-white mb-2">
                  <Calendar className="h-5 w-5 inline-block mr-2 text-masjid-green" />
                  Prayer Time Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Prayer times change throughout the year based on the sun's position. 
                  Always check the latest times before visiting.
                </p>
              </div>
            </TabsContent>
            
            {/* Programs Tab Content */}
            <TabsContent value="programs" className="p-6">
              <h2 className="text-xl font-semibold text-masjid-dark dark:text-white mb-6">
                Regular Programs and Events
              </h2>
              
              {masjid.programs && masjid.programs.length > 0 ? (
                <div className="grid gap-4">
                  {masjid.programs.map((program, index) => (
                    <div 
                      key={index}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-masjid-dark dark:text-white mb-1">
                          {program.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {program.description}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 md:ml-4 flex items-center space-x-4">
                        <div className="bg-masjid-green/10 px-3 py-1 rounded-full text-masjid-green text-sm">
                          {program.day}
                        </div>
                        <div className="font-medium text-masjid-dark dark:text-white text-sm">
                          {program.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  No regular programs or events available at this time.
                </p>
              )}
              
              <div className="mt-8 p-4 bg-masjid-green/10 dark:bg-masjid-green/5 rounded-lg border border-masjid-green/20 dark:border-masjid-green/10">
                <h3 className="text-lg font-semibold text-masjid-dark dark:text-white mb-2">
                  <Info className="h-5 w-5 inline-block mr-2 text-masjid-green" />
                  Special Programs
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  The masjid may host special programs and events during Ramadan, Eid, and other
                  Islamic holidays. Contact the masjid directly for the most up-to-date information.
                </p>
              </div>
            </TabsContent>
            
            {/* Reviews Tab Content */}
            <TabsContent value="reviews" className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-masjid-dark dark:text-white">
                  Reviews ({reviews ? reviews.length : 0})
                </h2>
                <Button className="mt-4 md:mt-0 bg-masjid-green hover:bg-masjid-green/90">
                  <Star className="h-4 w-4 mr-2" fill="white" />
                  Write a Review
                </Button>
              </div>
              
              {reviews && reviews.length > 0 ? (
                <div>
                  {reviews.map((review) => (
                    <ReviewItem key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Star className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This masjid has no reviews yet. Be the first to share your experience!
                  </p>
                </div>
              )}
            </TabsContent>
            
            {/* Gallery Tab Content */}
            <TabsContent value="gallery" className="p-6">
              <h2 className="text-xl font-semibold text-masjid-dark dark:text-white mb-6">
                Photo Gallery
              </h2>
              
              {masjid.gallery && masjid.gallery.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {masjid.gallery.map((imageUrl, index) => (
                    <div key={index} className="overflow-hidden rounded-lg aspect-square">
                      <img 
                        src={imageUrl} 
                        alt={`${masjid.name} - ${index + 1}`} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  No gallery images available for this masjid.
                </p>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default MasjidDetails;

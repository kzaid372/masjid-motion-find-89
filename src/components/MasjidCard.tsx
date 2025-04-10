
import React, { useState } from 'react';
import { MapPin, Star, Navigation, Clock, ExternalLink, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface MasjidCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  imageUrl: string;
  description?: string;
  isFavorite?: boolean;
  facilities?: string[];
  nextPrayer?: {
    name: string;
    time: string;
  };
  prayerTimes?: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    jummah: string;
  };
}

const MasjidCard = ({
  id,
  name,
  address,
  distance,
  rating,
  imageUrl,
  description = "A beautiful masjid serving the local Muslim community with daily prayers and regular Islamic activities.",
  isFavorite = false,
  facilities = [],
  nextPrayer,
  prayerTimes,
}: MasjidCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const [prayerTimesOpen, setPrayerTimesOpen] = useState(false);
  
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
                : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ));
  };

  const toggleFavorite = () => {
    setFavorite(!favorite);
    toast({
      title: favorite ? "Removed from favorites" : "Added to favorites",
      description: favorite ? `${name} has been removed from your favorites` : `${name} has been added to your favorites`,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-scale-in dark:bg-gray-800/80 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-masjid-dark dark:text-gray-200">
            <MapPin className="h-3 w-3 mr-1 text-masjid-green" />
            {distance}
          </Badge>
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-7 w-7 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500 dark:text-gray-400'}`} />
          </Button>
        </div>
        {nextPrayer && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-white">
                <Clock className="h-4 w-4 mr-1 text-white" />
                <span className="text-sm font-medium">Next: {nextPrayer.name}</span>
              </div>
              <span className="text-white font-bold">{nextPrayer.time}</span>
            </div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-masjid-dark dark:text-gray-200">{name}</CardTitle>
          <div className="flex">{renderStars(rating)}</div>
        </div>
        <CardDescription className="flex items-start">
          <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5 text-masjid-green" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">{address}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{description}</p>
        
        {prayerTimes && (
          <Collapsible
            open={prayerTimesOpen}
            onOpenChange={setPrayerTimesOpen}
            className="mt-2 border rounded-lg p-3 bg-masjid-green/5 dark:bg-masjid-green/10 dark:border-masjid-green/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-masjid-green" />
                <span className="text-sm font-medium text-masjid-green">Prayer Times</span>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                  <ChevronDown className={`h-4 w-4 text-masjid-green transition-transform duration-200 ${prayerTimesOpen ? 'rotate-180' : ''}`} />
                  <span className="sr-only">Toggle prayer times</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-2">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col items-center p-1.5 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                  <span className="font-medium text-masjid-dark dark:text-gray-200">Fajr</span>
                  <span className="text-masjid-green">{prayerTimes.fajr}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                  <span className="font-medium text-masjid-dark dark:text-gray-200">Dhuhr</span>
                  <span className="text-masjid-green">{prayerTimes.dhuhr}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                  <span className="font-medium text-masjid-dark dark:text-gray-200">Asr</span>
                  <span className="text-masjid-green">{prayerTimes.asr}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                  <span className="font-medium text-masjid-dark dark:text-gray-200">Maghrib</span>
                  <span className="text-masjid-green">{prayerTimes.maghrib}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                  <span className="font-medium text-masjid-dark dark:text-gray-200">Isha</span>
                  <span className="text-masjid-green">{prayerTimes.isha}</span>
                </div>
                <div className="flex flex-col items-center p-1.5 bg-white dark:bg-gray-700 rounded border dark:border-gray-600">
                  <span className="font-medium text-masjid-dark dark:text-gray-200">Jummah</span>
                  <span className="text-masjid-green">{prayerTimes.jummah}</span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
        
        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {facilities.map((facility, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-green-50 dark:bg-green-900/20 text-masjid-green border-masjid-green/20 dark:border-masjid-green/30">
                {facility}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" className="text-masjid-green border-masjid-green/30 hover:bg-masjid-green/10 dark:text-masjid-green/90 dark:border-masjid-green/40 dark:hover:bg-masjid-green/20">
          <Navigation className="h-4 w-4 mr-2" />
          Directions
        </Button>
        <Button variant="default" className="bg-masjid-green hover:bg-masjid-green/90 dark:bg-masjid-green dark:hover:bg-masjid-green/90" asChild>
          <Link to={`/masjid/${id}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MasjidCard;

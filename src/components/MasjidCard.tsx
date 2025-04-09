
import React from 'react';
import { MapPin, Star, Navigation, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MasjidCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  imageUrl: string;
  isFavorite?: boolean;
  facilities?: string[];
  nextPrayer?: {
    name: string;
    time: string;
  };
}

const MasjidCard = ({
  id,
  name,
  address,
  distance,
  rating,
  imageUrl,
  isFavorite = false,
  facilities = [],
  nextPrayer,
}: MasjidCardProps) => {
  
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

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-scale-in">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-masjid-dark">
            <MapPin className="h-3 w-3 mr-1 text-masjid-green" />
            {distance}
          </Badge>
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
          <CardTitle className="text-xl font-bold text-masjid-dark">{name}</CardTitle>
          <div className="flex">{renderStars(rating)}</div>
        </div>
        <CardDescription className="flex items-start">
          <MapPin className="h-4 w-4 mr-1 shrink-0 mt-0.5 text-masjid-green" />
          <span className="text-gray-500 text-sm">{address}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {facilities.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {facilities.map((facility, index) => (
              <Badge key={index} variant="outline" className="text-xs bg-green-50 text-masjid-green border-masjid-green/20">
                {facility}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" className="text-masjid-green border-masjid-green/30 hover:bg-masjid-green/10">
          <Navigation className="h-4 w-4 mr-2" />
          Directions
        </Button>
        <Button variant="default" className="bg-masjid-green hover:bg-masjid-green/90">
          <ExternalLink className="h-4 w-4 mr-2" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MasjidCard;

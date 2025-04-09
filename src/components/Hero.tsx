
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center islamic-pattern">
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70" />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-masjid-dark">
              Find Your Nearest <span className="text-masjid-green">Masjid</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
              Easily locate mosques near you, check prayer times, and get directions with our modern mosque finder app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-masjid-green hover:bg-masjid-green/90 text-white px-6 py-6">
                <Link to="/find">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find Nearest Masjid
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-masjid-green text-masjid-green hover:bg-masjid-green/10 px-6 py-6">
                <Link to="/prayer-times">
                  Check Prayer Times
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative animate-fade-in-right">
              <div className="absolute inset-0 bg-masjid-green rounded-full opacity-10 blur-3xl transform -translate-x-4 translate-y-4"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1585129918930-80dee053a029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Beautiful Mosque" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

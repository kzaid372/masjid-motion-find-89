
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center islamic-pattern overflow-hidden">
      {/* Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70 dark:from-gray-900/95 dark:to-gray-900/85" />
      
      {/* Animated background shapes */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 bg-masjid-green/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.5, 0.3, 0.5],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 -left-20 w-80 h-80 bg-masjid-gold/10 rounded-full blur-3xl" 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-masjid-dark dark:text-white">
              Find Your Nearest <span className="text-gradient">Masjid</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md">
              Easily locate mosques near you, check prayer times, and get directions with our modern mosque finder app.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="animated-btn group">
                <Link to="/find">
                  <MapPin className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                  <span className="relative z-10">Find Nearest Masjid</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-masjid-green text-masjid-green hover:bg-masjid-green/10 px-6 py-6 transition-all duration-300 hover:scale-105 dark:text-masjid-green/90 dark:border-masjid-green/40">
                <Link to="/prayer-times">
                  <Calendar className="mr-2 h-5 w-5" />
                  Check Prayer Times
                </Link>
              </Button>
            </div>
            
            <motion.div 
              className="hidden md:flex items-center mt-12 space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Trusted by</span>
              <div className="flex space-x-4 items-center">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold">
                    M{i}
                  </div>
                ))}
                <span className="text-sm font-medium text-masjid-green">3,000+ Masjids</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-masjid-green/20 to-masjid-gold/20 rounded-2xl blur-xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-white dark:border-gray-800 transition-transform duration-500 hover:scale-102 hover:shadow-xl">
                <motion.img 
                  src="https://images.unsplash.com/photo-1585129918930-80dee053a029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                  alt="Beautiful Mosque" 
                  className="w-full h-auto rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Image overlay with prayer time preview */}
                <div className="absolute bottom-0 left-0 right-0 glass-effect p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-white/80">Next Prayer</p>
                      <p className="text-sm font-bold text-white">Asr • 16:30</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs bg-white/20 border-white/30 text-white hover:bg-white/30">
                      View Times
                    </Button>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute top-4 right-4">
                  <span className="animated-badge">
                    New Features
                  </span>
                </div>
              </div>
              
              {/* Floating cards */}
              <motion.div 
                className="absolute -right-4 -bottom-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg flex items-center space-x-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <MapPin className="h-4 w-4 text-masjid-green" />
                <span className="text-xs font-medium">24 Nearby Masjids</span>
              </motion.div>
              
              <motion.div 
                className="absolute -left-4 top-1/4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-masjid-green/20 flex items-center justify-center">
                    <Search className="h-3 w-3 text-masjid-green" />
                  </div>
                  <span className="text-xs font-medium">Quick Search</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="mobile-nav">
        <Link to="/" className="flex flex-col items-center">
          <MapPin className="h-5 w-5 text-masjid-green" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/find" className="flex flex-col items-center">
          <Search className="h-5 w-5 text-gray-500" />
          <span className="text-xs mt-1">Find</span>
        </Link>
        <Link to="/prayer-times" className="flex flex-col items-center">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-xs mt-1">Prayers</span>
        </Link>
        <Link to="/saved" className="flex flex-col items-center">
          <div className="w-10 h-10 bg-masjid-green rounded-full flex items-center justify-center -mt-5 border-4 border-white dark:border-gray-900">
            <span className="text-white text-xs">Saved</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

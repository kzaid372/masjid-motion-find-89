
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, MapPin, Clock, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-masjid-green flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold text-xl text-masjid-dark">MasjidFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-masjid-dark hover:text-masjid-green transition-colors">Home</Link>
            <Link to="/find" className="text-masjid-dark hover:text-masjid-green transition-colors">Find Masjid</Link>
            <Link to="/prayer-times" className="text-masjid-dark hover:text-masjid-green transition-colors">Prayer Times</Link>
            <Link to="/saved" className="text-masjid-dark hover:text-masjid-green transition-colors">Saved</Link>
          </nav>

          {/* Search and Menu Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-masjid-dark hover:text-masjid-green">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden text-masjid-dark hover:text-masjid-green" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-lg animate-fade-in">
          <nav className="container mx-auto px-4 flex flex-col space-y-3">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
              <MapPin className="h-5 w-5 text-masjid-green" />
              <span>Find Masjid</span>
            </Link>
            <Link to="/prayer-times" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Clock className="h-5 w-5 text-masjid-green" />
              <span>Prayer Times</span>
            </Link>
            <Link to="/saved" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Heart className="h-5 w-5 text-masjid-green" />
              <span>Saved Masjids</span>
            </Link>
            <Link to="/settings" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="h-5 w-5 text-masjid-green" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

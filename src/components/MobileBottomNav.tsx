
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Clock, Heart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const MobileBottomNav = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/find', label: 'Find', icon: MapPin },
    { path: '/prayer-times', label: 'Prayers', icon: Clock },
    { path: '/saved', label: 'Saved', icon: Heart },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-up border-t border-gray-200 dark:border-gray-800 z-40 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full py-1 px-2 text-xs transition-colors",
              isActive(item.path) 
                ? "text-masjid-green" 
                : "text-gray-500 dark:text-gray-400 hover:text-masjid-green dark:hover:text-masjid-green"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 mb-1",
              isActive(item.path) && "text-masjid-green"
            )} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileBottomNav;


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, X, MapPin, Clock, Heart, Settings, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import AuthButton from './AuthButton';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signInWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon?: React.ElementType }) => (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-2 px-4 py-3 text-base rounded-md transition-colors",
        isActive(to) ? 
          "bg-masjid-green/10 text-masjid-green font-medium" : 
          "text-masjid-dark hover:bg-gray-100 hover:text-masjid-green dark:hover:bg-gray-800"
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
    </Link>
  );

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-masjid-green flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="font-bold text-xl text-masjid-dark dark:text-white">MasjidFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/') && "bg-masjid-green/10 text-masjid-green dark:text-masjid-green"
                    )}>
                      {t('navbar.home')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/find">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/find') && "bg-masjid-green/10 text-masjid-green dark:text-masjid-green"
                    )}>
                      {t('navbar.findMasjid')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/prayer-times">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/prayer-times') && "bg-masjid-green/10 text-masjid-green dark:text-masjid-green"
                    )}>
                      {t('navbar.prayerTimes')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/saved">
                    <NavigationMenuLink className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/saved') && "bg-masjid-green/10 text-masjid-green dark:text-masjid-green"
                    )}>
                      {t('navbar.favorites')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Search and Menu Actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            <Button 
              variant="outline" 
              size="icon" 
              className="text-masjid-dark dark:text-white hover:text-masjid-green hidden md:flex"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="outline" size="icon" className="text-masjid-dark dark:text-white hover:text-masjid-green hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Auth Button (Desktop) */}
            <div className="hidden md:block">
              <AuthButton />
            </div>
            
            {/* Mobile Menu using Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-masjid-dark dark:text-white hover:text-masjid-green">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="px-4 py-6 focus:outline-none dark:bg-gray-900">
                <div className="flex flex-col space-y-1 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-masjid-green flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                      </div>
                      <span className="font-bold text-xl text-masjid-dark dark:text-white">MasjidFinder</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleTheme}
                        className="text-masjid-dark dark:text-white"
                      >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="ghost" size="icon" className="dark:text-white">
                          <X className="h-5 w-5" />
                        </Button>
                      </DrawerClose>
                    </div>
                  </div>
                  
                  {!user && (
                    <div className="flex items-center justify-between mb-4">
                      <Button variant="outline" className="w-full gap-2 dark:border-gray-700 dark:text-white" onClick={signInWithGoogle}>
                        Sign in with Google
                      </Button>
                    </div>
                  )}
                  
                  <nav className="flex flex-col">
                    <NavLink to="/" icon={MapPin}>{t('navbar.home')}</NavLink>
                    <NavLink to="/find" icon={MapPin}>{t('navbar.findMasjid')}</NavLink>
                    <NavLink to="/prayer-times" icon={Clock}>{t('navbar.prayerTimes')}</NavLink>
                    <NavLink to="/saved" icon={Heart}>{t('navbar.favorites')}</NavLink>
                    <NavLink to="/settings" icon={Settings}>{t('navbar.settings')}</NavLink>
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

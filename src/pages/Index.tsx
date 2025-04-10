
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RecommendedMasjids from '@/components/RecommendedMasjids';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen dark:bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={user ? 'logged-in' : 'logged-out'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Hero />
        </motion.div>
      </AnimatePresence>
      <Features />
      <RecommendedMasjids />
      <Footer />
    </motion.div>
  );
};

export default Index;

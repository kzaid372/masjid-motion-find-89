
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RecommendedMasjids from '@/components/RecommendedMasjids';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
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
      <Hero />
      <Features />
      <RecommendedMasjids />
      <Footer />
    </motion.div>
  );
};

export default Index;

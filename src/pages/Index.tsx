
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RecommendedMasjids from '@/components/RecommendedMasjids';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <RecommendedMasjids />
      <Footer />
    </div>
  );
};

export default Index;

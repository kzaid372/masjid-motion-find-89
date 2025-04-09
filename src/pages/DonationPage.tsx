
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationSection from '@/components/DonationSection';

const DonationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-masjid-dark">
              Support Our <span className="text-masjid-green">Masjid</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your generosity helps us maintain our facilities and serve the community
            </p>
          </div>
        </div>
        
        <DonationSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationPage;

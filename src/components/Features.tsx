
import React from 'react';
import { MapPin, Clock, Bell, Navigation, Star, Map } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <MapPin className="h-10 w-10 text-masjid-green" />,
    title: 'Find Nearby Mosques',
    description: 'Easily locate mosques near your current location with our interactive map.'
  },
  {
    icon: <Clock className="h-10 w-10 text-masjid-green" />,
    title: 'Prayer Times',
    description: 'Access accurate prayer times for any mosque based on your location.'
  },
  {
    icon: <Navigation className="h-10 w-10 text-masjid-green" />,
    title: 'Directions',
    description: 'Get detailed directions to the mosque of your choice from anywhere.'
  },
  {
    icon: <Bell className="h-10 w-10 text-masjid-green" />,
    title: 'Prayer Alerts',
    description: 'Receive timely notifications for prayer times throughout the day.'
  },
  {
    icon: <Star className="h-10 w-10 text-masjid-green" />,
    title: 'Save Favorites',
    description: 'Bookmark your favorite mosques for quick access in the future.'
  },
  {
    icon: <Map className="h-10 w-10 text-masjid-green" />,
    title: 'Community Reviews',
    description: 'Read and contribute reviews to help the Muslim community.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-masjid-dark dark:text-white mb-4">
            Features & <span className="text-masjid-green">Benefits</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our app is designed to make finding mosques and tracking prayer times easier for Muslims all around the world.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
              variants={item}
            >
              <div className="mb-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-full w-fit transform transition-transform duration-500 hover:rotate-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-masjid-dark dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

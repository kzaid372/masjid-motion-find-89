
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Heart } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const MonthlyDonation = () => {
  const handleSubscribe = () => {
    toast({
      title: "Monthly donation subscription",
      description: "Thank you for your interest! This feature will be available soon.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="border-2 border-masjid-green/30 dark:border-masjid-green/20 dark:bg-gray-800/90 transition-all duration-300 hover:shadow-lg dark:hover:shadow-masjid-green/5 overflow-hidden">
        <CardHeader className="bg-masjid-green/10 dark:bg-masjid-green/20">
          <CardTitle className="text-xl text-center text-masjid-dark dark:text-white flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-masjid-green" />
            Become a Monthly Supporter
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-masjid-green dark:text-masjid-green">$30
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/month</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">Contribute regularly to support our operations</p>
          </div>

          <ul className="space-y-2 mb-6">
            {['Automatic monthly donations', 'Cancel anytime', 'Quarterly impact reports', 'Special event invitations'].map((benefit, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Check className="h-5 w-5 text-masjid-green shrink-0 mr-2" />
                <span className="dark:text-gray-300">{benefit}</span>
              </motion.li>
            ))}
          </ul>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="monthly-donor" className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-700/70 mb-4 border-gray-200 dark:border-gray-600">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Why become a monthly donor?
              </AccordionTrigger>
              <AccordionContent className="pt-2 text-sm text-gray-600 dark:text-gray-300">
                Monthly donations provide reliable funding that allows us to plan effectively for community programs, maintain our facilities, and expand our services to meet growing needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubscribe} 
            className="w-full bg-masjid-green hover:bg-masjid-green/90 text-white dark:bg-masjid-green/90 dark:hover:bg-masjid-green transition-all duration-200 hover:scale-105"
          >
            Subscribe Monthly
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MonthlyDonation;

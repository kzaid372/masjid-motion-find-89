
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/use-toast';

const MonthlyDonation = () => {
  const handleSubscribe = () => {
    toast({
      title: "Monthly donation subscription",
      description: "Thank you for your interest! This feature will be available soon.",
    });
  };

  return (
    <Card className="border-2 border-masjid-green/30">
      <CardHeader className="bg-masjid-green/10">
        <CardTitle className="text-xl text-center text-masjid-dark">
          Become a Monthly Supporter
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-masjid-green">$30<span className="text-sm font-normal text-gray-500">/month</span></p>
          <p className="text-sm text-gray-500 mt-2">Contribute regularly to support our operations</p>
        </div>

        <ul className="space-y-2 mb-6">
          {['Automatic monthly donations', 'Cancel anytime', 'Quarterly impact reports', 'Special event invitations'].map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-masjid-green shrink-0 mr-2" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        <Collapsible className="border rounded-lg p-3 bg-gray-50 mb-4">
          <CollapsibleTrigger className="flex w-full justify-between items-center text-sm font-medium">
            Why become a monthly donor?
            <span className="text-masjid-green">+</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 text-sm text-gray-600">
            Monthly donations provide reliable funding that allows us to plan effectively for community programs, maintain our facilities, and expand our services to meet growing needs.
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubscribe} className="w-full bg-masjid-green hover:bg-masjid-green/90">
          Subscribe Monthly
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MonthlyDonation;

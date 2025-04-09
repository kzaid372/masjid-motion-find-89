
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpen, Home, Utensils, Users } from 'lucide-react';

const DonationImpact = () => {
  const impacts = [
    {
      title: "Education Programs",
      description: "Providing Islamic education to over 200 children and adults weekly",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Facility Maintenance",
      description: "Keeping our masjid beautiful, clean, and fully functional",
      icon: Home,
      color: "bg-green-500",
    },
    {
      title: "Community Meals",
      description: "Serving over 500 meals monthly to those in need",
      icon: Utensils,
      color: "bg-orange-500",
    },
    {
      title: "Youth Development",
      description: "Organizing activities and mentorship for 100+ youth",
      icon: Users,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-masjid-dark mb-8">
        Your Donation <span className="text-masjid-green">Makes a Difference</span>
      </h2>
      
      <Carousel className="w-full">
        <CarouselContent>
          {impacts.map((impact, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-full ${impact.color} flex items-center justify-center mb-4`}>
                    <impact.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{impact.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{impact.description}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex justify-end gap-2 mt-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
      
      <div className="mt-12 bg-masjid-green/10 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold mb-4">Transparency Promise</h3>
        <p className="text-gray-600">
          We provide quarterly financial reports to our community, ensuring full transparency on how donations are utilized.
        </p>
      </div>
    </div>
  );
};

export default DonationImpact;

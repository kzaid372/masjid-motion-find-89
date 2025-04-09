
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Bell, Clock, MapPin, ChevronDown, ChevronRight, Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock prayer time data
const prayerTimesData = {
  date: 'April 9, 2025',
  hijriDate: '11 Ramadan, 1446',
  timings: [
    { name: 'Fajr', time: '5:12 AM', status: 'past' },
    { name: 'Sunrise', time: '6:28 AM', status: 'past' },
    { name: 'Dhuhr', time: '1:05 PM', status: 'past' },
    { name: 'Asr', time: '4:35 PM', status: 'next' },
    { name: 'Maghrib', time: '7:42 PM', status: 'upcoming' },
    { name: 'Isha', time: '9:12 PM', status: 'upcoming' },
  ],
  location: 'New York, NY'
};

const PrayerTimes = () => {
  const [location, setLocation] = useState(prayerTimesData.location);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-masjid-dark">
              Prayer <span className="text-masjid-green">Times</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Check accurate prayer times for your location
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 animate-fade-in">
              <div className="flex items-center mb-4 md:mb-0">
                <MapPin className="h-5 w-5 text-masjid-green mr-2" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-[200px] border-masjid-green/20 focus:ring-masjid-green/20">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New York, NY">New York, NY</SelectItem>
                    <SelectItem value="Los Angeles, CA">Los Angeles, CA</SelectItem>
                    <SelectItem value="Chicago, IL">Chicago, IL</SelectItem>
                    <SelectItem value="Houston, TX">Houston, TX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                  <Calendar className="h-4 w-4" />
                  <span>Calendar</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2 border-masjid-green/20 text-masjid-green hover:bg-masjid-green/10">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Button>
              </div>
            </div>
            
            <Card className="mb-6 overflow-hidden shadow-md border-masjid-green/10 animate-scale-in">
              <div className="bg-gradient-to-r from-masjid-green to-masjid-green/80 text-white p-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{prayerTimesData.date}</h2>
                    <p className="text-white/80">{prayerTimesData.hijriDate}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <Clock className="h-6 w-6 mr-2 animate-pulse-gentle" />
                    <div>
                      <p className="text-sm">Next Prayer</p>
                      <p className="text-xl font-bold">Asr - 4:35 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y">
                  {prayerTimesData.timings.map((prayer, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-4 ${
                        prayer.status === 'next' ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        {prayer.status === 'next' && (
                          <ChevronRight className="h-5 w-5 text-masjid-green mr-2 animate-pulse-gentle" />
                        )}
                        <span className={`text-lg ${prayer.status === 'next' ? 'font-bold text-masjid-green' : 'text-masjid-dark'}`}>
                          {prayer.name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={`${prayer.status === 'next' ? 'font-bold text-masjid-green' : 'text-gray-600'}`}>
                          {prayer.time}
                        </span>
                        <Button variant="ghost" size="icon" className="ml-2 text-gray-400 hover:text-masjid-green">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-masjid-dark">Nearby Mosques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Al-Noor Mosque', 'Masjid Al-Rahman', 'Islamic Center', 'Al-Falah Mosque'].map((masjid, index) => (
                  <Card key={index} className="overflow-hidden shadow-sm border-masjid-green/10">
                    <CardHeader className="p-4 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-base font-semibold">{masjid}</CardTitle>
                        <CardDescription className="text-sm">{0.8 + index * 0.7} km away</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" className="text-masjid-green text-xs border-masjid-green/20 hover:bg-masjid-green/10">
                        View Times
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center animate-fade-in">
              <p className="text-gray-500 text-sm">
                Prayer times are calculated using the MWL method.
              </p>
              <Button variant="link" className="text-masjid-green">
                <Settings className="h-4 w-4 mr-1" />
                Adjust Calculation Method
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrayerTimes;

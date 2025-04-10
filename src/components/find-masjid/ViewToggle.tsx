
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, MapIcon, Filter } from 'lucide-react';

interface ViewToggleProps {
  view: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
  onFilterClick: () => void;
}

const ViewToggle = ({ view, onViewChange, onFilterClick }: ViewToggleProps) => {
  return (
    <div className="flex justify-between items-center gap-2 mb-6">
      <Tabs 
        defaultValue={view} 
        value={view} 
        onValueChange={(value) => onViewChange(value as 'map' | 'list')}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <TabsTrigger 
            value="map"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            <MapIcon className="h-4 w-4 mr-2" />
            Map View
          </TabsTrigger>
          <TabsTrigger 
            value="list"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
          >
            <List className="h-4 w-4 mr-2" />
            List View
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 border-masjid-green text-masjid-green hover:bg-masjid-green/10"
        onClick={onFilterClick}
      >
        <Filter className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ViewToggle;

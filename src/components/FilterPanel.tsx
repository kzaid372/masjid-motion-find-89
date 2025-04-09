
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  distance: number;
  prayerTime: string;
  facilities: string[];
  openNow: boolean;
}

const FilterPanel = ({ isOpen, onClose, onApplyFilters }: FilterPanelProps) => {
  const [distance, setDistance] = React.useState<number>(10);
  const [prayerTime, setPrayerTime] = React.useState<string>('any');
  const [openNow, setOpenNow] = React.useState<boolean>(false);
  const [selectedFacilities, setSelectedFacilities] = React.useState<string[]>([]);
  
  const facilities = [
    { id: 'parking', label: 'Parking' },
    { id: 'wudhu', label: 'Wudhu Area' },
    { id: 'women', label: 'Women Section' },
    { id: 'wheelchair', label: 'Wheelchair Access' },
    { id: 'quran', label: 'Quran Classes' },
  ];

  const handleFacilityToggle = (facilityId: string) => {
    setSelectedFacilities(prev => 
      prev.includes(facilityId) 
        ? prev.filter(id => id !== facilityId) 
        : [...prev, facilityId]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      distance,
      prayerTime,
      facilities: selectedFacilities,
      openNow
    });
    onClose();
  };

  const handleResetFilters = () => {
    setDistance(10);
    setPrayerTime('any');
    setOpenNow(false);
    setSelectedFacilities([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto animate-slide-in-right">
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filter Masjids</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Distance Filter */}
          <div className="space-y-4">
            <h4 className="font-medium text-masjid-dark">Distance</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="distance">Max Distance</Label>
                <span className="text-sm font-medium">{distance} km</span>
              </div>
              <Slider 
                id="distance"
                min={1} 
                max={20} 
                step={1} 
                value={[distance]} 
                onValueChange={(value) => setDistance(value[0])} 
                className="py-4"
              />
            </div>
          </div>
          
          {/* Prayer Time Filter */}
          <div className="space-y-4">
            <h4 className="font-medium text-masjid-dark">Prayer Time</h4>
            <Select value={prayerTime} onValueChange={setPrayerTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select prayer time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Time</SelectItem>
                <SelectItem value="fajr">Fajr</SelectItem>
                <SelectItem value="zuhr">Zuhr</SelectItem>
                <SelectItem value="asr">Asr</SelectItem>
                <SelectItem value="maghrib">Maghrib</SelectItem>
                <SelectItem value="isha">Isha</SelectItem>
                <SelectItem value="jummah">Jummah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Open Now Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="open-now" className="cursor-pointer">Currently Open</Label>
            <Switch 
              id="open-now" 
              checked={openNow} 
              onCheckedChange={setOpenNow}
            />
          </div>
          
          {/* Facilities Filter */}
          <div className="space-y-4">
            <h4 className="font-medium text-masjid-dark">Facilities</h4>
            <div className="grid grid-cols-2 gap-2">
              {facilities.map((facility) => (
                <div 
                  key={facility.id}
                  onClick={() => handleFacilityToggle(facility.id)}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    selectedFacilities.includes(facility.id) 
                      ? 'bg-masjid-green/10 border-masjid-green' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Label className="cursor-pointer">{facility.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t sticky bottom-0 bg-white flex flex-col gap-3">
          <Button 
            onClick={handleApplyFilters}
            className="w-full bg-masjid-green hover:bg-masjid-green/90"
          >
            Apply Filters
          </Button>
          <Button 
            variant="outline"
            onClick={handleResetFilters}
            className="w-full"
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

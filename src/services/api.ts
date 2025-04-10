
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token interceptor
axiosInstance.interceptors.request.use((config) => {
  // Add auth token if available
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

// Mock data for fallback when API fails
const mockData = {
  masjids: [
    {
      _id: '1',
      name: 'Al-Noor Mosque',
      address: '123 Islamic Way, New York, NY 10001',
      distance: '1.2 km',
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1545167496-28be8f7a29e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: "A beautiful masjid serving the local Muslim community with daily prayers and regular Islamic activities.",
      facilities: ['Parking', 'Wudhu Area', 'Women Section', 'Library', 'Quran Classes', 'Wheelchair Access'],
      nextPrayer: {
        name: 'Asr',
        time: '4:30 PM',
      },
      prayerTimes: {
        fajr: '5:30 AM',
        dhuhr: '1:00 PM',
        asr: '4:30 PM',
        maghrib: '7:15 PM',
        isha: '8:45 PM',
        jummah: '1:30 PM'
      }
    },
    {
      _id: '2',
      name: 'Masjid Al-Rahman',
      address: '456 Faith Street, New York, NY 10002',
      distance: '2.5 km',
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1542379653-b926a529191d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      description: "Masjid Al-Rahman is dedicated to serving the religious, social, and educational needs of Muslims in the New York area.",
      facilities: ['Library', 'Prayer Mats', 'AC', 'Women Section', 'Parking'],
      nextPrayer: {
        name: 'Asr',
        time: '4:35 PM',
      },
      prayerTimes: {
        fajr: '5:25 AM',
        dhuhr: '1:05 PM',
        asr: '4:35 PM',
        maghrib: '7:10 PM',
        isha: '8:40 PM',
        jummah: '1:20 PM'
      }
    }
  ],
  prayerTimes: {
    date: new Date().toISOString().split('T')[0],
    fajr: '5:12 AM',
    sunrise: '6:28 AM',
    dhuhr: '1:05 PM',
    asr: '4:35 PM',
    maghrib: '7:42 PM',
    isha: '9:12 PM',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
    }
  }
};

// Generic API request with error handling and fallback
export async function api<T>(endpoint: string, options: any = {}): Promise<T> {
  const { method = 'GET', data, params, withAuth = true, mockOnFail = true } = options;
  
  try {
    const response = await axiosInstance({
      method,
      url: endpoint,
      data,
      params
    });
    
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    
    // Show error toast
    toast({
      title: 'Error',
      description: axios.isAxiosError(error) 
        ? error.response?.data?.message || 'API request failed' 
        : 'An unknown error occurred',
      variant: 'destructive',
    });
    
    // If mockOnFail is true, return mock data based on endpoint
    if (mockOnFail) {
      console.log('Using mock data fallback for:', endpoint);
      
      if (endpoint.includes('/masjids/nearby')) {
        return mockData.masjids as unknown as T;
      }
      if (endpoint.includes('/masjids/')) {
        return mockData.masjids[0] as unknown as T;
      }
      if (endpoint.includes('/prayer-times')) {
        return mockData.prayerTimes as unknown as T;
      }
    }
    
    throw error;
  }
}

// Masjid APIs
export const MasjidApi = {
  getNearby: (lat: number, lng: number, radius: number = 5) => 
    api<any>(`/masjids/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
  
  getById: (id: string) => 
    api<any>(`/masjids/${id}`),
  
  search: (query: string) => 
    api<any>(`/masjids/search?q=${encodeURIComponent(query)}`),
    
  getSaved: () => 
    api<any>('/users/saved-masjids'),
    
  toggleSave: (masjidId: string) => 
    api<any>('/masjids/save', { method: 'POST', data: { masjidId } }),
};

// User APIs
export const UserApi = {
  updateProfile: (data: any) => 
    api<any>('/users/profile', { method: 'PUT', data }),
    
  getSavedMasjids: () => 
    api<any>('/users/saved-masjids'),
};

// Prayer Times API
export const PrayerTimesApi = {
  getForLocation: (lat: number, lng: number, date?: string) => 
    api<any>(`/prayer-times?lat=${lat}&lng=${lng}${date ? `&date=${date}` : ''}`),
};

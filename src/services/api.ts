
import { toast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  withAuth?: boolean;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, withAuth = true } = options;
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add auth token if required and available
    if (withAuth) {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'API request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'An unknown error occurred',
      variant: 'destructive',
    });
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
    api<any>('/masjids/saved'),
    
  toggleSave: (masjidId: string) => 
    api<any>('/masjids/save', { method: 'POST', body: { masjidId } }),
};

// User APIs
export const UserApi = {
  updateProfile: (data: any) => 
    api<any>('/users/profile', { method: 'PUT', body: data }),
    
  getSavedMasjids: () => 
    api<any>('/users/saved-masjids'),
};

// Prayer Times API
export const PrayerTimesApi = {
  getForLocation: (lat: number, lng: number, date?: string) => 
    api<any>(`/prayer-times?lat=${lat}&lng=${lng}${date ? `&date=${date}` : ''}`),
};

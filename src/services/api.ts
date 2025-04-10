
import axios from 'axios';
import { dummyMasjids, dummyMasjidDetails, dummyReviews } from './dummyData';

// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if user is logged in
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const MasjidApi = {
  // Fetch nearby masjids based on coordinates
  getNearby: async (lat: number, lng: number, radius: number = 5) => {
    try {
      const response = await api.get(`/masjids/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby masjids:', error);
      // Fallback to dummy data
      console.log('Using dummy masjid data...');
      return dummyMasjids;
    }
  },

  // Fetch a single masjid by ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/masjids/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching masjid with ID ${id}:`, error);
      // Return dummy masjid that matches the ID or the first one
      return dummyMasjidDetails.find(m => m._id === id) || dummyMasjidDetails[0];
    }
  },

  // Search masjids by query
  search: async (query: string) => {
    try {
      const response = await api.get(`/masjids/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching masjids:', error);
      // Filter dummy data based on query for realistic fallback
      const filteredMasjids = dummyMasjids.filter(
        m => m.name.toLowerCase().includes(query.toLowerCase()) || 
             m.address.toLowerCase().includes(query.toLowerCase())
      );
      return filteredMasjids.length > 0 ? filteredMasjids : dummyMasjids;
    }
  },

  // Get saved/favorite masjids
  getSaved: async () => {
    try {
      const response = await api.get('/users/saved-masjids');
      return response.data;
    } catch (error) {
      console.error('Error fetching saved masjids:', error);
      // Return a subset of dummy data as "saved"
      return dummyMasjids.slice(0, 3);
    }
  },

  // Toggle saved/favorite status for a masjid
  toggleSaved: async (masjidId: string) => {
    try {
      const response = await api.post(`/users/toggle-saved/${masjidId}`);
      return response.data;
    } catch (error) {
      console.error('Error toggling saved status:', error);
      // Return mock response
      return { success: true, message: 'Masjid saved status toggled successfully (mock)' };
    }
  },

  // Get reviews for a specific masjid
  getReviews: async (masjidId: string) => {
    try {
      const response = await api.get(`/reviews/masjid/${masjidId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for masjid ${masjidId}:`, error);
      return dummyReviews;
    }
  },

  // Add a review for a masjid
  addReview: async (masjidId: string, rating: number, text: string) => {
    try {
      const response = await api.post(`/reviews/masjid/${masjidId}`, { rating, text });
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      // Return mock response
      return { 
        success: true, 
        review: {
          _id: `dummy-${Date.now()}`,
          masjidId,
          userId: 'current-user',
          rating,
          text,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          user: {
            displayName: 'You (mock)',
            photoURL: null
          }
        } 
      };
    }
  }
};

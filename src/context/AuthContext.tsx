
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('masjidFinder_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock Google sign in function (would use real Firebase/Auth in production)
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // This is a mock implementation - in a real app, you would use Firebase Auth or similar
      const mockUser = {
        id: 'google-user-123',
        email: 'user@example.com',
        displayName: 'Demo User',
        photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=0C6E4E&color=fff',
      };
      
      // Store user in localStorage (in a real app, you'd use proper auth tokens)
      localStorage.setItem('masjidFinder_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Success!",
        description: "You have successfully signed in with Google.",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Error signing in",
        description: "There was a problem signing in with Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      // Remove user from localStorage
      localStorage.removeItem('masjidFinder_user');
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You have successfully signed out.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

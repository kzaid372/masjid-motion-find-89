
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  getIdToken
} from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';

interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  token?: string; // Add token for API authentication
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

  // Convert Firebase user to our User interface and get token
  const formatUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    const token = await getIdToken(firebaseUser);
    
    // Store user data and token in localStorage
    const userData = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || 'User',
      photoURL: firebaseUser.photoURL,
      token
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    return userData;
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const formattedUser = await formatUser(firebaseUser);
        setUser(formattedUser);
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    // Check localStorage for existing user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Google sign in function using Firebase
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      await formatUser(result.user);
      
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
      await firebaseSignOut(auth);
      localStorage.removeItem('user');
      
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

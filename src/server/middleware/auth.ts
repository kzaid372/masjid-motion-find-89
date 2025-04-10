
import { Request, Response, NextFunction } from 'express';
import { getDb } from '../config/db';
import { User } from '../models/types';
import { auth } from '../../config/firebase';

// Extend Request type to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify Firebase token
    // Since we're using a mock version here, we'll just return a success
    // In a real app, you would uncomment this code and ensure Firebase Admin is set up
    /*
    const decodedToken = await auth.verifyIdToken(token);
    const firebaseId = decodedToken.uid;
    */
    
    // For development/demo purposes, use a mock user ID
    const firebaseId = 'mock-firebase-user-id';
    
    // Find user in database
    const db = getDb();
    let user = await db.collection<User>('users').findOne({ firebaseId });
    
    // If user doesn't exist, create one
    if (!user) {
      const newUser = {
        firebaseId,
        email: 'mock@example.com',
        displayName: 'Mock User',
        photoURL: '',
        savedMasjids: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const result = await db.collection<User>('users').insertOne(newUser);
      user = { ...newUser, _id: result.insertedId };
    }
    
    // Add user ID to request
    req.userId = user._id?.toString();
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

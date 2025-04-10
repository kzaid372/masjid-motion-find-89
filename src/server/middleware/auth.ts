
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
    const decodedToken = await auth.verifyIdToken(token);
    const firebaseId = decodedToken.uid;
    
    // Find user in database
    const db = getDb();
    let user = await db.collection<User>('users').findOne({ firebaseId });
    
    // If user doesn't exist, create one
    if (!user) {
      const newUser = {
        firebaseId,
        email: decodedToken.email || '',
        displayName: decodedToken.name || 'User',
        photoURL: decodedToken.picture || '',
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

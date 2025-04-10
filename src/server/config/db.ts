
import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Replace the uri string with your MongoDB connection string
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/masjidFinder';
const client = new MongoClient(uri);

let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db;
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('masjidFinder');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not connected! Call connectToDatabase first.');
  }
  return db;
}

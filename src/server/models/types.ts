
import { ObjectId } from 'mongodb';

export interface Masjid {
  _id?: ObjectId;
  name: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  distance?: string;
  rating: number;
  reviewCount?: number;
  imageUrl: string;
  description?: string;
  facilities: string[];
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    jummah: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  programs?: Array<{
    name: string;
    description: string;
    day: string;
    time: string;
  }>;
  gallery?: string[];
  parking?: {
    available: boolean;
    capacity?: number;
    details?: string;
  };
  accessibility?: {
    wheelchairAccess: boolean;
    elevators?: boolean;
    details?: string;
  };
  languages?: string[];
  history?: string;
  events?: Array<{
    name: string;
    date: string;
    time: string;
    description: string;
  }>;
  founder?: string;
  yearFounded?: number;
  capacity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  _id?: ObjectId;
  firebaseId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  savedMasjids: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Review {
  _id?: ObjectId;
  masjidId: ObjectId;
  userId: ObjectId;
  rating: number;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: {
    displayName: string;
    photoURL?: string;
  };
}

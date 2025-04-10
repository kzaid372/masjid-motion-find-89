
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
  imageUrl: string;
  facilities: string[];
  prayerTimes: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    jummah: string;
  };
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
}

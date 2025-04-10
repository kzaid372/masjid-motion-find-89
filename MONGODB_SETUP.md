
# MasjidFinder MongoDB Setup Guide

This guide will help you set up MongoDB for the MasjidFinder application.

## Prerequisites

1. MongoDB Atlas account or local MongoDB installation
2. Node.js and npm installed

## Setup Steps

### 1. Create MongoDB Database

#### Using MongoDB Atlas (Recommended for Production)

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project
3. Create a new cluster (the free tier is sufficient for development)
4. Set up database access:
   - Create a new database user with read/write permissions
   - Remember the username and password
5. Set up network access:
   - Add your IP address or allow access from anywhere for development
6. Get your connection string:
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string

#### Using Local MongoDB (Development Only)

1. Install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB server:
   ```
   mongod --dbpath /path/to/data/directory
   ```

### 2. Configure Environment Variables

Create a `.env` file in the root of your project with the following content:

```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Replace `your_mongodb_connection_string` with the connection string from MongoDB Atlas or your local MongoDB installation.

### 3. Initialize MongoDB with Sample Data

Run the following script to initialize your database with sample data:

```
npm run init-db
```

This will create the necessary collections and indexes.

### 4. Database Structure

The MasjidFinder application uses the following collections:

1. **masjids**: Stores information about mosques
   - Create a geospatial index for location-based queries:
     ```
     db.masjids.createIndex({ location: "2dsphere" })
     ```

2. **users**: Stores user information and preferences
   - Indexes:
     ```
     db.users.createIndex({ firebaseId: 1 }, { unique: true })
     ```

3. **reviews**: Stores user reviews for masjids
   - Indexes:
     ```
     db.reviews.createIndex({ masjidId: 1 })
     db.reviews.createIndex({ userId: 1 })
     ```

## Sample Data Format

### Masjid Document

```json
{
  "_id": ObjectId("..."),
  "name": "Al-Noor Mosque",
  "address": "123 Islamic Way, New York, NY 10001",
  "location": {
    "type": "Point",
    "coordinates": [-74.0060, 40.7128]
  },
  "rating": 4.5,
  "imageUrl": "https://example.com/image.jpg",
  "facilities": ["Parking", "Wudhu Area", "Women Section"],
  "prayerTimes": {
    "fajr": "5:30 AM",
    "dhuhr": "1:00 PM",
    "asr": "4:30 PM",
    "maghrib": "7:15 PM",
    "isha": "8:45 PM",
    "jummah": "1:30 PM"
  },
  "createdAt": ISODate("2023-01-01"),
  "updatedAt": ISODate("2023-01-01")
}
```

### User Document

```json
{
  "_id": ObjectId("..."),
  "firebaseId": "abc123",
  "email": "user@example.com",
  "displayName": "Muslim User",
  "photoURL": "https://example.com/photo.jpg",
  "savedMasjids": [ObjectId("..."), ObjectId("...")],
  "createdAt": ISODate("2023-01-01"),
  "updatedAt": ISODate("2023-01-01")
}
```

### Review Document

```json
{
  "_id": ObjectId("..."),
  "masjidId": ObjectId("..."),
  "userId": ObjectId("..."),
  "rating": 5,
  "text": "Great mosque with excellent facilities!",
  "createdAt": ISODate("2023-01-01"),
  "updatedAt": ISODate("2023-01-01")
}
```

## Troubleshooting

If you encounter any issues with your MongoDB connection:

1. Verify your connection string is correct
2. Check that your IP address is whitelisted in MongoDB Atlas
3. Ensure your database user has the correct permissions
4. Verify your network allows connections to MongoDB (port 27017)

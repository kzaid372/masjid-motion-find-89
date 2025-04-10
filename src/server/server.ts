
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './config/db';
import masjidRoutes from './routes/masjidRoutes';
import userRoutes from './routes/userRoutes';
import prayerTimesRoutes from './routes/prayerTimesRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/masjids', masjidRoutes);
app.use('/api/users', userRoutes);
app.use('/api/prayer-times', prayerTimesRoutes);

// Connect to database and start server
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import githubRoutes from './routes/githubRoutes';

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Critical Error: MONGO_URI is missing from your .env file!");
  process.exit(1);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allows any localhost or 127.0.0.1 development port to pass through cleanly
    if (!origin || /https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Wow! Successfully connected to MongoDB Database');
    app.listen(PORT, () => {
      console.log(`Devpulse server running locally on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Database connection error:', err));
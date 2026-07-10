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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return; 
  }
  next(); 
});
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
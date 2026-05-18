import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import periodRoutes from './routes/periodRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import waterRoutes from './routes/waterRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
app.use('/api/auth', authRoutes);
app.use('/api/period', periodRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/blog', blogRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '🌸 Women Health Tracker API is running!',
    status: 'success'
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
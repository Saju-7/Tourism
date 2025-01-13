// app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import checkRoutes from './middleware/check-auth.js';
import authMiddleware from './middleware/authMiddleware.js';
import reviewRoutes from './routes/reviewRoutes.js'; // Import review routes

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS configuration to allow cookies and your frontend URL
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // This allows cookies to be sent in cross-origin requests
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());  // For parsing cookies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', reviewRoutes);  // Register review routes
app.use('/api/', bookingRoutes);
app.use('/api/', checkRoutes);
app.use('/api/auth', authRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// // app.js

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import authRoutes from './api/routes/authRoutes.js';
// import bookingRoutes from './api/routes/bookingRoutes.js';
// import checkRoutes from './api/middleware/check-auth.js';
// import authMiddleware from './api/middleware/authMiddleware.js';
// import reviewRoutes from './api/routes/reviewRoutes.js'; // Import review routes

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8000;

// // CORS configuration to allow cookies and your frontend URL
// const corsOptions = {
//   origin: 'http://localhost:5173',  // Frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,  // This allows cookies to be sent in cross-origin requests
// };


// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());  // For parsing cookies

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// // Routes
// app.use('/api', reviewRoutes);  // Register review routes
// app.use('/api/', bookingRoutes);
// app.use('/api/', checkRoutes);
// app.use('/api/auth', authRoutes);


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// For any other routes, serve the React app's index.html (important for SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



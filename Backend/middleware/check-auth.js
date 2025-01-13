// backend/routes/authRoutes.js
import express from 'express';
import authMiddleware from './authMiddleware.js'; // Middleware to check token
const router = express.Router();

// Example of checking authentication
router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
});

export default router;

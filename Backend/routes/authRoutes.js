// authRoutes.js

import express from 'express';
import { registerUser, login, logout } from '../controller/authController.js';

const router = express.Router();

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);  // Add this route to handle logout

export default router;

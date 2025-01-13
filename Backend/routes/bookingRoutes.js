import express from 'express';
import { createBooking, getUserBookings, cancelBooking,updateBooking } from '../controller/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for creating, fetching, and canceling bookings
router.post('/book', authMiddleware, createBooking);         // Create a booking (requires auth)
router.get('/bookings/:userId', authMiddleware, getUserBookings); // Fetch user bookings by userId (requires auth)
router.delete('/bookings/:id', authMiddleware, cancelBooking); // Correct the route to /bookings/:id


router.put('/bookings/:id', authMiddleware, updateBooking); // Add this route

export default router;

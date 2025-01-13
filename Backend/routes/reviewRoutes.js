// routes/reviewRoutes.js

import express from 'express';
import { addReview, getReviews } from '../controller/reviewController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();

// Route to get all reviews
router.get('/reviews', getReviews);

// Route to post a new review
router.post('/reviews',authMiddleware, addReview);

export default router;

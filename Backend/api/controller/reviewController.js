import Review from '../models/reviewModel.js';

// Create a new review
export const addReview = async (req, res) => {
  try {
    const { name, image, rating } = req.body;

    const newReview = new Review({
      name,
      image,
      rating,
    });

    await newReview.save();
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Error adding review', error: err.message });
  }
};

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

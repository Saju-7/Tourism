import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },  // Image can be a URL or a file path
  rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;

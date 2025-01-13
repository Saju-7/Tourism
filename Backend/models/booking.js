import mongoose from 'mongoose';

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  packageType: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the 'User' model
    required: true,
  },
}, { timestamps: true });

// Create and export the booking model
const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

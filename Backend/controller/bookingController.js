import Booking from '../models/booking.js';
import mongoose from 'mongoose';

// Controller to create a new booking
export const createBooking = async (req, res) => {
  try {
    console.log('Authenticated User:', req.user);  // Log user info
    const { destination, guests, date, packageType } = req.body;

    const newBooking = new Booking({
      destination,
      guests,
      date,
      packageType,
      user: req.user._id,  // Link booking to the authenticated user
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    console.log('User ID from Request:', req.user._id);  // Log user ID
    const bookings = await Booking.find({ user: req.user._id });  // Corrected field name
    res.status(200).json({ bookings });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id",req.params)
    const { destination, guests, date, packageType } = req.body;

    // Find the booking by ID
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the booking belongs to the logged-in user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // Update booking details
    booking.destination = destination;
    booking.guests = guests;
    booking.date = date;
    booking.packageType = packageType;

    await booking.save(); // Save the updated booking

    res.status(200).json({ message: 'Booking updated successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating booking' });
  }
};



export const cancelBooking = async (req, res) => {
  try {
    console.log("Booking ID:", req.params.id);  // Log the ID being passed
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      console.log('Booking not found');  // Log if the booking is not found
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure the booking belongs to the logged-in user
    if (booking.user.toString() !== req.user._id.toString()) {
      console.log('User is not authorized to delete this booking');
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    // Delete the booking using findByIdAndDelete
    await Booking.findByIdAndDelete(booking._id);

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error during delete operation:', error);  // Log any errors
    res.status(500).json({ message: 'Server error' });
  }
};

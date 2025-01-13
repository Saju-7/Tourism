// src/features/bookingSlice/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userBookings: [],  // Ensure it's initialized as an empty array
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    },
    deleteBooking: (state, action) => {
      state.userBookings = state.userBookings.filter(booking => booking._id !== action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.userBookings.findIndex(booking => booking._id === action.payload._id);
      if (index !== -1) {
        state.userBookings[index] = action.payload;
      }
    },
  },
});

export const { setUserBookings, deleteBooking, updateBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

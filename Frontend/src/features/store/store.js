import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice.js';
import bookingReducer from '../bookingSlice/bookingSlice.js'
const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer, 
  },
});

export default store;

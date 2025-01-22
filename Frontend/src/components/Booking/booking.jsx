import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserBookings, deleteBooking, updateBooking } from '../../features/bookingSlice/bookingSlice.js';
import { logout } from '../../features/auth/authSlice.js';
import './booking.css';
import GlobalContainer from '../GlobalContainer/GlobalContainer.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const Booking = () => {
  const dispatch = useDispatch();
  const userBookings = useSelector((state) => state.booking.userBookings) || [];  // Use fallback array
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [updatedBooking, setUpdatedBooking] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!isAuthenticated || !userId) {
        console.error('User is not authenticated');
        return;
      }
  
      try {
        const response = await axios.get(`https://tourism-backend-zeta.vercel.app/api/bookings/${userId}`, {
          withCredentials: true,
        });
  
        console.log('API Response:', response.data);  // Inspect the API response
  
        if (response.data.bookings && Array.isArray(response.data.bookings)) {
          dispatch(setUserBookings(response.data.bookings));
        } else {
          console.error('Bookings are not in the expected array format.');
          dispatch(setUserBookings([]));
        }
      } catch (error) {
        console.error('Error fetching user bookings:', error);
      }
    };
  
    fetchUserBookings();
  }, [dispatch, isAuthenticated, userId]);

  // If the user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return <div>Please log in to view your bookings.</div>;
  }

  // If no bookings are available or still loading, show a loading message
  if (userBookings.length === 0) {
    return <div>Loading bookings...</div>;
  }

  // Handle editing a booking
  const handleEditClick = (booking) => {
    setCurrentBooking(booking);
    setUpdatedBooking(booking);  // Pre-populate the form with current booking data
    setIsEditing(true);
  };

  const handleUpdateBooking = async () => {
    try {
      const response = await axios.put(
        `https://tourism-backend-zeta.vercel.app/api/bookings/${updatedBooking._id}`,
        updatedBooking,
        { withCredentials: true }
      );
      dispatch(updateBooking(response.data.booking));
      setIsEditing(false);
      setCurrentBooking(null);
      setUpdatedBooking(null);

      // Display success toast message
      toast.success('Booking updated successfully!');
    } catch (error) {
      console.error('Error updating booking:', error);

      // Display error toast message
      toast.error('Failed to update booking. Please try again.');
    }
  };

  const handleDeleteClick = async (bookingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');
    if (confirmDelete) {
      try {
        console.log('Sending delete request for booking ID:', bookingId);
        // Send the delete request to the backend
        await axios.delete(`https://tourism-backend-zeta.vercel.app/api/bookings/${bookingId}`, {
          withCredentials: true,
        });
  
        console.log('Booking deleted successfully');
        // Dispatch the delete action to remove the booking from the Redux store
        dispatch(deleteBooking(bookingId));
  
        // Display a success toast message
        toast.success('Booking deleted successfully!');
      } catch (error) {
        console.error('Error deleting booking:', error);
  
        // Display error toast message if the deletion fails
        toast.error('Failed to delete booking. Please try again.');
      }
    }
  };
  
  

  return (
    <GlobalContainer>
      <div className="user-bookings">
        <h1>Your Bookings</h1>

        {isEditing && currentBooking && (
          <div className="edit-booking-form">
            <h2>Edit Booking</h2>
            <div>
              <label>Destination</label>
              <input
                type="text"
                value={updatedBooking.destination}
                onChange={(e) =>
                  setUpdatedBooking({ ...updatedBooking, destination: e.target.value })
                }
              />
            </div>
            <div>
              <label>Guests</label>
              <input
                type="number"
                value={updatedBooking.guests}
                onChange={(e) =>
                  setUpdatedBooking({ ...updatedBooking, guests: e.target.value })
                }
              />
            </div>
            <div>
              <label>Date</label>
              <input
                type="date"
                value={new Date(updatedBooking.date).toISOString().split('T')[0]}
                onChange={(e) =>
                  setUpdatedBooking({ ...updatedBooking, date: e.target.value })
                }
              />
            </div>
            <div>
              <label>Package Type</label>
              <input
                type="text"
                value={updatedBooking.packageType}
                onChange={(e) =>
                  setUpdatedBooking({ ...updatedBooking, packageType: e.target.value })
                }
              />
            </div>
            <button onClick={handleUpdateBooking}>Update Booking</button>
            <button onClick={() => setIsEditing(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </button>
          </div>
        )}

        {Array.isArray(userBookings) && userBookings.length > 0 ? (
          <ul>
            {userBookings.map((booking) => (
              <li key={booking._id}>
                <div><strong>Destination:</strong> {booking.destination}</div>
                <div><strong>Guests:</strong> {booking.guests}</div>
                <div><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
                <div><strong>Package Type:</strong> {booking.packageType}</div>
                <div className="buttons">
                  <button className="edit-btn" onClick={() => handleEditClick(booking)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteClick(booking._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div>Your cart is empty or there was an error loading the bookings.</div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </GlobalContainer>
  );
};

export default Booking;

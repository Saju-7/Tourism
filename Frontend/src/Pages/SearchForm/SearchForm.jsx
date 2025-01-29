import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SearchForm.css';
import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setUserBookings } from '../../features/bookingSlice/bookingSlice'; // Import setUserBookings action
import DatePicker from 'react-datepicker'; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const SearchForm = ({ packages, onSelectPackage }) => {
  const [selected, setSelected] = useState('');
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState(null); // Date should be initially null
  const [packageType, setPackageType] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const selectedPackageTitle = event.target.value;
    setSelected(selectedPackageTitle);
    setPackageType(selectedPackageTitle);

    if (selectedPackageTitle === 'All') {
      onSelectPackage(null);
    } else {
      const selectedPackage = packages.find((pkg) => pkg.title === selectedPackageTitle);
      if (selectedPackage) {
        onSelectPackage(selectedPackage);
      }
    }
  };

  const handleBookNow = async () => {
    if (isAuthenticated) {
      const bookingData = {
        destination,
        guests,
        date,
        packageType,
      };
  
      try {
        const backendBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
        const response = await axios.post(`${backendBaseUrl}/book`, bookingData, {
          withCredentials: true,
        });
  
        if (response.status === 201) {
          toast.success('Thank you! Your booking is confirmed.');
  
          // Correct userId extraction from the response
          const userId = response.data.booking?.user; // Accessing user ID from the booking object
  
          if (userId) {
            const bookingsResponse = await axios.get(`${backendBaseUrl}/bookings/${userId}`, {
              withCredentials: true,
            });
  
            if (bookingsResponse.data) {
              dispatch(setUserBookings(bookingsResponse.data));
            }
          } else {
            console.error('User ID not found in booking response:', response.data);
          }
        } else {
          toast.error('Booking failed. Please try again.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        console.error('Error booking:', error);
        toast.error('An error occurred. Please try again later.');
      }
    } else {
      navigate('/login');
    }
  };
  
  

  return (
    <>
      <GlobalContainer>
        <div className="search-form-container">
          <div className="search-form">
            <div className="form-field">
              <label htmlFor="destination">Search Destinations</label>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination or activity"
              />
            </div>

            <div className="form-field">
              <label htmlFor="guests">Guests</label>
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                min="1"
                placeholder="Number of guests"
              />
            </div>

            <div className="form-field">
              <label htmlFor="date">Date</label>
              <DatePicker
                id="date"
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                className="datepicker-input"
                calendarClassName="datepicker-calendar"
                clearButton
              />
            </div>

            <div className="form-field1">
              <label htmlFor="package" style={{color:'white'}}>Package</label>
              <select id="package" value={selected} onChange={handleChange}>
                <option value="">Select Package</option>
                <option value="All">All</option>
                {Array.isArray(packages) &&
                  packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
              </select>
            </div>

            <button className="book-now-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </GlobalContainer>
      <ToastContainer />
    </>
  );
};

export default SearchForm;

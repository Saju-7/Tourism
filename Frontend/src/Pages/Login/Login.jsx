import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import registericon from '../../images/registericon.svg';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { setUserBookings } from '../../features/bookingSlice/bookingSlice.js'; // Import the action to set bookings
import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }
  
    setIsLoading(true); // Set loading state to true while fetching data
    try {
      console.log("Sending login request...");

      // Access the backend base URL from frontend .env
      const backendBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
      console.log("Backend Base URL:", backendBaseUrl);  // Check if the correct URL is being logged

      const response = await axios.post(
        `${backendBaseUrl}/auth/login`,  // Use the backend base URL here
        { email, password },
        { withCredentials: true }
      );
  
      console.log("Login response:", response);
  
      if (response.data.userId) {
        setMessage(response.data.message);
        setError('');
        dispatch(login({ userId: response.data.userId })); // Dispatch userId after login
        console.log("Logged in user ID:", response.data.userId);
  
        // Fetch user bookings after successful login
        const bookingsResponse = await axios.get(
          `${backendBaseUrl}/bookings/${response.data.userId}`, // Correct URL with environment variable
          { withCredentials: true }
        );
  
        console.log("Bookings response:", bookingsResponse);
  
        if (bookingsResponse.data) {
          dispatch(setUserBookings(bookingsResponse.data)); // Update bookings in Redux state
          console.log("Bookings data:", bookingsResponse.data);
        }
  
        navigate('/'); // Redirect to the home page
      } else {
        setError('No user ID received');
        setMessage('');
      }
    } catch (err) {
      console.error("Login request error:", err);
      setError(err.response?.data?.message || 'Something went wrong');
      setMessage('');
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  };
  

  return (
    <GlobalContainer>
      <div className="login-container">
        <div className="login-icon">
          <img src={registericon} alt="" />
        </div>
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-field">
              <label htmlFor="email">Email:</label>
              <div className="input-with-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-field">
              <label htmlFor="password">Password:</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}
            {/* Success Message */}
            {message && <div className="success-message">{message}</div>}

            {/* Login Button */}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </GlobalContainer>
  );
};

export default Login;

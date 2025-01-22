// src/pages/Register/Register.js

import { useState } from 'react';
import axios from 'axios';  // Import Axios
import './Register.css';  // Import CSS for styling
import loginicon from '../../images/logicon.svg';
import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');  // To display success message
  const navigate = useNavigate()
  // Handle form submission
 // src/pages/Register/Register.js

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("click 1")
  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    setError('Please fill in all fields');
    return;
  } else if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }
  console.log("click 2")

  try {
    const backendBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
    console.log('backendBaseUrl',backendBaseUrl)
    // Send POST request to backend for registration (no token needed here)
    const response = await axios.post(`${backendBaseUrl}/auth/register`, {
      name,
      email,
      password,
      confirmPassword,
    });
    console.log("click 3")
    // If registration is successful, redirect to login page
    navigate('/login');
    
    // Display success message
    setMessage(response.data.message);
    setError('');
  } catch (err) {
    setError(err.response?.data?.message || 'Something went wrong');
    setMessage('');
  }
  console.log("click 4")
};


  return (
    <GlobalContainer>
      <div className="register-container">
        <div className="register-icon">
          <img src={loginicon} alt="" />
        </div>
        <div className="register-box">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="form-field">
              <label htmlFor="name">Full Name:</label>
              <div className="input-with-icon">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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

            {/* Confirm Password Input */}
            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}
            {/* Success Message */}
            {message && <div className="success-message">{message}</div>}

            {/* Register Button */}
            <button type="submit" className="register-button">Register</button>
          </form>
        </div>
      </div>
    </GlobalContainer>
  );
};

export default Register;

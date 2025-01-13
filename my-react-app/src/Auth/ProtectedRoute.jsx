import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to get authentication state
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get authentication state from Redux
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Optionally, if you want to check authentication only once during app load, you can use useEffect
  useEffect(() => {
    if (isAuthenticated === null) {
      // Ideally, you can check authentication status from the server and update Redux if needed
      axios
        .get('http://localhost:8000/api/check-auth', { withCredentials: true })
        .then((response) => {
          // If successful, update Redux with authentication status
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error during authentication check:', error);
          setError('Authentication failed. Please log in.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return element;
};

export default ProtectedRoute;

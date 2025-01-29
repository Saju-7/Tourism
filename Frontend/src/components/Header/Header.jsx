import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';  // Importing the logout action
import links from '../MenuItems';
import TopHeader from './TopHeader';
import './Header.css';
import HeaderLogo from '../../images/HeaderLogo.png';
import { FaShoppingCart } from 'react-icons/fa'; // Cart icon
import { setUserBookings } from '../../features/bookingSlice/bookingSlice.js';  // Ensure this is imported
import GlobalContainer from '../GlobalContainer/GlobalContainer.jsx';

const Header = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);  // Getting authentication state from Redux
  const userBookings = useSelector((state) => state.booking.userBookings.bookings || []); // Access the bookings array
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Header Rendered - Authenticated:", isAuthenticated);
  console.log("User Bookings in Header:", userBookings);

  // Toggle mobile navigation menu
  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);
  };

  // Close the mobile navigation when any link is clicked
  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  // Redirect to login page
  const handleSignInClick = () => {
    navigate('/login');
  };

  // Navigate to the booking page
  const handleCartClick = () => {
    navigate('/booking');
  };

  // Logout logic
  const handleLogoutClick = () => {
    console.log("Logging out...");
    dispatch(logout());  // Update Redux state on logout
    navigate('/login');  // Redirect to login
  };

  // Effect hook to ensure userBookings are set correctly after login
  useEffect(() => {
    console.log("Header useEffect - Checking userBookings", userBookings);
    if (isAuthenticated && userBookings.length === 0) {
      // Trigger the bookings fetch if not already present
      console.log("No bookings found, dispatching setUserBookings...");
      dispatch(setUserBookings([]));  // Add logic to fetch bookings after login
    }
  }, [dispatch, isAuthenticated, userBookings.length]);

  return (
    <>
      <TopHeader />
      <GlobalContainer>
      <div className="header-container">
        {/* Left side: Logo and Navigation Links */}
        <div className="header-left">
          <div className="header-logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              <img src={HeaderLogo} alt="Logo" />
            </Link>
          </div>

          <div className="header-nav">
            <nav>
              <ul>
                {links.map((link, index) => (
                  <li key={index}>
                    {/* Add the closeMobileNav function to close the menu when a link is clicked */}
                    <Link to={link.path} onClick={closeMobileNav}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
       
        <div className="box" style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
        <div className="header-signin">
          {isAuthenticated ? (
            <>
              <button onClick={handleLogoutClick}>Logout</button>
              {/* Cart button with the number of bookings */}
              <button onClick={handleCartClick} className="modern-cart-btn" style={{ marginLeft: '30px' }}>
                <FaShoppingCart size={28} />
                {/* Show the number of bookings if available */}
                {userBookings.length > 0 && (
                  <span className="cart-count">{userBookings.length}</span>
                )}
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSignInClick}>Sign In</button>
              <Link to="/register" style={{ marginLeft: '20px' }} className='reg'>
                <button>Register</button>
              </Link>
            </>
          )}
        </div>
        <div className={`hamburger ${isMobileNavOpen ? 'open' : ''}`} onClick={toggleMobileNav}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        </div>
        {/* Right side: Conditional Rendering for Sign In or Logout */}
       
      </div>
      </GlobalContainer>
      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              {/* Add the closeMobileNav function here as well */}
              <Link to={link.path} onClick={closeMobileNav}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;

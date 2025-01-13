import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import AboutPage from '../Pages/About/About';
import ContactPage from '../Pages/Contact/Contact';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Tour from '../Pages/Tours/Tours';
import Gallery from '../Pages/Gallery/Gallery';
import Blog from '../Pages/Blog/Blog';
import ProtectedRoute from '../Auth/ProtectedRoute'; // Import the ProtectedRoute component
import Booking from '../components/Booking/booking';

const Routers = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route
        path="/about"
        element={<ProtectedRoute element={<AboutPage />} />}
      />
      <Route
        path="/tours"
        element={<ProtectedRoute element={<Tour />} />}
      />
      <Route
        path="/gallery"
        element={<ProtectedRoute element={<Gallery />} />}
      />
      <Route
        path="/blog"
        element={<ProtectedRoute element={<Blog />} />}
      />
      <Route
        path="/contact"
        element={<ProtectedRoute element={<ContactPage />} />}
      />
    <Route
  path="/booking"
  element={<ProtectedRoute element={<Booking />} />}
/>


      {/* Login and Register routes (public) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Routers;

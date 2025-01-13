import React from 'react';
import Layout from './components/Layout/Layout'; // Assuming your Layout component is here
import './App.css';  // Your app styles
import 'slick-carousel/slick/slick.css'; // Slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Slick carousel theme styles
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const App = () => {
  return (
    <div>
      {/* Your main layout/component */}
      <Layout />

      {/* ToastContainer should be placed here */}
      <ToastContainer
        position="top-center"
        autoClose={5000}  // Auto-close after 5 seconds
        hideProgressBar={false} // Show progress bar
        closeOnClick={true}  // Allow closing by clicking
        pauseOnHover={true}  // Pause toast when hovered
        draggable={true}  // Allow dragging of the toast
      />
    </div>
  );
}

export default App;

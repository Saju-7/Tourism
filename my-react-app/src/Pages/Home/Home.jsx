import { useState } from 'react'; // Import React and useState
import pic1 from '../../images/travel.jpg';
import pic2 from '../../images/pi2.jpg';
import pic3 from '../../images/pi1.jpg';
import './Home.css';
// import SearchForm from '../SearchForm/SearchForm';
import Tour from '../Tours/Tours';
import Destinations from '../Destinations/Destinations';
import Blog from '../Blog/Blog';
import About from '../About/About';




const images = [
  pic3,
  pic1,
  pic2,
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // State for the current image
  const [transitioning, setTransitioning] = useState(false); // State to handle transitions

  // Move to the next image
  const nextSlide = () => {
    if (transitioning) return; // Prevent clicking while transitioning
    setTransitioning(true); // Start transitioning
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to the previous image
  const prevSlide = () => {
    if (transitioning) return; // Prevent clicking while transitioning
    setTransitioning(true); // Start transitioning
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Reset transition after the image has changed
  const handleTransitionEnd = () => {
    setTransitioning(false);
  };

  return (
    <>
      <div className="slider-container">
        {/* Slider content */}
        
        <div className="slider-content">
          <div className="slider-heading">
            Experience the beauty of Rwanda with us
          </div>

          <div className="slider-subheading">
            Discover the Land of a Thousand Hills
          </div>
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slider ${index}`}
                className={`slider-image ${index === currentIndex ? 'active' : ''}`}
                onTransitionEnd={handleTransitionEnd} // Reset transition state
              />
            ))}
            <div className="overlay"></div>
          </div>

          {/* Navigation buttons */}
          <button className="slider-nav-button left" onClick={prevSlide}>
            &#10094; {/* Left arrow */}
          </button>
          <button className="slider-nav-button right" onClick={nextSlide}>
            &#10095; {/* Right arrow */}
          </button>
        </div>
      </div>

      {/* Search form */}
      {/* <SearchForm /> */}
      <Tour/>
      <Destinations/>
      <Blog/>
      <About/>
   
    </>
  );
};

export default Home;

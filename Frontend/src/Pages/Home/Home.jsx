import { useState, useEffect } from 'react';
import pic1 from '../../images/travel.jpg';
import pic2 from '../../images/pi2.jpg';
import pic3 from '../../images/pi1.jpg';
import './Home.css';
import Tour from '../Tours/Tours';
import Destinations from '../Destinations/Destinations';
import Blog from '../Blog/Blog';
import About from '../About/About';

const images = [pic3, pic1, pic2];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    if (touchStart - touchEnd > 50) nextSlide();
    if (touchStart - touchEnd < -50) prevSlide();
    setTouchStart(null);
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="slider-container" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
        <div className="image-container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index}`} className={`slider-image ${index === currentIndex ? 'active' : ''}`} />
          ))}
          <div className="overlay"></div>
        </div>
        <div className="slider-content">
          <h1 className="slider-heading">Experience the beauty of Rwanda with us</h1>
          <p className="slider-description">Join us on a journey through Rwanda's breathtaking landscapes, vibrant culture, and incredible wildlife. Let us make your travel dreams a reality.</p>
          <h2 className="slider-subheading">Discover the Land of a Thousand Hills</h2>
          <button className="cta-button">Start Your Adventure</button>
        </div>
        <button className="slider-nav-button left" onClick={prevSlide}>&#10094;</button>
        <button className="slider-nav-button right" onClick={nextSlide}>&#10095;</button>
      </div>
      <Tour />
      <Destinations />
      <Blog />
      <About />
    </>
  );
};

export default Home;

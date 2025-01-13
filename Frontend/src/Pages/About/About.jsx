import { useState, useEffect, useRef } from 'react';
import pic1 from '../../images/client1.png'; // Fallback image
import './About.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'; // Importing react-dropzone

axios.defaults.withCredentials = true;

const About = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', image: null, rating: 5 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    dots: false,
    arrows: false,
    draggable: false,
    swipe: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const backendBaseUrl = import.meta.env.VITE_PUBLIC_BASE_URL;
  useEffect(() => {
    axios.get(`${backendBaseUrl}/reviews`, { withCredentials: true })
      .then(response => {
        setReviews(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  const handleChange = (e) => { 
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleStarClick = (index) => {
    setNewReview({ ...newReview, rating: index + 1 });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${backendBaseUrl}/reviews`, newReview)
      .then(response => {
        setReviews((prevReviews) => [...prevReviews, response.data.review]);
        setNewReview({ name: '', image: null, rating: 5 });
        setIsModalOpen(false);
        toast.success('Review submitted successfully!');
      })
      .catch(error => {
        console.error('Error submitting review:', error);
        toast.error('Error submitting review');
      });
  };

  const toggleModal = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setIsModalOpen(prevState => !prevState);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setNewReview({ ...newReview, image: URL.createObjectURL(file) });
      }
    },
  });

  const getImageUrl = (image) => {
    if (image) {
      return image.startsWith('blob:') ? image : image;
    }
    return pic1; // Fallback image
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <GlobalContainer>
      <div className="about-container">
        <h1 className="about-heading">What Our Travelers Say</h1>
        <p className="about-description">What our clients say about us</p>

        <div className="btn-container">
          <button onClick={handlePrevClick} className="handleleft">{"<"}</button>
          <button onClick={handleNextClick} className="handleright" style={{ marginLeft: '10px' }}>{">"}</button>
        </div>

        {loading ? (
  <div>Loading reviews...</div> // Or you can use a spinner or any custom loading component
) : (
  <Slider {...settings} ref={sliderRef} className="testimonial-slider">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div key={review._id} className="slider-item">
          <img
            src={getImageUrl(review.image)}
            alt={review.name}
            className="testimonial-image"
            onError={(e) => e.target.src = pic1} 
          />
          <h2>{review.name}</h2>
          <div className="rating">
            {[...Array(5)].map((star, index) => (
              <span key={index} className={index < review.rating ? 'filled' : ''}>★</span>
            ))}
          </div>
        </div>
      ))
    ) : (
      <div className="slider-item">No reviews available.</div>
    )}
  </Slider>
)}


        <button className="add-review-button" onClick={toggleModal}>
          Add Review
        </button>

        {isModalOpen && (
          <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
            <div className="modal-content">
              <h2>Submit Your Review</h2>
              <form onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name" 
                  value={newReview.name} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  required 
                />
                <div className="star-rating">
                  {[...Array(5)].map((_, index) => (
                    <span 
                      key={index} 
                      className={index < newReview.rating ? 'filled' : ''} 
                      onClick={() => handleStarClick(index)}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* React Dropzone for image upload */}
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <p>Drag & drop an image, or click to select one</p>
                </div>

                {newReview.image && (
                  <div className="image-preview">
                    <img src={newReview.image} alt="Review preview" className="preview-img" />
                  </div>
                )}

                <button type="submit">Submit Review</button>
                <button type="button" className="close-btn" onClick={toggleModal} style={{marginLeft:'20px'}}>Close</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </GlobalContainer>
  );
};

export default About;

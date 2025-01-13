import { useRef } from 'react';
import './Destinations.css';
import Destination from '../../Data/Destinations';
import Slider from 'react-slick';
import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';

const Destinations = () => {
  // Slider settings
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Handlers for custom buttons
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
      <div className="destinations-container">
        <h1 className="destinations-heading">Popular Destinations</h1>
        <p className="destinations-description">
          Select Our Best Popular Destinations
        </p>
        <div className="btn-container">
          <button onClick={handlePrevClick} className="handleleft">
            {"<"}
          </button>
          <button onClick={handleNextClick} className="handleright">
            {">"}
          </button>
        </div>
        {/* Slider */}
        <Slider {...settings} ref={sliderRef} className="slider">
          {Destination.map((destination) => (
            <div key={destination.id} className="card">
              <img src={destination.imageUrl} alt={destination.title} />
              <h2>{destination.title}</h2>
              <p>{destination.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </GlobalContainer>
  );
};

export default Destinations;

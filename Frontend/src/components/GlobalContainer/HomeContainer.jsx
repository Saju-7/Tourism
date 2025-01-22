
import PropTypes from 'prop-types'; // Import PropTypes
import './HomeContainer.css';

const HomeContainer = ({ children }) => {
  return (
    <div className="home-container">
      {children}
    </div>
  );
};

// Add PropTypes validation for children prop
HomeContainer.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
};

export default HomeContainer;

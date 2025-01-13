
import PropTypes from 'prop-types'; // Import PropTypes
import './GlobalContainer.css';

const GlobalContainer = ({ children }) => {
  return (
    <div className="global-container">
      {children}
    </div>
  );
};

// Add PropTypes validation for children prop
GlobalContainer.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
};

export default GlobalContainer;


import PropTypes from 'prop-types'; // Import PropTypes
import './HeadCont.css';

const HeadContiner = ({ children }) => {
  return (
    <div className="HeadContiner-container">
      {children}
    </div>
  );
};

// Add PropTypes validation for children prop
HeadContiner.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children is a valid React node
};

export default HeadContiner;

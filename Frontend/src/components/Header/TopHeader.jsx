import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './TopHeader.css'
const TopHeader = () => {
  return (
    <div className="top-header-container">
      {/* Left side: Contact and Message */}
      <div className="top-header-left">
        <div>
          <FontAwesomeIcon icon={faPhone} className='icons'/>
          <span>+92393839383</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} className='icons' />
          <span>bbontememma@gmail.com</span>
        </div>
      </div>

      {/* Right side: Social Icons */}
      <div className="top-header-right">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="lg" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="lg" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="lg" />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
      </div>
    </div>
  );
};

export default TopHeader;

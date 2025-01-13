import './Footer.css'; // Importing the updated CSS file for styling
import logos from '../../images/logos.png'
const Footer = () => {
  return (
    <div className="footer-container">
      {/* First Section - Contact Information */}
      <div className="footer-contact">
        <h1>If you have any questions, Let us help you!</h1>
        <p>
          If you have any questions or would like to book a tour with us, please don't hesitate to contact us.
          <br />
          Phone: +250 788 123 456
          <br />
          Email: info@rwandatourism.com
          <br />
          Address: Kigali, Rwanda
        </p>
      </div>

      {/* Second Section - Logo, Social Icons, and Placeholder Text */}
      <div className="footer-social">
        <div className="footer-logo">
          <img src={logos} alt="Logo" className="logo" />
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="#" className="social-icon">FB</a>
          <a href="#" className="social-icon">TW</a>
          <a href="#" className="social-icon">IG</a>
          <a href="#" className="social-icon">YT</a>
        </div>

        {/* Lorem Ipsum Text */}
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>

      {/* Third Section - Navigation Links */}
      <div className="footer-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Our Team</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">Packages</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Destinations</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Sign In</a></li>
          <li><a href="#">Gallery</a></li>
        </ul>
      </div>

      {/* Subscription Section */}
      <div className="footer-subscription">
        <p>Subscribe to our newsletter</p>
        <input type="email" placeholder="Enter your email" className="email-input" />
        <button className="subscribe-button" style={{marginTop:'10px'}}>Subscribe</button>
      </div>
    </div>
  );
};

export default Footer;

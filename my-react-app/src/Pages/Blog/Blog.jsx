import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import './Blog.css'
import card1 from '../../images/card1.png'
import card2 from '../../images/card2.png'
import card3 from '../../images/card3.png'
import card4 from '../../images/card4.png'
const Blog = () => {
  return (
    <GlobalContainer>
    <div className="blog-container">
      <h1 className="blog-heading">Why us?</h1>
      <p className="blog-description">
        Why Travel with Africa Wizzy Safari
      </p>

      {/* New div with background color and centered content */}
      <div className="tours-container">
        <div className="tours-content">
          <i className="tours-icon"><img src={card1} /></i>
          <h2 className="tours-heading">100+ Tours Around Rwanda</h2>
        </div>
        <div className="tours-content">
          <i className="tours-icon"><img src={card2} /></i>
          <h2 className="tours-heading">100% Trusted travel agency</h2>
        </div>
        <div className="tours-content">
          <i className="tours-icon"><img src={card3} /></i>
          <h2 className="tours-heading">10 years of travel experience</h2>
        </div>
        <div className="tours-content">
          <i className="tours-icon"><img src={card4} /></i>
          <h2 className="tours-heading">90% of travelors are happy</h2>
        </div>
      </div>
    </div>
    </GlobalContainer>
  )
}

export default Blog;

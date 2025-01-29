import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import './Blog.css';
import card1 from '../../images/card1.png';
import card2 from '../../images/card2.png';
import card3 from '../../images/card3.png';
import card4 from '../../images/card4.png';

const Blog = () => {
  return (
    <GlobalContainer>
      <div className="blog-container">
        <h1 className="blog-heading">Why us?</h1>
        <p className="blog-description">
          Why Travel with Africa Wizzy Safari
        </p>

        {/* Tours Section */}
        <div className="tours-container">
          {[
            { img: card1, text: "100+ Tours Around Rwanda" },
            { img: card2, text: "100% Trusted Travel Agency" },
            { img: card3, text: "10 Years of Travel Experience" },
            { img: card4, text: "90% of Travelers are Happy" },
          ].map((item, index) => (
            <div className="tours-content" key={index}>
              <i className="tours-icon">
                <img src={item.img} alt={item.text} />
              </i>
              <h2 className="tours-heading">{item.text}</h2>
            </div>
          ))}
        </div>
      </div>
    </GlobalContainer>
  );
};

export default Blog;

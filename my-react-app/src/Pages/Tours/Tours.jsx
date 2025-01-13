import './Tour.css'; 
import packages from '../../Data/Tourpackages';  // Ensure this is properly imported
import GlobalContainer from '../../components/GlobalContainer/GlobalContainer';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';

const Tour = () => {
  const [selectedPackage, setSelectedPackage] = useState(null); // State to hold selected package

  // Function to handle selection from SearchForm
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg); // Update selected package
  };

  // Filter the packages based on the selected package
  const filteredPackages = selectedPackage ? [selectedPackage] : packages;

  return (
    <GlobalContainer>
      <div className="tour-container">
        <h1 className="tour-heading">Choose Your Package</h1>
        <p className="tour-description">Select your Best Package for your Travel</p>

        {/* Pass the handlePackageSelect function to SearchForm */}
        <SearchForm packages={packages} onSelectPackage={handlePackageSelect} />

        {/* Card Container */}
        <div className="card-container">
          {filteredPackages.map((pkg) => (
            <div className="card" key={pkg.id}>
              <img src={pkg.imageUrl} alt={pkg.title} />
              <h1>{pkg.title}</h1>
              <p>{pkg.description}</p>
              <button>Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </GlobalContainer>
  );
};

export default Tour;

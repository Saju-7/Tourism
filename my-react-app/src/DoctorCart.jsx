import Data from "./data";

const DoctorCart = () => {
const hour = <Data/>
  return (
    <div>
      {Data.map((item, index) => (
        <div key={index} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '8px',width:'50%' }}>
          <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p><strong>Date of Birth:</strong> {item.date_of_birth}</p>
        </div>
        
      ))}
      <h1>{hour}</h1>
    </div>
  );
};

export default DoctorCart;

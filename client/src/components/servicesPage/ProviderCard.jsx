import "../../components/servicesPage/Providercard.css";
import { FaStar, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ProviderCard = ({ provider }) => {
  return (
    <div className="provider-card">
      

      <div className="provider-header">
        <img src={provider.image} alt={provider.name} />

        <div className="provider-info">
          <h2>{provider.name}</h2>
          <p className="service">{provider.service}</p>
        </div>

        {provider.isOnline && (
          <span className="status">● ONLINE</span>
        )}
      </div>
      
      <div className="provider-stats">
        <div className="box">
          <p>EXPERIENCE</p>
          <h3>{provider.experience} Years</h3>
        </div>

        <div className="box">
          <p>RATING</p>
          <h3>
            {provider.rating} <FaStar className="star" />
          </h3>
        </div>
      </div>

      <div className="location">
        <FaMapMarkerAlt />
        <span>{provider.location}</span>
      </div>

      <div className="actions">
        <button className="profile-btn">Profile</button>
        <button className="book-btn">
          <FaPhoneAlt /> Book Now
        </button>
      </div>

    </div>
  );
};

export default ProviderCard;
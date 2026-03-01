import "./ProviderCard.css";
import { FaStar } from "react-icons/fa";

const ProviderCard = ({ provider }) => {
  return (
    <div className="provider-card-modern">

      <div className="card-top">
        <img src={provider.image} alt={provider.name} />
        <div className="provider-meta">
          <h3>{provider.name}</h3>
          <p>{provider.category}</p>
          <span className="status online">● {provider.status}</span>
        </div>
      </div>

      <div className="card-info">
        <div>
          <span className="info-label">EXPERIENCE</span>
          <p>{provider.experience} Years</p>
        </div>
        <div>
          <span className="info-label">RATING</span>
          <p><FaStar className="star" /> {provider.rating}</p>
        </div>
      </div>

      <p className="location">{provider.location}</p>

      <div className="card-actions">
        <button className="profile-btn">Profile</button>
        <button className="call-btn">Call Now</button>
      </div>

    </div>
  );
};

export default ProviderCard;
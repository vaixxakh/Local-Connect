import { FaStar } from "react-icons/fa";
import "../../styles/ProviderInfoCard.css"

const ProviderInfoCard = ({ booking }) => {

    if (!booking || !booking.providerId) {
    return <p>Loading provider...</p>;
  }

  const provider = booking.providerId;

  return (
    <div className="provider-card group">

      <h3 className="title"> Provider Details</h3>

      <div className="profile-section">
        <img
          src={provider.profileImage}
          alt=""
          className="profile-img"
        />

        <div className="info">
          <p className="name">{provider.name}</p>
          <p className="phone">{provider.providerId}</p>

          <span className="status-badge">🟢 Available</span>
        </div>
      </div>

    </div>
  );
};

export default ProviderInfoCard;
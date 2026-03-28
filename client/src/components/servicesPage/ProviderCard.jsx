import { FaStar } from "react-icons/fa";
import "../../components/servicesPage/Providercard.css";



const ProviderCard = ({ provider, onBookNow, user, onViewProfile }) => {

  const status = provider?.status || "offline";
  

  return (
    <div className="provider-card">
      <div className="provider-card__glow"></div>

      <div className="provider-card__inner">
        <div className="provider-card__image-section">
          <div className="provider-card__image-wrapper">
            <img
              src={provider?.profileImage || "https://via.placeholder.com/100"}
              alt={provider?.name || "Provider"}
              className="provider-card__image"
            />

            {status === "online" && (
              <span className="provider-card__live-ring"></span>
            )}
          </div>
        </div>

        <div className="provider-card__content">
          <div className="provider-card__top">
            <div className="provider-card__title-wrap">
              <h3 className="provider-card__name">
                {provider?.name || "No Name"}
              </h3>

              <div className="provider-card__badges">
                {provider?.isVerified && (
                  <span className="provider-card__badge provider-card__badge--verified">
                    ID Verified
                  </span>
                )}

                <span
                  className={`provider-card__badge provider-card__badge--status provider-card__badge--${status}`}
                >
                  {status === "online" && <span className="status-dot"></span>}
                  {status}
                </span>
              </div>
            </div>

            <div className="provider-card__price-box">
              <p className="provider-card__price">
                ₹{provider?.basePrice || 0}
              </p>
              <span className="provider-card__price-type">
                {provider?.pricingType === "hourly" ? "/ hour" : "/ service"}
              </span>
            </div>
          </div>

          <p className="provider-card__experience">
            {provider?.experience || 0} years experience
          </p>

          {provider?.skills?.length > 0 && (
            <div className="provider-card__skills">
              {provider.skills.map((skill, index) => (
                <span key={index} className="provider-card__skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {provider?.bio && (
            <p className="provider-card__bio">{provider.bio}</p>
          )}

          <div className="provider-card__bottom-info">
            <p className="provider-card__location">
              {[provider?.area, provider?.city, provider?.district]
                .filter(Boolean)
                .join(", ") || "Location not added"}
            </p>

            <p className="provider-card__rating">
              <FaStar color="gold" /> {provider?.rating || 0}
              <span>
                {" "}
                ({provider?.totalReviews || 0} reviews)
              </span>
            </p>
          </div>

          <div className="provider-card__actions">
           {user?.role === "finder" && (
            <button
              onClick={() => onBookNow(provider)}
              className="provider-card__btn provider-card__btn--primary"
            >
              Book Now
            </button>
          )}
            <button
              onClick={() => onViewProfile && onViewProfile(provider)}
              className="provider-card__btn provider-card__btn--secondary"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
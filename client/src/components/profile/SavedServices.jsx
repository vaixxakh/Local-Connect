import { useEffect, useState, useCallback } from "react";
import { getSavedServicesApi, removeSavedServiceApi } from "../../service/userApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProvider } from "../../features/booking/bookingSlice";
import toast from "react-hot-toast";
import {
  FaHeart, FaTrash, FaCalendarAlt, FaStar, FaExternalLinkAlt
} from "react-icons/fa";

const ServiceSkeleton = () => (
  <div className="saved-services-grid">
    {[1, 2].map((i) => (
      <div key={i} className="service-card" style={{ height: 320 }}>
        <div className="skeleton" style={{ height: 140, width: "100%" }} />
        <div style={{ padding: 16 }}>
          <div className="skeleton skeleton-title" style={{ width: "70%", marginBottom: 12 }} />
          <div className="skeleton skeleton-text" style={{ width: "40%", marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div className="skeleton skeleton-text" style={{ width: "30%" }} />
            <div className="skeleton skeleton-text" style={{ width: "20%" }} />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div className="skeleton" style={{ height: 36, flex: 1, borderRadius: 8 }} />
            <div className="skeleton" style={{ height: 36, width: 36, borderRadius: 8 }} />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const SavedServices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSaved = useCallback(async () => {
    try {
      const res = await getSavedServicesApi();
      setSaved(res.data.savedServices || []);
    } catch {
      toast.error("Failed to load saved services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  const handleRemove = async (providerId) => {
    try {
      await removeSavedServiceApi(providerId);
      setSaved((prev) => prev.filter((p) => p._id !== providerId));
      toast.success("Service removed from saved list");
    } catch {
      toast.error("Failed to remove service");
    }
  };

  const handleBook = (provider) => {
    if (provider.status === "offline") {
      toast.error("This provider is currently offline and unavailable.");
      return;
    }
    dispatch(setSelectedProvider(provider));
    navigate(`/bookings/${provider._id}`);
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon"><FaHeart size={14} /></div>
          Saved Services
        </h2>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {!loading && `${saved.length} service${saved.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      <div className="card-body">
        {loading ? (
          <ServiceSkeleton />
        ) : saved.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">❤️</div>
            <div className="empty-state-title">No Saved Services</div>
            <p className="empty-state-text">
              Keep track of providers you like by saving them.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/Services")}>
              Explore Services
            </button>
          </div>
        ) : (
          <div className="saved-services-grid">
            {saved.map((provider) => (
              <div key={provider._id} className="service-card">
                {provider.profileImage ? (
                  <img
                    src={provider.profileImage}
                    alt={provider.name}
                    className="service-card-img"
                  />
                ) : (
                  <div className="service-card-img-placeholder">🛠️</div>
                )}

                <div className="service-card-body">
                  <span className="service-card-category">{provider.service}</span>
                  <h3 className="service-card-title">{provider.name}</h3>

                  <div className="service-card-meta">
                    <span className="service-card-price">
                      ₹{provider.basePrice}/{provider.pricingType === "hourly" ? "hr" : "fixed"}
                    </span>
                    <span className="service-card-rating">
                      <FaStar color="#f59e0b" size={13} />
                      {provider.rating ? provider.rating.toFixed(1) : "N/A"}
                    </span>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <span className={`service-card-status ${provider.status || "offline"}`}>
                      ● {provider.status || "offline"}
                    </span>
                  </div>

                  <div className="service-card-actions">
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => handleBook(provider)}
                    >
                      <FaCalendarAlt size={12} /> Book Now
                    </button>
                    <button
                      className="btn btn-outline btn-icon"
                      onClick={() => handleRemove(provider._id)}
                      title="Remove from saved"
                      style={{ color: "#ef4444", borderColor: "#fca5a5" }}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedServices;
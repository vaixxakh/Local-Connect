import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedProvider } from "../../features/booking/bookingSlice";
import { getUserBookingsApi } from "../../service/bookingApi";
import toast from "react-hot-toast";
import {
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaRedo, FaExternalLinkAlt
} from "react-icons/fa";

const SERVICE_EMOJIS = {
  "AC Repair": "❄️", "Plumbing": "🔧", "Electrical": "⚡", "Cleaning": "🧹",
  "Painting": "🎨", "Carpentry": "🪚", default: "🛠️"
};

const getServiceEmoji = (name = "") => {
  const match = Object.keys(SERVICE_EMOJIS).find((k) =>
    name.toLowerCase().includes(k.toLowerCase())
  );
  return match ? SERVICE_EMOJIS[match] : SERVICE_EMOJIS.default;
};

const BookingSkeleton = () => (
  <div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="booking-card" style={{ marginBottom: 14 }}>
        <div className="skeleton skeleton-circle" style={{ width: 56, height: 56 }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton skeleton-title" style={{ width: "50%", marginBottom: 8 }} />
          <div className="skeleton skeleton-text" style={{ width: "35%" }} />
          <div className="skeleton skeleton-text" style={{ width: "60%", marginTop: 8 }} />
        </div>
        <div>
          <div className="skeleton" style={{ width: 80, height: 26, borderRadius: 20, marginBottom: 8 }} />
          <div className="skeleton" style={{ width: 60, height: 22, borderRadius: 20 }} />
        </div>
      </div>
    ))}
  </div>
);

const StatusBadge = ({ status, type = "booking" }) => (
  <span className={`${type}-status-badge ${status?.toLowerCase().replace(" ", "_")}`}>
    {status?.replace("_", " ")}
  </span>
);

const BookingHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state) => state.auth);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const effectiveUserId = userId || authUser?._id;

  const fetchBookings = useCallback(async () => {
    if (!effectiveUserId) return;
    try {
      const res = await getUserBookingsApi(effectiveUserId);
      setBookings(res.data.bookings || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [effectiveUserId]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleBookAgain = (booking) => {
    if (!booking.providerId) {
      toast.error("Provider information unavailable");
      return;
    }
    dispatch(setSelectedProvider(booking.providerId));
    navigate(`/bookings/${booking.providerId._id || booking.providerId}`);
  };

  const formatDate = (dt) => {
    if (!dt) return "—";
    return new Date(dt).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  const formatTime = (dt) => {
    if (!dt) return "—";
    return new Date(dt).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon"><FaCalendarAlt size={15} /></div>
          Recent Bookings
        </h2>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {!loading && `${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      <div className="card-body">
        {loading ? (
          <BookingSkeleton />
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <div className="empty-state-title">No Bookings Yet</div>
            <p className="empty-state-text">
              Your booking history will appear here once you've booked a service.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/Services")}>
              Browse Services
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking._id}>
              <div
                className="booking-card"
                onClick={() => setExpanded(expanded === booking._id ? null : booking._id)}
                style={{ cursor: "pointer" }}
              >
                {/* Provider Image */}
                {booking.providerId?.profileImage ? (
                  <img
                    src={booking.providerId.profileImage}
                    alt={booking.providerName}
                    className="booking-provider-img"
                  />
                ) : (
                  <div className="booking-provider-placeholder">
                    {getServiceEmoji(booking.serviceName)}
                  </div>
                )}

                {/* Info */}
                <div className="booking-info">
                  <div className="booking-service-name">{booking.serviceName}</div>
                  <div className="booking-provider-name">by {booking.providerName}</div>
                  <div className="booking-meta">
                    <span className="booking-meta-chip">
                      <FaCalendarAlt size={10} /> {formatDate(booking.bookingDateTime)}
                    </span>
                    <span className="booking-meta-chip">
                      <FaClock size={10} /> {formatTime(booking.bookingDateTime)}
                    </span>
                    {booking.address && (
                      <span className="booking-meta-chip">
                        <FaMapMarkerAlt size={10} />
                        {booking.address.length > 30
                          ? booking.address.slice(0, 30) + "…"
                          : booking.address}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right side */}
                <div className="booking-actions">
                  <div className="booking-amount">₹{booking.amount?.toLocaleString("en-IN")}</div>
                  <StatusBadge status={booking.bookingStatus} type="booking" />
                  <StatusBadge status={booking.paymentStatus} type="payment" />
                </div>
              </div>

              {/* Expanded Detail */}
              {expanded === booking._id && (
                <div style={{
                  padding: "16px 20px",
                  background: "var(--surface-2)",
                  borderRadius: "0 0 var(--radius-md) var(--radius-md)",
                  border: "1px solid var(--border)",
                  borderTop: "none",
                  marginTop: -14,
                  marginBottom: 14,
                }}>
                  {booking.pricing && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                      {[
                        ["Base Price", `₹${booking.pricing.basePrice || 0}`],
                        ["Distance", `${booking.pricing.distanceKm?.toFixed(1) || 0} km`],
                        ["Platform Fee", `₹${booking.pricing.platformFee || 0}`],
                      ].map(([label, value]) => (
                        <div key={label} style={{ textAlign: "center", padding: "10px", background: "var(--surface)", borderRadius: 8, border: "1px solid var(--border)" }}>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>{label}</div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {booking.bookingStatus === "completed" && (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => { e.stopPropagation(); handleBookAgain(booking); }}
                      >
                        <FaRedo size={12} /> Book Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
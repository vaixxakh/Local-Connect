import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaInfoCircle, FaCalendarAlt, FaHeart, FaStar, FaCog,
  FaSignOutAlt, FaBriefcase
} from "react-icons/fa";

const NAV_ITEMS = [
  { id: "overview", label: "Profile Overview", icon: <FaUser /> },
  { id: "info", label: "Personal Details", icon: <FaInfoCircle /> },
  { id: "bookings", label: "Recent Bookings", icon: <FaCalendarAlt /> },
  { id: "saved", label: "Saved Services", icon: <FaHeart /> },
  { id: "reviews", label: "My Reviews", icon: <FaStar /> },
  { id: "settings", label: "Settings", icon: <FaCog /> },
];

const ProfileSideBar = ({ activeSection, onNavigate, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <aside className="profile-sidebar">
      <div className="sidebar-header">
        {/* User Card */}
        <div className="sidebar-user-card">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.fullName}
              className="sidebar-avatar"
            />
          ) : (
            <div className="sidebar-avatar-placeholder">{initials}</div>
          )}
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.fullName || "User"}</div>
            <span className="sidebar-user-role">{user?.role || "finder"}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-section">
          <div className="sidebar-nav-label">Account</div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeSection === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="sidebar-divider" />

        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="nav-icon" />
          Sign Out
        </button>
      </nav>
    </aside>
  );
};

export default ProfileSideBar;
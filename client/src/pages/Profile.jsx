import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import ProfileSideBar from "../components/profile/ProfileSideBar";
import ProfileOverview from "../components/profile/ProfileOverview";
import PersonalInfo from "../components/profile/PersonalInfo";
import BookingHistory from "../components/profile/BookingHistory";
import SavedServices from "../components/profile/SavedServices";
import Reviews from "../components/profile/Reviews";
import Settings from "../components/profile/Settings";
import "./Profile.css";
import {
  FaUser, FaInfoCircle, FaCalendarAlt, FaHeart, FaStar, FaCog
} from "react-icons/fa";

const TABS = [
  { id: "overview", label: "Overview", icon: <FaUser /> },
  { id: "info", label: "Personal", icon: <FaInfoCircle /> },
  { id: "bookings", label: "Bookings", icon: <FaCalendarAlt /> },
  { id: "saved", label: "Saved", icon: <FaHeart /> },
  { id: "reviews", label: "Reviews", icon: <FaStar /> },
  { id: "settings", label: "Settings", icon: <FaCog /> },
];

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeSection, setActiveSection] = useState("overview");

  // Track hash changes for direct deep linking (e.g. /profile#bookings)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && TABS.some((tab) => tab.id === hash)) {
        setActiveSection(hash);
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = useCallback((id) => {
    setActiveSection(id);
    window.location.hash = id;
  }, []);

  return (
    <div className="profile-layout">
      {/* Desktop Sidebar */}
      <ProfileSideBar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        user={user}
      />

      {/* Mobile Tab Strip */}
      <div className="profile-mobile-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`mobile-tab ${activeSection === tab.id ? "active" : ""}`}
            onClick={() => handleNavigate(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <main className="profile-main">
        <div className="profile-section-container">
          {activeSection === "overview" && <ProfileOverview />}
          {activeSection === "info" && <PersonalInfo />}
          {activeSection === "bookings" && <BookingHistory userId={user?._id} />}
          {activeSection === "saved" && <SavedServices />}
          {activeSection === "reviews" && <Reviews />}
          {activeSection === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
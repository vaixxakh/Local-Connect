import {
  FaUser,
  FaBookmark,
  FaCalendar,
  FaStar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

const ProfileSidebar = () => {

  const handleScroll = (sectionId) => {

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth"
      });
    }

  };

  const logout = () => {

    localStorage.removeItem("user");
    window.location.href = "/login";

  };

  return (

    <aside className="sidebar">

      <h2 className="logo">LocalConnect</h2>

      <ul className="sidebar-menu">

        <li
          data-section="overview"
          className="active"
          onClick={() => handleScroll("overview")}
        >
          <FaUser /> Profile Overview
        </li>

        <li
          data-section="saved"
          onClick={() => handleScroll("saved")}
        >
          <FaBookmark /> Saved Services
        </li>

        <li
          data-section="bookings"
          onClick={() => handleScroll("bookings")}
        >
          <FaCalendar /> Booking History
        </li>

        <li
          data-section="reviews"
          onClick={() => handleScroll("reviews")}
        >
          <FaStar /> My Reviews
        </li>

        <li
          data-section="settings"
          onClick={() => handleScroll("settings")}
        >
          <FaCog /> Settings
        </li>

        <li
          className="logout"
          onClick={logout}
        >
          <FaSignOutAlt /> Logout
        </li>

      </ul>

    </aside>

  );

};

export default ProfileSidebar;
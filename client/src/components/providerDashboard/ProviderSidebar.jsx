import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  FaHome,
  FaCalendarCheck,
  FaHistory,
  FaClock,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { useState } from "react";
import "../../styles/providerSidebar.css";

const ProviderSidebar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (

    <div className="provider-sidebar-container">

    <button
      className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md"
      onClick={() => setOpen(!open)}
    >
      {open ? <FaTimes /> : <FaBars />}
    </button>


    <aside className={`provider-sidebar  ${open ? "show" : ""}`}>

      <nav className="sidebar-menu">

        <NavLink to="/provider-dashboard">
          <FaHome /> Overview
        </NavLink>

        <NavLink to="/provider-dashboard/availability">
          <FaCalendarCheck /> Availability
        </NavLink>

        <NavLink to="/provider-dashboard/bookings">
          <FaHistory /> Booking History
        </NavLink>

        <NavLink to="/provider-dashboard/recent-bookings">
          <FaClock /> Recent Booking
        </NavLink>

        <NavLink to="/provider-dashboard/reviews">
          <FaStar /> Reviews
        </NavLink>

        <NavLink to="/provider-dashboard/settings">
          <FaCog /> Settings
        </NavLink>

      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>

    </aside>

    </div>
  );
};

export default ProviderSidebar;
import { Link, NavLink, useNavigate , useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, loginSuccess } from "../features/auth/authSlice";
import {  FaBell, FaHeart, FaUserCircle, FaUser,FaHistory,  FaClipboardList, FaFileAlt,  FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../service/api.js";
import "./Navbar.css";

const Navbar = ({ onLoginClick }) => {
  
  const { user } = useSelector((state) => state.auth);
  
  const username =  user?.email?.split("@")[0] ;
  
  const [ open , setOpen ] = useState(false);
  
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const location = useLocation();

if(location.pathname === "/provider-dashboard"){
return null;
}
  const switchRole = async () => {
    
    try {
      
      const res = await API.patch("/users/switch-role");

      const updatedUser = res.data.user;

      dispatch(loginSuccess(updatedUser));

      localStorage.setItem("user", JSON.stringify(updatedUser));

      if(updatedUser.role === "provider"){

        navigate("/provider-dashboard");

        toast.success(`Switched to ${res.data.user.role} role`);

      } else{
        navigate("/");

        toast.success(`Switched to ${res.data.user.role} role`);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to switch role");
  }
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          LocalConnect
        </Link>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Services">Services</NavLink>
          <NavLink to="/emergency">Emergency</NavLink>
        
          {user && (
            <>
             
              <FaHeart  size={22} color="#f01734" />
              <FaBell size={22} color="#686868da" />

              {user?.role === "finder" ? (
              <button className="role-switch-btn"  onClick={switchRole}>
                Switch to Provider
              </button>
            ) : (
              <button className="role-switch-btn" onClick={switchRole}>
                Switch to Finder
              </button>
            )}
            
            </>
          )}
        </div>
          <div className="auth-section">
      {user ? (
        <div 
          className="profile-wrapper"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="profile-trigger">
           <FaUserCircle size={26} color="#a9ac9e" />
            <span className="username">
            @{username?.charAt(0) + username?.slice(1)}
          </span>
          </div>

          {open && (
           <div className="profile-dropdown">
            <Link to="/profile">
              <FaUser className="menu-icon" />
              Account
            </Link>

            <Link to="/my-bookings">
              <FaClipboardList className="menu-icon" />
              My Bookings
            </Link>

            <Link to="/history">
              <FaHistory className="menu-icon" />
              History
            </Link>

            <Link to="/terms">
              <FaFileAlt className="menu-icon" />
              Terms and conditions
            </Link>

            <button onClick={handleLogout}>
              <FaArrowRight className="menu-icon" />
              Sign out
            </button>

          </div>
          )}
        </div>
      ) : (
            <button
              onClick={onLoginClick}
              className="login-btn"
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
import { Link, NavLink, useNavigate , useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, loginSuccess } from "../features/auth/authSlice";
import { FaBell, FaHeart, FaUserCircle, FaUser,FaHistory, FaClipboardList, FaFileAlt, FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import API from "../service/api.js";
import "./Navbar.css";
import { Briefcase, Home, LayoutGrid, AlertCircle, User } from 'lucide-react';

const Navbar = ({ onLoginClick }) => {

  const { user } = useSelector((state) => state.auth);
  const username = user?.email?.split("@")[0];

  const [open , setOpen] = useState(false);
  const [mobileMenu , setMobileMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dropdownRef = useRef();

  const location = useLocation();

   useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  if(location.pathname === "/provider-dashboard"){
    return null;
  }

 

  const switchRole = async () => {

    try {

      const res = await API.patch("/users/switch-role");

      const updatedUser = res.data.user;

      dispatch(loginSuccess({
        user: updatedUser,
        token: localStorage.getItem("token")
      }));

       if(updatedUser.role === "provider"){
      navigate("/provider-dashboard");
    } else{
      navigate("/");
    }

    toast.success(`Switched to ${updatedUser.role}`);;

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to switch role");
    }

  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <nav className="navbar w-full backdrop-blur-lg bg-white/80 border-b border-gray-200 sticky top-0 z-50">

         <div className="navbar-container w-full flex items-center">
              <Link to="/" className=" logo flex items-center space-x-2" data-testid="logo-link">
                  <div className="w-11 h-11 rounded-xl bg-[#2ecc71] flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-[#064E3B]" />
                  </div>
                  <span className="text-2xl font-semibold text-[#1A1A1A] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    LocalService
                  </span>
                </Link>

            <div className="nav-links hidden lg:flex items-center  gap-8 font-medium text-gray-700">

              <NavLink className="hover:text-blue-600 transition" to="/">Home</NavLink>
              <NavLink className="hover:text-blue-600 transition" to="/Services">Services</NavLink>
              <NavLink className="hover:text-blue-600 transition" to="/emergency">Emergency</NavLink>

              {user && (
                <div className="flex items-center gap-4">

                  <FaHeart size={20} className="text-red-500 cursor-pointer hover:scale-110 transition"/>
                  <FaBell size={20} className="text-gray-500 cursor-pointer hover:scale-110 transition"/>

                  <button
                    className="role-switch-btn px-3 py-1.5 rounded-lg ml-50 font-[Figtree] text-sm font-medium transition"
                    onClick={switchRole}
                  >
                    {user.role === "finder" ? "Switch to Provider" : "Switch to Finder"}
                  </button>

                </div>
              )}

            </div>
            <div className="auth-section flex items-center gap-4">

              {user ? (

                <div
                  ref={dropdownRef}
                  className="profile-wrapper relative"
                  onClick={() => setOpen(!open) }
                >

                  <div className="profile-trigger flex items-center gap-2 cursor-pointer">

                    <FaUserCircle size={28} className="text-gray-500"/>

                    <span className="username text-sm font-semibold font-[Figtree] text-gray-700">
                      @{username?.charAt(0) + username?.slice(1)}
                    </span>

                  </div>

                  {open && (

                    <div className="profile-dropdown absolute right-0 mt-3 w-56 bg-white shadow-xl border rounded-xl overflow-hidden animate-dropdown">

                      <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                        <FaUser className="menu-icon"/>
                        Account
                      </Link>

                      <Link to="/my-bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                        <FaClipboardList className="menu-icon"/>
                        My Bookings
                      </Link>

                      <Link to="/history" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                        <FaHistory className="menu-icon"/>
                        History
                      </Link>

                      <Link to="/terms" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100">
                        <FaFileAlt className="menu-icon"/>
                        Terms and conditions
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-100"
                      >
                        <FaArrowRight className="menu-icon"/>
                        Sign out
                      </button>

                    </div>

                  )}

                </div>

              ) : (

                <button
                  onClick={onLoginClick}
                  className="login-btn bg-[#2ecc71] text-[#064E3B] hover:bg-[#27ae60] rounded-lg px-6 "
                >
                  Sign Up
                </button>

              )}

              <button
                className="lg:hidden text-gray-700"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <FaTimes size={22}/> : <FaBars size={22}/>}
              </button>

            </div>

          </div>

          {mobileMenu && (

            <div className="lg:hidden bg-white border-t px-6 py-4 flex flex-col gap-4 text-gray-700">

              <NavLink to="/">Home</NavLink>
              <NavLink to="/Services">Services</NavLink>
              <NavLink to="/emergency">Emergency</NavLink>

              {user && (

                <button
                  className="role-switch-btn  px-4 py-2 rounded-lg"
                  onClick={switchRole}
                >
                  {user.role === "finder" ? "Switch to Provider" : "Switch to Finder"}
                </button>

              )}

            </div>

          )}

        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileTopBar />
        <MobileBottomNav onLoginClick={onLoginClick} user={user} />
      </div>
    </>
  );
};

// Reusable Mobile Top App Bar
const MobileTopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-white/80 backdrop-blur-md border-b border-slate-100/50 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center px-4 justify-between font-[Outfit]">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#2ecc71] flex items-center justify-center shadow-sm">
          <Briefcase className="w-4 h-4 text-[#064E3B]" />
        </div>
        <span className="text-lg font-bold text-slate-800 tracking-tight">
          LocalService
        </span>
      </Link>
    </div>
  );
};

// Reusable Mobile Bottom Navigation Bar
const MobileBottomNav = ({ onLoginClick, user }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-t border-slate-100/50 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] rounded-t-2xl flex justify-around items-center px-4 pb-safe font-[Figtree]">
      
      {/* Home */}
      <NavLink
        to="/"
        className="flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
      >
        {({ isActive }) => (
          <div className="flex flex-col items-center gap-1">
            <Home className={`w-5.5 h-5.5 transition-all duration-300 ${isActive ? "text-[#16A34A] scale-110" : "text-slate-500 opacity-60"}`} />
            <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? "bg-[#16A34A] scale-100" : "bg-transparent scale-0"}`} />
          </div>
        )}
      </NavLink>

      {/* Services */}
      <NavLink
        to="/Services"
        className="flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
      >
        {({ isActive }) => (
          <div className="flex flex-col items-center gap-1">
            <LayoutGrid className={`w-5.5 h-5.5 transition-all duration-300 ${isActive ? "text-[#16A34A] scale-110" : "text-slate-500 opacity-60"}`} />
            <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? "bg-[#16A34A] scale-100" : "bg-transparent scale-0"}`} />
          </div>
        )}
      </NavLink>

      {/* Emergency */}
      <NavLink
        to="/emergency"
        className="flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
      >
        {({ isActive }) => (
          <div className="flex flex-col items-center gap-1">
            <AlertCircle className={`w-5.5 h-5.5 transition-all duration-300 ${isActive ? "text-rose-600 scale-110" : "text-slate-500 opacity-60"}`} />
            <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? "bg-rose-600 scale-100" : "bg-transparent scale-0"}`} />
          </div>
        )}
      </NavLink>

      {/* Profile / Account Login */}
      {user ? (
        <NavLink
          to="/profile"
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
        >
          {({ isActive }) => (
            <div className="flex flex-col items-center gap-1">
              <User className={`w-5.5 h-5.5 transition-all duration-300 ${isActive ? "text-[#16A34A] scale-110" : "text-slate-500 opacity-60"}`} />
              <span className={`w-1 h-1 rounded-full transition-all duration-300 ${isActive ? "bg-[#16A34A] scale-100" : "bg-transparent scale-0"}`} />
            </div>
          )}
        </NavLink>
      ) : (
        <button
          type="button"
          onClick={() => onLoginClick && onLoginClick()}
          className="flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 focus:outline-none"
        >
          <div className="flex flex-col items-center gap-1">
            <User className="w-5.5 h-5.5 text-slate-500 opacity-60 hover:opacity-100 transition-all duration-300" />
            <span className="w-1 h-1 rounded-full bg-transparent scale-0" />
          </div>
        </button>
      )}

    </div>
  );
};

export default Navbar;
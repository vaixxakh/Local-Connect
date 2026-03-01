import { Link, NavLink,  } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "./Navbar.css"

const Navbar = ({onLoginClick}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    dispatch(logout());
    // navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">    

        <Link to="/" className="logo">
          LocalConnect
        </Link>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/providers">Services</NavLink>
          <NavLink to="/emergency">Emergency</NavLink>

          {user && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/my-bookings">My Bookings</NavLink>
            </>
          )}
        </div>

      
        <div className="auth-section">
          {user ? (
            <>
              <span className="username">Hi, {user.user?.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink  className="login-btn" onClick={onLoginClick}>Sign in</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
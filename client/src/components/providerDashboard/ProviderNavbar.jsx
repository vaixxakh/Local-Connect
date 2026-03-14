import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/providerNavbar.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../service/api";

const ProviderNavbar = () => {
 const dispatch = useDispatch();
    const navigate = useNavigate();

    const switchToFinder = async () => {
        try {
            const res = await API.patch("/users/switch-role");
            const updateUser = res.data.user;
            
            dispatch(loginSuccess(updateUser));

            localStorage.setItem("user", JSON.stringify(updateUser));

            navigate("/");
            toast.success(`Switched to ${res.data.user.role} role`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to switch role");
        }
    }

  return (
   <nav className="provider-navbar sticky top-0 z-50 bg-white shadow-md">

  <div className="navbar-container flex items-center justify-between px-6 py-3">

    <div className="logo text-xl font-bold text-gray-800">
      <Link className="logo-link" to="/">LocalConnect</Link>
    </div>

    <div className="navbar-right flex items-center gap-5">
      <button className="switch-btn" onClick={switchToFinder}>
        Switch to Finder
      </button>

      <div className="cursor-pointer profile-icon">
        <FaUserCircle size={32} className="text-gray-600"/>
      </div>
    </div>

  </div>

</nav>
  );
};

export default ProviderNavbar;
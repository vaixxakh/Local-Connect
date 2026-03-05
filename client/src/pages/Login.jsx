import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../service/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFail } from "../features/auth/authSlice";
import "./Login.css";

const Login = ({ setActiveTab, onClose }) => {

  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        dispatch(loginStart());
       const res = await API.post("/auth/login", formData);

       localStorage.setItem("token", res.data.token);

       localStorage.setItem("user", JSON.stringify(res.data.user));

        dispatch(loginSuccess(res.data.user));
        toast.success("Login successful!");
        onClose();

       setTimeout(() => {
         navigate("/");
       }, 1000);

    } catch ( error ) {
      dispatch(loginFail(error.response?.data?.message));
      toast.error(error.response?.data?.message || "Login failed");
    }

  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Empowering Kasaragod's Local Economy</h1>
      </div>
      <div className="login-right">

        <h2>Welcome Back</h2>

        <p className="sub-text">
          Please enter your details to sign in.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="remember">
            <input type="checkbox" />
            <span>Remember me for 30 days</span>
          </div>

          <button type="submit" className="primary-btn">
            Login →
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account?{" "}
          <span onClick={() => setActiveTab("register")}>
            Create an account
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;
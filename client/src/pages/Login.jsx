import { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-container" 
      onClick={(e) => e.stopPropagation()}>

     
        <div className="login-left">
          <div className="brand">
            <h2>LocalConnect</h2>
            <h1>Empowering Kasaragod's Local Economy</h1>
            <p>
              Connect with trusted local experts or grow your service
              business in the heart of Kerala.
            </p>
          </div>
        </div>

       
        <div className="login-right">
          <button className="close-btn" onClick={onClose}>✕</button>

          <h2>Welcome Back</h2>
          <p className="sub-text">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="jomon@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="remember">
              <input type="checkbox" />
              <span>Remember me for 30 days</span>
            </div>

            <button type="submit" className="login-btn">
              Login →
            </button>
          </form>

          <p className="signup-link">
            Don’t have an account? <span>Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
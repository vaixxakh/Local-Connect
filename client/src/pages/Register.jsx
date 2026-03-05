import { useState } from "react";
import { FaSearch, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";
import API from "../service/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = ({onClose}) => {

  const  navigate = useNavigate();

  const [purpose, setPurpose] = useState("finder");
  const [ loading, setLoading ] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e) => {

    e.preventDefault();
    setLoading(true);

    const formData = {
      fullName: e.target.fullName.value,
      phoneNumber: e.target.phoneNumber.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: purpose,
    };

    try {
      const res = await API.post("/auth/register", formData);
      console.log(res.data);

      localStorage.setItem("token", res.data.token);
      
      toast.success("Registration successful!");
      onClose();

      setTimeout(() => {  
      navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1>
          Find the best local talent in <span>Kasaragod</span>
        </h1>
      </div>

      <div className="register-right">

        <h2>Create your account</h2>

        <p className="subtitle">
          Join the community to start exploring or providing services.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label>Full Name</label>
              <input name="fullName" required />
            </div>

            <div>
              <label>Phone Number</label>
              <input name="phoneNumber" required />
            </div>
          </div>

          <label>Email Address</label>
          <input name="email" type="email" required />

          <label>Password</label>

          <div className="password-field">
          <input
            name="password" 
           type={showPassword ? "text" : "password"} 
           required 
          />
           <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <p className="purpose-title">I want to...</p>

          <div className="purpose-options">
            <div
              className={`purpose-card ${
                purpose === "finder" ? "active" : ""
              }`}
              onClick={() => setPurpose("finder")}
            >
              <FaSearch />
              <p>Find Services</p>
            </div>

            <div
              className={`purpose-card ${
                purpose === "provider" ? "active" : ""
              }`}
              onClick={() => setPurpose("provider")}
            >
              <FaUserTie />
              <p>Provide Services</p>
            </div>
          </div>

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Registering..." : "Register →"}
          </button>
        </form>

      </div>

    </div>
  );
};

export default Register;
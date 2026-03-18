import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../service/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../features/auth/authSlice";
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
    
      const { token, user } = res.data;

      dispatch(loginSuccess({ user, token }));

      toast.success("Login successful!");
      onClose();

      setTimeout(() => {
        if(user.role === "provider"){
          navigate("/provider-dashboard");

        }else{
          navigate("/");
        }
      }, 1000);

    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message));
      toast.error(error.response?.data?.message || "Login failed");

    }
  };

  return (
<div className="login-container flex min-h-screen bg-gray-100">


  <div className="login-left hidden lg:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10">

    <h1 className="text-3xl font-bold text-center">
      Empowering Kasaragod's Local Economy
    </h1>

  </div>


  <div className="login-right flex w-full lg:w-1/2 items-start justify-center pt-16 pb-8 px-8">

    <div className="login-card w-full max-w-md bg-white shadow-lg rounded-xl p-8">

      <h2 className="text-2xl font-bold mb-2">
        Welcome Back
      </h2>

      <p className="sub-text text-gray-500 mb-6">
        Please enter your details to sign in.
      </p>


      <form onSubmit={handleSubmit} className="space-y-4">


        <div>

          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="john@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        {/* PASSWORD */}

        <div className="password-field">

          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>

          </div>

        </div>


        {/* REMEMBER */}

        <div className="remember flex items-center gap-2 text-sm">

          <input type="checkbox"/>

          <span>
            Remember me for 30 days
          </span>

        </div>


        {/* BUTTON */}

        <button
          type="submit"
          className="primary-btn w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login →
        </button>

      </form>


    

      <p className="signup-link text-sm text-center mt-6">

        Don’t have an account?{" "}

        <span
          onClick={() => setActiveTab("register")}
          className="text-blue-600 cursor-pointer font-semibold"
        >
          Create an account
        </span>

      </p>

    </div>

  </div>

</div>
  );
};

export default Login;
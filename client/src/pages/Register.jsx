import { useState, useEffect } from "react";
import { FaSearch, FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../service/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../pages/Register.css";

const Register = ({ onClose, initialRole = "finder" }) => {

  const navigate = useNavigate();

  const [purpose, setPurpose] = useState(initialRole);

  useEffect(() => {
    setPurpose(initialRole);
  }, [initialRole]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {

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

      localStorage.setItem("token", res.data.token);

      toast.success("Registration successful!");
      onClose();

      setTimeout(() => {
        const user = res.data.user;

        if(user.role === "provider"){
          navigate("/provider-dashboard");
        }else{
          navigate("/");
        }

      },1000);

    } catch (error) {

      toast.error(error.response?.data?.message || "Registration failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="register-container flex min-h-screen bg-gray-100">


      <div className="register-left hidden lg:flex w-1/2 bg-green-600 text-white items-center justify-center p-10">

        <h1 className="text-3xl font-bold text-center">

          Find the best local talent in 
          <span className="text-yellow-300"> Kasaragod</span>

        </h1>

      </div>
      <div className="register-right flex w-full lg:w-1/2 items-center justify-center px-6">

        <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-5 w-full max-w-md space-y-1"
        >

          <h2 className="text-2xl font-bold ">
            Create your account
          </h2>

          <p className="subtitle text-gray-500 mb-1">
            Join the community to start exploring or providing services.
          </p>

          <div className="form-row grid grid-cols-2 gap-1">

            <div>

              <label className="text-sm font-medium">
                Full Name
              </label>

              <input
              name="fullName"
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div>

              <label className="text-sm font-medium">
                Phone Number
              </label>

              <input
              name="phoneNumber"
              required
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />

            </div>

          </div>


          <div>

            <label className="text-sm font-medium">
              Email Address
            </label>

            <input
            name="email"
            type="email"
            required
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div className="password-field">

            <label className="text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              />

              <span
              onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </span>

            </div>

          </div>


          <p className="purpose-title">
            I want to...
          </p>

          <div className="purpose-options">

            <div
            className={`purpose-card ${purpose === "finder" ? "active" : ""}`}
            onClick={() => setPurpose("finder")}
            >

              <FaSearch className="mx-auto mb-2"/>

              <p>Find Services</p>

            </div>

            <div
            className={`purpose-card ${purpose === "provider" ? "active" : ""}`}
            onClick={() => setPurpose("provider")}
            >

              <FaUserTie className="mx-auto mb-2"/>

              <p>Provide Services</p>

            </div>

          </div>


          <button
          type="submit"
          disabled={loading}
          className="primary-btn w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >

            {loading ? "Registering..." : "Register →"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default Register;
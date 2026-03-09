import {  Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Providers from "../pages/Providers";
import ProviderDetails from "../pages/ProviderDetails";
import Profile from "../pages/Profile";

import MyBookings from "../pages/MyBookings";
import Emergency from "../pages/Emergency";
const AppRoutes = ({onLoginClick }) => {
    return (
        
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        
        <Route element={<MainLayout onLoginClick={onLoginClick} />}>
          <Route path="/" element={<Home />} />

          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/:id" element={<ProviderDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/emergency" element={<Emergency />} />
        </Route>

      </Routes>
    )
};
export default AppRoutes;
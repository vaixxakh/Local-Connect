import {  Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProviderRoute from "./ProviderRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services"
import ProviderDashboard from "../pages/ProviderDashboard";
import ProviderTrackingPage from "../pages/ProviderTrackingPage";
import Profile from "../pages/Profile";

import Bookings from "../pages/Bookings";
import PaymentPage from "../pages/PaymentPage";
import Emergency from "../pages/Emergency";
import  BookingSuccessPage from "../pages/BookingSuccessPage"

const AppRoutes = ({onLoginClick }) => {
    return (
        
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        
        <Route element={<MainLayout onLoginClick={onLoginClick} />}>
          <Route path="/" element={<Home />} />

          <Route path="/Services" element={<Services />} />
          <Route
              path="/provider-dashboard"
              element={
                <ProviderRoute>
                <ProviderDashboard/>
                </ProviderRoute>
                }
            />
          <Route path="/provider-tracking/:id" element={<ProviderTrackingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings/:providerId" element={<Bookings />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/booking-success/:bookingId" element={<BookingSuccessPage />} />
          <Route path="/emergency" element={<Emergency />} />
        </Route>

      </Routes>
    )
};
export default AppRoutes;
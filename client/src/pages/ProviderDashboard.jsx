import "../styles/providerDashboard.css";
import ProviderSidebar from "../components/providerDashboard/ProviderSideBar";
import ProviderNavbar from "../components/providerDashboard/ProviderNavbar";
import Content from "../components/providerDashboard/Content";
import socket from "../socket/socket";
import { useEffect } from "react";

export default function ProviderDashboard() {

  useEffect(() => {

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    const bookingId = localStorage.getItem("bookingId");

   
    if (bookingId) {
      socket.emit("join-booking-room", bookingId);
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log(" Provider location:", lat, lng);

   
        fetch(`/api/providers/update-location`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ lat, lng }),
        });

      
        if (bookingId) {
          socket.emit("send-location", {
            bookingId,
            lat,
            lng,
          });
        }
      },
      (err) => {
        console.log("Location error:", err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);

  }, []);

  return (
    <div className="dashboard">
      <ProviderNavbar />

      <div className="dashboardContainer">
        <ProviderSidebar />
        <Content />
      </div>
    </div>
  );
}
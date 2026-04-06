import "../styles/providerDashboard.css";
import ProviderSidebar from "../components/providerDashboard/ProviderSideBar";
import ProviderNavbar from "../components/providerDashboard/ProviderNavbar";
import Content from "../components/providerDashboard/Content";
import socket from "../socket/socket";
import { useEffect } from "react";

export default function ProviderDashboard() {
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log(" Geolocation not supported");
      return;
    }

    const bookingId = localStorage.getItem("bookingId");

    if (bookingId) {
      socket.emit("join-booking-room", bookingId);
    }

    let lastSent = 0;

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const now = Date.now();
        if (now - lastSent < 2000) return;

        lastSent = now;

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("📍 Provider location:", lat, lng);

        try {
        
          await fetch(`${import.meta.env.VITE_API_URL}/api/providers/update-location`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              location: {
                type: "Point",
                coordinates: [lng, lat], 
              },
            }),
          });

  
          if (bookingId) {
            socket.emit("send-location", {
              bookingId,
              lat,
              lng,
            });
          }
        } catch (err) {
          console.error(" Location update failed:", err);
        }
      },
      (err) => {
        console.log(" Location error:", err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

const ProviderTrackingPage = () => {
  const { bookingId } = useParams();

  useEffect(() => {
    if (!bookingId) return;

    if (!navigator.geolocation) {
      console.log(" Geolocation not supported");
      return;
    }

  
    socket.emit("join-booking-room", bookingId);

    let lastSent = 0;

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const now = Date.now();

         
          if (now - lastSent > 2000) {
            lastSent = now;

            console.log(" Sending location:", lat, lng);

          
            socket.emit("send-location", {
              bookingId,
              lat,
              lng,
            });

            await fetch( import.meta.env.VITE_API_URL +"/api/provider/update-location", {
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
          }
        } catch (error) {
          console.error(" Error sending location:", error);
        }
      },

      (err) => {
        console.log(" Location failed:", err.message);

        if (err.code === 1) {
          alert("Please allow location access for tracking.");
        }
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      socket.emit("leave-booking-room", bookingId);
    };
  }, [bookingId]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🚗 Provider Tracking Started...</h2>
      <p>Sharing live location...</p>
    </div>
  );
};

export default ProviderTrackingPage;
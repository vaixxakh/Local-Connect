import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

const ProviderTrackingPage = () => {
  const { bookingId } = useParams();

  useEffect(() => {
    if (!bookingId) return;

    socket.emit("join-booking-room", bookingId);

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("📡 Sending:", lat, lng);
     
        socket.emit("send-location", {
          bookingId,
          lat,
          lng,
        });
      },
      (err) => {
        console.log("❌ Location error:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [bookingId]);

  return <h2>🚗 Provider Tracking Started...</h2>;
};

export default ProviderTrackingPage;
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

const ProviderTrackingPage = () => {
  const { bookingId } = useParams();

  useEffect(() => {
    if (!bookingId) return;

    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      return;
    }

    socket.emit("join-booking-room", bookingId);

    let lastSent = 0;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        const now = Date.now();

        if (now - lastSent > 2000) {
          lastSent = now;

          console.log("Sending...location:", lat, lng);

          socket.emit("send-location", {
            bookingId,
            lat,
            lng,
          });
        }
      },
      (err) => {
        console.log("Location failed:", err.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [bookingId]);

  return <h2>🚗 Provider Tracking Started...</h2>;
};

export default ProviderTrackingPage;
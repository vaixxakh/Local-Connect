import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

const ProviderTrackingPage = () => {
  const { bookingId } = useParams();

  useEffect(() => {
    socket.emit("join-booking-room", bookingId);

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        socket.emit("provider-location-update", {
          bookingId,
          location: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
        });
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [bookingId]);

  return <h2>Provider Tracking Started...</h2>;
};

export default ProviderTrackingPage;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import socket from "../socket/socket";
import API from "../service/api";

import BookingStatusCard from "../components/BookingSuccessPage/BookingStatusCard";
import LiveMapTracker from "../components/BookingSuccessPage/LiveMapTracker";
import ProviderInfoCard from "../components/BookingSuccessPage/ProviderInfoCard";
import ChatBox from "../components/BookingSuccessPage/ChatBox";
import PaymentDetails from "../components/BookingSuccessPage/PaymentDetails";

const BookingSuccessPage = () => {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [providerLocation, setProviderLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        const bookingData = res.data.booking;

        setBooking(bookingData);

      
        if (bookingData?.userLocation?.coordinates) {
          const [lng, lat] = bookingData.userLocation.coordinates;
          setUserLocation({ lat, lng });
        }


        if (bookingData?.providerLocation?.coordinates) {
          const [lng, lat] = bookingData.providerLocation.coordinates;
          setProviderLocation({ lat, lng });
        }

      } catch (err) {
        console.error(" Fetch error:", err);
      }
    };

    fetchData();
  }, [bookingId]);


  useEffect(() => {
    if (!bookingId) return;

    socket.emit("join-booking-room", bookingId);
    console.log(" Joined room:", bookingId);

    const handleLocation = (loc) => {
      console.log("Live Provider:", loc);

      setProviderLocation({
        lat: loc.lat,
        lng: loc.lng,
      });
    };

    socket.on("live-location", handleLocation);

    return () => {
      socket.off("live-location", handleLocation);
    };
  }, [bookingId]);


  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setUserLocation({ lat, lng });
      },
      (err) => console.log(" Finder location error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);


  if (!booking || !userLocation) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="success-page">
      <div className="success-container">

        <div className="card">
          <BookingStatusCard booking={booking} />
        </div>

        <div className="card">
          <ProviderInfoCard booking={booking} />
        </div>

        <div className="card">
          <LiveMapTracker
            userLocation={userLocation}
            providerLocation={providerLocation}
          />
        </div>

        <div className="card">
          <PaymentDetails booking={booking} />
        </div>

        <ChatBox bookingId={bookingId} />

        <button className="main-btn">
          Go to My Bookings
        </button>

      </div>
    </div>
  );
};

export default BookingSuccessPage;
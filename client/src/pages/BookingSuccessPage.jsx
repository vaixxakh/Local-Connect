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

  // 🟢 FETCH BOOKING DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/bookings/${bookingId}`);
        const bookingData = res.data.booking;

        setBooking(bookingData);

        // ✅ USER LOCATION (booking time il store cheythath)
        if (bookingData?.location) {
          const [lng, lat] = bookingData.location.coordinates;
          setUserLocation({ lat, lng });
        }

      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };

    fetchData();
  }, [bookingId]);

  // 🟢 SOCKET LIVE TRACKING
  useEffect(() => {
    if (!bookingId) return;

    // ✅ join room
    socket.emit("join-booking-room", bookingId);
    console.log("🟢 Joined room:", bookingId);

    // ✅ receive provider location
    const handleLocation = (loc) => {
      console.log("📍 Live Provider:", loc);

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

  // ⏳ LOADING
  if (!booking || !userLocation) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="success-page">
      <div className="success-container">

        {/* 🟢 STATUS */}
        <div className="card">
          <BookingStatusCard booking={booking} />
        </div>

        {/* 🟢 PROVIDER DETAILS */}
        <div className="card">
          <ProviderInfoCard booking={booking} />
        </div>

        {/* 🟢 LIVE MAP */}
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
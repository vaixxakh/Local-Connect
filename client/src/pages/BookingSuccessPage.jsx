import { useEffect, useState, } from "react";
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

  


  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(`/bookings/${bookingId}`);


      setBooking(res.data.booking);

   
      if (res.data.booking.location) {
        const [lng, lat] = res.data.booking.location.coordinates;
        setProviderLocation({ lat, lng });
      }
    };

    fetchData();
  }, [bookingId]);

  useEffect(() => {
    socket.emit("join-booking-room", bookingId);

    socket.on("live-location", (loc) => {
      setProviderLocation(loc);
    });

    return () => socket.off("live-location");
  }, [bookingId]);

  if (!booking) return <p className="text-center mt-10">Loading...</p>;

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
          userLocation={{
            lat: booking.location.coordinates[1],
            lng: booking.location.coordinates[0],
          }}
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
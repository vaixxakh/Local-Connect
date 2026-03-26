import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";
import API from "../service/api";
import BookingStatusCard from "../components/BookingSuccessPage/BookingStatusCard";
import LiveMapTracker from "../components/BookingSuccessPage/LiveMapTracker";
import ProviderInfoCard from "../components/BookingSuccessPage/ProviderInfoCard";
import ChatBox from "../components/BookingSuccessPage/ChatBox";
import PaymentDetails from "../components/BookingSuccessPage/PaymentDetails";
import { FaMailBulk } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-100 p-6">


      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <BookingStatusCard booking={booking} />
      </div>


      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <ProviderInfoCard booking={booking} />
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <LiveMapTracker
            userLocation={{
              lat: booking.location.coordinates[1],
              lng: booking.location.coordinates[0],
            }}
            providerLocation={providerLocation}
          />
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <PaymentDetails booking={booking} />
      </div>

     
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <FaMailBulk/>
        <ChatBox bookingId={bookingId} />
      </div>

     
      <div className="text-center">
        <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-10 py-3 rounded-xl shadow hover:scale-105 transition">
          Go to My Bookings
        </button>
      </div>

    </div>
  );
};

export default BookingSuccessPage;
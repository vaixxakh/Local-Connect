import { useParams, useNavigate } from "react-router-dom";

const BookingSuccessPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-600 mb-2">Your booking is confirmed.</p>
        <p className="text-sm text-gray-500 mb-6">Booking ID: {bookingId}</p>

        <button
          onClick={() => navigate("/bookings")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
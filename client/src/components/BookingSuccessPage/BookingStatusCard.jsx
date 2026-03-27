import { FaLocationArrow } from "react-icons/fa";
import "../../styles/BookingStatusCard.css";

const BookingStatusCard = ({ booking }) => {
  return (
    <div className="booking-card group">
      <div className="status-header">
        <h2 className="status-text">
          Booking {booking.bookingStatus}
        </h2>
      </div>

      
        <h1>Booking ID: {booking._id}</h1>


      <p className="address">
        <FaLocationArrow/> {booking.address}
      </p>

    </div>
  );
};

export default BookingStatusCard;
const BookingStatusCard = ({ booking }) => {
  return (
    <div>
      <h2 className="text-xl font-bold">
        Booking {booking.bookingStatus}
      </h2>

      <p>{booking.serviceName}</p>
      <p>{booking.address}</p>
    </div>
  );
};

export default BookingStatusCard;
import { useEffect, useState } from "react";
import { getUserBookings } from "../../service/bookingService";

const BookingHistory = ({ userId }) => {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        const data = await getUserBookings(userId);

        setBookings(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchBookings();

  }, [userId]);

  if (loading) {

    return (
      <section className="bg-white rounded-xl shadow-md p-6">
        Loading bookings...
      </section>
    );

  }

  return (

    <section
      id="bookings"
      className="bg-white rounded-xl shadow-md p-6"
    >

      <h3 className="text-lg font-semibold mb-4">
        Recent Bookings
      </h3>

      {bookings.length === 0 ? (

        <p className="text-gray-500">
          No bookings yet
        </p>

      ) : (

        <div className="space-y-4">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="flex justify-between items-center border-b pb-3"
            >

              <div>

                <h4 className="font-medium">
                  {booking.providerName}
                </h4>

                <p className="text-sm text-gray-500">
                  {booking.service}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(booking.date).toLocaleDateString()}
                </p>

              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
                ${
                  booking.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : booking.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {booking.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </section>

  );

};

export default BookingHistory;
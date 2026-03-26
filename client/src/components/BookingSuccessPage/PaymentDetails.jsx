import "../../styles/PaymentDetails.css";

const PaymentDetails = ({ booking }) => {
  return (
    <div className="payment-card group">

      <h3 className="text-2xl font-bold mb-5 text-gray-800 tracking-wide">
        💳 Payment Details
      </h3>

      <div className="space-y-3">

        <div className="payment-row">
          <span>Service Charge</span>
          <span>₹{booking.amount}</span>
        </div>

        <div className="payment-row">
          <span>Status</span>
          <span className="status">{booking.paymentStatus}</span>
        </div>

      </div>

      <div className="divider" />

      <div className="total-row">
        <span>Total</span>
        <span>₹{booking.amount}</span>
      </div>

    </div>
  );
};

export default PaymentDetails;
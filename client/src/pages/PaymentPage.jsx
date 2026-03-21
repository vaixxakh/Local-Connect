import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import loadRazorpayScript from "../utils/loadRazorpayScript";
import {
  createRazorpayOrderApi,
  verifyRazorpayPaymentApi,
} from "../service/paymentApi";

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const { selectedProvider, bookingForm, amount } = useSelector(
    (state) => state.booking
  );

  const [loading, setLoading] = useState(false);

  const totalAmount =
    Number(selectedProvider?.basePrice || amount || 0) +
    Number(selectedProvider?.visitCharge || 0);

  const handleRazorpayPayment = async () => {
    try {
      setLoading(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      const orderResponse = await createRazorpayOrderApi(bookingId);

      if (!orderResponse?.success || !orderResponse?.order) {
        toast.error("Failed to create payment order");
        return;
      }

      const { order } = orderResponse;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your App Name",
        description: "Service Booking Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyPayload = {
              bookingId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const verifyRes = await verifyRazorpayPaymentApi(verifyPayload);

            if (verifyRes.success) {
              toast.success("Payment successful");
              navigate(`/booking-success/${bookingId}`);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Verification failed:", error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: selectedProvider?.name || "",
          email: "",
          contact: "",
        },
        notes: {
          bookingId,
          providerId: selectedProvider?._id || "",
        },
        theme: {
          color: "#4f46e5",
        },
        modal: {
          ondismiss: function () {
            toast("Payment popup closed");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to start payment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <p className="text-gray-600 mb-2">Booking ID: {bookingId}</p>
          <p className="text-gray-600 mb-2">
            Provider: {selectedProvider?.name}
          </p>
          <p className="text-gray-600 mb-2">
            Service: {selectedProvider?.service}
          </p>
          <p className="text-gray-600 mb-2">
            Date: {bookingForm?.bookingDate}
          </p>
          <p className="text-gray-600 mb-4">
            Time: {bookingForm?.bookingTime}
          </p>

          <div className="rounded-xl border p-4 bg-indigo-50">
            <p className="font-semibold text-indigo-700">
              Pay securely using Razorpay
            </p>
            <p className="text-sm text-gray-600 mt-1">
              UPI, Cards, Netbanking and more
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-3">
            <span>Service Charge</span>
            <span>₹{selectedProvider?.basePrice || amount || 0}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Visit Charge</span>
            <span>₹{selectedProvider?.visitCharge || 0}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
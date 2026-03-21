import API from "./api";

export const createRazorpayOrderApi = async (bookingId) => {
  const res = await API.post("/payments/create-order", { bookingId });
  return res.data;
};

export const verifyRazorpayPaymentApi = async (payload) => {
  const res = await API.post("/payments/verify", payload);
  return res.data;
};
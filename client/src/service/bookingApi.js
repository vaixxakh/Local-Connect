import API from "./api";  

export const createBookingApi = (data) => API.post("/bookings", data);

export const getBookingByIdApi = (id) => API.get(`/bookings/${id}`);

export const updatePaymentApi = (id) =>
  API.put(`/bookings/${id}/payment`);

export const updateProviderLocationApi = (id, data) =>
  API.put(`/bookings/${id}/location`, data);
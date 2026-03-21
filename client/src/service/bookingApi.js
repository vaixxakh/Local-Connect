import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL  + "/api/bookings",
});

export const createBookingApi = (data) => API.post("/", data);

export const getBookingByIdApi = (id) => API.get(`/${id}`);

export const updatePaymentApi = (id) => API.put(`/${id}/payment`);

export const updateProviderLocationApi = (id, data) =>
  API.put(`/${id}/location`, data);
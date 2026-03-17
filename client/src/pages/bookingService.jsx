import axios from "axios";

const API =  import.meta.env.VITE_API_URL + "/api/bookings";

export const getUserBookings = async (userId) => {

  const res = await axios.get(`${API}/user/${userId}`);

  return res.data;

};
import axios from "axios";

const API = "http://localhost:5000/api/providers";

export const fetchProviders = async (params) => {
  const response = await axios.get(API, { params });
  return response.data.data;
};
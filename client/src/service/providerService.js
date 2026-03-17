import API from "../service/api.js";




export const getMyProfile = async () => {
  const res = await API.get("/provider/profile");
  return res.data;
};

export const saveProfile = async (data) => {
  const res = await API.post("/provider/profile", data);
  return res.data;
};

export const fetchProviders = async () => {
  const res = await API.get("/provider");
  return res.data;
};

export const getProviderById = async (id) => {
  const res = await API.get(`/provider/${id}`);
  return res.data;
};
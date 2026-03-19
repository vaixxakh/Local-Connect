import API from "../service/api.js";


export const getMyProfile = async () => {
  const res = await API.get("/provider/profile");
  return res.data;
};

export const saveProfile = async (formData) => {
  const res = await API.post("/provider/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const fetchProviders = async (service) => {
  const res = await API.get(`/provider/all${service ? `?service=${service}` : ""}`);
  return res.data;
};

export const updateProviderStatus = async (status) => {
  const res = await API.patch("/provider/status", { status });
  return res.data;
};
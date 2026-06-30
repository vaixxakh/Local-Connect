import API from "./api";

export const getUserReviewsApi = () => API.get("/reviews/user");

export const createReviewApi = (data) => API.post("/reviews", data);

export const updateReviewApi = (id, data) => API.put(`/reviews/${id}`, data);

export const deleteReviewApi = (id) => API.delete(`/reviews/${id}`);

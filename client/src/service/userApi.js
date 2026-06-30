import API from "./api";

export const getUserProfileApi = (id) => API.get(`/users/${id}`);

export const updateUserProfileApi = (data) => API.put("/users/profile", data);

export const uploadAvatarApi = (id, formData) =>
  API.put(`/users/upload-avatar/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateEmailApi = (data) => API.put("/users/update-email", data);

export const changePasswordApi = (data) => API.put("/users/change-password", data);

export const getSavedServicesApi = () => API.get("/users/saved-services/list");

export const addSavedServiceApi = (providerId) =>
  API.post(`/users/saved-services/${providerId}`);

export const removeSavedServiceApi = (providerId) =>
  API.delete(`/users/saved-services/${providerId}`);

export const updateNotificationPrefsApi = (data) =>
  API.put("/users/notification-prefs", data);

export const updatePrivacySettingsApi = (data) =>
  API.put("/users/privacy-settings", data);

export const deleteAccountApi = (data) => API.delete("/users/account", { data });

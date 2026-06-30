const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middleware/upload");
const upload = uploadMiddleware.avatar || uploadMiddleware; // avatar-specific multer
const {
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  updateEmail,
  changePassword,
  getSavedServices,
  addSavedService,
  removeSavedService,
  updateNotificationPrefs,
  updatePrivacySettings,
  deleteAccount,
  switchRole,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

/* Public */
router.get("/:id", getUserProfile);

/* Protected */
router.patch("/switch-role", protect, switchRole);
router.put("/upload-avatar/:id", protect, upload.single("avatar"), uploadProfilePicture);
router.put("/profile", protect, updateUserProfile);
router.put("/update-email", protect, updateEmail);
router.put("/change-password", protect, changePassword);
router.delete("/account", protect, deleteAccount);

/* Saved Services */
router.get("/saved-services/list", protect, getSavedServices);
router.post("/saved-services/:providerId", protect, addSavedService);
router.delete("/saved-services/:providerId", protect, removeSavedService);

/* Preferences */
router.put("/notification-prefs", protect, updateNotificationPrefs);
router.put("/privacy-settings", protect, updatePrivacySettings);

module.exports = router;

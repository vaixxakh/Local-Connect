const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getMyProfile,
  saveProfile,
  getProvidersByService,
  updateProviderStatus,
} = require("../controllers/providerController");
const {protect} = require("../middleware/authMiddleware");

router.get("/profile", protect, getMyProfile);

router.post(
  "/profile",
  protect,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "selfieImage", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "workImages", maxCount: 5 },
  ]),
  saveProfile
);

router.get("/all", getProvidersByService);

router.patch("/status", protect, updateProviderStatus);

module.exports = router;
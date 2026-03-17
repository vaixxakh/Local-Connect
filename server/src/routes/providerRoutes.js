const express = require("express");
const router = express.Router();


const {
  saveProviderProfile,
  getMyProfile,
  getAllProviders,
  getProviderById,
} = require("../controllers/providerController");

const { protect } = require("../middleware/authMiddleware");

router.post("/profile", protect, saveProviderProfile);
router.get("/profile", protect, getMyProfile);

router.get("/", getAllProviders);
router.get("/:id", getProviderById);


module.exports = router;
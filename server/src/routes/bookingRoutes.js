const express = require("express");
const router = express.Router();

const { 
    createBooking,
  getBookingById,
  updatePaymentStatus,
  updateProviderLocation,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware")


router.post("/", protect,  createBooking);
router.get("/:id",protect, getBookingById);
router.put("/:id/payment", updatePaymentStatus);
router.put("/:id/location", updateProviderLocation);

module.exports = router;

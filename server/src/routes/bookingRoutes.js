const express = require("express");
const router = express.Router();

const { 
    createBooking,
  getBookingById,
  updatePaymentStatus,
  updateProviderLocation,
} = require("../controllers/bookingController");


router.post("/", createBooking);
router.get("/:id", getBookingById);
router.put("/:id/payment", updatePaymentStatus);
router.put("/:id/location", updateProviderLocation);

module.exports = router;

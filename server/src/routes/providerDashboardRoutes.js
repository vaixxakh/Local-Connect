const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getProviderBookings,
  updateBookingStatus,
  getProviderReviews,
  replyToReview,
} = require("../controllers/providerStatsController");
const { protect } = require("../middleware/authMiddleware");

// All dashboard endpoints require provider authentication
router.get("/stats", protect, getDashboardStats);
router.get("/bookings", protect, getProviderBookings);
router.put("/bookings/:bookingId/status", protect, updateBookingStatus);
router.get("/reviews", protect, getProviderReviews);
router.post("/reviews/:reviewId/reply", protect, replyToReview);

module.exports = router;

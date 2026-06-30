const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const Review = require("../models/Review");
const User = require("../models/User");

/* ─── GET DASHBOARD STATS ─────────────────────────────────────────────────── */
exports.getDashboardStats = async (req, res) => {
  try {
    const provider = await Provider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider profile not found" });
    }

    const bookings = await Booking.find({ providerId: provider._id });

    // Aggregate counts
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.bookingStatus === "completed").length;
    const pendingBookings = bookings.filter(b => b.bookingStatus === "pending").length;
    const cancelledBookings = bookings.filter(b => b.bookingStatus === "cancelled").length;
    const confirmedBookings = bookings.filter(b => b.bookingStatus === "confirmed").length;

    // Total Earnings (completed + paid)
    const totalEarnings = bookings
      .filter(b => b.bookingStatus === "completed")
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    // Earnings calculations for Today, This Month, and Monthly Growth Chart
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const todayEarnings = bookings
      .filter(b => b.bookingStatus === "completed" && new Date(b.bookingDateTime) >= today)
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    const monthEarnings = bookings
      .filter(b => b.bookingStatus === "completed" && new Date(b.bookingDateTime) >= startOfMonth)
      .reduce((sum, b) => sum + (b.amount || 0), 0);

    // Average rating
    const reviews = await Review.find({ providerId: provider._id });
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : provider.rating || 0;

    // Generate monthly chart metrics for the past 6 months
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthName = d.toLocaleString("default", { month: "short" });
      const year = d.getFullYear();
      
      const nextMonth = new Date(year, d.getMonth() + 1, 1);

      const monthlyBookings = bookings.filter(
        b => {
          const date = new Date(b.bookingDateTime);
          return date >= d && date < nextMonth;
        }
      );

      const earnings = monthlyBookings
        .filter(b => b.bookingStatus === "completed")
        .reduce((sum, b) => sum + (b.amount || 0), 0);

      chartData.push({
        name: `${monthName} ${year}`,
        Earnings: earnings,
        Bookings: monthlyBookings.length,
      });
    }

    res.status(200).json({
      success: true,
      stats: {
        totalBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        confirmedBookings,
        totalEarnings,
        todayEarnings,
        monthEarnings,
        averageRating,
        totalReviews: reviews.length,
        status: provider.status,
      },
      chartData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── GET PROVIDER BOOKINGS ───────────────────────────────────────────────── */
exports.getProviderBookings = async (req, res) => {
  try {
    const provider = await Provider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider profile not found" });
    }

    const { status, search } = req.query;
    const query = { providerId: provider._id };

    if (status && status !== "all") {
      query.bookingStatus = status;
    }

    let bookings = await Booking.find(query)
      .populate("userId", "fullName email phoneNumber profileImage")
      .sort({ createdAt: -1 })
      .lean();

    // If search filter is active
    if (search) {
      const searchRegex = new RegExp(search, "i");
      bookings = bookings.filter(b => 
        (b.userId && searchRegex.test(b.userId.fullName)) || 
        searchRegex.test(b.serviceName) ||
        searchRegex.test(b.address)
      );
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPDATE BOOKING STATUS ───────────────────────────────────────────────── */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "confirmed", "on_the_way", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Find booking and ensure it belongs to this provider
    const provider = await Provider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider profile not found" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (booking.providerId.toString() !== provider._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access to this booking" });
    }

    booking.bookingStatus = status;

    // Auto-update payment status to paid if booking is completed
    if (status === "completed" && booking.paymentStatus === "pending") {
      booking.paymentStatus = "paid";
    }

    await booking.save();

    res.status(200).json({ success: true, message: `Booking marked as ${status}`, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── GET PROVIDER REVIEWS ────────────────────────────────────────────────── */
exports.getProviderReviews = async (req, res) => {
  try {
    const provider = await Provider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider profile not found" });
    }

    const reviews = await Review.find({ providerId: provider._id })
      .populate("userId", "fullName profileImage")
      .sort({ createdAt: -1 })
      .lean();

    // Compute rating breakdown
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    reviews.forEach(r => {
      const ratingVal = Math.round(r.rating);
      if (breakdown[ratingVal] !== undefined) {
        breakdown[ratingVal]++;
      }
      sum += r.rating;
    });

    const averageRating = reviews.length > 0 ? sum / reviews.length : 0;

    res.status(200).json({
      success: true,
      reviews,
      ratingStats: {
        averageRating,
        totalReviews: reviews.length,
        breakdown
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── REPLY TO REVIEW ─────────────────────────────────────────────────────── */
exports.replyToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { replyText } = req.body;

    if (!replyText || !replyText.trim()) {
      return res.status(400).json({ success: false, message: "Reply text is required" });
    }

    const provider = await Provider.findOne({ user: req.user.id });
    if (!provider) {
      return res.status(404).json({ success: false, message: "Provider profile not found" });
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    if (review.providerId.toString() !== provider._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized reply" });
    }

    review.replyText = replyText.trim();
    review.replyAt = new Date();
    await review.save();

    res.status(200).json({ success: true, message: "Reply posted successfully", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

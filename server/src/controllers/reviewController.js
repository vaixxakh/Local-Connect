const Review = require("../models/Review");

/* ─── GET all reviews by the logged-in user ───────────────────────────────── */
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── CREATE review ───────────────────────────────────────────────────────── */
exports.createReview = async (req, res) => {
  try {
    const { providerId, bookingId, serviceName, providerName, rating, reviewText } = req.body;

    if (!providerId || !serviceName || !providerName || !rating) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const existing = await Review.findOne({ userId: req.user.id, bookingId });
    if (existing) {
      return res.status(400).json({ success: false, message: "You already reviewed this booking" });
    }

    const review = await Review.create({
      userId: req.user.id,
      providerId,
      bookingId: bookingId || null,
      serviceName,
      providerName,
      rating,
      reviewText,
    });

    res.status(201).json({ success: true, message: "Review submitted", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPDATE review ───────────────────────────────────────────────────────── */
exports.updateReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    review.rating = rating ?? review.rating;
    review.reviewText = reviewText ?? review.reviewText;
    await review.save();

    res.status(200).json({ success: true, message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── DELETE review ───────────────────────────────────────────────────────── */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

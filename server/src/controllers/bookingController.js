const Booking = require("../models/Booking");


const createBooking = async (req, res) => {
  try {

      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - user not found",
        });
      }

    const {
      providerId,
      providerName,
      serviceName,
      bookingDate,
      bookingTime,
      address,
      notes,
      amount,
      providerLocation,
    } = req.body;

    if (!providerId || !serviceName || !bookingDate || !bookingTime || !address || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }


    const booking = await Booking.create({
      userId: req.user.id,
      providerId,
      providerName,
      serviceName,
      bookingDate,
      bookingTime,
      address,
      notes,
      amount,
      providerLocation: providerLocation || undefined,
      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking creation failed",
      error: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    .populate("providerId", "name phone profileImage")
    .populate("userId", "fullName");
    console.log("Booking ID:", req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};


const updatePaymentStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "paid",
        bookingStatus: "confirmed",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment update failed",
      error: error.message,
    });
  }
};

const updateProviderLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        providerLocation: { lat, lng },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Provider location updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Location update failed",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookingById,
  updatePaymentStatus,
  updateProviderLocation,
};
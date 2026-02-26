const Booking = require("../models/Booking");
const Provider = require("../models/Provider");
const asyncHandler = require("express-async-handler");


exports.createBooking = asyncHandler(async (req, res) => {
  const { serviceId } = req.body;

  if (!serviceId) {
    res.status(400);
    throw new Error("Service ID is required");
  }

  const service = await Provider.findById(serviceId);

  if (!service) {
    res.status(404);
    throw new Error("Service not found");
  }

  const booking = await Booking.create({
    service: serviceId,
    bookedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Service booked successfully",
    data: booking,
  });
});

exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ bookedBy: req.user._id })
    .populate("service")
    .populate("bookedBy", "name email");

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id)
    .populate("service");

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }


  if (booking.service.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this booking");
  }

  booking.status = status || booking.status;

  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking status updated",
    data: booking,
  });
});
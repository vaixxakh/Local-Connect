const mongoose = require("mongoose");

 const bookingSchema = new mongoose.Schema(
    {
         userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },
    providerName: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    bookingTime: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "on_the_way", "completed", "cancelled"],
      default: "pending",
    },
    providerLocation: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    paymentMethod: {
      type: String,
      default: "razorpay",
    },
    razorpayOrderId: {
      type: String,
      default: "",
    },
    razorpayPaymentId: {
      type: String,
      default: "",
    },
    razorpaySignature: {
      type: String,
      default: "",
    },
    },
    {timestamps: true}
 );
 module.exports = mongoose.model("Booking", bookingSchema);
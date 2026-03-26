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
      type: Date,
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
      city: String,
      pincode: String,
    notes: {
      type: String,
      default: "",
    },
     pricing: {
      basePrice: Number,
      distanceKm: Number,
      distanceCharge: Number,
      platformFee: Number,
      totalAmount: Number,
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
      lat: Number,
      lng: Number,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    
    paymentMethod: {
      type: String,
      default: "razorpay",
    },

    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  { timestamps: true }
 );
 bookingSchema.index({ location: "2dsphere" });
 module.exports = mongoose.model("Booking", bookingSchema);
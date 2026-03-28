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
    bookingDateTime: {
      type: Date,
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
      min:0,
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
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
  coordinates: {
    type: [Number], 
  },
},
    userLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
     coordinates: {
        type: [Number],
        required: true,
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
 bookingSchema.index({ userLocation: "2dsphere" });
 bookingSchema.index({ providerLocation: "2dsphere" });
 module.exports = mongoose.model("Booking", bookingSchema);
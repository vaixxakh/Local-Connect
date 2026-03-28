const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    idProof: {
      type: String,
      default: "",
    },

    idNumber: {
      type: String,
      default: "",
    },

    selfieImage: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    service: {
      type: String,
      required: true,
      trim: true,
    },

    subServices: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: Number,
      default: 0,
    },

    basePrice: {
      type: Number,
      default: 0,
    },

    visitCharge: {
      type: Number,
      default: 0,
    },

    pricingType: {
      type: String,
      enum: ["fixed", "hourly"],
      default: "fixed",
    },

    district: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    area: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    workingDays: {
      type: [String],
      default: [],
    },

    workingTime: {
      type: String,
      default: "",
    },

    emergencyAvailable: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    workImages: {
      type: [String],
      default: [],
    },

    bio: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["online", "offline", "busy"],
      default: "online",
    },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);
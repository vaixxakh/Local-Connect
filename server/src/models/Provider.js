const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  phone: String,
  email: String,
  profileImage: String,


  idProof: String,      
  idNumber: String,
  selfieImage: String,
  isVerified: {
    type: Boolean,
    default: false,
  },


  service: {
    type: String,
    required: true,
  },

  subServices: [String],

  skills: [String],

  experience: {
    type: Number,
    default: 0,
  },


  basePrice: Number,
  visitCharge: Number,
  pricingType: {
    type: String,
    enum: ["fixed", "hourly"],
    default: "fixed",
  },

  district: String,
  city: String,
  area: String,
  pincode: String,


  workingDays: [String],
  workingTime: String,
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


  workImages: [String],

  bio: String,

  status: {
    type: String,
    enum: ["online", "offline", "busy"],
    default: "offline",
  },

}, { timestamps: true });

module.exports = mongoose.model("Provider", providerSchema);
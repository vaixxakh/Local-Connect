const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
      unique: true,
    },
    role: {
      type: String,
      enum: ["finder", "provider"],
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say", ""],
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    postalCode: {
      type: String,
      default: "",
    },
    savedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
      },
    ],
    notificationPrefs: {
      emailNotifications: { type: Boolean, default: true },
      bookingNotifications: { type: Boolean, default: true },
      promotionalNotifications: { type: Boolean, default: false },
    },
    privacySettings: {
      profileVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
      },
      dataSharing: { type: Boolean, default: false },
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
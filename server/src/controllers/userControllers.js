const User = require("../models/User");
const multer = require("multer");
const bcrypt = require("bcryptjs");

/* ─── GET user profile by ID ─────────────────────────────────────────────── */
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("savedServices", "name service profileImage rating basePrice status")
      .lean();

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPDATE personal profile info ───────────────────────────────────────── */
exports.updateUserProfile = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      country,
      postalCode,
    } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, phoneNumber, dateOfBirth, gender, address, city, state, country, postalCode },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profile updated", user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPLOAD profile picture ─────────────────────────────────────────────── */
exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const fileBaseUrl = `${req.protocol}://${req.get("host")}`;
    const imageUrl = `${fileBaseUrl}/${req.file.path.replace(/\\/g, "/")}`;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profileImage: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile picture updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPDATE email ────────────────────────────────────────────────────────── */
exports.updateEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;

    if (!newEmail || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const emailExists = await User.findOne({ email: newEmail.toLowerCase() });
    if (emailExists && emailExists._id.toString() !== req.user.id) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    user.email = newEmail.toLowerCase();
    await user.save();

    res.status(200).json({ success: true, message: "Email updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── CHANGE password ─────────────────────────────────────────────────────── */
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── GET saved services ──────────────────────────────────────────────────── */
exports.getSavedServices = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("savedServices")
      .populate("savedServices", "name service profileImage rating basePrice status pricingType subServices");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, savedServices: user.savedServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── ADD saved service ───────────────────────────────────────────────────── */
exports.addSavedService = async (req, res) => {
  try {
    const { providerId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.savedServices.includes(providerId)) {
      return res.status(400).json({ success: false, message: "Service already saved" });
    }

    user.savedServices.push(providerId);
    await user.save();

    res.status(200).json({ success: true, message: "Service saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── REMOVE saved service ────────────────────────────────────────────────── */
exports.removeSavedService = async (req, res) => {
  try {
    const { providerId } = req.params;

    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { savedServices: providerId } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Service removed from saved" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPDATE notification preferences ────────────────────────────────────── */
exports.updateNotificationPrefs = async (req, res) => {
  try {
    const { emailNotifications, bookingNotifications, promotionalNotifications } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { notificationPrefs: { emailNotifications, bookingNotifications, promotionalNotifications } },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, message: "Preferences updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── UPDATE privacy settings ─────────────────────────────────────────────── */
exports.updatePrivacySettings = async (req, res) => {
  try {
    const { profileVisibility, dataSharing } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { privacySettings: { profileVisibility, dataSharing } },
      { new: true }
    ).select("-password");

    res.status(200).json({ success: true, message: "Privacy settings updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── DELETE account ─────────────────────────────────────────────────────── */
exports.deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ─── SWITCH role (existing, preserved) ──────────────────────────────────── */
exports.switchRole = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.role = user.role === "finder" ? "provider" : "finder";
    await user.save();

    res.status(200).json({
      success: true,
      message: `Role switched to ${user.role}`,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};
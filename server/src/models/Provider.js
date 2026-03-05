const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    default: "offline",
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Provider", providerSchema);
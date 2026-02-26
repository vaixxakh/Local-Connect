const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const providerRoutes = require("./routes/providerRoutes");


const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API running successfully",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);

module.exports = app;
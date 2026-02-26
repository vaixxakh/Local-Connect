const mongoose = require("mongoose");

 const bookingSchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        bookedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "completed", "cancelled"],
            default: "pending",
        },
    },
    {timestamps: true}
 );
 module.exports = mongoose.model("Booking", bookingSchema);
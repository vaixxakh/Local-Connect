const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true, 
            trim: true
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
            minlenght: 6,
        },
        phoneNumber: {
            type: String,
            required: true,
            minilenght: 10,
            unique: true,

        },
        role: {
            type: String,
            enum: ["finder", "provider"],
            required: true,
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
    {timestamps: true}
);
module.exports = mongoose.model("User", userSchema);
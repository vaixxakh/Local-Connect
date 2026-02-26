const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, 
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlenght: 6,
        },
        phone: {
            type: String,

        },
        registrationPurpose: {
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
const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required:true,
        },
        priceType: {
            type: String,
            enum: ["fixed", "starting", "negotiable"],
            default: "negotiable"
        },
        categories: {
            type: String,
            required : true,  
        },
        location: {
            type: String,
            required: true,
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {timestamps: true}
);
module.exports = mongoose.model("Provider", providerSchema);
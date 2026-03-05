const User = require("../models/User");

exports.switchRole = async (req, res ) => {

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    user.role = user.role === "finder" ? "provider" : "finder";
    await user.save();
    res.json({
        success: true,
        user
    });
};

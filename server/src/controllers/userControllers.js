const User = require("../models/User");
const  multer = require("multer");

exports.switchRole = async (req, res ) => {

  try {

    const user = await User.findById(req.user.id);
  
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    user.role = user.role === "finder" ? "provider" : "finder";
    await user.save();

    res.status(200).json({
        success: true,
        message: `Role switched to ${user.role}`,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }

};


exports.uploadProfilePicture = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profileImage: req.file.path },
      { new: true }
    );

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
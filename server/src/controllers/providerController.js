
const Provider = require("../models/Provider");
const asyncHandler = require("express-async-handler");


exports.saveProviderProfile = asyncHandler(async ( req, res ) => {
  try {

    const userId = req.user._id;
    const profile = await Provider.findOneAndUpdate(
      {user: userId},
     {   ...req.body,
        user: userId,
      },
      {
        new: true,
        upsert: true,
     }
    );
    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving profile",
      error: error.message,
    });
  }
});

exports.getMyProfile = asyncHandler(async (req, res) => {

  try {
    const profile = await Provider.findOne({ user: req.user.id });
    res.status(200).json({
      success: true,
      data: profile || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
});


exports.getAllProviders = asyncHandler(async (req, res) => {
  try {

  const providers = await Provider.find({ isVerified: true });

  res.status(200).json({
    success: true,
    count: providers.length,
    data: providers,
  });

} catch (error) {
  res.status(500).json({
    success: false,
    message: "Error fetching providers",
    error: error.message,
  });
}
});

exports.getProviderById = asyncHandler(async (req, res) => {

  try {
    const provider = await Provider.findById(req.params.id);
  
    if (!provider) {
      res.status(404);
      throw new Error("Provider not found");
    }
  
    res.status(200).json({
      success: true,
      data: provider,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching provider",
      error: error.message,
    });
  }

});
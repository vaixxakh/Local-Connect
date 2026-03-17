
const Provider = require("../models/Provider");
const asyncHandler = require("express-async-handler");


exports.saveProviderProfile = asyncHandler(async ( req, res ) => {
  
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

});

exports.getMyProfile = asyncHandler(async (req, res) => {

  const profile = await Provider.findOne({ user: req.user.id });

  res.status(200).json({
    success: true,
    data: profile || {},
  });
});

exports.getAllProviders = asyncHandler(async (req, res) => {

  const providers = await Provider.find();

  res.status(200).json({
    success: true,
    count: providers.length,
    data: providers,
  });
});

exports.getProviderById = asyncHandler(async (req, res) => {

  const provider = await Provider.findById(req.params.id);

  if (!provider) {
    res.status(404);
    throw new Error("Provider not found");
  }

  res.status(200).json({
    success: true,
    data: provider,
  });
});
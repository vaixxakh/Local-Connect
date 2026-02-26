const Provider = require("../models/Provider");
const asyncHandler = require("express-async-handler");

exports.createProvider = asyncHandler(async(req, res) => {

    const { title, description, category, price, location } = req.body;

      if (!title || !description || !category || !price || !location) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const provider = await Provider.create({
        ...req.body, 
        createdBy:req.user.id,
    });

    res.status(201).json({
        success: true,
        message: "Service posted successfully",
        data: provider,
    });
});

exports.getAllProviders = asyncHandler(async(req, res) => {
    const providers = await Provider.find()
        .populate("createdBy", "name email phone");

    res.status(200).json({
        success: true, 
        count: providers.length,
        data: providers,
    });
});

exports.getProvidersById = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id)
    .populate("createdBy", "name email phone");

  if (!provider) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.status(200).json({
    success: true,
    data: provider,
  });
});

exports.deleteProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);

  if (!provider) {
    res.status(404);
    throw new Error("Service not found");
  }

  if (provider.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this service");
  }

  await provider.deleteOne();

  res.status(200).json({
    success: true,
    message: "Service deleted successfully",
  });
});
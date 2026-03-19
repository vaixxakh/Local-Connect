const Provider = require("../models/Provider");

exports.getMyProfile = async (req, res) => {
  try {
    const provider = await Provider.findOne({ user: req.user_id });

    return res.status(200).json({
      success: true,
      data: provider || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch provider profile",
      error: error.message,
    });
  }
};

exports.saveProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      subServices,
      skills,
      experience,
      basePrice,
      visitCharge,
      pricingType,
      district,
      city,
      area,
      pincode,
      workingDays,
      workingTime,
      emergencyAvailable,
      bio,
      idNumber,
    } = req.body;

    let provider = await Provider.findOne({ user: req.user._id });

    const fileBaseUrl = `${req.protocol}://${req.get("host")}`;

    const profileImage = req.files?.profileImage?.[0]
      ? `${fileBaseUrl}/${req.files.profileImage[0].path.replace(/\\/g, "/")}`
      : provider?.profileImage || "";

    const selfieImage = req.files?.selfieImage?.[0]
      ? `${fileBaseUrl}/${req.files.selfieImage[0].path.replace(/\\/g, "/")}`
      : provider?.selfieImage || "";

    const idProof = req.files?.idProof?.[0]
      ? `${fileBaseUrl}/${req.files.idProof[0].path.replace(/\\/g, "/")}`
      : provider?.idProof || "";

    let workImages = provider?.workImages || [];
    if (req.files?.workImages?.length) {
      const newWorkImages = req.files.workImages.map(
        (file) => `${fileBaseUrl}/${file.path.replace(/\\/g, "/")}`
      );
      workImages = newWorkImages;
    }

    const providerData = {
      user: req.user.id,
      name,
      phone,
      email,
      service,
      subServices: subServices ? JSON.parse(subServices) : [],
      skills: skills ? JSON.parse(skills) : [],
      experience: Number(experience) || 0,
      basePrice: Number(basePrice) || 0,
      visitCharge: Number(visitCharge) || 0,
      pricingType,
      district,
      city,
      area,
      pincode,
      workingDays: workingDays ? JSON.parse(workingDays) : [],
      workingTime,
      emergencyAvailable: emergencyAvailable === "true" || emergencyAvailable === true,
      bio,
      idNumber,
      profileImage,
      selfieImage,
      idProof,
      workImages,
    };

    if (provider) {
      provider = await Provider.findOneAndUpdate(
        { user: req.user._id },
        providerData,
        { new: true }
      );
    } else {
      provider = await Provider.create(providerData);
    }

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: provider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to save profile",
      error: error.message,
    });
  }
};

exports.getProvidersByService = async (req, res) => {
  try {
    const { service } = req.query;

    const filter = service ? { service } : {};

    const providers = await Provider.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: providers.length,
      data: providers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch providers",
      error: error.message,
    });
  }
};

exports.updateProviderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["online", "offline", "busy"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const provider = await Provider.findOneAndUpdate(
      { user: req.user._id },
      { status },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: provider,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};
const Provider = require("../models/Provider");

exports.getMyProfile = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const provider = await Provider.findOne({ user: req.user._id });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: provider,
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
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      name,
      phone,
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
      location,
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
      workImages = req.files.workImages.map(
        (file) => `${fileBaseUrl}/${file.path.replace(/\\/g, "/")}`
      );
    }

    const providerData = {
      user: req.user._id,
      name,
      phone,
      email: req.user.email, 
      service,
      subServices:
        typeof subServices === "string"
          ? JSON.parse(subServices)
          : subServices || [],
      skills:
        typeof skills === "string"
          ? JSON.parse(skills)
          : skills || [],
      experience: Number(experience) || 0,
      basePrice: Number(basePrice) || 0,
      visitCharge: Number(visitCharge) || 0,
      pricingType,
      district,
      city,
      area,
      pincode,
      workingDays:
        typeof workingDays === "string"
          ? JSON.parse(workingDays)
          : workingDays || [],
      workingTime,
      emergencyAvailable:
        emergencyAvailable === "true" || emergencyAvailable === true,
      bio,
      idNumber,
      profileImage,
      selfieImage,
      idProof,
      workImages,
      location:
      location?.lat !== undefined && location?.lng !== undefined
        ? {
            lat: Number(location.lat),
            lng: Number(location.lng),
          }
        : provider?.location || undefined,
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

    const filter = service
      ? { service: { $regex: new RegExp(service, "i") } }
      : {};

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
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

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

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

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
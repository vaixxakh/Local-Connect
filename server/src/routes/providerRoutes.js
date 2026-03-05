const express = require("express");
const router = express.Router();
const Provider = require("../models/Provider");


const {
    createProvider,
    getAllProviders, 
    getProvidersById,
    deleteProvider,
} = require("../controllers/providerController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createProvider);
router.get("/", getAllProviders);
router.get("/:id", getProvidersById);
router.delete("/:id", protect, deleteProvider);

router.get("/", async (req, res) => {
  try {
    const providers = await Provider.find();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
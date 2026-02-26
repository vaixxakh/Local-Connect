const express = require("express");
const router = express.Router();

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

module.exports = router;
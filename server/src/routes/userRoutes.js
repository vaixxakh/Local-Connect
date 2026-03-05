const express = require("express");
const router = express.Router();
const { switchRole } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.patch("/switch-role", protect, switchRole);

module.exports = router;

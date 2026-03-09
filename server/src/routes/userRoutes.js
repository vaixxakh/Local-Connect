const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { switchRole, uploadProfilePicture } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.patch("/switch-role", protect, switchRole);
router.put(
  "/upload-avatar/:id",
  upload.single("avatar"),
  uploadProfilePicture
);


module.exports = router;

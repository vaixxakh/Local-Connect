const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads/providers";


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = file.mimetype;

  const isValidExt = allowedTypes.test(ext);
  const isValidMime =
    mimeType === "image/jpg" ||
    mimeType === "image/jpeg" ||
    mimeType === "image/png" ||
    mimeType === "image/webp";

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, and webp image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
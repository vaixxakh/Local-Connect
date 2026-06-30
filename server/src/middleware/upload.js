const multer = require("multer");
const path = require("path");
const fs = require("fs");

const providerUploadPath = "uploads/providers";
const avatarUploadPath = "uploads/avatars";

[providerUploadPath, avatarUploadPath].forEach((p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const makeStorage = (dest) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),
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
  const isValidMime = ["image/jpg", "image/jpeg", "image/png", "image/webp"].includes(mimeType);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, and webp image files are allowed"));
  }
};

const upload = multer({ storage: makeStorage(providerUploadPath), fileFilter });
const uploadAvatar = multer({ storage: makeStorage(avatarUploadPath), fileFilter });

module.exports = upload;
module.exports.avatar = uploadAvatar;
"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// Cloudinary
var _multerstoragecloudinary = require('multer-storage-cloudinary');
var _cloudinary = require('cloudinary');

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const localStorage = _multer2.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _path.resolve.call(void 0, __dirname, "..", "..", "uploads", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

const cloudinaryStorage = new (0, _multerstoragecloudinary.CloudinaryStorage)({
  cloudinary: _cloudinary.v2,
  params: {
    folder: "uploads",
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
    resource_type: "auto",
  },
});

const storage =
  process.env.STORAGE_DRIVER === "cloudinary"
    ? cloudinaryStorage
    : localStorage;

exports. default = {
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido"));
    }
  },
};

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "diooatmpk",
  api_key: "466554925372786",
  api_secret: "0kLnUw5IdfnAADldSeraz5uHKBM",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "Nhathuoc",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;

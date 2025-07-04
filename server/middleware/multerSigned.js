const multer = require("multer");
const path = require("path");

// Define storage location for signed PDFs
const signedStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/signed/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const uploadSigned = multer({ storage: signedStorage });

module.exports = uploadSigned;

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Create "uploads/signed" folder if not exists
const signedDir = path.join(__dirname, "../uploads/signed");
if (!fs.existsSync(signedDir)) {
  fs.mkdirSync(signedDir, { recursive: true });
}

// Multer storage for signed PDFs
const signedStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/signed");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-signed-" + file.originalname;
    cb(null, uniqueName);
  },
});

const signedUpload = multer({ storage: signedStorage });

// ✅ Route to handle saving signed PDF
router.post("/save-signed", signedUpload.single("signedFile"), async (req, res) => {
  try {
    const saved = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
    });

    await saved.save();

    res.status(200).json({
      message: "Signed PDF saved successfully",
      fileUrl: `http://localhost:5000/uploads/signed/${req.file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to save signed PDF", error: err.message });
  }
});

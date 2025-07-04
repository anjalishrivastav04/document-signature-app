// server/routes/documentRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Document = require("../models/Document");

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("📁 Created uploads directory");
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ POST /api/docs/upload
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      console.log("⚠️ No file received");
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newDoc = new Document({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    });

    await newDoc.save();

    console.log("📦 New Document Uploaded:", newDoc);
    console.log("📦 Sending response to client:", {
      success: true,
      document: newDoc,
    });

    return res.json({
      success: true,
      document: newDoc,
    });
  } catch (err) {
    console.error("❌ Upload error:", err);
    return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

// ✅ GET /api/docs
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return res.status(500).json({ success: false, message: "Failed to fetch documents" });
  }
});

module.exports = router;

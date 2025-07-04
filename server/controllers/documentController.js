const Document = require("../models/Document");

const uploadDocument = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const newDoc = new Document({
      filename: file.filename,
      originalName: file.originalname,
      signedFilePath: null,
    });

    await newDoc.save();

    console.log("📦 New Document Uploaded:", newDoc);

    res.json({
      success: true,
      document: newDoc,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllDocuments = async (req, res) => {
  const docs = await Document.find();
  res.json(docs);
};

module.exports = {
  uploadDocument,
  getAllDocuments,
};

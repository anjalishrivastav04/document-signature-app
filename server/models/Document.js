const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalName: String,
  uploadedAt: Date,
});

module.exports = mongoose.model("Document", documentSchema);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure /uploads/signed directory exists
const signedDir = path.join(__dirname, "uploads", "signed");
if (!fs.existsSync(signedDir)) {
  fs.mkdirSync(signedDir, { recursive: true });
  console.log("✅ Created /uploads/signed directory");
}

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Load Routes
const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/docs", documentRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🚀 DocuSign Clone Backend is Running");
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // ✅ Start Server after DB is connected
    app.listen(PORT, () => {
      console.log(`🔥 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

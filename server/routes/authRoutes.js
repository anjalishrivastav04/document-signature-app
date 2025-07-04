console.log("✅ authRoutes file loaded");
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

console.log("✅ authRoutes file loaded");

// TEMP route to test
router.get("/test", (req, res) => {
  console.log("📥 /api/auth/test hit");
  res.json({ message: "✅ Auth routes are working!" });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;

// backend/src/routes/authRoutes.js — login + stats
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { sign, auth } = require("../middleware/auth");

// POST /api/auth/login — { username, password } → { token }
// password verified against ADMIN_PASSWORD env (default: "mehras2024")
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};
  const user = username || "admin";
  const pass = process.env.ADMIN_PASSWORD || "mehras2024";
  if (!password || password !== pass) {
    return res.status(401).json({ msg: "نام کاربری یا رمز عبور اشتباه است" });
  }
  res.json({ token: sign(user), user });
});

// GET /api/auth/stats — dashboard stats (protected)
router.get("/stats", auth, async (req, res) => {
  try {
    const [total, categories, featured] = await Promise.all([
      Product.countDocuments(),
      Product.distinct("category"),
      Product.countDocuments({ price: null }),
    ]);
    res.json({ total, categories: categories.length, featured });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

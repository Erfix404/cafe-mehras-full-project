// backend/app.js — express app (no server listen, testable)
const express = require("express");
const cors = require("cors");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cafe Mehras Backend is running successfully! ☕");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// 404 + error handler
app.use((req, res) => res.status(404).json({ msg: "مسیر یافت نشد" }));
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ msg: "خطای سرور" });
});

module.exports = app;

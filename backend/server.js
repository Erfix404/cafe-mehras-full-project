// backend/server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// ۱. مسیر جدید محصولات رو اینجا وارد می‌کنیم
const productRoutes = require("./src/routes/productRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Database Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Cafe Mehras Backend is running successfully! ☕");
});

// ۲. به سرور می‌گوییم که برای آدرس /api/products از این فایل مسیرها استفاده کند
app.use("/api/products", productRoutes);

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

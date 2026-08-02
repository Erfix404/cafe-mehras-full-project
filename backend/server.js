// backend/server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/productRoutes");
const authRoutes = require("./src/routes/authRoutes");

dotenv.config();

const PORT = process.env.PORT || 5001;

// --- Required env checks (fail closed, no insecure defaults) ---
if (!process.env.MONGODB_URI) {
  console.error(
    "❌ MONGODB_URI is not set. Copy .env.example to .env and fill it in."
  );
  process.exit(1);
}
if (!process.env.ADMIN_SECRET || !process.env.ADMIN_PASSWORD) {
  console.error(
    "❌ ADMIN_SECRET and ADMIN_PASSWORD must be set. Copy .env.example to .env and fill them in."
  );
  process.exit(1);
}
if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
  console.error(
    "❌ ADMIN_PASSWORD and ADMIN_SECRET must be set (no default allowed). Copy .env.example → .env."
  );
  process.exit(1);
}

const app = express();

// --- Database Connection ---
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// --- Middlewares ---
app.use(cors());
// این خط کد بسیار مهم است و به سرور اجازه می‌دهد JSON را بفهمد
app.use(express.json());

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Cafe Mehras Backend is running successfully! ☕");
});

// --- API Routes ---
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

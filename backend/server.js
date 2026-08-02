// backend/server.js — bootstraps app + db connection
const dotenv = require("dotenv");
dotenv.config();

const { ADMIN_PASSWORD, ADMIN_SECRET, MONGODB_URI, PORT } = process.env;

// --- Required env checks (fail closed, no insecure defaults) ---
const missing = [];
if (!MONGODB_URI) missing.push("MONGODB_URI");
if (!ADMIN_SECRET) missing.push("ADMIN_SECRET");
if (!ADMIN_PASSWORD) missing.push("ADMIN_PASSWORD");
if (missing.length) {
  console.error(
    `❌ Missing env var(s): ${missing.join(", ")}. Copy .env.example → .env and fill them in.`
  );
  process.exit(1);
}

const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

const port = PORT || 5001;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

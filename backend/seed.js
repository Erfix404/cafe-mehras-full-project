// backend/seed.js — populate MongoDB with the 58-product menu
// Data source: frontend/src/api/mockAPI.js (single source of truth).
// Usage: npm run seed   (or: node seed.js)

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set. Copy .env.example → .env");
  process.exit(1);
}

// --- extract menuData from the frontend mock (regex-eval, no imports needed) ---
const mockPath = path.join(__dirname, "..", "frontend", "src", "api", "mockAPI.js");
const src = fs.readFileSync(mockPath, "utf8");
const match = src.match(/const menuData = (\[[\s\S]*?\]);/);
if (!match) {
  console.error("❌ Could not extract menuData from frontend mockAPI.js");
  process.exit(1);
}
const menuData = eval(`(${match[1]})`);
if (!Array.isArray(menuData) || menuData.length === 0) {
  console.error("❌ menuData is empty");
  process.exit(1);
}

const Product = require("./src/models/Product");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected. Seeding ${menuData.length} products…`);

    await Product.deleteMany({});
    const docs = menuData.map((p, i) => ({
      name: p.name,
      price: p.price ?? null,
      category: p.category,
      image: p.image,
      description: p.description || "",
      sortOrder: i,
    }));
    await Product.insertMany(docs);

    const count = await Product.countDocuments();
    console.log(`✅ Seeded ${count} products.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
})();

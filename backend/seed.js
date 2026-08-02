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
const Coupon = require("./src/models/Coupon");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Connected. Seeding ${menuData.length} products…`);

    await Product.deleteMany({});
    const docs = menuData.map((p, i) => ({
      name: p.name,
      price: p.price ?? null,
      oldPrice: p.oldPrice ?? null,
      category: p.category,
      image: p.image,
      description: p.description || "",
      badges: p.badges || [],
      popularity: p.popularity || 0,
      rating: p.rating || 0,
      stock: p.stock != null ? p.stock : 100,
      sortOrder: i,
    }));
    await Product.insertMany(docs);

    const count = await Product.countDocuments();
    console.log(`✅ Seeded ${count} products.`);

    // --- demo coupons ---
    await Coupon.deleteMany({});
    await Coupon.insertMany([
      { code: "MEHRAS10", percent: 10, label: "تخفیف ۱۰٪ کافه مهراس" },
      { code: "WELCOME20", percent: 20, label: "تخفیف ۲۰٪ مهمان ویژه" },
    ]);
    console.log("✅ Seeded 2 coupons: MEHRAS10 (10%), WELCOME20 (20%)");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
})();

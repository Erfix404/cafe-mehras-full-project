// backend/src/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // مدل محصول که ساختیم رو وارد می‌کنیم

// تعریف یک مسیر برای گرفتن تمام محصولات
// آدرس نهایی: GET /api/products
router.get("/", async (req, res) => {
  try {
    // دستور find تمام محصولات رو از دیتابیس پیدا می‌کنه
    const products = await Product.find({});
    res.json(products); // و به صورت JSON برمی‌گردونه
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// روتر رو اکسپورت می‌کنیم تا در server.js قابل استفاده باشه
module.exports = router;

// backend/src/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// --- Validate a product body; returns error message or null ---
function validateProduct(body) {
  const { name, category, image } = body || {};
  if (!name || !String(name).trim()) return "نام محصول الزامی است";
  if (!category || !String(category).trim()) return "دسته‌بندی الزامی است";
  if (!image || !String(image).trim()) return "آدرس تصویر الزامی است";
  const { price } = body;
  if (price != null && (typeof price !== "number" || isNaN(price) || price < 0)) {
    return "قیمت باید عددی بزرگ‌تر یا مساوی صفر باشد (یا خالی برای «ویژه»)";
  }
  return null;
}

// --- GET: گرفتن تمام محصولات (stable menu order) ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ sortOrder: 1, name: 1 });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- POST: افزودن یک محصول جدید (admin only) ---
router.post("/", auth, async (req, res) => {
  try {
    const err = validateProduct(req.body);
    if (err) return res.status(400).json({ msg: err });
    const { name, price, category, image, description } = req.body;
    const newProduct = new Product({
      name: String(name).trim(),
      price: price != null ? price : null,
      category: String(category).trim(),
      image: String(image).trim(),
      description: description != null ? String(description).trim() : "",
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- PUT: ویرایش یک محصول موجود (admin only) ---
// آدرس نهایی: PUT /api/products/:id  (مثلا: /api/products/688e31fd61b2ffcc27c81719)
router.put("/:id", auth, async (req, res) => {
  try {
    const err = validateProduct(req.body);
    if (err) return res.status(400).json({ msg: err });
    const { name, price, category, image, description } = req.body;
    const updatedProduct = {
      name: String(name).trim(),
      price: price != null ? price : null,
      category: String(category).trim(),
      image: String(image).trim(),
      description: description != null ? String(description).trim() : "",
    };

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "محصولی با این شناسه یافت نشد" });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedProduct },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- DELETE: حذف یک محصول (admin only) ---
// آدرس نهایی: DELETE /api/products/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "محصولی با این شناسه یافت نشد" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: "محصول با موفقیت حذف شد" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

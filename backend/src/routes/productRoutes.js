// backend/src/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// --- GET: گرفتن تمام محصولات ---
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- POST: افزودن یک محصول جدید ---
router.post("/", async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;
    const newProduct = new Product({
      name,
      price,
      category,
      image,
      description,
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// --- PUT: ویرایش یک محصول موجود ---
// آدرس نهایی: PUT /api/products/:id  (مثلا: /api/products/688e31fd61b2ffcc27c81719)
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;
    const updatedProduct = { name, price, category, image, description };

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

// --- DELETE: حذف یک محصول ---
// آدرس نهایی: DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
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

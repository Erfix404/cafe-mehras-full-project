// backend/src/routes/productRoutes.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// --- Sort mapping (whitelist for public menu sorting) ---
const SORTS = {
  popular: { popularity: -1 },
  newest: { createdAt: -1 },
  "price-asc": { price: 1, sortOrder: 1 },
  "price-desc": { price: -1, sortOrder: 1 },
  recommended: { sortOrder: 1, name: 1 },
};

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
  if (body.oldPrice != null &&
    (typeof body.oldPrice !== "number" || isNaN(body.oldPrice) || body.oldPrice < 0)) {
    return "قیمت قبلی باید عددی نامنفی باشد";
  }
  if (body.stock != null && (typeof body.stock !== "number" || body.stock < 0)) {
    return "موجودی باید عددی نامنفی باشد";
  }
  const VALID_BADGES = ["ویژه", "جدید", "پرفروش"];
  if (body.badges && !Array.isArray(body.badges)) return "برچسب‌ها باید آرایه باشند";
  if (body.badges?.some((b) => !VALID_BADGES.includes(b))) return "برچسب نامعتبر است";
  return null;
}

// --- GET: گرفتن تمام محصولات با فیلتر / سورت / جستجو ---
// Query: ?category= & q= & badge= & sort= & min= & max=
router.get("/", async (req, res) => {
  try {
    const { category, q, badge, sort, min, max } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (badge) filter.badges = badge;
    if (q) filter.name = { $regex: q, $options: "i" };
    if (min != null) filter.price = { ...(filter.price || {}), $gte: Number(min) };
    if (max != null) filter.price = { ...(filter.price || {}), $lte: Number(max) };

    // whitespace-strip filter state
    if (Object.keys(filter.price || {}).length === 0) delete filter.price;

    const sortBy = SORTS[sort] || SORTS.recommended;
    const products = await Product.find(filter).sort(sortBy);
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
    const { name, price, oldPrice, category, image, description, badges, popularity, rating, stock } = req.body;
    const newProduct = new Product({
      name: String(name).trim(),
      price: price != null ? price : null,
      oldPrice: oldPrice != null ? oldPrice : null,
      category: String(category).trim(),
      image: String(image).trim(),
      description: description != null ? String(description).trim() : "",
      badges: Array.isArray(badges) ? badges : [],
      popularity: popularity ?? 0,
      rating: rating ?? 0,
      stock: stock != null ? stock : 100,
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
    const { name, price, oldPrice, category, image, description, badges, popularity, rating, stock } = req.body;
    const updatedProduct = {
      name: String(name).trim(),
      price: price != null ? price : null,
      oldPrice: oldPrice != null ? oldPrice : null,
      category: String(category).trim(),
      image: String(image).trim(),
      description: description != null ? String(description).trim() : "",
      badges: Array.isArray(badges) ? badges : [],
      popularity: popularity ?? 0,
      rating: rating ?? 0,
      stock: stock != null ? stock : 100,
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

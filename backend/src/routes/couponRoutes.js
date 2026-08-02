// backend/src/routes/couponRoutes.js — validate + manage coupons
const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const { auth } = require("../middleware/auth");

// GET /api/coupons/:code — validate a coupon (public, used at checkout)
router.get("/:code", async (req, res) => {
  try {
    const code = String(req.params.code || "").trim().toUpperCase();
    const coupon = await Coupon.findOne({ code, active: true });
    if (!coupon) return res.status(404).json({ msg: "کد تخفیف معتبر نیست" });
    res.json({ code: coupon.code, percent: coupon.percent, label: coupon.label });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST /api/coupons — create coupon (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { code, percent, label, active } = req.body || {};
    if (!code || !String(code).trim())
      return res.status(400).json({ msg: "کد الزامی است" });
    if (percent == null || percent < 0 || percent > 100)
      return res.status(400).json({ msg: "درصد باید بین 0 تا 100 باشد" });
    const coupon = await Coupon.create({
      code: String(code).trim().toUpperCase(),
      percent,
      label: label != null ? String(label) : "",
      active: active != null ? Boolean(active) : true,
    });
    res.status(201).json(coupon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET /api/coupons — list all (admin only)
router.get("/", auth, async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE /api/coupons/:id — remove coupon (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ msg: "کوپن یافت نشد" });
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ msg: "کوپن حذف شد" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
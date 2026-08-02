// backend/src/models/Coupon.js
const mongoose = require("mongoose");

// کد تخفیف (کوپن) — صاحب کافه از پنل ادمین تعریف می‌کند
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    // درصد تخفیف ۰ تا ۱۰۰
    percent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    // توضیح نمایشی (مثلاً «کد کافه»)
    label: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
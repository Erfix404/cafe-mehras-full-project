// backend/src/models/Product.js

const mongoose = require("mongoose");

// اینجا ساختار یا "الگوی" محصول را تعریف می‌کنیم
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // یعنی این فیلد حتما باید مقدار داشته باشد
    },
    price: {
      type: Number,
      // null = specialty item (frontend shows a Sparkles badge, hides price)
      default: null,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String, // آدرس عکس را به صورت یک رشته ذخیره می‌کنیم
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sortOrder: {
      type: Number,
      default: 0, // stable menu order (seed sets 0..57)
    },
  },
  {
    // timestamps به صورت خودکار دو فیلد createdAt و updatedAt را اضافه می‌کند
    // که زمان ساخت و آخرین آپدیت محصول را نشان می‌دهد.
    timestamps: true,
  }
);

// از روی الگوی بالا، یک مدل می‌سازیم که از طریق آن با دیتابیس کار کنیم
const Product = mongoose.model("Product", productSchema);

// مدل را اکسپورت می‌کنیم تا در بقیه پروژه قابل استفاده باشد
module.exports = Product;

// 1. فراخوانی پکیج‌های نصب شده
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// 2. اجرای تنظیمات اولیه
dotenv.config(); // این دستور باعث میشه متغیرهای فایل .env قابل استفاده بشن

const app = express(); // یک نمونه از اپلیکیشن اکسپرس میسازیم
const PORT = process.env.PORT || 5001; // پورت سرور رو از فایل .env میخونیم

// 3. استفاده از Middleware ها
app.use(cors()); // به سرور اجازه میده از دامنه‌های دیگه درخواست دریافت کنه
app.use(express.json()); // به سرور اجازه میده درخواست‌های با فرمت JSON رو بفهمه

// 4. یک روت (مسیر) تست برای اطمینان از کارکرد سرور
app.get("/", (req, res) => {
  res.send("Welcome to Cafe Mehras Backend! ☕");
});

// 5. راه‌اندازی سرور
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

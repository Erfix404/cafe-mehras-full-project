/** @type {import('tailwindcss').Config} */
module.exports = {
  // فعال‌سازی تم تاریک بر اساس وجود کلاس 'dark' در تگ <html>
  darkMode: "class",
  // به Tailwind بگویید که برای پیدا کردن کلاس‌ها، این فایل‌ها را اسکن کند
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // فعال‌سازی تم تاریک بر اساس وجود کلاس 'dark' در تگ <html>
  darkMode: "class",
  // به Tailwind بگویید که برای پیدا کردن کلاس‌ها، این فایل‌ها را اسکن کند
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C1917",
        bone: {
          DEFAULT: "#FAF7F2",
          strong: "#EFE7DD",
          line: "#E2D5C5",
        },
        saffron: {
          DEFAULT: "#C97B2D",
          deep: "#A85F1E",
          soft: "#F3E3D0",
          glow: "#E8A44D",
        },
        espresso: {
          DEFAULT: "#3B2F2A",
          deep: "#2A211D",
        },
        night: {
          DEFAULT: "#12100E",
          soft: "#1D1A17",
          line: "#2E2924",
        },
        crema: "#F5EFE7",
        muted: "#A89F94",
      },
      fontFamily: {
        display: ["Lalezar", "Vazirmatn", "sans-serif"],
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
      borderRadius: {
        arch: "10rem 10rem 2rem 2rem",
      },
      boxShadow: {
        warm: "0 4px 24px -4px rgba(28, 25, 23, 0.08), 0 2px 8px -2px rgba(28, 25, 23, 0.06)",
        "warm-lg": "0 12px 48px -8px rgba(28, 25, 23, 0.14), 0 4px 16px -4px rgba(28, 25, 23, 0.08)",
        saffron: "0 8px 24px -6px rgba(201, 123, 45, 0.35)",
      },
    },
  },
  plugins: [],
};

# کافه مهراس ☕ — قهوه‌ای که با قاب ایرانی سرو می‌شود

وب‌سایت کامل کافه تخصصی با **طراحی ایرانی-لوکس**: فرانت‌اند React + بک‌اند Express + MongoDB + پنل مدیریت.

> **Live:** https://erfix404.github.io/cafe-mehras-full-project/

![نما](frontend/public/images/hero-coffee.jpg)

## ✨ ویژگی‌ها

### فرانت‌اند (React + Tailwind + framer-motion)
- **Design System اختصاصی** — پالت گرم-تیره `bone/night/saffron`، تایپوگرافی Lalezar + Vazirmatn (self-hosted)
- **قوس ایرانی** — موتیف طاق در تصاویر هیرو و کارت‌ها (CSS ogival arch)
- **Preloader برند** — فنجان SVG با بخار متحرک + درصد لودینگ
- **Bento story** — سکشن داستان با گرید نامتقارن
- **منوی تعاملی** — ۵۸ محصول / ۷ دسته، جستجو، فیلتر، shared-layout modal، افزودنی‌ها (سیروپ)
- **سبد خرید کامل** — fly-to-cart انیمیشن، استپر تعداد، توست، localStorage
- **Dark/Light mode** — هر دو تنظیم‌شده با پالت گرم
- **موبایل‌فرست** — RTL کامل، responsive در همه breakpoints
- **Accessibility** — focus trap، aria-labels، reduced-motion، WCAG AA

### بک‌اند (Express + Mongoose)
- CRUD کامل `/api/products`
- Seed ۵۸ محصول (`npm run seed`)
- fallback هوشمند فرانت‌اند به mock (آفلاین کار می‌کند)

### دیپلوی خودکار
- GitHub Actions → GitHub Pages روی هر push

## 🚀 اجرا

```bash
# 1. MongoDB (لوکال)
mongod --dbpath ./data --port 27017

# 2. بک‌اند
cd backend
cp .env.example .env   # MONGODB_URI=mongodb://127.0.0.1:27017/cafe_mehras
npm install
npm run seed           # پر کردن ۵۸ محصول
npm start              # http://localhost:5001

# 3. فرانت‌اند
cd frontend
npm install
npm start              # http://localhost:3000
```

بدون MongoDB؟ فرانت‌اند خودکار به دیتای mock برمی‌گردد.

## 🗂️ ساختار

```
├── frontend/        # React 18 + Tailwind + framer-motion
│   └── src/
│       ├── components/   # layout, sections, menu, cart, ui
│       ├── context/      # Cart, Toast
│       └── api/          # mockAPI (fetch + fallback)
├── backend/         # Express 5 + Mongoose
│   ├── src/models/  # Product
│   ├── src/routes/  # productRoutes
│   └── seed.js      # seed script
└── admin-panel/     # React (مدیریت)
```

## 🎨 Design System

| توکن | مقدار |
|---|---|
| `bone` | پس‌زمینه روشن گرم `#FAF7F2` |
| `night` | پس‌زمینه تیره `#12100E` |
| `saffron` | اکسنت زعفرانی `#C97B2D` |
| `espresso` | متن/سطوح `#2B211B` |
| دیسپلی | Lalezar |
| متن | Vazirmatn (۵ وزن) |
| قوس | `50% 50% 2rem 2rem / 22% 22% 2rem 2rem` |

## 🧱 Stack

- **Frontend:** React 18, CRA, Tailwind 3, framer-motion 11, lucide-react
- **Backend:** Express 5, Mongoose 8, cors, dotenv
- **CI/CD:** GitHub Actions (Pages)

## 📄 لایسنس

MIT

# ☕ کافه مهراس — قهوه‌ای که با قاب ایرانی سرو می‌شود

[![Live Demo](https://img.shields.io/badge/demo-live-2ea44f?logo=githubpages&logoColor=white)](https://erfix404.github.io/cafe-mehras-full-project/)
[![Admin Panel](https://img.shields.io/badge/admin-panel-2ea44f?logo=githubpages&logoColor=white)](https://erfix404.github.io/cafe-mehras-full-project/admin/)
[![CI](https://github.com/Erfix404/cafe-mehras-full-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Erfix404/cafe-mehras-full-project/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)

وب‌سایت کامل کافه تخصصی با **طراحی ایرانی-لوکس**: فرانت‌اند React + بک‌اند Express + MongoDB + پنل مدیریت — یک مونوریپو با تست، CI و دیپلوی خودکار.

## 🖼️ نما

![هیرو](frontend/public/images/hero-coffee.jpg)
![منو](frontend/public/images/pour-over.jpg)
![دسر](frontend/public/images/dessert.jpg)

## ✨ ویژگی‌ها

### 🎨 فرانت‌اند (React 18 + Tailwind 3 + framer-motion)
- **Design System اختصاصی** — پالت گرم-تیره `bone/night/saffron`، تایپوگرافی Lalezar + Vazirmatn (self-hosted)
- **قوس ایرانی** — موتیف طاق در تصاویر هیرو و کارت‌ها (CSS ogival arch)
- **Preloader برند** — فنجان SVG با بخار متحرک + درصد لودینگ (فقط بار اول، reduced-motion-aware)
- **منوی تعاملی** — ۵۸ محصول / ۷ دسته، جستجو، فیلتر، shared-layout modal، افزودنی‌ها (سیروپ با قیمت‌گذاری پویا)
- **سبد خرید کامل** — fly-to-cart انیمیشن، استپر تعداد، توست، localStorage، سفارش از طریق تلگرام
- **Dark/Light mode** — هر دو تنظیم‌شده با پالت گرم
- **موبایل‌فرست** — RTL کامل، responsive در همه breakpoints
- **Accessibility** — focus trap، aria-labels، reduced-motion، WCAG AA

### ⚙️ بک‌اند (Express 5 + Mongoose 8)
- CRUD کامل `/api/products` با **validation** (نام/دسته/تصویر الزامی، قیمت عددی)
- **Auth ادمین** — HMAC token، fail-closed (بدون env سرور استارت نمی‌شود)
- آمار داشبورد `/api/auth/stats`
- Seed ۵۸ محصول (`npm run seed`) با `sortOrder` پایدار
- fallback هوشمند فرانت‌اند به mock (آفلاین کار می‌کند)

### 🛠️ پنل مدیریت (React 19 + RTL)
- لاگین + داشبورد آمار + نمودار توزیع دسته‌بندی
- CRUD محصولات: جستجو، فیلتر، صفحه‌بندی، انتخاب تصویر/URL دلخواه
- **حالت دمو** — بدون بک‌اند هم کار می‌کند (داده نمونه + بنر هشدار)

### 🚀 دیپلوی خودکار
- GitHub Actions → GitHub Pages: سایت در ریشه، ادمین در `/admin/`

## 🚀 اجرا

پیش‌نیاز: Node 20+، MongoDB

```bash
# 1. نصب همه وابستگی‌ها
npm install --prefix backend
npm install --prefix frontend
npm install --prefix admin-panel

# 2. پیکربندی بک‌اند
cd backend && cp .env.example .env   # ADMIN_PASSWORD و ADMIN_SECRET را پر کن
npm run seed                          # ۵۸ محصول

# 3. اجرای همه‌چیز با یک فرمان
cd .. && npm install                 # نصب concurrently
npm run dev                          # api:5001 + web:3000 + admin:3001
```

| سرویس | آدرس |
|---|---|
| فرانت‌اند | http://localhost:3000 |
| بک‌اند | http://localhost:5001 |
| ادمین پنل | http://localhost:3001 |

بدون MongoDB؟ فرانت‌اند خودکار به دیتای mock برمی‌گردد.

## 🔌 API

| Method | Endpoint | توضیح | Auth |
|---|---|---|---|
| `GET` | `/` | سلامت سرویس | — |
| `GET` | `/api/products` | لیست همه محصولات (مرتب) | — |
| `POST` | `/api/products` | ایجاد محصول جدید | ✅ |
| `PUT` | `/api/products/:id` | ویرایش محصول | ✅ |
| `DELETE` | `/api/products/:id` | حذف محصول | ✅ |
| `POST` | `/api/auth/login` | ورود ادمین → token | — |
| `GET` | `/api/auth/stats` | آمار داشبورد | ✅ |

Auth: هدر `x-admin-token` با token دریافتی از login.

```bash
# مثال
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password":"your-password"}'
# → {"token":"...","user":"admin"}
```

## 🧪 تست

```bash
npm run test   # بک‌اند (node:test + supertest، ۱۳ تست) + فرانت‌اند (Jest، ۱۰ تست)
```

- **بک‌اند**: `backend/tests/routes.test.js` — auth، validation، 401/400/404/500
- **فرانت‌اند**: `frontend/src/context/CartContext.test.js` — ریدوسر سبد (merge، variant، remove)

## 🗂️ ساختار

```
├── frontend/        # React 18 + Tailwind + framer-motion
│   └── src/
│       ├── components/   # layout, sections, menu, cart, ui
│       ├── context/      # Cart, Toast, Theme
│       └── api/          # mockAPI (fetch + fallback)
├── backend/         # Express 5 + Mongoose
│   ├── app.js       # اپ قابل‌تست (بدون listen)
│   ├── server.js    # بوت‌استرپ + env check
│   ├── src/models/  # Product
│   ├── src/routes/  # productRoutes, authRoutes
│   └── tests/       # node:test + supertest
└── admin-panel/     # React 19 — پنل مدیریت RTL
    └── src/pages/   # Login, Dashboard, ProductsPage
```

## 🎨 Design System

| توکن | مقدار |
|---|---|
| `bone` | پس‌زمینه روشن گرم `#FAF7F2` |
| `night` | پس‌زمینه تیره `#12100E` |
| `saffron` | اکسنت زعفرانی `#C97B2D` |
| `espresso` | متن/سطوح `#2B211B` |
| دیسپلی | Lalezar |
| متن | Vazirmatn |
| قوس | `50% 50% 2rem 2rem / 22% 22% 2rem 2rem` |

## 🧱 Stack

- **Frontend:** React 18, CRA, Tailwind 3, framer-motion 11, lucide-react
- **Admin:** React 19, CRA, lucide-react
- **Backend:** Express 5, Mongoose 8, cors, dotenv
- **Testing:** node:test, supertest, Jest, React Testing Library
- **CI/CD:** GitHub Actions (test + build + Pages deploy)

## 📄 لایسنس

MIT — © 2026 [Erfan Ashouri (Erfix404)](https://github.com/Erfix404)

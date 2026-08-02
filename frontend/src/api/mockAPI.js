// src/api/mockAPI.js

const menuData = [
{
    id: 1,
    name: "اسپرسو (۷۰ ربوستا)",
    price: 65,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "یک شات اسپرسوی غلیظ و پرکافئین با کرمای غنی و طعمی قدرتمند، ایده‌آل برای شروع یک روز پرانرژی.",
  },
{
    id: 2,
    name: "اسپرسو ۵۰×۵۰",
    price: 75,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "ترکیبی متعادل از دانه‌های عربیکا و ربوستا که طعمی کلاسیک و عطری دلنشین را به ارمغان می‌آورد.",
  },
{
    id: 3,
    name: "اسپرسو ۷۰ عربیکا",
    price: 80,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "اسیدیته ملایم و طعم‌های میوه‌ای و گلی دانه‌های عربیکا در یک شات اسپرسوی لطیف و معطر.",
  },
{
    id: 4,
    name: "اسپرسو بلند عربیکا",
    price: 80,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description: "",
  },
{
    id: 5,
    name: "کلمبیا",
    price: 90,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "قهوه‌ای تک‌خاستگاه با طعم‌یادهای آجیلی و شکلاتی و تن‌واری (Body) متوسط، تجربه‌ای کلاسیک و دلپذیر.",
  },
{
    id: 6,
    name: "اتیوپی",
    price: 90,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description: "",
  },
{
    id: 7,
    name: "ریسترتو",
    price: 65,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "عصاره‌ای کوتاه‌تر و غلیظ‌تر از اسپرسو با شیرینی بیشتر و تلخی کمتر، نهایت طعم قهوه در یک جرعه.",
  },
{
    id: 8,
    name: "لانگو",
    price: 65,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description: "",
  },
{
    id: 9,
    name: "قهوه دمی چکه‌ای",
    price: 150,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "قهوه‌ای صاف و شفاف با طعم‌های پیچیده که به آرامی دم‌آوری شده تا بهترین ویژگی‌های دانه قهوه را آزاد کند.",
  },
{
    id: 10,
    name: "قهوه دمی غوطه‌وری",
    price: 150,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description: "",
  },
{
    id: 11,
    name: "اسپشیالتی",
    price: null,
    category: "اسپرسوبار",
    image: "/images/espresso.jpg",
    description:
      "قهوه‌های تک‌خاستگاه و کمیاب از سراسر جهان که به صورت روزانه تغییر می‌کنند. لطفاً برای اطلاع از دانه‌های امروز و قیمت از باریستا سوال بفرمایید.",
  },
{
    id: 12,
    name: "کاپوچینو",
    price: 100,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 13,
    name: "کاپوچینو کلاسیک",
    price: 90,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description:
      "ترکیب سنتی اسپرسو، شیر بخار داده شده و فوم شیر غلیظ، یک انتخاب کلاسیک و همیشگی.",
  },
{
    id: 14,
    name: "لته",
    price: 90,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description:
      "اسپرسوی غنی به همراه مقدار زیادی شیر بخار داده شده و لایه‌ای نازک از فوم، نوشیدنی‌ای لطیف و خامه‌ای.",
  },
{
    id: 15,
    name: "لته لوکس",
    price: 120,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 16,
    name: "هات چاکلت",
    price: 110,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description:
      "شکلات تلخ بلژیکی ذوب شده در شیر داغ، نوشیدنی‌ای غلیظ، غنی و آرامش‌بخش برای تمام فصول.",
  },
{
    id: 17,
    name: "وایت چاکلت",
    price: 90,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 18,
    name: "پرو چاکلت لایس",
    price: 170,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 19,
    name: "موکاچینو",
    price: 105,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 20,
    name: "موکا",
    price: 110,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description:
      "ترکیبی بهشتی از اسپرسو، شکلات داغ و شیر بخار داده شده، بهترین انتخاب برای دوست‌داران قهوه و شکلات.",
  },
{
    id: 21,
    name: "کارامل ماکیاتو",
    price: 100,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 22,
    name: "کورتادو",
    price: 70,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 23,
    name: "گلدن اسپرسو",
    price: 125,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 24,
    name: "نسکافه",
    price: 85,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 25,
    name: "ماسالا",
    price: 75,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description:
      "چای شیرین و تند هندی با ترکیبی از ادویه‌های گرم مانند زنجبیل، هل و دارچین، نوشیدنی‌ای معطر و انرژی‌بخش.",
  },
{
    id: 26,
    name: "کرک",
    price: 90,
    category: "هات درینک",
    description:
      "ترکیبی خاص و معطر از چای، هل، زعفران و شکلات که طعمی فراموش‌نشدنی را خلق می‌کند.",
    image: "/images/latte-art.jpg",
  },
{
    id: 27,
    name: "شیرداغ",
    price: 30,
    category: "هات درینک",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 28,
    name: "آیس امریکانو",
    price: 95,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 29,
    name: "آیس چاکلت",
    price: 130,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 30,
    name: "آیس موکا",
    price: 150,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 31,
    name: "آیس موکاچینو",
    price: 170,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 32,
    name: "آیس کارامل ماکیاتو",
    price: 160,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 33,
    name: "آیس لته",
    price: 110,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 34,
    name: "آیس لته سیروپ",
    price: 150,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 35,
    name: "آیس کرک",
    price: 100,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 36,
    name: "آیس نسکافه",
    price: 110,
    category: "آیس",
    image: "/images/iced-coffee.jpg",
    description: "",
  },
{
    id: 37,
    name: "کارامل دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 38,
    name: "کوکونات دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 39,
    name: "وانیلا دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 40,
    name: "سینامون دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 41,
    name: "چاکلت دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 42,
    name: "هزل دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 43,
    name: "آیریش دریم",
    price: 75,
    category: "ویواید دریم",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 44,
    name: "چای ایرانی",
    price: 45,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 45,
    name: "چای ترش",
    price: 60,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 46,
    name: "چای سبز",
    price: 50,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 47,
    name: "معجون چایی",
    price: 70,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 48,
    name: "دمنوش بهشت",
    price: 65,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 49,
    name: "دمنوش انرژی",
    price: 60,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 50,
    name: "دمنوش آروما",
    price: 65,
    category: "دمی بار",
    image: "/images/pour-over.jpg",
    description: "",
  },
{
    id: 51,
    name: "کارامل",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 52,
    name: "نارگیل",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 53,
    name: "وانیل",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 54,
    name: "دارچین",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 55,
    name: "شکلات",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 56,
    name: "فندق",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 57,
    name: "آیریش",
    price: 40,
    category: "سیروپ",
    image: "/images/latte-art.jpg",
    description: "",
  },
{
    id: 58,
    name: "کیک روز",
    price: 110,
    category: "کیک و دسر",
    image: "/images/dessert.jpg",
    description:
      "کیک تازه و خانگی امروز را از ما بپرسید! هر روز یک طعم جدید و هیجان‌انگیز، تهیه شده با بهترین مواد اولیه.",
  }
];

const contactInfo = {
  location: "شاهرود، خیابان ۲۲ بهمن، بالاتر از بیمارستان بهار",
  googleMapUrl: "https://maps.app.goo.gl/55XapETdnWmKDfuy7",
  instagramUser: "cafe_mehras",
  phone: "09127734353",
  telegramUser: "Mahdi_d01",
};

export const api = {
  fetchMenuData: async () => {
    // Try the real backend first (Express + MongoDB on :5001)
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000); // 4s timeout
      const res = await fetch(
        `${process.env.REACT_APP_API_URL || "http://127.0.0.1:5001"}/api/products`,
        { signal: controller.signal }
      );
      clearTimeout(timer);
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0)
        return data.map((p, i) => ({
          ...p,
          id: p.id ?? p._id ?? i + 1, // normalize _id from Mongo to id
        }));
      throw new Error("empty");
    } catch (err) {
      console.warn("⚠️ backend unavailable, using mock data:", err.message);
      return menuData;
    }
  },
  fetchContactInfo: () =>
    new Promise((resolve) => setTimeout(() => resolve(contactInfo), 100)),
};

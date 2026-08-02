// src/components/sections/MenuSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Coffee } from "lucide-react";
import { api } from "../../api/mockAPI";
import MenuCard from "../menu/MenuCard";
import MenuModal from "../menu/MenuModal";
import SkeletonCard from "../menu/SkeletonCard";

const MenuSection = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const getMenu = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await api.fetchMenuData();
        setMenu(data);
        setCategories(["همه", ...new Set(data.map((item) => item.category))]);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
        setError("متاسفانه در بارگذاری منو مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
      } finally {
        setIsLoading(false);
      }
    };
    getMenu();
  }, []);

  const syrups = menu.filter((item) => item.category === "سیروپ");
  const safeCategory = categories.includes(activeCategory)
    ? activeCategory
    : "همه";
  const filteredItems = menu
    .filter((item) => safeCategory === "همه" || item.category === safeCategory)
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="menu" className="relative py-24 sm:py-32 bg-bone dark:bg-night">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-display text-center mb-4 text-ink dark:text-bone"
        >
          منوی کافه
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-espresso/60 dark:text-muted max-w-xl mx-auto mb-12"
        >
          هر آیتم با دانه‌های تازه و عشق تهیه می‌شود
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <div className="relative flex-grow md:flex-grow-0 md:min-w-[320px]">
            <Search className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-espresso/40 dark:text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو در منو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3.5 bg-bone-strong/60 dark:bg-night-soft rounded-full shadow-warm border border-bone-line/50 dark:border-night-line focus:ring-2 focus:ring-saffron focus:outline-none transition-all text-ink dark:text-bone placeholder:text-espresso/40 dark:placeholder:text-muted/60"
            />
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse bg-bone-strong/60 dark:bg-night-soft rounded-full p-1.5 shadow-warm border border-bone-line/50 dark:border-night-line overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 text-sm font-bold rounded-full whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-bone dark:text-night"
                    : "text-espresso/70 dark:text-muted hover:text-espresso dark:hover:text-bone"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="active-menu-pill"
                    className="absolute inset-0 bg-saffron dark:bg-saffron-glow rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Coffee className="w-12 h-12 text-saffron mb-4" />
            <p className="text-red-500 font-bold mb-2">خطا در بارگذاری منو</p>
            <p className="text-espresso/60 dark:text-muted mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-saffron text-bone font-bold hover:bg-saffron-deep transition-colors"
            >
              تلاش دوباره
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
          >
            <AnimatePresence>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} onSelect={setSelectedItem} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center py-16 text-center"
                >
                  <Search className="w-10 h-10 text-espresso/30 dark:text-muted/40 mb-4" />
                  <p className="text-lg font-bold text-ink dark:text-bone mb-2">
                    چیزی پیدا نشد
                  </p>
                  <p className="text-espresso/60 dark:text-muted">
                    عبارت دیگری را جستجو کنید یا دسته دیگری را انتخاب کنید
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {selectedItem && (
          <MenuModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            syrups={syrups}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuSection;

// src/components/sections/MenuSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
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
        setError(
          "متاسفانه در بارگذاری منو مشکلی پیش آمد. لطفاً دوباره تلاش کنید."
        );
      } finally {
        setIsLoading(false);
      }
    };
    getMenu();
  }, []);

  const filteredItems = menu
    .filter(
      (item) => activeCategory === "همه" || item.category === activeCategory
    )
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <section
      id="menu"
      className="relative py-24 sm:py-32 bg-[#FFFBF5] dark:bg-[#1A120B]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6 text-stone-800 dark:text-stone-100"
        >
          منوی کافه
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-stone-500 pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو در منو..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-12 pl-4 py-3 bg-white/50 dark:bg-black/25 backdrop-blur-md rounded-full shadow-lg shadow-black/5 border border-white/20 dark:border-white/10 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
            />
          </div>
          <div className="flex space-x-2 rtl:space-x-reverse bg-white/50 dark:bg-black/25 backdrop-blur-md rounded-full p-1.5 shadow-lg shadow-black/5 border border-white/20 dark:border-white/10 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 text-sm font-semibold rounded-full whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category
                    ? "text-stone-900 dark:text-white"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="active-menu-pill"
                    className="absolute inset-0 bg-white dark:bg-stone-700/80 rounded-full z-[-1]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 bg-red-500/10 rounded-xl">
            {error}
          </div>
        ) : (
          // === CHANGE: Grid is now 2 columns on mobile, scaling up for larger screens ===
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10"
          >
            <AnimatePresence>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16 text-stone-500"
                >
                  موردی با این مشخصات یافت نشد.
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
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default MenuSection;

// src/components/menu/MenuModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import useFocusTrap from "../../hooks/useFocusTrap";
import { api } from "../../api/mockAPI";

const MenuModal = ({ item, onClose }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef(null);
  const [syrups, setSyrups] = useState([]);
  const [selectedSyrup, setSelectedSyrup] = useState(null);
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);

  useBodyScrollLock(true);
  useFocusTrap(modalRef, true);

  useEffect(() => {
    api.fetchMenuData().then((data) => {
      const syrupItems = data.filter((d) => d.category === "سیروپ");
      setSyrups(syrupItems);
    });
  }, []);

  const handleSyrupSelect = (syrup) => {
    if (selectedSyrup && selectedSyrup.id === syrup.id) {
      setSelectedSyrup(null);
    } else {
      setSelectedSyrup(syrup);
    }
  };

  const finalItemPrice = item.price + (selectedSyrup ? selectedSyrup.price : 0);
  const totalPrice = finalItemPrice * quantity;

  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      id: selectedSyrup ? `${item.id}-${selectedSyrup.id}` : item.id,
      name: selectedSyrup
        ? `${item.name} (با سیروپ ${selectedSyrup.name})`
        : item.name,
      price: finalItemPrice,
    };
    addToCart(itemToAdd, quantity);
    addToast(
      `${quantity.toLocaleString("fa-IR")} عدد "${
        itemToAdd.name
      }" به سبد اضافه شد`
    );
    onClose();
  };

  const customizableCategories = ["اسپرسوبار", "هات درینک", "آیس"];
  const isCustomizable = customizableCategories.includes(item.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        layoutId={`card-container-${item.id}`}
        transition={{ type: "spring", stiffness: 600, damping: 45 }}
        className="relative w-full max-w-2xl bg-[#FFFBF5] dark:bg-[#1A120B] rounded-3xl backdrop-blur-2xl border border-white/10 dark:border-stone-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <motion.img
            layoutId={`card-image-${item.id}`}
            src={item.image}
            alt={item.name}
            className="w-full h-60 sm:h-72 object-cover"
            loading="lazy"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-800 dark:text-stone-300 bg-white/50 dark:bg-black/40 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full p-2 hover:scale-110 transition-all"
            aria-label="بستن"
          >
            <X />
          </button>
        </div>
        <div className="p-6 sm:p-8">
          {/* === CHANGE: Made font size responsive === */}
          <motion.h3
            layoutId={`card-title-${item.id}`}
            className="text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100"
          >
            {item.name}
          </motion.h3>
          <p className="mt-4 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {item.description || "توضیحات این محصول به زودی اضافه خواهد شد."}
          </p>

          {isCustomizable && (
            <div className="mt-6 border-t border-stone-200 dark:border-stone-800 pt-6">
              <button
                onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                className="w-full flex justify-between items-center"
              >
                <h4 className="text-base sm:text-lg font-semibold text-stone-700 dark:text-stone-200">
                  افزودنی‌ها
                </h4>
                <motion.div animate={{ rotate: isAddonsOpen ? 45 : 0 }}>
                  <Plus className="text-stone-500 dark:text-stone-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isAddonsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pt-4">
                      {syrups.map((syrup) => {
                        const isSelected =
                          selectedSyrup && selectedSyrup.id === syrup.id;
                        return (
                          <motion.button
                            key={syrup.id}
                            onClick={() => handleSyrupSelect(syrup)}
                            className={`relative px-4 py-2 text-xs sm:text-sm rounded-full border-2 transition-all duration-200
                                                            ${
                                                              isSelected
                                                                ? "border-amber-500 bg-amber-500/20 text-amber-700 dark:text-amber-300"
                                                                : "border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-amber-400"
                                                            }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            {syrup.name} (+{syrup.price.toLocaleString("fa-IR")}
                            )
                            {isSelected && (
                              <motion.div
                                layoutId="selected-syrup-check"
                                className="absolute -top-1 -right-1 bg-white dark:bg-stone-800 rounded-full"
                              >
                                <CheckCircle
                                  className="text-amber-500"
                                  size={18}
                                />
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
            <div className="flex items-center gap-4 bg-stone-200/50 dark:bg-stone-800/50 rounded-full p-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
                aria-label="کاهش تعداد"
              >
                <Minus />
              </button>
              <span className="text-xl font-bold w-8 text-center text-stone-800 dark:text-stone-100">
                {quantity.toLocaleString("fa-IR")}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
                aria-label="افزایش تعداد"
              >
                <Plus />
              </button>
            </div>
            {/* === CHANGE: Made font size responsive === */}
            <p className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-yellow-400">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {totalPrice.toLocaleString("fa-IR")}
              </motion.span>
              هزار تومان
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full mt-8 py-3 sm:py-4 bg-amber-500 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-amber-600 transition-colors"
          >
            افزودن به سفارش
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuModal;

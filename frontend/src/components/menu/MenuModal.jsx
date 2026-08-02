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
      className="fixed inset-0 bg-night/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        layoutId={`card-container-${item.id}`}
        transition={{ type: "spring", stiffness: 600, damping: 45 }}
        className="relative w-full max-w-2xl bg-bone dark:bg-night-soft rounded-3xl border border-saffron/20 dark:border-saffron-glow/15 shadow-warm-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Persian arch image */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "50% 50% 2rem 2rem / 20% 20% 2rem 2rem",
            borderBottom: "4px solid rgba(201, 123, 45, 0.3)",
          }}
        >
          <motion.img
            layoutId={`card-image-${item.id}`}
            src={item.image}
            alt={item.name}
            className="w-full h-60 sm:h-72 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-ink dark:text-bone bg-bone/70 dark:bg-night/60 backdrop-blur-sm hover:bg-saffron/20 rounded-full p-2 hover:scale-110 transition-all border border-saffron/20"
            aria-label="بستن"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <motion.h3
            layoutId={`card-title-${item.id}`}
            className="font-display text-2xl sm:text-3xl text-ink dark:text-bone"
          >
            {item.name}
          </motion.h3>
          <p className="mt-4 text-sm sm:text-base text-espresso/70 dark:text-muted leading-relaxed">
            {item.description || "توضیحات این محصول به زودی اضافه خواهد شد."}
          </p>

          {isCustomizable && (
            <div className="mt-6 border-t border-bone-line dark:border-night-line pt-6">
              <button
                onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                className="w-full flex justify-between items-center"
                aria-expanded={isAddonsOpen}
              >
                <h4 className="text-base sm:text-lg font-bold text-ink dark:text-bone">
                  افزودنی‌ها
                </h4>
                <motion.div animate={{ rotate: isAddonsOpen ? 45 : 0 }}>
                  <Plus className="text-saffron" />
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
                            className={`relative px-4 py-2 text-xs sm:text-sm rounded-full border-2 transition-all duration-200 font-medium
                              ${
                                isSelected
                                  ? "border-saffron bg-saffron/15 text-saffron-deep dark:text-saffron-glow"
                                  : "border-bone-line dark:border-night-line text-espresso/70 dark:text-muted hover:border-saffron/50"
                              }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            {syrup.name} (+{syrup.price.toLocaleString("fa-IR")})
                            {isSelected && (
                              <motion.div
                                layoutId="selected-syrup-check"
                                className="absolute -top-1 -right-1 bg-bone dark:bg-night-soft rounded-full"
                              >
                                <CheckCircle
                                  className="text-saffron"
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
            <div className="flex items-center gap-4 bg-bone-strong/70 dark:bg-night rounded-full p-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 rounded-full text-espresso/70 dark:text-muted hover:bg-saffron/15 hover:text-saffron-deep dark:hover:text-saffron-glow transition-colors"
                aria-label="کاهش تعداد"
              >
                <Minus size={18} />
              </button>
              <span className="text-xl font-bold w-8 text-center text-ink dark:text-bone">
                {quantity.toLocaleString("fa-IR")}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 rounded-full text-espresso/70 dark:text-muted hover:bg-saffron/15 hover:text-saffron-deep dark:hover:text-saffron-glow transition-colors"
                aria-label="افزایش تعداد"
              >
                <Plus size={18} />
              </button>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-saffron-deep dark:text-saffron-glow">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {totalPrice.toLocaleString("fa-IR")}
              </motion.span>
              هزار تومان
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full mt-8 py-3 sm:py-4 bg-saffron text-night dark:text-bone font-bold text-base sm:text-lg rounded-xl hover:bg-saffron-deep hover:text-bone transition-colors shadow-saffron"
          >
            افزودن به سفارش
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuModal;

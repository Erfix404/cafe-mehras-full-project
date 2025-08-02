// src/components/cart/CartModal.jsx
import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import useFocusTrap from "../../hooks/useFocusTrap";

const CartModal = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const modalRef = useRef(null);

  // Custom hooks for advanced functionality
  useBodyScrollLock(isCartOpen);
  useFocusTrap(modalRef, isCartOpen);

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsCartOpen(false)} // Close on overlay click
        >
          <motion.div
            ref={modalRef}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="relative w-full max-w-lg bg-[#FFFBF5] dark:bg-[#1A120B] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-stone-800">
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white">
                سبد خرید شما
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                aria-label="بستن"
              >
                <X />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-grow overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart
                    size={48}
                    className="mx-auto text-stone-400 dark:text-stone-600"
                  />
                  <p className="mt-4 text-stone-600 dark:text-stone-400">
                    سبد خرید شما خالی است.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.li
                        layout
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: 20,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-grow">
                          <h3 className="font-bold text-stone-800 dark:text-stone-100">
                            {item.name}
                          </h3>
                          <p className="text-sm text-amber-700 dark:text-yellow-400">
                            {item.price.toLocaleString("fa-IR")} هزار تومان
                          </p>
                        </div>
                        <div className="flex items-center gap-2 bg-stone-200/50 dark:bg-stone-800/50 rounded-full p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 rounded-full hover:bg-stone-300 dark:hover:bg-stone-700"
                            aria-label="افزایش تعداد"
                          >
                            <Plus size={16} />
                          </button>
                          <span
                            className="font-bold w-6 text-center"
                            aria-live="polite"
                          >
                            {item.quantity.toLocaleString("fa-IR")}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1.5 rounded-full hover:bg-stone-300 dark:hover:bg-stone-700"
                            aria-label="کاهش تعداد"
                          >
                            <Minus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-stone-500 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10"
                          aria-label={`حذف ${item.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Modal Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-white/50 dark:bg-black/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-stone-600 dark:text-stone-300">
                    مبلغ کل:
                  </span>
                  <span className="text-2xl font-bold text-stone-800 dark:text-white">
                    {totalPrice.toLocaleString("fa-IR")} هزار تومان
                  </span>
                </div>
                <button className="w-full py-4 bg-amber-500 text-white font-bold text-lg rounded-xl hover:bg-amber-600 transition-colors shadow-lg hover:shadow-amber-500/40">
                  پرداخت و ثبت نهایی
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-2 text-sm text-stone-500 hover:text-red-500 transition-colors"
                >
                  خالی کردن سبد
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;

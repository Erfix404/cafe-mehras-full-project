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
          className="fixed inset-0 bg-night/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsCartOpen(false)} // Close on overlay click
        >
          <motion.div
            ref={modalRef}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="relative w-full max-w-lg bg-bone dark:bg-night-soft rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-bone-line dark:border-night-line">
              <h2 className="font-display text-2xl text-ink dark:text-bone">
                سبد خرید شما
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-bone-strong dark:hover:bg-night transition-colors"
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
                    className="mx-auto text-espresso/40 dark:text-muted"
                  />
                  <p className="mt-4 text-espresso/60 dark:text-muted">
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
                          <h3 className="font-bold text-ink dark:text-bone">
                            {item.name}
                          </h3>
                          <p className="text-sm text-saffron-deep dark:text-saffron-glow">
                            {item.price.toLocaleString("fa-IR")} هزار تومان
                          </p>
                        </div>
                        <div className="flex items-center gap-2 bg-bone-strong/70 dark:bg-night rounded-full p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 rounded-full hover:bg-saffron/15"
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
                            className="p-1.5 rounded-full hover:bg-saffron/15"
                            aria-label="کاهش تعداد"
                          >
                            <Minus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-espresso/50 dark:text-muted hover:text-saffron-deep dark:hover:text-saffron-glow transition-colors rounded-full hover:bg-saffron/10"
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
              <div className="p-6 border-t border-bone-line dark:border-night-line bg-bone/60 dark:bg-night/40">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-espresso/70 dark:text-muted">
                    مبلغ کل:
                  </span>
                  <span className="font-display text-2xl text-ink dark:text-bone">
                    {totalPrice.toLocaleString("fa-IR")} هزار تومان
                  </span>
                </div>
                <button className="w-full py-4 bg-saffron text-night dark:text-bone font-bold text-lg rounded-xl hover:bg-saffron-deep hover:text-bone transition-colors shadow-lg hover:shadow-saffron">
                  پرداخت و ثبت نهایی
                </button>
                <button
                  onClick={clearCart}
                  className="w-full mt-2 text-sm text-espresso/50 dark:text-muted hover:text-saffron-deep transition-colors"
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

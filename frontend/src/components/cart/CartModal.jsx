// src/components/cart/CartModal.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart, Send } from "lucide-react";
import { useCart } from "../../context/CartContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import useFocusTrap from "../../hooks/useFocusTrap";
import contactInfo from "../../api/contact";

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
  const [confirming, setConfirming] = useState(false);

  // Custom hooks for advanced functionality
  useBodyScrollLock(isCartOpen);
  useFocusTrap(modalRef, isCartOpen);

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
        setConfirming(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsCartOpen]);

  const buildOrderText = () => {
    const lines = cartItems.map(
      (item, i) =>
        `${i + 1}. ${item.name} × ${item.quantity} — ${(
          item.price * item.quantity
        ).toLocaleString("fa-IR")} هزار تومان`
    );
    return [
      "☕ سفارش جدید از سایت کافه مهراس",
      ...lines,
      `— مجموع: ${totalPrice.toLocaleString("fa-IR")} هزار تومان`,
    ].join("\n");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setConfirming(true);
  };

  const confirmOrder = () => {
    const text = encodeURIComponent(buildOrderText());
    window.open(`https://t.me/${contactInfo.telegramUser}?text=${text}`, "_blank");
    clearCart();
    setIsCartOpen(false);
    setConfirming(false);
  };

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
            role="dialog"
            aria-modal="true"
            aria-label="سبد خرید"
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
              ) : confirming ? (
                <div className="text-center py-6">
                  <div className="w-16 h-20 mx-auto mb-4 rounded-[50%_50%_1rem_1rem/22%_22%_1rem_1rem] border-2 border-saffron/60 bg-saffron/10 flex items-center justify-center text-2xl">
                    ☕
                  </div>
                  <h3 className="font-display text-xl text-ink dark:text-bone mb-2">
                    ثبت سفارش
                  </h3>
                  <p className="text-sm text-espresso/70 dark:text-muted mb-4 leading-relaxed">
                    سفارش شما در تلگرام به کافه مهراس ارسال می‌شود و هماهنگی
                    نهایی در پیام‌رسان انجام می‌شود.
                  </p>
                  <div className="text-right bg-bone-strong/60 dark:bg-night rounded-xl p-4 mb-5 text-sm whitespace-pre-line leading-relaxed text-ink dark:text-bone max-h-48 overflow-y-auto">
                    {buildOrderText()}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={confirmOrder}
                      className="flex-1 py-3.5 bg-saffron text-night dark:text-bone font-bold rounded-xl hover:bg-saffron-deep hover:text-bone transition-colors shadow-saffron"
                    >
                      ارسال سفارش در تلگرام
                    </button>
                    <button
                      onClick={() => setConfirming(false)}
                      className="px-5 py-3.5 bg-bone-strong dark:bg-night text-espresso dark:text-bone font-bold rounded-xl hover:bg-bone-line/60 transition-colors"
                    >
                      بازگشت
                    </button>
                  </div>
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
                          loading="lazy"
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
            {cartItems.length > 0 && !confirming && (
              <div className="p-6 border-t border-bone-line dark:border-night-line bg-bone/60 dark:bg-night/40">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-espresso/70 dark:text-muted">
                    مبلغ کل:
                  </span>
                  <span className="font-display text-2xl text-ink dark:text-bone">
                    {totalPrice.toLocaleString("fa-IR")} هزار تومان
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-saffron text-night dark:text-bone font-bold text-lg rounded-xl hover:bg-saffron-deep hover:text-bone transition-colors shadow-lg hover:shadow-saffron flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  ثبت سفارش
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

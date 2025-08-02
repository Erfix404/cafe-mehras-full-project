// src/components/cart/CartIcon.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartIcon = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.button
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        aria-label={`سبد خرید با ${totalItems} آیتم`}
      >
        <ShoppingCart className="w-12 h-12 text-stone-800 dark:text-white drop-shadow-lg" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              key={totalItems}
              initial={{ scale: 0, y: 10 }}
              animate={{
                scale: 1,
                y: 0,
                transition: { type: "spring", stiffness: 500, damping: 25 },
              }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center pointer-events-none"
            >
              {totalItems.toLocaleString("fa-IR")}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default CartIcon;

// src/components/menu/MenuCard.jsx
import React, { useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Sparkles } from "lucide-react"; // Import Sparkles icon
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import AnimatedPrice from "../common/AnimatedPrice";

const MenuCard = memo(({ item, onSelect }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (added) return;

    if (imageRef.current) {
      addToCart(item, 1, imageRef.current);
      addToast(`"${item.name}" به سبد اضافه شد`);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
      className="group relative cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
    >
      <div className="relative h-full bg-white/60 dark:bg-black/30 rounded-3xl backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl shadow-black/10 overflow-hidden">
        {/* === NEW: Pulsating Specialty Icon with adaptive colors === */}
        {item.price === null && (
          <motion.div
            className="absolute top-4 right-4 z-20 p-2 bg-white/50 dark:bg-stone-900/50 backdrop-blur-sm rounded-full border border-white/20 dark:border-stone-700/50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="overflow-hidden rounded-t-3xl">
            <motion.img
              ref={imageRef}
              layoutId={`card-image-${item.id}`}
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
              loading="lazy"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
          </div>
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <motion.h3
              layoutId={`card-title-${item.id}`}
              className="text-lg sm:text-xl font-bold text-stone-800 dark:text-stone-100"
            >
              {item.name}
            </motion.h3>
            <div className="flex-grow" />

            {item.price !== null ? (
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg sm:text-xl font-semibold text-amber-700 dark:text-yellow-400">
                  <AnimatedPrice value={item.price} />
                  <span className="text-sm sm:text-base mr-1">هزار تومان</span>
                </p>
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-full p-3 shadow-lg transition-colors duration-300 ${
                    added
                      ? "bg-green-500 cursor-default"
                      : "bg-amber-500/80 dark:bg-yellow-500/80 hover:bg-amber-600 dark:hover:bg-yellow-400"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={added ? "check" : "plus"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {added ? (
                        <Check size={22} className="text-white" />
                      ) : (
                        <Plus
                          size={22}
                          className="text-white dark:text-black"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            ) : (
              // Render an empty space to maintain layout consistency
              <div className="h-[52px] mt-4"></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default MenuCard;

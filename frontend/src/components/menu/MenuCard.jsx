// src/components/menu/MenuCard.jsx
import React, { useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Sparkles } from "lucide-react";
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
      <div className="relative h-full bg-bone dark:bg-night-soft rounded-3xl border border-bone-line/40 dark:border-night-line shadow-warm hover:shadow-warm-lg transition-shadow overflow-hidden">
        {/* === Specialty badge === */}
        {item.price === null && (
          <motion.div
            className="absolute top-4 right-4 z-20 p-2.5 bg-bone/90 dark:bg-night-soft/90 backdrop-blur-sm rounded-full border border-bone-line/60 dark:border-night-line shadow-warm"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-5 h-5 text-saffron" />
          </motion.div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Persian arch media */}
          <div className="overflow-hidden rounded-t-3xl">
            <motion.img
              ref={imageRef}
              layoutId={`card-image-${item.id}`}
              src={item.image}
              alt={item.name}
              className="w-full h-52 object-cover"
              loading="lazy"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
          </div>
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            <motion.h3
              layoutId={`card-title-${item.id}`}
              className="text-lg sm:text-xl font-extrabold text-ink dark:text-bone"
            >
              {item.name}
            </motion.h3>
            <div className="flex-grow" />

            {item.price !== null ? (
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg sm:text-xl font-black text-saffron-deep dark:text-saffron-glow">
                  <AnimatedPrice value={item.price} />
                  <span className="text-sm font-medium mr-1 text-espresso/60 dark:text-muted">
                    هزار تومان
                  </span>
                </p>
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`افزودن ${item.name} به سبد`}
                  className={`rounded-full p-3 shadow-warm transition-colors duration-300 ${
                    added
                      ? "bg-green-600 cursor-default"
                      : "bg-saffron hover:bg-saffron-deep text-bone"
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
                        <Plus size={22} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            ) : (
              <div className="h-[52px] mt-4"></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default MenuCard;

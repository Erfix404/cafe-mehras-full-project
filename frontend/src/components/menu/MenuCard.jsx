// src/components/menu/MenuCard.jsx
import React, { useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Sparkles, Star, Flame, Tag, ArrowLeftRight } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import AnimatedPrice from "../common/AnimatedPrice";

// Discounted 20% off for "پرفروش" (bestseller) — realistic promo, cheap to add.
export const BESTSELLER_DISCOUNT = 0.2;
const discountOf = (item) =>
  item.label === "پرفروش" && item.price != null
    ? Math.round(item.price * BESTSELLER_DISCOUNT)
    : 0;

const BADGES = {
  ویژه: { cls: "bg-saffron text-bone", icon: <Sparkles size={12} /> },
  پرفروش: { cls: "bg-red-600 text-white", icon: <Flame size={12} /> },
  جدید: { cls: "bg-emerald-600 text-white", icon: <Tag size={12} /> },
};

const MenuCard = memo(({ item, onSelect, selected = false, onToggleCompare }) => {
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
      <div className="relative h-full bg-bone dark:bg-night-soft rounded-3xl border border-bone-line/40 dark:border-night-line shadow-warm hover:shadow-warm-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        {/* === Label badge (ویژه/پرفروش/جدید) + sold-out === */}
        {item.label && BADGES[item.label] && (
          <div
            className={`absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-extrabold shadow-warm ${BADGES[item.label].cls}`}
          >
            {BADGES[item.label].icon}
            {item.label}
          </div>
        )}
        {item.soldOut && (
          <div className="absolute top-4 left-4 z-20 px-2.5 py-1.5 rounded-full text-[11px] font-extrabold bg-night/80 text-bone shadow-warm">
            ناموجود
          </div>
        )}

        {/* compare toggle — bottom-right of the image area */}
        {onToggleCompare && !item.soldOut && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(item.id);
            }}
            aria-pressed={selected}
            aria-label={`${selected ? "حذف از" : "افزودن به"} مقایسه ${item.name}`}
            className={`absolute bottom-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-sm transition-colors ${
              selected
                ? "bg-saffron text-bone"
                : "bg-bone/90 dark:bg-night-soft/90 text-espresso/80 dark:text-muted hover:bg-bone dark:hover:bg-night-soft"
            }`}
          >
            <ArrowLeftRight size={12} />
            {selected ? "در مقایسه" : "مقایسه"}
          </button>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Persian arch media */}
          <div className="overflow-hidden rounded-t-3xl">
            <motion.img
              ref={imageRef}
              layoutId={`card-image-${item.id}`}
              src={item.image}
              alt={item.name}
              width={400}
              height={208}
              className="w-full h-52 object-cover"
              loading="lazy"
              decoding="async"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
            {/* Hover overlay — quick view hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-night/50 backdrop-blur-[2px] flex items-center justify-center"
            >
              <span className="px-4 py-2 rounded-full bg-bone/90 dark:bg-night-soft/90 text-ink dark:text-bone text-sm font-bold shadow-warm">
                مشاهده جزئیات
              </span>
            </motion.div>
          </div>
          <div className="p-4 sm:p-5 flex flex-col flex-grow">
            <div className="flex items-start justify-between gap-2">
              <motion.h3
                layoutId={`card-title-${item.id}`}
                className="text-lg sm:text-xl font-extrabold text-ink dark:text-bone"
              >
                {item.name}
              </motion.h3>
              {item.soldOut && (
                <span className="shrink-0 text-[11px] font-bold bg-night/70 dark:bg-bone/15 text-bone dark:text-bone px-2 py-1 rounded-full whitespace-nowrap">
                  ناموجود
                </span>
              )}
            </div>
            {item.rating > 0 && (
              <div className="flex items-center gap-1 mt-1" aria-label={`امتیاز ${item.rating}`}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={13}
                    className={
                      s <= Math.round(item.rating)
                        ? "fill-saffron text-saffron"
                        : "text-bone-line dark:text-night-line"
                    }
                  />
                ))}
                <span className="text-xs font-bold text-espresso/60 dark:text-muted mr-1">
                  {Number(item.rating).toFixed(1)}
                </span>
              </div>
            )}
            <div className="flex-grow" />

            {item.price !== null ? (
              <div className="flex justify-between items-center mt-4">
                <div>
                  {discountOf(item) > 0 && (
                    <p className="text-xs text-espresso/50 dark:text-muted line-through">
                      {item.price} هزار تومان
                    </p>
                  )}
                  <p className="text-lg sm:text-xl font-black text-saffron-deep dark:text-saffron-glow">
                    <AnimatedPrice value={item.price - discountOf(item)} />
                    <span className="text-sm font-medium mr-1 text-espresso/60 dark:text-muted">
                      هزار تومان
                    </span>
                  </p>
                </div>
                {!item.soldOut && (
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
                )}
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

// src/components/menu/CompareModal.jsx
// Side-by-side comparison of selected products (قیمت، برچسب، موجودی، امتیاز، توضیحات)
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Scale } from "lucide-react";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";
import useFocusTrap from "../../hooks/useFocusTrap";

// A null-price item ("ویژه") has no fixed price — render as dash.
const PRICE_LABELS = {
  نوع: (i) => (i.soldOut ? "ناموجود" : `${i.stock ?? "—"} موجود`),
  دستهبندی: (i) => i.category,
  برچسب: (i) => i.label ?? "—",
  قیمت: (i) =>
    i.price == null ? "ویژه (با باریستا)" : `${i.price} هزار تومان`,
  "تخفیف/پرفروش": (i) => (i.label === "پرفروش" ? "۲۰٪ تخفیف" : "—"),
  امتیاز: (i) => (i.rating ? `${i.rating} از ۵` : "—"),
  توضیحات: (i) => i.description || "—",
};

const CompareModal = ({ items, onClose }) => {
  const ref = useRef(null);
  useBodyScrollLock(true);
  useFocusTrap(ref, true);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl bg-bone dark:bg-night-soft border border-bone-line/50 dark:border-night-line shadow-warm-lg"
      >
        <div className="flex items-center justify-between p-5 border-b border-bone-line/50 dark:border-night-line sticky top-0 bg-bone dark:bg-night-soft z-10">
          <h2 className="flex items-center gap-2 text-xl font-display text-ink dark:text-bone">
            <Scale size={20} className="text-saffron" />
            مقایسه محصولات
          </h2>
          <button
            onClick={onClose}
            aria-label="بستن مقایسه"
            className="p-2 rounded-full hover:bg-bone-line/30 transition-colors text-espresso/70 dark:text-muted"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-x-auto">
          {items.length < 2 ? (
            <p className="text-center text-espresso/60 dark:text-muted py-10">
              برای مقایسه حداقل ۲ محصول انتخاب کنید.
            </p>
          ) : (
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr>
                  <th className="text-right p-3 text-espresso/50 dark:text-muted w-28 font-bold">
                    ویژگی
                  </th>
                  {items.map((it) => (
                    <th key={it.id} className="p-3 text-center font-extrabold text-ink dark:text-bone">
                      {it.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(PRICE_LABELS).map(([feature, fn]) => (
                  <tr key={feature} className="border-t border-bone-line/40 dark:border-night-line">
                    <td className="p-3 font-bold text-espresso/60 dark:text-muted">
                      {feature}
                    </td>
                    {items.map((it) => (
                      <td key={it.id} className="p-3 text-center text-espresso/85 dark:text-bone/90">
                        {fn(it)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-end gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-bone-line/40 dark:bg-night text-espresso/70 dark:text-muted font-bold hover:bg-bone-line/60 transition-colors"
          >
            بستن
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompareModal;
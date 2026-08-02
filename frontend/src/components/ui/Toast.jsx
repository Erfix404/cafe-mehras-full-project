// src/components/ui/Toast.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

const ToastContainer = ({ toasts, removeToast }) => (
  // This container will hold all the toast notifications
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] space-y-3 w-[calc(100%-2rem)] max-w-sm pointer-events-none">
    <AnimatePresence>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          layout
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="flex items-center gap-3 w-full p-4 text-ink dark:text-bone bg-bone/90 dark:bg-night-soft/90 backdrop-blur-xl rounded-2xl shadow-warm-lg border border-saffron/20 dark:border-saffron-glow/20 pointer-events-auto"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron/15 flex items-center justify-center">
            <Check size={18} className="text-saffron dark:text-saffron-glow" />
          </div>
          <div className="text-sm font-bold">{toast.content}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="mr-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-bone-strong dark:hover:bg-night"
            aria-label="بستن"
          >
            <X size={16} className="text-espresso/50 dark:text-muted" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ToastContainer;

// src/components/ui/Toast.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

const ToastContainer = ({ toasts, removeToast }) => (
  // This container will hold all the toast notifications
  <div className="fixed top-6 right-6 z-[200] space-y-3">
    <AnimatePresence>
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          layout
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.7 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="flex items-center gap-3 w-full max-w-xs p-4 text-stone-800 dark:text-stone-100 bg-white/70 dark:bg-black/70 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 dark:border-white/10"
        >
          <div className="flex-shrink-0 text-green-500">
            <Check size={20} />
          </div>
          <div className="text-sm font-semibold">{toast.content}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="mr-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ToastContainer;

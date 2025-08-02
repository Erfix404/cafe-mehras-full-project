// src/components/layout/Preloader.jsx
import React from "react";
import { motion } from "framer-motion";

const Preloader = ({ onComplete }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.5, ease: "circOut" } }}
    className="fixed inset-0 z-[100] bg-[#FFFBF5] dark:bg-[#1A120B] flex items-center justify-center"
  >
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "200px" }}
      transition={{ duration: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }}
      onAnimationComplete={onComplete} // Notify parent when animation finishes
      className="h-1 bg-amber-500 rounded-full"
    />
  </motion.div>
);

export default Preloader;

// src/components/sections/FloatingIcon.jsx
import React from "react";
import { motion } from "framer-motion";

const FloatingIcon = ({ Icon, pos, delay }) => (
  <motion.div
    className="absolute hidden md:block"
    style={pos}
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {/* This inner div creates the floating (up and down) animation */}
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className="p-3 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-full shadow-lg border border-white/10"
    >
      <Icon className="w-6 h-6 text-amber-600 dark:text-yellow-400" />
    </motion.div>
  </motion.div>
);

export default FloatingIcon;

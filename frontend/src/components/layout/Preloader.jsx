// src/components/layout/Preloader.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SteamPath = ({ delay, x, duration = 2.2 }) => (
  <motion.path
    d={`M ${x} 0 C ${x - 4} 4, ${x + 4} 8, ${x} 12 C ${x - 4} 16, ${x + 4} 20, ${x} 24`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    initial={{ opacity: 0, pathLength: 0 }}
    animate={{ opacity: [0, 0.7, 0], pathLength: [0, 1, 1] }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: 0.4,
      ease: "easeInOut",
    }}
  />
);

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.6, ease: "circOut" } }}
      className="fixed inset-0 z-[100] bg-bone dark:bg-night flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Cup + steam */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "circOut" }}
          className="relative text-saffron dark:text-saffron-glow"
        >
          {/* Steam */}
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-10 h-10 text-saffron dark:text-saffron-glow">
            <svg viewBox="0 0 40 30" fill="none">
              <SteamPath x={12} delay={0} />
              <SteamPath x={20} delay={0.6} />
              <SteamPath x={28} delay={1.1} />
            </svg>
          </div>
          {/* Cup */}
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <motion.path
              d="M6 14 H52 C52 34 44 50 29 50 C14 50 6 34 6 14 Z"
              fill="#1C1917"
              stroke="currentColor"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            <motion.path
              d="M52 18 H62 C66 18 68 22 68 26 C68 32 64 36 58 36 H54"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeInOut" }}
            />
            {/* Crema */}
            <motion.ellipse
              cx="29"
              cy="17"
              rx="20"
              ry="4"
              fill="#E8A44D"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            />
          </svg>
        </motion.div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="font-display text-3xl text-ink dark:text-bone">
            کافه <span className="text-saffron dark:text-saffron-glow">مهراس</span>
          </p>
          <p className="mt-1 text-xs text-espresso/50 dark:text-muted tracking-widest">
            قهوه تخصصی با قاب ایرانی
          </p>
        </motion.div>

        {/* Progress */}
        <div className="w-48 h-1 bg-bone-strong dark:bg-night-soft rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-saffron dark:bg-saffron-glow rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-bold text-espresso/60 dark:text-muted tabular-nums">
          {progress.toLocaleString("fa-IR")}٪
        </span>
      </div>
    </motion.div>
  );
};

export default Preloader;

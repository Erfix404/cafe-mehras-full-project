// src/components/sections/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Zap, Coffee } from "lucide-react";
import FloatingIcon from "./FloatingIcon";

// A new sub-component for the beautiful, continuously floating particles background,
// inspired by the user's provided example.
const FloatingAura = () => {
  const particleCount = 25; // Number of particles
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const size = Math.random() * 4 + 2; // Particle size between 2px and 6px
    const duration = Math.random() * 20 + 15; // Animation duration between 15s and 35s
    const delay = Math.random() * -20; // Negative delay for staggered start
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;

    // Custom properties for the CSS animation
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      left: `${startX}%`,
      top: `${startY}%`,
      animation: `float ${duration}s ${delay}s infinite ease-in-out`,
      "--end-x": `${Math.random() * 100}vw`,
      "--end-y": `${Math.random() * 100}vh`,
    };
    return (
      <div
        key={i}
        className="absolute rounded-full bg-amber-400/20 dark:bg-amber-300/15"
        style={style}
      ></div>
    );
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">{particles}</div>
  );
};

const HeroSection = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-[#FFFBF5] dark:bg-[#1A120B]">
      {/* Injecting the keyframes animation directly, similar to the example */}
      <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(var(--end-x), var(--end-y)); }
                    100% { transform: translate(0, 0); }
                }
            `}</style>

      <FloatingAura />

      {/* Seamless Fade-out Gradient at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-48 z-10 bg-gradient-to-t from-[#FFFBF5] to-transparent dark:from-[#1A120B]"></div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-20"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
        }}
      >
        <div className="relative">
          <FloatingIcon
            Icon={Coffee}
            pos={{ top: "50%", left: "-15%" }}
            delay={1.2}
          />
          <FloatingIcon
            Icon={Zap}
            pos={{ top: "50%", right: "-15%" }}
            delay={1.4}
          />

          <motion.h1
            variants={itemVariants}
            className="text-6xl sm:text-7xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-400 to-amber-600 dark:from-yellow-400 dark:via-amber-300 dark:to-yellow-400"
            style={{
              animation: "gradient-animation 5s ease infinite",
              backgroundSize: "200% 200%",
            }}
          >
            کافه مهراس
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-8 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-stone-700 dark:text-stone-200 font-medium"
          >
            <span className="relative inline-block px-4 py-2">
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-400 rounded-lg blur-xl opacity-40 dark:opacity-60"></span>
              <span className="relative">عشق و قهوه در هوای شهر</span>
            </span>
          </motion.p>
        </div>

        <motion.div variants={itemVariants}>
          <a
            href="#menu"
            className="group inline-flex items-center justify-center mt-10 px-6 py-3 sm:px-8 sm:py-4 font-bold text-amber-800 dark:text-yellow-300 bg-amber-400/30 dark:bg-yellow-400/10 border border-amber-500/50 dark:border-yellow-400/30 rounded-xl hover:bg-amber-400/50 dark:hover:bg-yellow-400/20 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] dark:shadow-[0_0_20px_rgba(250,204,21,0.1)] dark:hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]"
          >
            مشاهده منو{" "}
            <ArrowDown className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

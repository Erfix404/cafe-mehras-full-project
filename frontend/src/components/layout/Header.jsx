// src/components/layout/Header.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ShoppingBag } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock";

// --- Sub-component: Animated Text Logo ---
const AnimatedTextLogo = () => {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative cursor-pointer select-none"
    >
      <span className="font-display text-2xl sm:text-3xl text-ink dark:text-bone">
        کافه <span className="text-saffron dark:text-saffron-glow">مهراس</span>
      </span>
    </motion.a>
  );
};

// --- Main Header Component ---
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, setIsCartOpen } = useCart();

  useBodyScrollLock(isMobileMenuOpen);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "منو", href: "#menu" },
    { name: "تماس با ما", href: "#main-footer" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 25, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="relative flex items-center justify-between h-16 px-5 sm:px-6 rounded-2xl bg-bone/70 dark:bg-night-soft/70 backdrop-blur-xl shadow-warm border border-bone-line/40 dark:border-night-line">
            <AnimatedTextLogo />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="ناوبری اصلی">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 py-2 rounded-full text-sm font-bold text-espresso/70 dark:text-muted hover:text-ink dark:hover:text-bone transition-colors"
                >
                  {hoveredLink === link.name && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-bone-strong dark:bg-night rounded-full z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                aria-label="سبد خرید"
                className="relative p-2.5 rounded-full bg-bone-strong/60 dark:bg-night text-espresso dark:text-bone hover:bg-saffron hover:text-bone transition-colors"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-saffron text-white text-[11px] font-black flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Theme toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label="تغییر تم"
                className="p-2.5 rounded-full bg-bone-strong/60 dark:bg-night text-espresso dark:text-bone hover:bg-saffron hover:text-bone transition-colors"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="block"
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Mobile menu toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="باز کردن منو"
                className="md:hidden p-2.5 rounded-full bg-bone-strong/60 dark:bg-night text-espresso dark:text-bone"
              >
                <Menu size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-night/60 dark:bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="absolute top-0 bottom-0 right-0 w-72 bg-bone dark:bg-night-soft shadow-warm-lg p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-2xl text-ink dark:text-bone">
                  کافه مهراس
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="بستن منو"
                  className="p-2 rounded-full bg-bone-strong/60 dark:bg-night text-espresso dark:text-bone"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-2" aria-label="منوی موبایل">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl font-bold text-espresso dark:text-bone hover:bg-bone-strong dark:hover:bg-night transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react"; // Added Menu and X icons
import { useTheme } from "../../context/ThemeContext";
import useBodyScrollLock from "../../hooks/useBodyScrollLock"; // Import the scroll lock hook

// --- Sub-component: Animated Text Logo ---
const AnimatedTextLogo = () => {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative text-4xl cursor-pointer group"
      style={{ fontFamily: "'Great Vibes', cursive" }}
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
        Cafe Mehras
      </span>
      <span
        className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, white, transparent)",
          animation: "shimmer 4s infinite",
        }}
      >
        Cafe Mehras
      </span>
    </motion.a>
  );
};

// --- Main Header Component ---
const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // === NEW: State for mobile menu ===
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // === NEW: Lock body scroll when mobile menu is open ===
  useBodyScrollLock(isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

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
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
            isScrolled ? "py-2" : "py-4"
          }`}
        >
          <div
            className={`relative flex items-center justify-between h-20 px-6 rounded-2xl transition-all duration-300 ease-in-out ${
              isScrolled
                ? "bg-white/60 dark:bg-black/30 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/10"
                : ""
            }`}
          >
            {/* --- LEFT SIDE: LOGO --- */}
            <div className="flex-shrink-0">
              <AnimatedTextLogo />
            </div>

            {/* --- RIGHT SIDE: NAV & ACTIONS --- */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation Menu */}
              <nav
                className="hidden md:flex items-center p-1.5 bg-stone-200/50 dark:bg-stone-800/50 rounded-full"
                onMouseLeave={() => setHoveredLink(null)}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.name)}
                    className="relative px-6 py-2 text-sm font-semibold text-stone-700 dark:text-stone-200 transition-colors"
                  >
                    <span className="relative z-10">{link.name}</span>
                    {hoveredLink === link.name && (
                      <motion.div
                        layoutId="header-nav-pill"
                        className="absolute inset-0 rounded-full bg-white/80 dark:bg-black/50"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                  </a>
                ))}
              </nav>

              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700/70 transition-all"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              {/* === NEW: Hamburger Menu Button (Mobile Only) === */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700/70 transition-all"
                  aria-label="Open menu"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMobileMenuOpen ? "close" : "open"}
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* === NEW: Mobile Menu Panel === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[#FFFBF5] dark:bg-[#1A120B] flex flex-col items-center justify-center space-y-10"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-3xl font-bold text-stone-800 dark:text-stone-200"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

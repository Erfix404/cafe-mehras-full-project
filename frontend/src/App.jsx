// src/App.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./context/ThemeContext";
import Preloader from "./components/layout/Preloader";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import BackToTopButton from "./components/ui/BackToTopButton";
import HeroSection from "./components/sections/HeroSection";
import MenuSection from "./components/sections/MenuSection";
import CartIcon from "./components/cart/CartIcon";
import FlyingCartItems from "./components/cart/FlyingCartItems";
import CartModal from "./components/cart/CartModal";

function App() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "کافه مهراس - تجربه‌ای به‌یادماندنی";
  }, []);

  if (!theme) return null;

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Header />
            {/* We return to the simple and robust main layout */}
            <main>
              <HeroSection />
              <MenuSection />
            </main>
            <Footer />

            <BackToTopButton />
            <CartIcon />
            <FlyingCartItems />
            <CartModal />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;

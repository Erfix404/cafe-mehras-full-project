// src/components/sections/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Clock } from "lucide-react";
import { img } from "../../assets";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, type: "spring", stiffness: 120, damping: 20 },
  }),
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-bone dark:bg-night">
      {/* Ambient background — soft saffron glow top, subtle grain feel */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-saffron/10 dark:bg-saffron/15 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-espresso/5 dark:bg-espresso/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-24">
          {/* --- Copy (RTL: right column first on desktop, first on mobile) --- */}
          <div className="order-1 text-right">
            <motion.span
              custom={0}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron-soft dark:bg-saffron/10 text-saffron-deep dark:text-saffron-glow text-sm font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-saffron dark:bg-saffron-glow" />
              قهوه تخصصی و تازه
            </motion.span>

            <motion.h1
              custom={1}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 font-display text-5xl sm:text-7xl lg:text-[5.5rem] leading-[1.15] sm:leading-[1.08] text-ink dark:text-bone tracking-tight"
            >
              قهوه‌ای که با
              <br />
              <span className="relative inline-block text-saffron dark:text-saffron-glow">
                قاب ایرانی
                <motion.span
                  className="absolute -bottom-2 right-0 left-0 h-[3px] rounded-full bg-saffron/40 dark:bg-saffron-glow/40 origin-right"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              {" "}سرو می‌شود
            </motion.h1>

            <motion.p
              custom={2}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-xl text-lg text-espresso/70 dark:text-muted leading-relaxed"
            >
              در کافه مهراس، هر فنجان یک تجربه است؛ از دانه‌های تازه‌رست تا
              دم‌آوری دقیق. جایی برای آهسته نوشیدن، گفتگو و لحظه‌های خوب.
            </motion.p>

            <motion.div
              custom={3}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-wrap gap-4 items-center"
            >
              <a
                href="#menu"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-saffron text-bone dark:text-night font-bold text-lg hover:bg-saffron-deep transition-colors shadow-saffron"
              >
                مشاهده منو
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
              </a>
              <a
                href="#main-footer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-espresso/15 dark:border-night-line text-espresso dark:text-bone font-bold text-lg hover:border-saffron hover:text-saffron dark:hover:text-saffron-glow transition-colors"
              >
                تماس با ما
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="mt-12 flex flex-wrap items-center gap-6 text-sm text-espresso/60 dark:text-muted"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron" />
                تهران، خیابان ولیعصر
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-saffron" />
                همه‌روزه ۸ تا ۲۴
              </span>
            </motion.div>
          </div>

          {/* --- Media: Persian arch frame --- */}
          <motion.div
            custom={2}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px]">
              {/* Persian arch frame — ogival arch via CSS border-radius (cross-browser, no clip-path needed) */}
              <div
                className="relative overflow-hidden shadow-warm-lg"
                style={{
                  borderRadius: "50% 50% 2rem 2rem / 22% 22% 2rem 2rem",
                  border: "4px solid rgba(201, 123, 45, 0.4)",
                }}
              >
                <img
                  src={img("/images/hero-coffee.jpg")}
                  alt="فنجان قهوه تخصصی مهراس"
                  fetchpriority="high"
                  className="w-full h-[300px] sm:h-[420px] lg:h-[520px] object-cover"
                />
                {/* Warm gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-night/40 via-transparent to-transparent" />
              </div>

              {/* Floating badge — roasted fresh */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-4 sm:-right-8 bg-bone dark:bg-night-soft rounded-2xl shadow-warm-lg px-5 py-4 flex items-center gap-3 border-2 border-saffron/30 dark:border-saffron-glow/40"
              >
                <span className="w-10 h-10 rounded-full bg-saffron/15 flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-saffron" />
                </span>
                <div>
                  <p className="font-bold text-ink dark:text-bone">رست تازه</p>
                  <p className="text-xs text-espresso/60 dark:text-muted">دانه‌های امروز</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

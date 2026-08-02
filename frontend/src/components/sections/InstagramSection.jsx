// src/components/sections/InstagramSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { img } from "../../assets";

const posts = [
  { img: img("/images/espresso.jpg"), alt: "اسپرسو مهراس" },
  { img: img("/images/latte-art.jpg"), alt: "لاته آرت" },
  { img: img("/images/iced-coffee.jpg"), alt: "آیس قهوه" },
  { img: img("/images/pour-over.jpg"), alt: "دم‌آوری" },
  { img: img("/images/dessert.jpg"), alt: "دسر کافه" },
  { img: img("/images/cafe-interior.jpg"), alt: "فضای کافه" },
];

const InstagramSection = () => {
  return (
    <section className="py-24 sm:py-28 bg-bone dark:bg-night">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <h2 className="font-display text-3xl md:text-5xl text-ink dark:text-bone">
              لحظه‌های مهراس
            </h2>
            <p className="mt-2 text-espresso/60 dark:text-muted">
              هر روز از کافه‌مان روی اینستاگرام
            </p>
          </div>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full bg-saffron/10 dark:bg-saffron/10 text-saffron-deep dark:text-saffron-glow font-bold text-sm hover:bg-saffron hover:text-bone transition-colors"
          >
            <Instagram size={16} />
            دنبال کنید
          </a>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((post, i) => (
            <motion.a
              key={post.alt}
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-bone-line/40 dark:border-night-line"
              aria-label={`پست اینستاگرام: ${post.alt}`}
            >
              <img
                src={post.img}
                alt={post.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-night/0 group-hover:bg-night/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram
                  size={22}
                  className="text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;

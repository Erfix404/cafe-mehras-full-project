// src/components/sections/StorySection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Bean, Clock, MapPin, HeartHandshake } from "lucide-react";
import { img } from "../../assets";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const StorySection = () => {
  const cards = [
    {
      icon: Bean,
      title: "رست تازه",
      desc: "دانه‌هایمان هر هفته تازه رست می‌شوند؛ از مزارع کلمبیا تا اتیوپی.",
      img: img("/images/beans.jpg"),
      span: "md:col-span-2 md:row-span-2",
      big: true,
    },
    {
      icon: HeartHandshake,
      title: "داستان ما",
      desc: "از یک دانه تا یک فنجان؛ عشق به قهوه در هر مرحله.",
      img: img("/images/cafe-interior.jpg"),
      span: "",
    },
    {
      icon: Clock,
      title: "همه‌روزه ۸ تا ۲۴",
      desc: "برای قهوه صبح یا شام آرام، درِ ما باز است.",
      img: "",
      span: "",
    },
    {
      icon: MapPin,
      title: "تهران، ولیعصر",
      desc: "دسترسی آسان، فضایی برای کار و گفتگو.",
      img: "",
      span: "",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-bone dark:bg-night border-t border-bone-line/40 dark:border-night-line">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron-soft dark:bg-saffron/10 text-saffron-deep dark:text-saffron-glow text-sm font-bold"
          >
            <Bean size={14} />
            داستان ما
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-6 font-display text-4xl md:text-6xl text-ink dark:text-bone leading-[1.15]"
          >
            چیزی بیش از یک فنجان
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-4 text-espresso/60 dark:text-muted max-w-2xl mx-auto text-lg"
          >
            هر جرعه، سفری از مزرعه تا فنجان است. ما فقط قهوه نمی‌فروشیم؛
            لحظه می‌سازیم.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={`relative overflow-hidden rounded-3xl bg-bone-strong/60 dark:bg-night-soft border border-bone-line/40 dark:border-night-line shadow-warm group min-h-[220px] ${
                card.span || "md:col-span-1"
              } ${card.big ? "md:min-h-[460px]" : ""}`}
            >
              {card.img && (
                <>
                  <img
                    src={card.img}
                    alt={card.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      card.big ? "" : "opacity-90"
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
                </>
              )}
              <div className="relative z-10 flex flex-col justify-end h-full p-6">
                <span
                  className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 ${
                    card.img
                      ? "bg-saffron/20 text-saffron-glow backdrop-blur-sm"
                      : "bg-saffron/10 text-saffron-deep dark:text-saffron-glow"
                  }`}
                >
                  <card.icon size={20} />
                </span>
                <h3
                  className={`font-display text-2xl ${
                    card.img ? "text-bone" : "text-ink dark:text-bone"
                  }`}
                >
                  {card.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    card.img ? "text-bone/80" : "text-espresso/60 dark:text-muted"
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StorySection;

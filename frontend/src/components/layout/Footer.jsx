// src/components/layout/Footer.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Instagram,
  Send,
  Copy,
  Check,
  Coffee,
} from "lucide-react";
import { api } from "../../api/mockAPI";

// A more prominent social link button component
const SocialButton = ({ href, icon: Icon, text, colorClass }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-white font-semibold transition-all duration-300 shadow-lg ${colorClass}`}
    >
      <Icon size={22} />
      <span>{text}</span>
    </motion.button>
  </a>
);

const Footer = () => {
  const [contact, setContact] = useState({});
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    api.fetchContactInfo().then((data) => setContact(data));
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <motion.footer
      id="main-footer"
      className="relative bg-[#fdf6e9] dark:bg-gradient-to-b dark:from-[#1c140f] dark:to-[#1A120B] text-stone-700 dark:text-stone-300 pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className="absolute inset-0 z-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage:
            "url(https://www.transparenttextures.com/patterns/noise-lines.png)",
        }}
      ></div>

      <div className="relative z-10 container mx-auto">
        <div className="relative text-center mb-16">
          <hr className="border-stone-300 dark:border-stone-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-[#fdf6e9] dark:bg-[#1A120B]">
            <Coffee className="text-amber-600 dark:text-amber-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
          >
            {/* === CHANGE START === */}
            {/* The user's own, correct iframe code is now embedded here, with JSX syntax adjustments. */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1604.9965981834123!2d54.97464399259032!3d36.43354722165225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f9d0f001499f62f%3A0x2ac4691e467729cf!2z2qnYp9mB2Ycg2YXZh9ix2KfYsw!5e0!3m2!1sen!2sus!4v1753371997938!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقعیت کافه مهراس"
            ></iframe>
            {/* === CHANGE END === */}
          </motion.div>

          <motion.div
            className="space-y-8"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-white">
              به ما سر بزنید
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-base">{contact.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                <div className="flex items-center">
                  <span dir="ltr" className="text-base">
                    {contact.phone}
                  </span>
                  <button
                    onClick={() => handleCopy(contact.phone)}
                    className="ml-2 p-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                  >
                    {copiedPhone ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <SocialButton
                href={`https://instagram.com/${contact.instagramUser}`}
                icon={Instagram}
                text="اینستاگرام"
                colorClass="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:shadow-red-500/40"
              />
              <SocialButton
                href={`https://t.me/${contact.telegramUser}`}
                icon={Send}
                text="تلگرام"
                colorClass="bg-gradient-to-br from-sky-500 to-blue-600 hover:shadow-blue-500/40"
              />
            </div>
          </motion.div>
        </div>

        <div className="text-center text-sm text-stone-500 dark:text-stone-400 mt-24 border-t border-stone-300 dark:border-stone-700 pt-8">
          <p>© {new Date().getFullYear()} کافه مهراس. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

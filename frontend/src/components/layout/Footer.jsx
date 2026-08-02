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

// A prominent social link button — single accent, no gradients
const SocialButton = ({ href, icon: Icon, text, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-bone-strong dark:bg-night text-espresso dark:text-bone font-bold shadow-warm hover:bg-saffron hover:text-bone transition-all duration-300"
  >
    <Icon size={20} />
    <span>{text}</span>
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
      className="relative bg-espresso dark:bg-night-soft text-crema pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative z-10 container mx-auto">
        <div className="relative text-center mb-16">
          <hr className="border-night-line dark:border-night-line" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-espresso dark:bg-night-soft rounded-full border border-night-line">
            <Coffee className="text-saffron dark:text-saffron-glow" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="w-full h-80 md:h-96 rounded-3xl overflow-hidden shadow-warm-lg border border-night-line"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
          >
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
            <h2 className="text-4xl md:text-5xl font-display text-bone">
              به ما سر بزنید
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-saffron dark:text-saffron-glow flex-shrink-0 mt-1" />
                <span className="text-base text-crema/90">{contact.location}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-saffron dark:text-saffron-glow flex-shrink-0" />
                <div className="flex items-center">
                  <span dir="ltr" className="text-base text-crema/90">
                    {contact.phone}
                  </span>
                  <button
                    onClick={() => handleCopy(contact.phone)}
                    aria-label="کپی شماره تلفن"
                    className="mr-2 p-1.5 rounded-full hover:bg-night-line transition-colors"
                  >
                    {copiedPhone ? (
                      <Check size={16} className="text-green-400" />
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
                label="اینستاگرام کافه مهراس"
              />
              <SocialButton
                href={`https://t.me/${contact.telegramUser}`}
                icon={Send}
                text="تلگرام"
                label="تلگرام کافه مهراس"
              />
            </div>
          </motion.div>
        </div>

        <div className="text-center text-sm text-crema/50 mt-24 border-t border-night-line pt-8">
          <p>© {new Date().getFullYear()} کافه مهراس. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;

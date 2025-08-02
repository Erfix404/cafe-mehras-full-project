// src/components/cart/FlyingCartItems.jsx
import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const FlyingCartItems = () => {
  const { flyingItems, removeFlyingItem } = useCart();

  return (
    <>
      {flyingItems.map((item) => (
        <motion.div
          key={item.instanceId}
          initial={{
            x: item.startRect.left,
            y: item.startRect.top,
            width: item.startRect.width,
            height: item.startRect.height,
            position: "fixed",
            zIndex: 100,
          }}
          animate={{
            x: window.innerWidth - 80, // Target x (near cart icon)
            y: window.innerHeight - 80, // Target y (near cart icon)
            width: 20,
            height: 20,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          onAnimationComplete={() => removeFlyingItem(item.instanceId)}
        >
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
      ))}
    </>
  );
};

export default FlyingCartItems;

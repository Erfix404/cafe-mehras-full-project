// src/components/common/AnimatedPrice.jsx
import React, { useRef, useEffect } from "react";
import { useInView, animate } from "framer-motion";

const AnimatedPrice = ({ value }) => {
  const ref = useRef(null);
  // === CHANGE: Adjusted useInView options for better mobile performance ===
  // 'amount: 0.2' means the animation will trigger when 20% of the element is visible.
  // This is more reliable than a pixel-based margin on different screen sizes.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (node) {
            node.textContent = Math.round(latest).toLocaleString("fa-IR");
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>0</span>;
};

export default AnimatedPrice;

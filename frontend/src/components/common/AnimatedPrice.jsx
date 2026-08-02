// src/components/common/AnimatedPrice.jsx
import React, { useRef, useEffect, useState } from "react";

const AnimatedPrice = ({ value }) => {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const start = performance.now();
    const duration = 700;
    const from = 0;
    const to = value;

    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, started]);

  return (
    <span ref={ref}>{display.toLocaleString("fa-IR")}</span>
  );
};

export default AnimatedPrice;

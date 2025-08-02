// src/hooks/useBodyScrollLock.js
import { useEffect } from "react";

const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isLocked) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export default useBodyScrollLock;

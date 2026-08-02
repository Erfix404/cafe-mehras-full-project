// src/hooks/useFocusTrap.js
import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

const useFocusTrap = (ref, isActive) => {
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    // remember who had focus before the modal opened
    lastFocused.current = document.activeElement;

    const node = ref.current;
    const focusables = () =>
      [...node.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;

      const first = els[0];
      const last = els[els.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    };

    // initial focus
    const initial = focusables()[0];
    if (initial) initial.focus();

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // restore focus to the trigger element on close
      if (lastFocused.current && lastFocused.current.focus) {
        lastFocused.current.focus();
      }
    };
  }, [ref, isActive]);
};

export default useFocusTrap;

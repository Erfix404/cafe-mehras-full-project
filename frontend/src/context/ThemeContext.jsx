// src/context/ThemeContext.jsx
import React, { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // State is now initialized directly from localStorage to prevent any delay or flicker.
  // This is a more robust way to handle initial theme loading.
  const [theme, setTheme] = useState(() => {
    // Check for a saved theme in localStorage, or default to 'dark'.
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement; // This is the <html> tag

    // A more direct approach:
    // Remove the opposite class and add the current one.
    // This is more explicit than using toggle().
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save the current theme choice to localStorage for persistence.
    localStorage.setItem("theme", theme);
  }, [theme]); // This effect runs every time the 'theme' state changes.

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

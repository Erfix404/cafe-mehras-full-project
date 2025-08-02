// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import all context providers
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
// FIX: The import path is now corrected from CartProvider to CartContext
import { CartProvider } from "./context/CartContext";

// Import global styles and the base CSS file
import GlobalStyles from "./styles/GlobalStyles";
import "./index.css";

// Find the root element in the HTML
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the entire application
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <CartProvider>
          <GlobalStyles />
          <App />
        </CartProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);

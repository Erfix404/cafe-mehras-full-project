// src/context/ToastContext.jsx
import React, { useState, useContext, createContext } from "react";
import ToastContainer from "../components/ui/Toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (content, options = {}) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, content, ...options }]);
    // Automatically remove the toast after a delay
    setTimeout(() => removeToast(id), options.duration || 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* The container will render the toasts */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

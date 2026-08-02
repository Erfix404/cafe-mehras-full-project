// src/App.js — admin panel root
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import { login } from "./api";

const TOKEN_KEY = "mehras_admin_token";
const USER_KEY = "mehras_admin_user";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => localStorage.getItem(USER_KEY) || "");
  const [view, setView] = useState("dashboard");

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, user);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [token, user]);

  const handleLogin = async (password) => {
    const d = await login(password);
    setToken(d.token);
    setUser(d.user);
  };

  const logout = () => {
    setToken("");
    setUser("");
    setView("dashboard");
  };

  if (!token) return <Login onLogin={handleLogin} />;

  const props = { token, user, view, setView, logout };

  return view === "products" ? (
    <ProductsPage {...props} />
  ) : (
    <Dashboard {...props} />
  );
}

export default App;

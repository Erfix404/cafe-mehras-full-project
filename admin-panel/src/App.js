// src/App.js — admin panel root with demo-mode fallback
import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import { login, checkBackend } from "./api";
import menuData from "./mockData";

const TOKEN_KEY = "mehras_admin_token";
const USER_KEY = "mehras_admin_user";
const DEMO_KEY = "mehras_admin_demo";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => localStorage.getItem(USER_KEY) || "");
  const [demo, setDemo] = useState(() => localStorage.getItem(DEMO_KEY) === "1");
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
    const backendUp = await checkBackend();
    if (!backendUp) {
      // demo mode — backend offline. Require the default demo password so
      // the panel isn't open to anyone who finds the URL.
      if (password !== "mehras2024") {
        throw new Error("رمز عبور اشتباه است");
      }
      setDemo(true);
      localStorage.setItem(DEMO_KEY, "1");
      setToken("demo");
      setUser("admin (دمو)");
      return;
    }
    const d = await login(password);
    setDemo(false);
    localStorage.removeItem(DEMO_KEY);
    setToken(d.token);
    setUser(d.user);
  };

  const logout = () => {
    setToken("");
    setUser("");
    setDemo(false);
    localStorage.removeItem(DEMO_KEY);
    setView("dashboard");
  };

  if (!token) return <Login onLogin={handleLogin} />;

  const props = { token, user, view, setView, logout, demo, demoData: menuData };

  return view === "products" ? (
    <ProductsPage {...props} />
  ) : (
    <Dashboard {...props} />
  );
}

export default App;

// src/pages/Dashboard.js — stats + shell + navigation
import React, { useState, useEffect } from "react";
import { getStats } from "../api";
import {
  LayoutDashboard,
  Coffee,
  LogOut,
  Package,
  Tag,
  Sparkles,
} from "lucide-react";

function Dashboard({ token, user, view, setView, logout }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getStats(token)
      .then(setStats)
      .catch((e) => setError(e.message));
  }, [token]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="arch">☕</div>
          <div>
            <b>کافه مهراس</b>
            <small>پنل مدیریت</small>
          </div>
        </div>
        <button
          className={`nav-item ${view === "dashboard" ? "active" : ""}`}
          onClick={() => setView("dashboard")}
        >
          <LayoutDashboard size={18} />
          <span>داشبورد</span>
        </button>
        <button
          className={`nav-item ${view === "products" ? "active" : ""}`}
          onClick={() => setView("products")}
        >
          <Coffee size={18} />
          <span>محصولات</span>
        </button>
        <button className="nav-item logout" onClick={logout}>
          <LogOut size={18} />
          <span>خروج</span>
        </button>
      </aside>

      <main className="main">
        <div className="topbar">
          <h2>داشبورد</h2>
          <div className="user">
            <span className="dot" />
            {user} · ادمین
          </div>
        </div>

        {error && <div className="auth-error" style={{ marginBottom: "1rem" }}>{error}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon"><Package size={22} /></div>
            <div>
              <b>{stats ? stats.total : "—"}</b>
              <span>محصول فعال</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon"><Tag size={22} /></div>
            <div>
              <b>{stats ? stats.categories : "—"}</b>
              <span>دسته‌بندی</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon"><Sparkles size={22} /></div>
            <div>
              <b>{stats ? stats.featured : "—"}</b>
              <span>ویژه (بدون قیمت)</span>
            </div>
          </div>
        </div>

        <div className="panel" style={{ padding: "2rem", textAlign: "center", color: "#8a6f5f" }}>
          <p style={{ marginBottom: "1rem" }}>
            از منوی کناری، بخش «محصولات» را باز کنید تا منوی کافه را مدیریت کنید.
          </p>
          <button className="btn btn-primary" onClick={() => setView("products")}>
            <Coffee size={16} /> مدیریت محصولات
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

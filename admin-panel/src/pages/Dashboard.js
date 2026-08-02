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
  Info,
} from "lucide-react";

function Dashboard({ token, user, view, setView, logout, demo, demoData }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (demo && demoData) {
      const cats = [...new Set(demoData.map((p) => p.category))];
      setStats({
        total: demoData.length,
        categories: cats.length,
        featured: demoData.filter((p) => p.price == null).length,
      });
      return;
    }
    getStats(token)
      .then(setStats)
      .catch((e) => setError(e.message));
  }, [token, demo, demoData]);

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

        {demo && (
          <div className="demo-banner">
            <Info size={16} />
            حالت دمو — بک‌اند متصل نیست؛ داده‌ها نمونه‌ای هستند و تغییرات ذخیره نمی‌شوند.
          </div>
        )}

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

        {demo && (
          <div className="panel" style={{ padding: "1.5rem 2rem", marginTop: "1.25rem" }}>
            <h3 style={{ fontFamily: "Lalezar, sans-serif", fontWeight: 400, color: "var(--night)", marginBottom: "1rem" }}>توزیع دسته‌بندی‌ها</h3>
            {(() => {
              const counts = demoData.reduce((acc, p) => {
                acc[p.category] = (acc[p.category] || 0) + 1;
                return acc;
              }, {});
              const total = demoData.length;
              return Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .map(([catName, n]) => (
                  <div key={catName} style={{ marginBottom: "0.7rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "0.3rem" }}>
                      <span style={{ fontWeight: 700, color: "var(--espresso)" }}>{catName}</span>
                      <span style={{ color: "#8a6f5f" }}>{n}</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 999, background: "var(--line)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${(n / total) * 100}%`,
                          background: "linear-gradient(90deg, var(--saffron-deep), var(--saffron))",
                          borderRadius: 999,
                        }}
                      />
                    </div>
                  </div>
                ));
            })()}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;

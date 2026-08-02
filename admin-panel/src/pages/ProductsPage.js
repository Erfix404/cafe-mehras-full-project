// src/pages/ProductsPage.js — product CRUD + search + category filter
import React, { useState, useEffect, useCallback } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api";
import ProductModal from "../components/ProductModal";
import { img } from "../img";
import { Search, Plus, Pencil, Trash2, LayoutDashboard, Coffee, LogOut, Info } from "lucide-react";

const IMAGES = [
  "/images/espresso.jpg",
  "/images/latte-art.jpg",
  "/images/iced-coffee.jpg",
  "/images/pour-over.jpg",
  "/images/dessert.jpg",
  "/images/beans.jpg",
  "/images/syrup.jpg",
].map(img);

function ProductsPage({ token, user, view, setView, logout, demo, demoData }) {
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [modal, setModal] = useState(null); // null | {product} | {product:null}
  const [toast, setToast] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const showToast = (msg, err) => {
    setToast({ msg, err });
    setTimeout(() => setToast(null), 2600);
  };

  const load = useCallback(async () => {
    if (demo) {
      const data = (demoData || []).map((p) => ({ ...p, _id: String(p.id) }));
      setProducts(data);
      setCats([...new Set(data.map((p) => p.category))].sort());
      return;
    }
    try {
      const data = await getProducts(token);
      setProducts(data);
      setCats([...new Set(data.map((p) => p.category))].sort());
    } catch (e) {
      showToast(e.message, true);
    }
  }, [token, demo, demoData]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = (products || []).filter((p) => {
    const okQ = !query || (p.name || "").includes(query);
    const okC = !cat || p.category === cat;
    return okQ && okC;
  });

  const imgSrc = (p) => img(p.image);

  const onSave = async (data, id) => {
    if (demo) {
      // demo: mutate local state only
      setProducts((prev) => {
        if (id) return prev.map((p) => (p._id === id ? { ...p, ...data, _id: id } : p));
        const nid = String(Date.now());
        return [{ ...data, _id: nid }, ...prev];
      });
      setModal(null);
      showToast(id ? "محصول ویرایش شد ✓ (دمو)" : "محصول اضافه شد ✓ (دمو)");
      return data;
    }
    const saved = id
      ? await updateProduct(token, id, data)
      : await createProduct(token, data);
    setModal(null);
    showToast(id ? "محصول ویرایش شد ✓" : "محصول اضافه شد ✓");
    load();
    return saved;
  };

  const onDelete = async (p) => {
    if (!window.confirm(`«${p.name}» حذف شود؟`)) return;
    setBusyId(p._id);
    if (demo) {
      setProducts((prev) => prev.filter((x) => x._id !== p._id));
      setBusyId(null);
      showToast("محصول حذف شد (دمو)");
      return;
    }
    try {
      await deleteProduct(token, p._id);
      showToast("محصول حذف شد");
      load();
    } catch (e) {
      showToast(e.message, true);
    } finally {
      setBusyId(null);
    }
  };

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
          <h2>محصولات</h2>
          <div className="user">
            <span className="dot" />
            {user} · ادمین
          </div>
        </div>

        {demo && (
          <div className="demo-banner" style={{ marginBottom: "1rem" }}>
            <Info size={16} />
            حالت دمو — بک‌اند متصل نیست؛ داده‌ها نمونه‌ای هستند و تغییرات ذخیره نمی‌شوند.
          </div>
        )}

        <div className="panel">
          <div className="panel-head">
            <div className="search">
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی محصول…"
              />
            </div>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="">همه دسته‌ها</option>
              {cats.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={() => setModal({ product: null })}>
              <Plus size={16} /> محصول جدید
            </button>
          </div>

          {products === null ? (
            <div className="loading"><span className="spinner" /> در حال بارگذاری…</div>
          ) : filtered.length === 0 ? (
            <div className="empty">
              <div className="big">☕</div>
              محصولی پیدا نشد
            </div>
          ) : (
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>محصول</th>
                    <th>دسته</th>
                    <th>قیمت</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p._id}>
                      <td>
                        <div className="p-cell">
                          <img src={imgSrc(p)} alt={p.name} onError={(e) => { e.target.style.display = "none"; }} />
                          <div>
                            <div className="p-name">{p.name}</div>
                            {p.description && <div className="p-desc">{p.description}</div>}
                          </div>
                        </div>
                      </td>
                      <td><span className="badge">{p.category}</span></td>
                      <td>
                        {p.price != null ? (
                          <span className="price">{p.price.toLocaleString("fa-IR")} <small>تومان</small></span>
                        ) : (
                          <span className="badge badge-special">ویژه</span>
                        )}
                      </td>
                      <td>
                        <div className="actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => setModal({ product: p })}>
                            <Pencil size={14} />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(p)}
                            disabled={busyId === p._id}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {modal && (
        <ProductModal
          product={modal.product}
          images={IMAGES}
          cats={cats}
          onClose={() => setModal(null)}
          onSave={onSave}
        />
      )}
      {toast && <div className={`toast ${toast.err ? "err" : ""}`}>{toast.msg}</div>}
    </div>
  );
}

export default ProductsPage;

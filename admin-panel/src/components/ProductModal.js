// src/components/ProductModal.js — add / edit product form
import React, { useState } from "react";
import { img } from "../img";

function ProductModal({ product, images, cats, onClose, onSave }) {
  const editing = !!product;
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price != null ? String(product.price) : "",
    category: product?.category || (cats[0] || ""),
    image: product?.image || images[0],
    description: product?.description || "",
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("نام محصول الزامی است");
    if (!form.category.trim()) return setError("دسته‌بندی الزامی است");
    setBusy(true);
    try {
      await onSave(
        {
          name: form.name.trim(),
          price: form.price === "" ? null : Number(form.price),
          category: form.category.trim(),
          image: form.image.trim(),
          description: form.description.trim(),
        },
        product?._id
      );
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  // normalize "/images/x.jpg" → absolute URL for the live preview
  const previewSrc = form.image ? img(form.image) : "";
  const [previewBroken, setPreviewBroken] = useState(false);

  const pickImage = (im) => {
    setForm({ ...form, image: im });
    setPreviewBroken(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{editing ? "ویرایش محصول" : "محصول جدید"}</h3>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="m-name">نام محصول *</label>
            <input id="m-name" value={form.name} onChange={set("name")} placeholder="مثلاً: کاپوچینو" autoFocus />
          </div>

          <div className="row">
            <div className="field">
              <label htmlFor="m-price">قیمت (تومان)</label>
              <input id="m-price" type="number" min="0" value={form.price} onChange={set("price")} placeholder="خالی = ویژه" />
            </div>
            <div className="field">
              <label htmlFor="m-cat">دسته‌بندی *</label>
              <input id="m-cat" list="m-cats" value={form.category} onChange={set("category")} placeholder="مثلاً: اسپرسوبار" />
              <datalist id="m-cats">
                {cats.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="field">
            <label htmlFor="m-desc">توضیحات</label>
            <textarea id="m-desc" rows="3" value={form.description} onChange={set("description")} placeholder="توضیح کوتاه محصول…" />
          </div>

          <div className="field">
            <label>تصویر محصول</label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
              {images.map((im) => (
                <button
                  type="button"
                  key={im}
                  onClick={() => pickImage(im)}
                  style={{
                    width: 56, height: 56, padding: 0, overflow: "hidden",
                    borderRadius: "50% 50% 10px 10px / 22% 22% 10px 10px",
                    border: form.image === im ? "3px solid #c97b2d" : "2px solid #e5ddd2",
                    opacity: form.image === im ? 1 : 0.6,
                  }}
                >
                  <img src={im} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <input
                value={form.image}
                onChange={(e) => {
                  setForm({ ...form, image: e.target.value });
                  setPreviewBroken(false);
                }}
                placeholder="یا آدرس دلخواه تصویر (URL)…"
                dir="ltr"
                style={{ textAlign: "left", flex: 1 }}
              />
              {previewSrc && !previewBroken && (
                <img
                  src={previewSrc}
                  alt="پیش‌نمایش"
                  onError={() => setPreviewBroken(true)}
                  style={{
                    width: 44, height: 44, objectFit: "cover", flexShrink: 0,
                    borderRadius: "50% 50% 8px 8px / 22% 22% 8px 8px",
                    border: "1.5px solid var(--line)",
                  }}
                />
              )}
            </div>
            {previewBroken && (
              <div className="auth-error" style={{ marginTop: "0.5rem", marginBottom: 0 }}>
                تصویر پیدا نشد — آدرس را بررسی کنید یا یکی از گالری را انتخاب کنید.
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-start", marginTop: "1.25rem" }}>
            <button type="submit" className="btn btn-primary" disabled={busy}>
              {busy ? "در حال ذخیره…" : editing ? "ذخیره تغییرات" : "افزودن محصول"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;

// src/api.js — admin panel API client
const API =
  process.env.REACT_APP_API_URL ||
  "http://127.0.0.1:5001";

export function login(password) {
  return fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  }).then(async (r) => {
    const d = await r.json();
    if (!r.ok) throw new Error(d.msg || "خطا در ورود");
    return d;
  });
}

function authed(token) {
  return {
    "Content-Type": "application/json",
    "x-admin-token": token,
  };
}

export async function getStats(token) {
  const r = await fetch(`${API}/api/auth/stats`, { headers: authed(token) });
  if (!r.ok) throw new Error("خطا در دریافت آمار");
  return r.json();
}

export async function getProducts(token) {
  const r = await fetch(`${API}/api/products`, { headers: authed(token) });
  if (!r.ok) throw new Error("خطا در دریافت محصولات");
  return r.json();
}

export async function createProduct(token, product) {
  const r = await fetch(`${API}/api/products`, {
    method: "POST",
    headers: authed(token),
    body: JSON.stringify(product),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.msg || "خطا در افزودن محصول");
  return d;
}

export async function updateProduct(token, id, product) {
  const r = await fetch(`${API}/api/products/${id}`, {
    method: "PUT",
    headers: authed(token),
    body: JSON.stringify(product),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.msg || "خطا در ویرایش محصول");
  return d;
}

export async function deleteProduct(token, id) {
  const r = await fetch(`${API}/api/products/${id}`, {
    method: "DELETE",
    headers: authed(token),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.msg || "خطا در حذف محصول");
  return d;
}

// src/img.js — resolve product image paths for admin panel
// Products store "/images/x.jpg". Admin deploys at <site>/admin/, site root is 2 levels up.
// Dev at http://localhost:PORT/ → root is origin itself.
// Derive site root from the URL: strip trailing "admin/" (or any subpath) off pathname.

export function siteRoot() {
  const { origin, pathname } = window.location;
  // deployed: /cafe-mehras-full-project/admin/  →  /cafe-mehras-full-project/
  const m = pathname.match(/^(.*\/)[^/]+\/?$/);
  const base = m ? m[1] : pathname.endsWith("/") ? pathname : pathname + "/";
  return origin + base;
}

export function img(p) {
  if (!p) return "";
  if (/^(https?:)?\/\//.test(p)) return p; // absolute URL already
  return siteRoot() + p.replace(/^\//, "");
}

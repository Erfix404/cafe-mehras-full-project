// src/assets.js — asset path helper for GitHub Pages subpath deploys
// "/images/x.jpg" → "/cafe-mehras-full-project/images/x.jpg" (PUBLIC_URL prefix)
// Works at any depth; site is a single page so absolute subpath URLs are safe.

const BASE = process.env.PUBLIC_URL || "";

export const asset = (p) => (p.startsWith("/") ? BASE + p : BASE + "/" + p);

export const img = asset;

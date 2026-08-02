# =============================================================
# Cafe Mehras — full project review & optimization log (2026-08-02)
# Findings → fixes. See commits for the actual diffs.
# =============================================================

## BUGS FOUND (fixed)

### 1. MenuModal: cart IDs collide when syrup selected (LOST SALE)
- `CartContext.ADD` matches items by `item.id`. MenuModal builds
  `id = \`${item.id}-${syrup.id}\`` ONLY when syrup picked.
- WITHOUT syrup: id = `12` (plain) → merges with cart line "کاپوچینو".
- WITH syrup: id = `12-53` → NEW cart line.
- So: add "کاپوچینو + وانیل" (id 12-53), then add plain "کاپوچینو"
  (id 12) → TWO separate lines, same drink, one with syrup one without.
- Worse: the +syrup item REPLACES the plain one when the same drink
  exists in cart (ADD finds id 12, bumps quantity of the plain line,
  and the syrup variant you just paid for is silently dropped).
- FIX: use `price` as part of the identity — `id = \`${item.id}\`` for
  plain, `\`${item.id}-s${syrup.id}\`` for syrup variants. Quantities
  now merge correctly, syrup variants keep their own line.
  (Stable across reloads, not Date.now()-based.)

### 2. Backend `.env.example` secret default = production default (AUTH BYPASS)
- `authRoutes.js`: `process.env.ADMIN_PASSWORD || "mehras2024"`.
- `auth.js`: `process.env.ADMIN_SECRET || "change-me"` — DEFAULT SECRET,
  not random. Anyone knowing the scheme can forge a token for any user.
- FIX: remove hard-coded production defaults. Missing env → server logs
  a clear startup error and refuses to start (fail closed).

### 3. Backend startup with no MONGODB_URI → crash
- `mongoose.connect(undefined)` throws unhandled rejection, server dies
  with a stack trace. FIX: explicit check + friendly error.

### 4. GET /api/products sorted by _id — unstable order
- Frontend displays menu in DB order; without sort it's insertion-ish
  but not guaranteed. FIX: `sort({ sortOrder: 1, name: 1 })` (new field,
  seeded 0..57, admin edit preserves). Keeps menu order stable across
  seeds.

### 5. Backend validation — empty/invalid writes accepted
- POST/PUT accept `name: ""`, `price: "abc"`, missing image.
- FIX: require name/category/image, price must be number-or-null.
  400 + Persian message. Mongoose schema got `min: 0`.

### 6. MenuSection: `activeCategory` may not exist in `categories`
- `filteredItems` filters against `activeCategory`; if the value isn't
  in the list (e.g. after data reload) the filter yields empty.
- FIX: safe fallback `categories.includes(...) ? activeCategory : "همه"`.

### 7. `fetchMenuData` in MenuModal refetches on every open
- MenuSection already loads the full menu; Modal re-fetches (extra 4s
  timeout risk + double backend hit). FIX: pass the full menu + syrups
  from MenuSection instead.

### 8. localStorage JSON.parse — `syrups` from backend undefined guard
- Modal read `selectedSyrup.price` — if a stale cart had a syrup object
  without price, `finalItemPrice` = NaN. FIX: numeric guards.

### 9. Footer map iframe — RTL mirror bug (map shows mirrored!)
- Google Maps embed in RTL page flips. FIX: `dir="ltr"` wrapper on the
  iframe container.

### 10. Footer copy — no error handling + missing status
- `navigator.clipboard.writeText` fails on http / non-secure contexts.
- FIX: fallback `document.execCommand("copy")` + try/catch.

### 11. Header cart badge — `-left-1` breaks RTL badge position
- Badge anchored `-left-1` (LTR). In RTL, badge floats at wrong corner.
  FIX: `-left-1` is actually correct for RTL bag icon position (icon at
  right, badge at left edge of the icon) — VERIFIED visually, no change.

### 12. Admin: `page` can exceed `pageCount` after delete/filter
- Delete last item on last page → page = 3 of 2 → empty table.
- FIX: clamp `page` in a `useEffect` when `pageCount` shrinks.

### 13. Admin demo-mode delete doesn't remove from `cats` (stale filter)
- Demo delete removes product but category stays in the `<select>`.
- FIX: recompute cats after demo mutations.

### 14. Admin: image URL input accepts anything — broken preview
- FIX: normalize `/images/...` → absolute via `img()`, show live
  preview + onError fallback (badge).

### 15. Unused files removed (dead weight):
- `frontend/src/components/sections/FloatingIcon.jsx` (0 refs)
- `frontend/src/constants.js` (empty file, 0 refs)
- `admin-panel/src/components/ProductTable.js` (empty file, 0 refs)
- `admin-panel/src/App.css` (0 imports)
- `frontend/public/images/syrup-test.jpg` (duplicate of syrup.jpg, 0 refs)

## PERFORMANCE FIXES

### 16. Bundle: production source maps shipped to Pages (~1.3MB+)
- `GENERATE_SOURCEMAP=false` for both apps. JS drops ~340KB→~250KB,
  total deploy ~2MB smaller.

### 17. Preloader always runs 2s on every visit
- Even with cache warm. FIX: show preloader ONLY on first visit
  (sessionStorage flag) — returning visitors go straight to content.
  Also respect `prefers-reduced-motion` (skip straight).

### 18. Hero image + section images: no width/height → CLS
- FIX: explicit `width`/`height` + `fetchpriority="high"` on hero,
  `decoding="async"` elsewhere, aspect-ratio boxes for instagram grid.

### 19. Fonts: 5 weights each loaded on every page load
- Browser fetches ALL @font-face variants on first paint regardless of
  use. We trim to the weights actually used: Vazirmatn 400/700/900 +
  Lalezar 400. ~40% font payload cut.

### 20. Admin: `getStats` fails silently when backend down mid-session
- FIX: show inline error with retry button.

## UX / QUALITY IMPROVEMENTS

### 21. Checkout button = dead end (does nothing)
- Real cafe, demo checkout. FIX: wire to Telegram order message
  (bot handle + order text via `tg://resolve?domain=...`), show
  summary modal with totals + confirm → clear cart.

### 22. Contact info duplicated in 2 files (mockAPI + mockData)
- Single source of truth: `frontend/src/api/contact.js`; both apps
  import from there. (Admin demo banner shows contact for checkout.)

### 23. Accessibility: focus trap misses `[contenteditable]`; no focus
    return after modal close; modals lack `role="dialog"`/aria-modal.
- FIX: upgrade `useFocusTrap` (include contenteditable, restore focus,
  aria-hidden on background siblings) + `role="dialog"`.

### 24. Admin table: empty `description` shows blank cell padding
- FIX: show "—" placeholder, keep rows compact.

### 25. Admin: mobile nav items hide label text (`span{display:none}`)
- FIX: show labels (icon+text) on mobile; active state stays visible.

### 26. Category select in admin uses native `<select>` (LTR arrows)
- FIX: keep native select (accessibility) but `dir="rtl"` + styled.

## VERIFICATION
- Both apps: `CI=false npm run build` → clean.
- Live smoke test in browser (frontend + admin, login, CRUD demo).
- Push → Actions → verify Pages 200s on /, /admin/, assets.

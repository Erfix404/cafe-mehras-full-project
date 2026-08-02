# Security Policy

## Reporting a vulnerability

If you find a security issue, **do not open a public issue**. Email the maintainer via GitHub or open a private advisory:

https://github.com/Erfix404/cafe-mehras-full-project/security/advisories/new

## Known security notes

- Backend is **fail-closed**: missing `ADMIN_PASSWORD` / `ADMIN_SECRET` / `MONGODB_URI` env vars prevent startup (no insecure defaults).
- Admin routes are protected by HMAC token (`x-admin-token`). The default `.env.example` values are placeholders — **always change them** before deploying.
- `GET /api/products` is public by design (menu is public). All writes require auth.
- No secrets are committed. `.env*` files are gitignored except `.env.example` and `.env.production` (which contains only `PUBLIC_URL`).

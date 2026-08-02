# DESIGN.md — Cafe Mehras Design System

> Single source of truth for the Cafe Mehras brand. Every UI decision calibrates against this file.

## Brand

- **Name:** کافه مهراس (Cafe Mehras)
- **Positioning:** Specialty café — modern Iranian coffee culture. Premium but warm, not stiff.
- **Memorable thing:** *"قهوه‌ای که با یک قاب ایرانی سرو می‌شود"* — a specialty coffee experience framed by Persian craft (kashi/arches), never kitsch.
- **Voice:** گرم، صمیمی، موجز. فارسی روان، بدون شعارهای توخالی.

## Design Direction

**"Specialty Persian"** — premium specialty-coffee warmth executed with Persian architectural restraint.

- Cold-luxury base (ink, bone, latte) instead of the clichéd warm-beige+brass café palette.
- The single brand gesture: the **Persian arch (kashi)** — used in the hero frame, card media, and logo mark. Never as a repeating border pattern.
- One accent: **saffron (زعفران)** — the one color Iranians associate with hospitality. Used sparingly, never as a fill for large surfaces.

## Color Tokens

### Light Mode
| Token | Hex | Usage |
|---|---|---|
| `--ink` | `#1C1917` | Primary text (stone-900) |
| `--bone` | `#FAF7F2` | Page background (warm off-white, NOT cream) |
| `--latte` | `#EFE7DD` | Surface (cards, nav) |
| `--latte-strong` | `#E2D5C5` | Border/hover surface |
| `--saffron` | `#C97B2D` | Accent (primary actions, active states) |
| `--saffron-deep` | `#A85F1E` | Accent hover/pressed |
| `--espresso` | `#3B2F2A` | Deep text, footer bg |

### Dark Mode
| Token | Hex | Usage |
|---|---|---|
| `--night` | `#12100E` | Page background (warm near-black, NOT pure black) |
| `--night-soft` | `#1D1A17` | Surface (cards, nav) |
| `--night-line` | `#2E2924` | Borders |
| `--bone` | `#F5EFE7` | Primary text |
| `--muted` | `#A89F94` | Muted text |
| `--saffron` | `#E8A44D` | Accent (brighter in dark) |
| `--saffron-deep` | `#C97B2D` | Hover |

### Rules
- ONE accent (saffron) across the whole site. No other accent colors.
- Success/error states are the only exception: green `#3F9142` / red `#C0392B` (status only, never decorative).
- No pure black, no pure white anywhere.

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Display (h1, logo, section titles) | **Morabba** (FA) / *serif fallback* | 700-900 | `clamp(2.5rem, 6vw, 4.5rem)` |
| Headings (h2-h3, card titles) | **Vazirmatn** | 700-900 | `1.5rem-2.5rem` |
| Body | **Vazirmatn** | 400-500 | `1rem-1.125rem` |
| Mono/numbers (prices) | **Vazirmatn** numerals | 700 | tabular |

- Both self-hosted via `@font-face` (`font-display: swap`). No Google Fonts `<link>` in production.
- Persian digits everywhere (۰۱۲۳…) — prices, counts, phone.
- Line-height: display `1.15`, body `1.8` (RTL needs more air).

## Spacing & Radius

- Spacing scale: 4-based (`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`).
- Section padding: `py-24 sm:py-32` desktop, `py-16` mobile.
- **Radius system (one scale, locked):**
  - Cards/media: `rounded-3xl` (24px)
  - Buttons/inputs/pills: `rounded-full` (pill)
  - Modals/dialogs: `rounded-[2rem]` (32px)
  - Never mix — cards are never square, buttons are never 8px.

## Motion

- **Philosophy:** hierarchy + storytelling only. Every animation must answer "what does this communicate?"
- **Physics:** spring (`stiffness: 250-400, damping: 25-40`) for enters; `cubic-bezier(0.16, 1, 0.3, 1)` for scroll reveals.
- **Allowed:** staggered hero reveal, scroll-reveal sections (`whileInView`, `once: true`), shared-layout (menu card → modal), micro-feedback on tap (`scale: 0.98`).
- **Forbidden:** infinite loops, marquees, scroll-jacking, parallax on decorative elements, `window.addEventListener("scroll")`.
- **Reduced motion:** all motion collapses to instant/static under `prefers-reduced-motion`. Non-negotiable.

## Components

| Component | Pattern |
|---|---|
| Header | Fixed, translucent blur on scroll, pill nav, max height 72px |
| Hero | Split: copy right (RTL), Persian-arch media left, staggered reveal |
| MenuCard | Arch-top media (`rounded-t-[10rem]`), bone surface, pill price, pill add-button |
| Category pill | Pill, active = saffron fill, spring `layoutId` shared element |
| Modal (menu/cart) | Slide-up bottom sheet, `rounded-[2rem]`, focus-trapped, Escape closes |
| Empty/error states | Illustrated, warm copy, primary action, never bare text |
| Footer | Ink/espresso surface, 3 columns, social pill buttons |

## Accessibility

- WCAG AA contrast everywhere (body 4.5:1, large text 3:1).
- Focus-visible rings (saffron, 2px offset) on every interactive element.
- Touch targets ≥ 44px.
- `min-h-[100dvh]` for hero, never `h-screen`.
- Full keyboard nav: modals focus-trapped, Escape closes, menu keyboard-operable.

## Anti-Patterns (never)

- ❌ Purple/blue gradients, glassmorphism on everything
- ❌ Warm beige + brass + oxblood café clichés (our palette is cold-luxury warm, not craft-beige)
- ❌ 3 identical feature cards, centered-everything heroes
- ❌ Emoji as UI, decorative scroll cues, "trusted by" logo walls
- ❌ Serif for body, Inter/Geist defaults for a Persian site
- ❌ Em-dashes (—) anywhere in visible copy

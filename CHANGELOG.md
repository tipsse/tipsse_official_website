# Changelog

All notable changes to the TIPSSE official website.

---

## [Unreleased]

### Planned
- Member profile section
- Membership application flow
- News/blog feed
- SEO meta tags & Open Graph
- Favicon from logo icon

---

## [0.3.0] — 2026-03-30

### Added
- Official TIPSSE logo placed in Navbar, Hero section, and Footer
- Logo background removed using luminosity-based alpha extraction (Pillow)
- Two logo variants generated: `logo-white.png` (white/transparent) and `logo-blue.png` (accent blue #4f8ef7)
- `TODO.md` and `CHANGELOG.md` for project tracking

### Changed
- Switched all `logo.png` references to `logo-blue.png`
- Removed `mix-blend-mode: screen` hack — no longer needed with proper transparency
- Hero logo size increased to 60px height for better visibility

---

## [0.2.0] — 2026-03-30

### Added
- Full Chinese / English language toggle button in Navbar
- `data-i18n` and `data-i18n-html` attribute system for all translatable elements
- Language preference persisted in `localStorage`
- Complete English translation for all sections
- Hero title overflow fix for long English text (`clamp` font-size, `max-width` subtitle)

### Changed
- Navbar layout: added `.nav-right` wrapper for lang button + hamburger menu

---

## [0.1.0] — 2026-03-30

### Added
- Initial website build — single-page frontend, no framework dependencies
- **Sections:** Hero, About, Four Groups, Projects, Roadmap (5 phases), Events, Contact, Footer
- Dark space theme with CSS custom properties
- Animated starfield (JS canvas-free, pure DOM)
- Scroll-triggered entry animations via `IntersectionObserver`
- Animated number counters in About stats
- Responsive design (mobile hamburger menu, fluid typography with `clamp`)
- GitHub Actions workflow (`.github/workflows/deploy.yml`) for automatic GitHub Pages deployment
- Local dev server via `python3 -m http.server 3333`

### Content
- Organization info sourced and adapted from tipsse.org
- Roadmap: 5 phases from 2019 foundation to 2028+ deep space goals
- Activity log: 5 events from 2022–2023

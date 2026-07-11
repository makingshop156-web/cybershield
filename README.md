# CYBERSHIELD

**The Ultimate InfoSec Training & Certification Platform**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

<img width="100%" src="demo.png" alt="CyberShield Platform Preview">

---

## Key Features

- **Interactive Virtual Terminal** — Browser-based Linux shell simulation with 20+ mock commands (nmap, netstat, tcpdump, curl, dig, traceroute, ssh), a writable virtual filesystem with permission model, and CTF flag challenges embedded in `/root/`, `/home/learner/`, and `/var/log/`.

- **PvP Arena with ELO Matchmaking** — Real-time 1v1 cybersecurity duels using Supabase Realtime. Players compete to capture CTF flags under time pressure. ELO rating system (K-factor 32) with bot mode training and live radar visualization of nearby opponents.

- **Certification Engine** — On-demand certificate minting via admin dashboard. A4 landscape (842×595) with SVG ornamental gold border, vector CEO signature (9-path calligraphic), gold seal, and Playfair Display typography. Export to PNG via `html-to-image` with `document.fonts.ready` synchronization.

- **Anti-Cheat Examination System** — 30-minute timed exams with 10 mixed-format questions (multiple choice + flag decoding). Three-strike tab-switch detection via `document.visibilitychange` and `window.blur` events. Lockdown wrapper blocks right-click, copy/paste, F12 DevTools, and Ctrl+Shift+I.

- **Public Portfolio Pages** — Shareable `https://cybershield-nu-one.vercel.app/p/[username]` profiles with GitHub-style 365-day heatmap, badge tiers (Novice → Warrior → Hacker → Elite → God Mode), certificate trophy room, and social links (Facebook, TikTok).

- **Advanced Learning Modules** — 2,100+ lines of educational content spanning Reconnaissance, Network Security, Web Security, Cryptography, and a deep-dive SQL Injection module (1,500+ words, 10 multi-tier questions, FastBank e-banking incident lab).

- **CTF Lab** — Eight interactive challenges with flag validation, leaderboard, and real-time terminal access inside the browser.

- **Role-Based Access Control** — Three-tier hierarchy (USER, ADMIN, OWNER) with protected routes, admin-only certificate minting, and God Mode bypass. Owner emails bootstrap automatically on registration.

---

## Technical Challenges Overcome

### 1. High-Fidelity Certificate Export with Vector SVG Signature

Rasterizing an A4-sized DOM element containing mixed SVG, custom web fonts, and complex CSS to a crisp PNG presented multiple failure points.

**Problem:** `html-to-image` does not respect CSS `border-image` properties — the ornamental gold border would render as empty space. Custom fonts (Playfair Display, Great Vibes) would fall back to system fonts when the snapshot was taken before font loading completed, producing inconsistent results across machines.

**Solution:** The gold border was reimplemented as pure SVG using `<rect>` elements with `strokeDasharray`, `strokeLinejoin="round"`, and nested corner-ornament `<path>` segments — completely bypassing CSS border-image. Font readiness is guaranteed by awaiting `document.fonts.ready` before calling `toPng()`. The CEO signature is not a font-dependent cursive string but a 9-path SVG calligraphic path with variable `stroke-width` (1.0–2.4), ensuring pixel-identical reproduction regardless of the host system's font library.

```
// CertificatePreview.tsx — signature path (abbreviated)
<path d="M 120 225 Q 130 215 ..." fill="none" stroke="#1a1a2e" stroke-width="1.5" />
```

### 2. Anti-Cheat System via Browser Visibility API

Preventing exam cheating in a client-only environment without a proctoring extension or native app.

**Problem:** JavaScript running in a browser tab has no reliable way to detect if the user opened another tab to search for answers. `visibilitychange` fires when the tab is hidden, but `window.blur` can trigger on innocuous events (Alt+Tab, notification popups). A naive single-strike rule would produce false positives and frustrate legitimate users.

**Solution:** A three-strike progressive enforcement model. Each `visibilitychange` (hidden) or `window.blur` event increments a counter. Only the third strike triggers the irreversible force-submit:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐
│ Strike 1 │ →  │ Strike 2 │ →  │ Strike 3 │ →  │ Force Submit │
│ Warning  │    │ Warning  │    │ Lock     │    │ score = 0    │
└──────────┘    └──────────┘    └──────────┘    └──────────────┘
```

The `LockdownWrapper` component independently blocks keyboard shortcuts for DevTools (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U), context menu, copy/paste, and drag operations — implemented as a React portal with `useEffect` cleanup to prevent memory leaks.

### 3. State Security & Ghost-Data Prevention

A mock-authentication system using localStorage must not leak session data, allow role escalation, or leave ghost records after logout.

**Problem:** localStorage-based auth has no built-in expiry mechanism — closing the browser does not clear sessions. A user who logs out and logs in as a different identity would inherit stale progress data (ghost lessons, orphaned certificates). Role data stored client-side can be trivially modified via DevTools.

**Solution:** Sessions carry a 7-day TTL validated on every `getSession()` call. Logout triggers an atomic wipe of all CyberShield-prefixed keys (`cybershield-session`, `cybershield-users`, `cybershield-progress`, `cybershield-speedrun`, `cybershield-portfolio-public`, `cybershield-social-links`) plus exam-specific state — eliminating ghost data entirely. Server-side API endpoints (`/api/exam/submit`, `/api/exam/mint`) do not trust request body claims; they extract identity from `x-user-id` / `x-user-role` headers injected by the middleware and verified against the session. Role escalation via DevTools is ineffective against these endpoints — the server independently validates the role before processing.

```
// middleware.ts — header injection on every API request
"Access-Control-Allow-Headers": "Content-Type, Authorization, x-user-id, x-user-role, x-user-email"
```

Edge rate limiting (10 requests/minute/IP with sliding window) and a server-side token bucket (10 max, 1 token/sec refill, burst 20) prevent brute-force attacks on the auth layer.

---

## Architecture & Setup

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Vercel Edge Network                          │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                      Next.js 14 App Router                     │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │  │
│  │  │  Auth    │  │  Arena   │  │  Exam    │  │  Certificate  │  │  │
│  │  │  (RBAC)  │  │ (PvP+Bot)│  │ (Anti-C) │  │  (Mint+DL)   │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │  │
│  │  │  Virtual │  │  CTF Lab │  │ Learning │  │   Portfolio  │  │  │
│  │  │ Terminal │  │  (8 Chal)│  │ Modules  │  │  (Public)    │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────┘  │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │              Edge Middleware (Rate Limit + CORS)         │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                           │                                         │
│                    Supabase Realtime                                 │
│                    (Lobby, Match History, ELO)                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- (Optional) Supabase project for persistent storage

### Quick Start

```bash
# Clone the repository
git clone https://github.com/makingshop156-web/cybershield.git
cd cybershield

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (optional for offline mode)

# Start development server
npm run dev
# → http://localhost:3000
```

### Seed Demo Data

```bash
node seed.js
# Copy the output and paste into browser DevTools console
# Creates: demo user (hocvien@demo.local), admin (admin@demo.local),
# 24 lessons completed, 12-day streak, 30-day heatmap, ELO 1420,
# 3 certificates, social links
```

### Production Build

```bash
npm run ci        # type-check + lint + build (CI pipeline)
npm run build     # standalone build
npm start         # production server
```

### One-Click Deploy

```bash
node scripts/deploy.js   # GitHub push + Vercel deploy
```

---

Built with React 18, Next.js 14, TypeScript 5, Tailwind CSS 3, Supabase, and Framer Motion.

**Author:** Nguyễn Tới — Independent Security Researcher & Full-Stack Engineer

**Production:** [https://cybershield-nu-one.vercel.app](https://cybershield-nu-one.vercel.app)

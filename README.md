# CyberShield

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

![CyberShield Demo](./demo.png)

A personal project I built to learn full-stack development. It's an interactive online exam platform focused on cybersecurity training, built to solve real-world problems like basic exam cheating and automated certificate generation.

## 🚀 Tech Stack

- **Frontend:** React, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (via Supabase)
- **Tools/Libraries:** html-to-image, JSON Web Tokens (JWT)

## ✨ Features

- **Anti-Cheat Exam System** — Users take a timed multiple-choice test. Implemented the Page Visibility API to detect tab-switching, warning users and auto-submitting the exam after 3 strikes to prevent basic cheating.
- **High-Fidelity Certificate Export** — After passing, users receive a dynamically generated certificate (with an SVG signature) that can be downloaded as a high-resolution PNG.
- **Basic Authentication** — Login and registration with role-based access (USER, ADMIN) utilizing localStorage and server-side validation.
- **Public Portfolio** — Each user gets a public profile displaying their heatmap, badges, and earned certificates.

## 📦 Folder Structure

```
cybershield/
├── app/                  # Next.js App Router pages
│   ├── (dashboard)/      # Protected routes (exam, arena, profile, etc.)
│   └── api/              # API routes (exam submit, certificate mint)
├── components/           # React components
│   ├── features/         # Feature-specific (certificate, exam, arena, portfolio)
│   ├── layout/           # Navigation, headers
│   └── ui/               # Shared UI primitives (Button, Card, Input)
├── lib/                  # Business logic, hooks, services
│   ├── auth/             # Auth config, service, session
│   ├── exam/             # Exam config, grading, questions
│   ├── hooks/            # React hooks (useAntiCheat, useExam, useAuth)
│   └── utils.ts          # Helpers (cn, storage, formatting)
├── public/               # Static assets (SVG icons, manifest)
├── middleware.ts          # Edge rate limiting + CORS
└── next.config.js         # Build config (CSP, HSTS, compression)
```

## 🧠 Lessons Learned

The hardest technical challenge was generating the certificate image. I used `html-to-image` to turn a React DOM component into a downloadable PNG. At first, custom fonts wouldn't load in time, resulting in exported certificates with broken fallback fonts and misaligned layouts.

Through research, I learned about the Font Loading API. By forcing the browser to await `document.fonts.ready` before calling `toPng()`, the canvas capture is delayed until all typographic assets are fully rendered. It seems obvious now, but figuring out the race condition between CSS loading and Canvas rasterization was a massive learning moment.

```javascript
// Awaiting fonts to ensure pixel-perfect canvas rendering
await document.fonts.ready;
const blob = await toPng(certificateElement, { quality: 1, pixelRatio: 2 });
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/makingshop156-web/cybershield.git
cd cybershield
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb://localhost:27017/cybershield

# JWT
JWT_SECRET=your-secret-key-here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

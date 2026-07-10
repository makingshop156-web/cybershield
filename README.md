# CyberShield — Học bảo mật từ thực hành

[![Vercel](https://img.shields.io/badge/deploy-vercel-22d3ee?logo=vercel)](https://cybershield-nu-one.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-000?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ecf8e?logo=supabase)](https://supabase.com)

Nền tảng E-learning Cybersecurity với terminal ảo, đấu trường 1v1 real-time, CTF gamification, và lộ trình từ zero đến hero.

## Kiến trúc

```
├── app/               # Next.js 14 App Router
│   ├── (dashboard)/   # Roadmap, Arena, Lab, Docs, Profile
│   └── layout.tsx     # Root layout + PWA meta
├── components/
│   ├── features/      # Terminal, Arena, Docs, Lesson...
│   └── ui/            # Button, Toast, GlassCard...
├── lib/
│   ├── hooks/         # useArenaMatch, useArenaBattle, useLessonData...
│   ├── arena/         # Arena service + Elo calculation
│   ├── security/      # Sanitize + Rate limit
│   └── supabase/      # Client singleton (mock fallback)
└── supabase/          # SQL migration scripts
```

## Tính năng chính

| Tính năng | Mô tả |
|---|---|
| **Terminal ảo** | Xterm.js với virtual filesystem, 30+ lệnh, 3 CTF flag ẩn |
| **Đấu trường 1v1** | Matchmaking real-time, CTF duel, Elo ranking (K=32) |
| **Lộ trình** | 12 module (cơ bản + nâng cao), 19+ bài học, badge system |
| **PWA** | Manifest, standalone mode, install prompt |
| **Docs** | Hướng dẫn tích hợp sẵn tại `/docs` |
| **Security** | Irony Guard — sanitize input, rate limit, CSP headers |

## Bắt đầu

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
npm run type-check # TypeScript
```

### Biến môi trường

Tạo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Không cần Supabase để chạy — hệ thống tự động fallback sang offline mode với local store.

## Deploy

```bash
vercel deploy --prod
```

Production: [https://cybershield-nu-one.vercel.app](https://cybershield-nu-one.vercel.app)

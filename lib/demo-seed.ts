import { USERS_KEY, SESSION_KEY, OWNER_EMAILS } from "./auth/config";
import type { Role } from "./auth/config";

const PROGRESS_KEY = "cybershield_progress_v2";
const SOCIAL_KEY = "cybershield-social-links";
const ELO_KEY = "cybershield-elo";
const PORTFOLIO_KEY = "cybershield-portfolio-public";
const CERT_PREFIX = "cybershield-cert-";

const ALL_LESSONS = [
  "lesson-1-1","lesson-1-2","lesson-1-3","lesson-1-4","lesson-1-5",
  "lesson-2-1","lesson-2-2","lesson-2-3","lesson-2-4","lesson-2-5","lesson-2-6",
  "lesson-3-1","lesson-3-2","lesson-3-3","lesson-3-4","lesson-3-5","lesson-3-6",
  "lesson-4-1","lesson-4-2","lesson-4-3","lesson-4-4",
  "adv-lesson-1-1","adv-lesson-1-2","adv-lesson-1-3",
];

function generateHeatmap(): Record<string, number> {
  const data: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    data[d.toISOString().slice(0, 10)] = Math.floor(Math.random() * 5) + 1;
  }
  for (let i = 30; i < 365; i++) {
    if (Math.random() < 0.4) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data[d.toISOString().slice(0, 10)] = Math.floor(Math.random() * 5) + 1;
    }
  }
  return data;
}

function uid(): string {
  return "u_" + Math.random().toString(36).substring(2, 10);
}

export function seedDemoUser(role: "USER" | "ADMIN") {
  const now = Date.now();
  const isAdmin = role === "ADMIN";
  const email = isAdmin ? "admin@demo.local" : "hocvien@demo.local";
  const displayName = isAdmin ? "Admin Demo" : "Học viên Demo";
  const password = "demo123";
  const userId = uid();

  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const existingIndex = users.findIndex((u: any) => u.email === email);
  let user: any;
  if (existingIndex >= 0) {
    user = users[existingIndex];
    user.password = password;
    user.role = role;
    user.displayName = displayName;
  } else {
    user = { id: userId, email, displayName, password, role };
    users.push(user);
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  const session = {
    user: { id: user.id, email, displayName, role },
    expiresAt: now + 365 * 24 * 60 * 60 * 1000,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  const completedCount = isAdmin ? ALL_LESSONS.length : Math.floor(ALL_LESSONS.length * 0.85);
  const completed = ALL_LESSONS.slice(0, completedCount);

  const progress = {
    completedLessons: completed,
    streak: isAdmin ? 30 : 12,
    lastStudyDate: new Date().toISOString().slice(0, 10),
    badges: isAdmin
      ? ["first_lesson", "speedrun", "week_streak", "month_streak", "module_1", "module_2", "module_3", "module_4", "all_modules"]
      : ["first_lesson", "speedrun", "week_streak", "module_1", "module_2"],
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

  localStorage.setItem(ELO_KEY, JSON.stringify(isAdmin ? 1850 : 1420));

  localStorage.setItem(SOCIAL_KEY, JSON.stringify({
    facebookUrl: "https://facebook.com/cybershield",
    tiktokUrl: "https://tiktok.com/@cybershield",
  }));

  localStorage.setItem(PORTFOLIO_KEY, "true");

  for (let i = 1; i <= 3; i++) {
    const cert = {
      recipientName: displayName,
      courseName: i === 1 ? "Khóa học Cơ bản về Bảo mật CyberShield"
        : i === 2 ? "SQL Injection Chuyên sâu Thực Chiến"
        : "Penetration Testing Web Application",
      issueDate: new Date(now - i * 30 * 24 * 60 * 60 * 1000).toISOString(),
      hashId: `CYB-DEMO-${i}${now.toString(36).toUpperCase()}`,
      score: i === 1 ? 9 : i === 2 ? 8 : 10,
      total: 10,
    };
    localStorage.setItem(CERT_PREFIX + i, JSON.stringify(cert));
  }

  localStorage.setItem("cybershield-heatmap", JSON.stringify(generateHeatmap()));
}

import { ENABLE_AUTH, SESSION_KEY, USERS_KEY, OWNER_EMAILS, type Role } from "./config";
import type { AuthUser, AuthSession } from "./types";

interface StoredUser {
  id: string;
  email: string;
  displayName: string;
  password: string;
  role: Role;
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function writeUsers(users: StoredUser[]) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch { /* ignore */ }
}

function readSession(): AuthSession | null {
  if (!ENABLE_AUTH) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch { return null; }
}

function writeSession(session: AuthSession | null) {
  if (!ENABLE_AUTH) return;
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else localStorage.removeItem(SESSION_KEY);
  } catch { /* ignore */ }
}

export const authService = {
  getSession(): AuthSession | null {
    return readSession();
  },

  async register(email: string, password: string, displayName: string): Promise<{ user: AuthUser; error?: string }> {
    const users = readUsers();
    if (users.find((u) => u.email === email.toLowerCase())) {
      return { user: null as unknown as AuthUser, error: "Email đã được đăng ký" };
    }
    const role: Role = OWNER_EMAILS.includes(email.toLowerCase()) ? "OWNER" : "USER";
    const id = "u_" + Math.random().toString(36).substring(2, 10);
    const newUser: StoredUser = { id, email: email.toLowerCase(), displayName, password, role };
    users.push(newUser);
    writeUsers(users);
    const user: AuthUser = { id, email: email.toLowerCase(), displayName, role };
    const session: AuthSession = { user, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 };
    writeSession(session);
    return { user };
  },

  async login(email: string, password: string): Promise<{ user: AuthUser; error?: string }> {
    const users = readUsers();
    const found = users.find((u) => u.email === email.toLowerCase());
    if (!found || found.password !== password) {
      return { user: null as unknown as AuthUser, error: "Sai email hoặc mật khẩu" };
    }
    const user: AuthUser = { id: found.id, email: found.email, displayName: found.displayName, role: found.role };
    const session: AuthSession = { user, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 };
    writeSession(session);
    return { user };
  },

  async logout(): Promise<void> {
    writeSession(null);
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    const session = readSession();
    return session?.user ?? null;
  },

  async mintCertificate(email: string, userId: string): Promise<{ ok: boolean; emailSent?: boolean; error?: string }> {
    const session = readSession();
    if (!session || session.user.role !== "OWNER") {
      return { ok: false, error: "Unauthorized — OWNER role required" };
    }
    try {
      const res = await fetch("/api/exam/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-role": "OWNER",
          "x-user-id": userId,
        },
        body: JSON.stringify({ email, score: 10, total: 10 }),
      });
      const data = await res.json();
      return { ok: true, emailSent: data.email === "sent" };
    } catch {
      return { ok: false, error: "Không thể gửi chứng chỉ" };
    }
  },
};

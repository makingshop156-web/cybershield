"use client";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { seedDemoUser } from "@/lib/demo-seed";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) { setError("Vui lòng nhập email và mật khẩu"); return; }
    setLoading(true);
    const err = await login(email, password);
    setLoading(false);
    if (err) setError(err);
  };

  const demoLogin = async (role: "USER" | "ADMIN") => {
    setLoading(true);
    setError("");
    seedDemoUser(role);
    const demoEmail = role === "ADMIN" ? "admin@demo.local" : "hocvien@demo.local";
    const err = await login(demoEmail, "demo123");
    if (err) setError(err);
    else router.push("/");
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">Đăng nhập</h1>
        <p className="text-sm text-cyber-muted mt-2">Tiếp tục hành trình bảo mật</p>
      </div>

      <form onSubmit={handle} className="glass-enhanced rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs text-cyber-muted mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-cyber-muted mb-1.5">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-lg border border-cyber-accent/40 transition-all text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <p className="text-xs text-center text-cyber-muted">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-cyber-accent hover:underline">Đăng ký</Link>
        </p>
      </form>

      <div className="mt-6 p-4 glass-enhanced rounded-xl space-y-3">
        <p className="text-xs text-cyber-muted text-center">Trải nghiệm nhanh (1 chạm)</p>
        <div className="flex gap-2">
          <button
            onClick={() => demoLogin("USER")}
            disabled={loading}
            className="flex-1 py-2.5 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm font-semibold disabled:opacity-50"
          >
            🧑‍🎓 Học viên
          </button>
          <button
            onClick={() => demoLogin("ADMIN")}
            disabled={loading}
            className="flex-1 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/30 transition-all text-sm font-semibold disabled:opacity-50"
          >
            🛡️ Admin
          </button>
        </div>
      </div>
    </motion.div>
  );
}

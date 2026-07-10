"use client";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

export default function RegisterForm() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim() || !name.trim()) { setError("Vui lòng điền đầy đủ thông tin"); return; }
    if (password.length < 6) { setError("Mật khẩu phải có ít nhất 6 ký tự"); return; }
    setLoading(true);
    const err = await register(email, password, name);
    setLoading(false);
    if (err) setError(err);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">Đăng ký</h1>
        <p className="text-sm text-cyber-muted mt-2">Bắt đầu hành trình bảo mật của bạn</p>
      </div>

      <form onSubmit={handle} className="glass-enhanced rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-xs text-cyber-muted mb-1.5">Tên hiển thị</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
          />
        </div>

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
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-xs text-center text-cyber-muted">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-cyber-accent hover:underline">Đăng nhập</Link>
        </p>
      </form>
    </motion.div>
  );
}

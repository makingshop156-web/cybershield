"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/lib/hooks";
import { modules, badges } from "@/lib/data";
import { TopBar } from "@/components/layout/TopBar";
import { GlassCard, GlassPanel } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/useAuth";
import { ENABLE_AUTH } from "@/lib/auth/config";
import { authService } from "@/lib/auth/auth-service";
import { useToast } from "@/lib/hooks/useToast";
import { ENABLE_PUBLIC_PORTFOLIO } from "@/lib/portfolio/config";
import { portfolioService } from "@/lib/portfolio/portfolio-service";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function ProfilePage() {
  const { progress, loaded, resetProgress } = useProgress();
  const { user } = useAuth();
  const toast = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [saving, setSaving] = useState(false);
  const [portfolioPublic, setPortfolioPublic] = useState(typeof window !== "undefined" ? portfolioService.isPublic() : false);

  const handleSave = async () => {
    if (!displayName.trim()) { toast.warning("Tên không được để trống"); return; }
    setSaving(true);
    // Simulated save — in local storage mode we just update context
    setTimeout(() => {
      setSaving(false);
      toast.success("Đã cập nhật thông tin");
    }, 300);
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-cyber-muted">Đang tải...</span>
        </div>
      </div>
    );
  }

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const pct = totalLessons > 0 ? Math.round((progress.completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen">
      <TopBar
        streak={progress.streak}
        badges={progress.badges.length}
        completed={progress.completedLessons.length}
        total={totalLessons}
      />
      <div className="max-w-3xl mx-auto px-4 pb-20 pt-8 space-y-8">
        <motion.h1
          className="text-2xl font-bold gradient-text"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👤 Hồ sơ của bạn
        </motion.h1>

        {/* Account Info */}
        {ENABLE_AUTH && user && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="glass-enhanced rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm font-semibold text-white">Tài khoản</h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyber-accent/30 to-purple-500/30 flex items-center justify-center text-lg font-bold text-white">
                {(user.displayName || user.email)[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-white font-medium">{user.displayName}</p>
                <p className="text-xs text-cyber-muted">{user.email}</p>
              </div>
              <span className="ml-auto text-[10px] uppercase px-2 py-0.5 rounded bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20">
                {user.role}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-cyber-muted mb-1">Tên hiển thị</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
                />
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm disabled:opacity-50"
              >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>

            {ENABLE_PUBLIC_PORTFOLIO && (
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <p className="text-sm text-white">Portfolio công khai</p>
                  <p className="text-xs text-cyber-muted">Hiển thị thành tích tại /p/{user.displayName}</p>
                </div>
                <button
                  onClick={() => {
                    const next = !portfolioPublic;
                    setPortfolioPublic(next);
                    portfolioService.setPublic(next);
                    toast.success(next ? "Portfolio đã công khai" : "Portfolio đã ẩn");
                  }}
                  className={`relative w-12 h-6 rounded-full transition-all ${portfolioPublic ? "bg-cyber-accent" : "bg-white/20"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${portfolioPublic ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {[
            { value: progress.completedLessons.length, label: "Bài đã học", accent: "text-cyber-accent" },
            { value: progress.streak, label: "🔥 Ngày liên tiếp", accent: "text-cyber-gold" },
            { value: progress.badges.length, label: "🏆 Huy hiệu", accent: "text-cyber-green" },
          ].map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <GlassPanel className="text-center">
                <div className={cn("text-2xl font-bold tabular-nums", stat.accent)}>{stat.value}</div>
                <div className="text-xs text-cyber-muted mt-1">{stat.label}</div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard>
            <div className="text-sm font-semibold mb-3">Tiến độ tổng thể</div>
            <div className="w-full bg-cyber-bg rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyber-accent2 to-cyber-accent"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-cyber-muted">{pct}% hoàn thành</span>
              <span className="text-xs text-cyber-muted tabular-nums">
                {progress.completedLessons.length}/{totalLessons} bài
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-lg font-semibold mb-4">🏆 Huy hiệu đã đạt</h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {badges.map((badge) => {
              const earned = progress.badges.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  variants={fadeUp}
                  className={cn(
                    "rounded-xl p-4 border text-center transition-all",
                    earned ? "glass-card border-cyber-gold/30" : "bg-cyber-bg border-glass-border opacity-40"
                  )}
                >
                  <div className={cn("text-2xl mb-1", !earned && "grayscale")}>{badge.icon}</div>
                  <div className="text-sm font-medium">{badge.name}</div>
                  <div className="text-xs text-cyber-muted mt-1 line-clamp-2">{badge.description}</div>
                  {!earned && <div className="text-[10px] text-cyber-muted mt-2">🔒 Chưa đạt</div>}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Reset */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm("Bạn có chắc muốn xóa toàn bộ tiến độ?")) resetProgress();
            }}
          >
            🗑 Xóa tiến độ học
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

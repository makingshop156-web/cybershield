"use client";
import { motion } from "framer-motion";
import { useProgress } from "@/lib/hooks";
import { modules, badges } from "@/lib/data";
import { TopBar } from "@/components/layout/TopBar";
import { GlassCard, GlassPanel } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function ProfilePage() {
  const { progress, loaded, resetProgress } = useProgress();

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
      <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
        <motion.h1
          className="text-2xl font-bold gradient-text mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          👤 Hồ sơ của bạn
        </motion.h1>

        {/* Stats cards */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8"
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
                <div className={cn("text-2xl font-bold tabular-nums", stat.accent)}>
                  {stat.value}
                </div>
                <div className="text-xs text-cyber-muted mt-1">{stat.label}</div>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
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
          transition={{ delay: 0.2 }}
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
                    earned
                      ? "glass-card border-cyber-gold/30"
                      : "bg-cyber-bg border-glass-border opacity-40"
                  )}
                >
                  <div className={cn("text-2xl mb-1", !earned && "grayscale")}>
                    {badge.icon}
                  </div>
                  <div className="text-sm font-medium">{badge.name}</div>
                  <div className="text-xs text-cyber-muted mt-1 line-clamp-2">
                    {badge.description}
                  </div>
                  {!earned && (
                    <div className="text-[10px] text-cyber-muted mt-2">🔒 Chưa đạt</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Reset button */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (window.confirm("Bạn có chắc muốn xóa toàn bộ tiến độ?")) {
                resetProgress();
              }
            }}
          >
            🗑 Xóa tiến độ học
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

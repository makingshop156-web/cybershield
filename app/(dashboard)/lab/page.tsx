"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { WebTerminal } from "@/components/features/WebTerminal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useProgress } from "@/lib/hooks";
import { modules } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CtfPanel } from "@/components/features/terminal/CtfPanel";
import { Leaderboard } from "@/components/features/terminal/Leaderboard";

const RealTerminal = dynamic(
  () => import("@/components/features/terminal/RealTerminal").then((m) => m.RealTerminal),
  {
    ssr: false,
    loading: () => (
      <div className="h-[460px] glass-enhanced rounded-xl flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-cyber-muted">Đang tải Terminal...</span>
        </div>
      </div>
    ),
  }
);

type TabType = "simulated" | "interactive";

const TABS: { id: TabType; label: string; desc: string }[] = [
  { id: "simulated", label: "📚 Lab mô phỏng", desc: "Click & Play — chọn bài, xem kết quả" },
  { id: "interactive", label: "💻 Terminal thật", desc: "Gõ lệnh thực tế với virtual filesystem" },
];

export default function LabPage() {
  const { progress, loaded } = useProgress();
  const [tab, setTab] = useState<TabType>("simulated");

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

  return (
    <div className="min-h-screen">
      <TopBar
        streak={progress.streak}
        badges={progress.badges.length}
        completed={progress.completedLessons.length}
        total={totalLessons}
      />
      <ErrorBoundary>
        <div className="max-w-6xl mx-auto px-4 pb-20 pt-8">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold gradient-text">🧪 Phòng Lab Ảo</h1>
            <p className="text-sm text-cyber-muted mt-1">
              Click & Play — thực hành an toàn ngay trên trình duyệt
            </p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-6">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "text-left px-4 py-3 rounded-xl border transition-all flex-1",
                  tab === t.id
                    ? "bg-cyber-accent/10 border-cyber-accent/50"
                    : "glass border-glass-border hover:border-cyber-accent/30"
                )}
              >
                <div className="text-sm font-medium">{t.label}</div>
                <div className="text-[11px] text-cyber-muted mt-0.5">{t.desc}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "simulated" ? (
              <WebTerminal />
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <RealTerminal />
                </div>
                <div className="w-full lg:w-80 shrink-0 space-y-4">
                  <CtfPanel />
                  <div className="glass-enhanced rounded-xl p-5">
                    <Leaderboard />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </ErrorBoundary>
    </div>
  );
}

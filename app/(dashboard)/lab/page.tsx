"use client";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { WebTerminal } from "@/components/features/WebTerminal";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useProgress } from "@/lib/hooks";
import { modules } from "@/lib/data";

export default function LabPage() {
  const { progress, loaded } = useProgress();

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
        <div className="max-w-5xl mx-auto px-4 pb-20 pt-8">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold gradient-text">🧪 Phòng Lab Ảo</h1>
            <p className="text-sm text-cyber-muted mt-1">
              Click & Play — thực hành an toàn ngay trên trình duyệt
            </p>
          </motion.div>
          <WebTerminal />
        </div>
      </ErrorBoundary>
    </div>
  );
}

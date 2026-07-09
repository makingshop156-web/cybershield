"use client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress, useSpeedrun } from "@/lib/hooks";
import { modules } from "@/lib/data";
import { TopBar } from "@/components/layout/TopBar";
import { ModuleCard } from "@/components/features/ModuleCard";
import { Button } from "@/components/ui/Button";

const stagger = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function RoadmapPage() {
  const router = useRouter();
  const { progress, loaded } = useProgress();
  const [speedrun, toggleSpeedrun] = useSpeedrun();

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
  const completedCount = progress.completedLessons.length;

  return (
    <div className="min-h-screen">
      <TopBar
        streak={progress.streak}
        badges={progress.badges.length}
        completed={completedCount}
        total={totalLessons}
      />

      <div className="max-w-5xl mx-auto px-4 pb-24">
        <motion.div
          className="flex items-center justify-between mb-8 pt-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-2xl font-bold gradient-text">Lộ trình học</h1>
            <p className="text-sm text-cyber-muted mt-1">
              {completedCount} / {totalLessons} bài đã hoàn thành
            </p>
          </div>
          <Button
            variant={speedrun ? "primary" : "ghost"}
            size="sm"
            onClick={toggleSpeedrun}
          >
            {speedrun ? "⚡ Speedrun" : "📖 Chi tiết"}
          </Button>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-accent/30 via-cyber-accent/10 to-transparent" />

          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {modules.map((mod, mi) => {
                const allDone = mod.lessons.every((l) =>
                  progress.completedLessons.includes(l.id)
                );
                const prevAllDone =
                  mi === 0 ||
                  modules[mi - 1]!.lessons.every((l) =>
                    progress.completedLessons.includes(l.id)
                  );
                const unlocked = mi === 0 || prevAllDone || speedrun;

                return (
                  <motion.div
                    key={mod.id}
                    variants={fadeUp}
                    layout
                  >
                    <ModuleCard
                      module={mod}
                      index={mi}
                      allDone={allDone}
                      unlocked={unlocked}
                      speedrun={speedrun}
                      completedLessons={progress.completedLessons}
                      onStartLesson={(lessonId) =>
                        router.push(`/lessons/${lessonId}`)
                      }
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="relative pl-16 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="absolute left-6 top-0 w-3 h-3 rounded-full bg-gradient-to-r from-cyber-gold to-cyber-accent -translate-x-[5px] shadow-lg shadow-cyber-accent/20" />
            <div className="text-sm text-cyber-muted">🏁 Vạch đích</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

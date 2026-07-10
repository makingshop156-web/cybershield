"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Module } from "@/types";

interface ModuleCardProps {
  module: Module;
  index: number;
  allDone: boolean;
  unlocked: boolean;
  speedrun: boolean;
  completedLessons: string[];
  onStartLesson: (lessonId: string) => void;
}

const GRADIENTS = [
  "from-cyan-500 to-blue-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-emerald-500 to-teal-500",
];

const lessonSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
  mass: 0.8,
};

const cardHoverSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export function ModuleCard({
  module,
  index,
  allDone,
  unlocked,
  speedrun,
  completedLessons,
  onStartLesson,
}: ModuleCardProps) {
  const total = module.lessons.length;
  const done = module.lessons.filter((l) => completedLessons.includes(l.id)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <motion.div
      className="relative pl-16 pb-8 last:pb-0"
      layout
      transition={lessonSpring}
    >
      {/* Timeline dot */}
      <motion.div
        layout
        transition={lessonSpring}
        className={cn(
          "absolute left-4 top-1.5 w-4 h-4 rounded-full border-2 -translate-x-[3px] z-10",
          allDone
            ? "bg-cyber-green border-cyber-green shadow-lg shadow-cyber-green/20"
            : done > 0
            ? "bg-cyber-accent border-cyber-accent shadow-lg shadow-cyber-accent/20"
            : "bg-cyber-bg border-glass-border"
        )}
      >
        {allDone && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-[8px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            ✓
          </motion.span>
        )}
      </motion.div>

      {/* Card */}
      <motion.div
        layout
        transition={lessonSpring}
        whileHover={unlocked && !allDone ? { scale: 1.01, transition: cardHoverSpring } : undefined}
        className={cn(
          "glass-card rounded-xl p-5",
          unlocked && !allDone && "hover:shadow-glow cursor-pointer",
          !unlocked && !speedrun && "opacity-50"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -3 }}
              transition={cardHoverSpring}
              className={cn(
                "w-8 h-8 rounded-lg bg-gradient-to-br shrink-0 flex items-center justify-center text-sm font-bold text-white",
                GRADIENTS[index % GRADIENTS.length]
              )}
            >
              {index + 1}
            </motion.div>
            <div className="min-w-0">
              <h2 className="font-semibold text-base truncate">
                {module.title}
              </h2>
              <p className="text-xs text-cyber-muted mt-0.5 line-clamp-2">
                {module.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs shrink-0 ml-3">
            <span className="text-cyber-muted tabular-nums">{pct}%</span>
              <div className="w-16 h-1.5 bg-cyber-bg rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyber-accent2 to-cyber-accent origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: pct / 100 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
          </div>
        </div>

        {/* Goal */}
        <div className="text-xs text-cyber-muted mb-3 flex items-center gap-1.5">
          <span>🎯</span>
          <span className="line-clamp-2">{module.goal}</span>
        </div>

        {/* Locked state */}
        {!unlocked && !speedrun && (
          <div className="text-xs text-cyber-muted/60 flex items-center gap-2 py-2">
            <span>🔒</span>
            <span>Hoàn thành module trước để mở khóa</span>
          </div>
        )}

        {/* Lessons */}
        {unlocked && (
          <motion.div
            className="space-y-1"
            variants={{
              show: {
                transition: { staggerChildren: 0.05 },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {module.lessons.map((lesson) => {
              const completed = completedLessons.includes(lesson.id);
              return (
                <motion.button
                  key={lesson.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={lessonSpring}
                  whileHover={{ scale: 1.01, x: 4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStartLesson(lesson.id)}
                  className={cn(
                    "w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-xs",
                    completed
                      ? "bg-cyber-green/5 text-cyber-muted"
                      : "bg-glass-white hover:bg-glass-hover text-cyber-text"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {completed ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="text-cyber-green shrink-0 text-xs"
                      >
                        ✅
                      </motion.span>
                    ) : (
                      <span
                        className={cn(
                          "w-3.5 h-3.5 rounded-full border-2 shrink-0",
                          "border-glass-border"
                        )}
                      />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-cyber-muted">{lesson.estMinutes}p</span>
                    {!completed && (
                      <motion.span
                        className="text-cyber-accent text-xs"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

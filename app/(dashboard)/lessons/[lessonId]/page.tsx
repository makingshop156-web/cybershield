"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, glossary } from "@/lib/data";
import { useProgress } from "@/lib/hooks";
import { TopBar } from "@/components/layout/TopBar";
import { GlossaryToggle } from "@/components/features/GlossaryToggle";
import { InteractiveExercise } from "@/components/features/InteractiveExercise";
import { Timer } from "@/components/features/Timer";
import { AIChat } from "@/components/features/AIChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { GlossaryEntry } from "@/types";

function renderWithGlossary(text: string, entries: GlossaryEntry[]): React.ReactNode {
  const sorted = [...entries].sort((a, b) => b.term.length - a.term.length);
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let found = false;
    for (const entry of sorted) {
      const idx = remaining.indexOf(entry.term);
      if (idx >= 0) {
        if (idx > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
        }
        parts.push(
          <span
            key={key++}
            className="tooltip-container text-cyber-accent border-b border-dotted border-cyber-accent/40 cursor-help"
          >
            {entry.term}
            <span className="tooltip-text">
              <strong>{entry.term}:</strong> {entry.simple}
              <br />
              <em className="text-cyber-muted text-[11px]">VD: {entry.example}</em>
            </span>
          </span>
        );
        remaining = remaining.slice(idx + entry.term.length);
        found = true;
        break;
      }
    }
    if (!found) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
  }
  return <>{parts}</>;
}

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { progress, loaded, completeLesson } = useProgress();
  const [glossaryOn, setGlossaryOn] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const [done, setDone] = useState(false);

  const lesson = useMemo(() => {
    for (const mod of modules) {
      for (const l of mod.lessons) {
        if (l.id === params.lessonId) return l;
      }
    }
    return null;
  }, [params.lessonId]);

  useEffect(() => {
    if (
      loaded &&
      typeof params.lessonId === "string" &&
      progress.completedLessons.includes(params.lessonId)
    ) {
      setDone(true);
    }
  }, [loaded, progress.completedLessons, params.lessonId]);

  if (!loaded || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-cyber-muted">Đang tải bài học...</span>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    completeLesson(lesson.id);
    setDone(true);
  };

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <ErrorBoundary>
      <div className={cn("min-h-screen", focusOn && "bg-cyber-bg")}>
        {!focusOn && (
          <TopBar
            streak={progress.streak}
            badges={progress.badges.length}
            completed={progress.completedLessons.length}
            total={totalLessons}
          />
        )}

        <div className="max-w-4xl mx-auto px-4 pb-24 pt-8">
          {/* Back + Focus controls */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!focusOn && (
              <button
                onClick={() => router.push("/roadmap")}
                className="text-cyber-muted hover:text-cyber-accent text-sm transition-colors inline-flex items-center gap-1"
              >
                ← Quay lại
              </button>
            )}
            <div className="flex items-center gap-3 ml-auto">
              {!done && <Timer minutes={lesson.estMinutes} />}
              <GlossaryToggle
                enabled={glossaryOn}
                onToggle={() => setGlossaryOn(!glossaryOn)}
              />
              <Button
                variant={focusOn ? "primary" : "ghost"}
                size="sm"
                onClick={() => setFocusOn(!focusOn)}
              >
                {focusOn ? "🚀 Focus" : "🔍 Focus"}
              </Button>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            layout
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, type: "spring", stiffness: 300, damping: 25 }}
          >
            {!focusOn && (
              <div className="text-xs text-cyber-accent font-medium mb-1 uppercase tracking-wider">
                Bài {lesson.order}
              </div>
            )}
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
          </motion.div>

          {/* Analogy */}
          {lesson.analogy && (
            <motion.div
              layout
              className="glass-enhanced rounded-xl p-4 mb-6 border border-amber-500/20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0">💡</span>
                <div>
                  <div className="text-xs text-cyber-gold font-medium mb-1 uppercase tracking-wider">
                    ẨN DỤ THỰC TẾ
                  </div>
                  <div className="text-sm text-cyber-text/90 whitespace-pre-line leading-relaxed">
                    {lesson.analogy}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <ErrorBoundary>
            <motion.div
              layout
              className="glass-enhanced rounded-xl p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="text-sm space-y-3">
                {lesson.content.split("\n").map((line, i) => {
                  const rendered = glossaryOn
                    ? renderWithGlossary(line, glossary)
                    : line;

                  if (line.startsWith("## ")) {
                    return (
                      <h2
                        key={i}
                        className="text-lg font-bold text-cyber-text mt-6 mb-3 first:mt-0"
                      >
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <h3
                        key={i}
                        className="text-base font-semibold text-cyber-accent mt-4 mb-2"
                      >
                        {line.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("| ") || line.startsWith("|---")) {
                    return (
                      <p key={i} className="text-sm text-cyber-muted font-mono">
                        {line}
                      </p>
                    );
                  }
                  if (line.startsWith("```")) {
                    return null;
                  }
                  if (line.startsWith("- **")) {
                    const match = line.match(/- \*\*(.+?)\*\*[—–-]?\s*(.*)/);
                    if (match) {
                      return (
                        <div key={i} className="flex items-start gap-2 my-1">
                          <span className="text-cyber-green mt-1 shrink-0">▸</span>
                          <span>
                            <strong className="text-cyber-text">{match[1]}</strong>
                            {match[2] && <> — {match[2]}</>}
                          </span>
                        </div>
                      );
                    }
                    return <div key={i} className="text-sm my-1">{line}</div>;
                  }
                  if (line.trim() === "") return <div key={i} className="h-2" />;
                  if (glossaryOn && typeof rendered !== "string") {
                    return (
                      <div key={i} className="text-sm leading-relaxed">
                        {rendered}
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="text-sm leading-relaxed">
                      {line}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </ErrorBoundary>

          {/* Exercise */}
          {!done && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="text-xs text-cyber-muted mb-3 uppercase tracking-wider font-medium">
                📝 Bài tập
              </div>
              <ErrorBoundary>
                <InteractiveExercise
                  exercise={lesson.exercise}
                  onComplete={handleComplete}
                />
              </ErrorBoundary>
            </motion.div>
          )}

          {/* Completed state */}
          <AnimatePresence>
            {done && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="glass-enhanced rounded-xl p-6 text-center border border-cyber-green/20"
              >
                <motion.div
                  className="text-4xl mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.1,
                  }}
                >
                  ✅
                </motion.div>
                <div className="text-cyber-green font-semibold mb-1 text-lg">
                  Bài học đã hoàn thành!
                </div>
                <p className="text-sm text-cyber-muted mb-4">
                  Tiếp tục lộ trình của bạn nào!
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push("/roadmap")}
                >
                  ← Quay lại lộ trình
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AIChat />
      </div>
    </ErrorBoundary>
  );
}

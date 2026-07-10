"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules, advancedModules } from "@/lib/data";
import { useProgress } from "@/lib/hooks";
import { useLessonData } from "@/lib/hooks/useLessonData";
import { TopBar } from "@/components/layout/TopBar";
import { InteractiveExercise } from "@/components/features/InteractiveExercise";
import { AIChat } from "@/components/features/AIChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { cn } from "@/lib/utils";
import { LessonHeader } from "@/components/features/lesson/LessonHeader";
import { LessonAnalogy } from "@/components/features/lesson/LessonAnalogy";
import { LessonContent } from "@/components/features/lesson/LessonContent";
import { LessonCompletion } from "@/components/features/lesson/LessonCompletion";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { progress, loaded, completeLesson } = useProgress();
  const { lesson } = useLessonData(params.lessonId);
  const [glossaryOn, setGlossaryOn] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (loaded && lesson && progress.completedLessons.includes(lesson.id)) {
      setDone(true);
    }
  }, [loaded, lesson, progress.completedLessons]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-cyber-muted">Đang tải bài học...</span>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 glass-enhanced p-8 rounded-xl max-w-md text-center">
          <span className="text-4xl">🔍</span>
          <h2 className="text-xl font-semibold text-white">Không tìm thấy bài học</h2>
          <p className="text-sm text-cyber-muted">
            Bài học &ldquo;{params.lessonId}&rdquo; không tồn tại hoặc đã bị xóa.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-2 px-4 py-2 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg transition-colors text-sm"
          >
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    completeLesson(lesson.id);
    setDone(true);
  };

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0) + advancedModules.reduce((s, m) => s + m.lessons.length, 0);

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
          <LessonHeader
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            lessonOrder={lesson.order}
            estMinutes={lesson.estMinutes}
            done={done}
            focusOn={focusOn}
            glossaryOn={glossaryOn}
            onToggleGlossary={() => setGlossaryOn(!glossaryOn)}
            onToggleFocus={() => setFocusOn(!focusOn)}
          />

          {lesson.analogy && <LessonAnalogy analogy={lesson.analogy} />}

          <LessonContent content={lesson.content} glossaryOn={glossaryOn} />

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
                <InteractiveExercise exercise={lesson.exercise} onComplete={handleComplete} />
              </ErrorBoundary>
            </motion.div>
          )}

          <AnimatePresence>{done && <LessonCompletion />}</AnimatePresence>
        </div>

        <AIChat />
      </div>
    </ErrorBoundary>
  );
}

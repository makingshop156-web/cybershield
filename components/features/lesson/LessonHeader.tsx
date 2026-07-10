"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Timer } from "@/components/features/Timer";
import { GlossaryToggle } from "@/components/features/GlossaryToggle";
import { Button } from "@/components/ui/Button";

interface LessonHeaderProps {
  lessonId: string;
  lessonTitle: string;
  lessonOrder: number;
  estMinutes: number;
  done: boolean;
  focusOn: boolean;
  glossaryOn: boolean;
  onToggleGlossary: () => void;
  onToggleFocus: () => void;
}

export function LessonHeader({
  lessonId, lessonTitle, lessonOrder, estMinutes,
  done, focusOn, glossaryOn,
  onToggleGlossary, onToggleFocus,
}: LessonHeaderProps) {
  const router = useRouter();

  return (
    <div>
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
          {!done && <Timer minutes={estMinutes} />}
          <GlossaryToggle enabled={glossaryOn} onToggle={onToggleGlossary} />
          <Button
            variant={focusOn ? "primary" : "ghost"}
            size="sm"
            onClick={onToggleFocus}
          >
            {focusOn ? "🚀 Focus" : "🔍 Focus"}
          </Button>
        </div>
      </motion.div>

      <motion.div
        layout
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, type: "spring", stiffness: 300, damping: 25 }}
      >
        {!focusOn && (
          <div className="text-xs text-cyber-accent font-medium mb-1 uppercase tracking-wider">
            Bài {lessonOrder}
          </div>
        )}
        <h1 className="text-2xl font-bold">{lessonTitle}</h1>
      </motion.div>
    </div>
  );
}

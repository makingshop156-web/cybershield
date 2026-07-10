"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useExam } from "@/lib/hooks/useExam";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { useAntiCheat } from "@/lib/hooks/useAntiCheat";
import { ENABLE_EXAM_MODE } from "@/lib/exam/config";
import { useAuth } from "@/lib/hooks/useAuth";
import ExamHeader from "./ExamHeader";
import ExamQuestion from "./ExamQuestion";
import ExamResultView from "./ExamResult";
import LockdownWrapper from "./LockdownWrapper";
import AntiCheatModal from "./AntiCheatModal";

const MAX_STRIKES = 3;

interface ExamPageProps {
  userId: string;
}

export default function ExamPage({ userId }: ExamPageProps) {
  const { user } = useAuth();
  const {
    phase, answers, result,
    questions, duration, start, setAnswer, submit, forceSubmit, expire,
  } = useExam(userId);

  const { strikes, showWarning, dismissWarning } = useAntiCheat(
    phase === "running" ? forceSubmit : () => {}
  );

  const countdown = useCountdown(duration);

  if (countdown.expired && phase === "running") expire();

  const userName = user?.displayName || userId;

  if (!ENABLE_EXAM_MODE) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center">
        <p className="text-cyber-muted text-sm">Tính năng thi chưa được bật</p>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] max-w-2xl mx-auto">
      <AntiCheatModal
        show={showWarning}
        strikes={strikes}
        maxStrikes={MAX_STRIKES}
        onDismiss={dismissWarning}
      />

      <AnimatePresence mode="wait">
        {phase === "idle" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6"
          >
            <div className="text-6xl">📝</div>
            <h1 className="text-3xl font-bold gradient-text">Phòng Thi CyberShield</h1>
            <p className="text-sm text-cyber-muted max-w-md leading-relaxed">
              Bài thi gồm {questions.length} câu hỏi trắc nghiệm và CTF.
              Thời gian: <strong className="text-cyber-accent">{duration} phút</strong>.
              Điểm đỗ: <strong className="text-green-400">70%</strong>.
            </p>
            <div className="glass-enhanced p-4 rounded-xl max-w-sm text-left text-sm text-cyber-muted space-y-1.5">
              <p>⚠️ Không rời tab trong khi thi</p>
              <p>⚠️ Không refresh trang</p>
              <p>⚠️ Hết giờ tự động nộp bài</p>
              <p>⚠️ Gian lận sẽ bị nộp bài với điểm 0</p>
            </div>
            <button
              onClick={start}
              className="px-8 py-3 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-xl border border-cyber-accent/40 transition-all text-base font-semibold"
            >
              🚀 Bắt đầu thi
            </button>
          </motion.div>
        )}

        {phase === "running" && (
          <motion.div key="exam" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LockdownWrapper>
              <ExamHeader
                mins={countdown.mins}
                secs={countdown.secs}
                tabSwitches={strikes}
                warning={showWarning ? "⚠️ Phát hiện rời tab!" : ""}
              />
              <div className="space-y-1">
                {questions.map((q, i) => (
                  <ExamQuestion
                    key={q.id} q={q} index={i}
                    value={answers[q.id] ?? ""}
                    onChange={(val) => setAnswer(q.id, val)}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-8 pb-12">
                <button
                  onClick={submit}
                  className="px-8 py-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 hover:from-green-500/50 hover:to-emerald-500/50 text-white rounded-xl border border-green-500/40 transition-all text-base font-semibold"
                >
                  📨 Nộp bài
                </button>
              </div>
            </LockdownWrapper>
          </motion.div>
        )}

        {phase === "submitting" && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] space-y-4"
          >
            <div className="w-12 h-12 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-cyber-muted">Đang chấm điểm...</p>
          </motion.div>
        )}

        {phase === "done" && result && (
          <motion.div
            key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[70vh]"
          >
            <ExamResultView result={result} userName={userName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

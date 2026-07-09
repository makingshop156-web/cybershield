"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTF_FLAGS, validateFlag, type CtfFlag } from "@/lib/ctf";
import { getStorageItem, setStorageItem } from "@/lib/utils";
import { cn } from "@/lib/utils";

const CTF_PROGRESS_KEY = "cybershield_ctf_v1";

interface CtfProgress {
  found: string[];
  score: number;
}

function loadProgress(): CtfProgress {
  return getStorageItem<CtfProgress>(CTF_PROGRESS_KEY, { found: [], score: 0 });
}

function saveProgress(p: CtfProgress) {
  setStorageItem(CTF_PROGRESS_KEY, p);
}

export function CtfPanel() {
  const [progress, setProgress] = useState<CtfProgress>(loadProgress);
  const [input, setInput] = useState("");
  const [activeFlag, setActiveFlag] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const handleSubmit = useCallback(
    (flagId: string) => {
      const flag = CTF_FLAGS.find((f) => f.id === flagId);
      if (!flag) return;

      if (progress.found.includes(flagId)) {
        setFeedback({ ok: false, msg: "Flag này đã được tìm thấy trước đó!" });
        return;
      }

      const correct = validateFlag(input, flagId);
      if (correct) {
        const newProgress = {
          found: [...progress.found, flagId],
          score: progress.score + flag.points,
        };
        setProgress(newProgress);
        saveProgress(newProgress);
        setFeedback({ ok: true, msg: `🎉 Chính xác! +${flag.points} điểm` });
        setInput("");
      } else {
        setFeedback({ ok: false, msg: "❌ Flag không đúng. Thử lại!" });
      }
    },
    [input, progress]
  );

  return (
    <div className="glass-enhanced rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span>🏴</span> CTF Challenges
        </h3>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-cyber-accent font-bold tabular-nums">{progress.score}</span>
          <span className="text-cyber-muted">pts</span>
          <span className="text-cyber-muted">
            {progress.found.length}/{CTF_FLAGS.length} flags
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {CTF_FLAGS.map((flag) => {
          const found = progress.found.includes(flag.id);
          return (
            <motion.div
              key={flag.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "rounded-xl border transition-all overflow-hidden",
                found
                  ? "border-cyber-green/30 bg-cyber-green/5"
                  : "border-glass-border bg-glass-white/30"
              )}
            >
              <button
                onClick={() => setActiveFlag(activeFlag === flag.id ? null : flag.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {found ? (
                    <span className="text-cyber-green shrink-0">✅</span>
                  ) : (
                    <span className="text-cyber-gold shrink-0">🏴</span>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{flag.name}</div>
                    <div className="text-[11px] text-cyber-muted truncate">
                      {found ? "Đã tìm thấy!" : flag.hint}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className={cn("text-xs font-bold", found ? "text-cyber-green" : "text-cyber-gold")}>
                    +{flag.points}
                  </span>
                  <motion.span
                    animate={activeFlag === flag.id ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-cyber-muted"
                  >
                    ▼
                  </motion.span>
                </div>
              </button>

              <AnimatePresence>
                {activeFlag === flag.id && !found && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-1 border-t border-glass-border">
                      <p className="text-xs text-cyber-muted mb-2">{flag.description}</p>
                      <p className="text-[11px] text-cyber-muted/60 mb-2">
                        📁 Đường dẫn: <code className="text-cyber-accent">{flag.path}</code>
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Nhập flag..."
                          className="flex-1 glass-input rounded px-3 py-1.5 text-xs text-cyber-text focus:outline-none focus:border-cyber-accent"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSubmit(flag.id);
                          }}
                        />
                        <button
                          onClick={() => handleSubmit(flag.id)}
                          disabled={!input.trim()}
                          className="px-3 py-1.5 text-xs rounded-lg bg-cyber-accent/15 border border-cyber-accent/40 text-cyber-accent hover:bg-cyber-accent/25 disabled:opacity-40 transition-all"
                        >
                          Nộp
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn(
              "mt-3 text-xs px-3 py-2 rounded-lg",
              feedback.ok
                ? "bg-cyber-green/10 text-cyber-green border border-cyber-green/20"
                : "bg-cyber-red/10 text-cyber-red border border-cyber-red/20"
            )}
          >
            {feedback.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

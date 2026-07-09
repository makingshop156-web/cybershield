"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Exercise } from "@/types";
import { Button } from "@/components/ui/Button";

interface InteractiveExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

export function InteractiveExercise({ exercise, onComplete }: InteractiveExerciseProps) {
  const [answer, setAnswer] = useState<string | string[]>("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const checkAnswer = (): boolean => {
    const correctAns = exercise.correctAnswer;
    if (Array.isArray(correctAns)) {
      const userAns = Array.isArray(answer) ? answer : [answer];
      if (userAns.length !== correctAns.length) return false;
      return userAns.every((a, i) => a === correctAns[i]);
    }
    return answer === correctAns;
  };

  const handleSubmit = () => {
    const isCorrect = checkAnswer();
    setCorrect(isCorrect);
    setSubmitted(true);
    if (isCorrect) {
      setTimeout(onComplete, 1800);
    }
  };

  const handleRetry = () => {
    setAnswer("");
    setSubmitted(false);
    setCorrect(false);
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="text-sm font-medium mb-5 text-cyber-text">
        {exercise.question}
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {exercise.type === "fill-blank" && (
              <FillBlankExercise exercise={exercise} answer={answer as string[]} onChange={setAnswer} />
            )}
            {exercise.type === "ordering" && (
              <OrderingExercise exercise={exercise} answer={answer as string[]} onChange={setAnswer} />
            )}
            {exercise.type === "true-false" && (
              <TrueFalseExercise exercise={exercise} answer={answer as string[]} onChange={setAnswer} />
            )}
            {exercise.type === "multiple-choice" && (
              <MCQExercise exercise={exercise} answer={answer as string} onChange={setAnswer} />
            )}
            {exercise.type === "match" && (
              <MatchExercise exercise={exercise} answer={answer as string[]} onChange={setAnswer} />
            )}

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={
                  !answer ||
                  (Array.isArray(answer) && answer.length === 0) ||
                  (Array.isArray(answer) && answer.some((a) => !a))
                }
              >
                Kiểm tra đáp án
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "rounded-xl p-5 text-center",
              correct
                ? "bg-cyber-green/5 border border-cyber-green/20"
                : "bg-cyber-red/5 border border-cyber-red/20"
            )}
          >
            <motion.div
              className="text-3xl mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {correct ? "🎉" : "🤔"}
            </motion.div>
            <div
              className={cn(
                "font-semibold mb-2",
                correct ? "text-cyber-green" : "text-cyber-red"
              )}
            >
              {correct ? "Chính xác!" : "Chưa đúng, thử lại nhé!"}
            </div>
            <div className="text-sm text-cyber-muted mb-4 leading-relaxed">
              {exercise.explanation}
            </div>
            {!correct && (
              <Button variant="ghost" size="sm" onClick={handleRetry}>
                Thử lại
              </Button>
            )}
            {correct && (
              <motion.div
                className="text-xs text-cyber-green/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ✓ Đang chuyển tiếp...
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sub-components ─── */

function FillBlankExercise({
  exercise,
  answer,
  onChange,
}: {
  exercise: Exercise;
  answer: string[];
  onChange: (v: string[]) => void;
}) {
  const parts = exercise.question.split(/_{3,}|____|___/);
  const blanks = parts.length - 1;

  return (
    <div className="text-sm leading-relaxed">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < blanks && (
            <input
              type="text"
              className="w-24 mx-1 px-2 py-1 glass-input rounded text-center text-cyber-accent text-sm focus:outline-none focus:border-cyber-accent transition-colors inline-block"
              placeholder="..."
              value={(answer[i] as string) ?? ""}
              onChange={(e) => {
                const next = [...(Array.isArray(answer) ? answer : [])];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

function OrderingExercise({
  exercise,
  answer,
  onChange,
}: {
  exercise: Exercise;
  answer: string[];
  onChange: (v: string[]) => void;
}) {
  const items = exercise.items ?? [];
  const ordered = (
    answer.length ? answer : items.map((i) => i.id)
  )
    .map((id) => items.find((i) => i.id === id))
    .filter(Boolean) as { id: string; text: string }[];

  const move = (idx: number, dir: -1 | 1) => {
    const to = idx + dir;
    if (to < 0 || to >= ordered.length) return;
    const next = [...ordered];
    [next[idx], next[to]] = [next[to]!, next[idx]!];
    onChange(next.map((i) => i.id));
  };

  return (
    <div className="space-y-2">
      {ordered.map((item, idx) => (
        <motion.div
          key={item.id}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex items-center gap-2 glass rounded-lg px-4 py-2.5 text-sm"
        >
          <span className="w-6 h-6 rounded-full bg-cyber-accent/10 text-cyber-accent flex items-center justify-center text-xs font-bold shrink-0">
            {idx + 1}
          </span>
          <span className="flex-1 text-cyber-text">{item.text}</span>
          <div className="flex gap-1">
            <button
              onClick={() => move(idx, -1)}
              disabled={idx === 0}
              className="text-cyber-muted hover:text-cyber-text disabled:opacity-20 text-xs px-1"
            >
              ▲
            </button>
            <button
              onClick={() => move(idx, 1)}
              disabled={idx === ordered.length - 1}
              className="text-cyber-muted hover:text-cyber-text disabled:opacity-20 text-xs px-1"
            >
              ▼
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TrueFalseExercise({
  exercise,
  answer,
  onChange,
}: {
  exercise: Exercise;
  answer: string[];
  onChange: (v: string[]) => void;
}) {
  const items = exercise.items ?? [];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="flex items-center gap-3 glass rounded-lg px-4 py-3 text-sm"
        >
          <span className="flex-1 text-cyber-text">{item.text}</span>
          <div className="flex gap-2">
            {(["true", "false"] as const).map((val) => (
              <button
                key={val}
                onClick={() => {
                  const next = [...(Array.isArray(answer) ? answer : [])];
                  next[i] = val;
                  onChange(next);
                }}
                className={cn(
                  "text-xs px-3 py-1 rounded-md border transition-all",
                  answer[i] === val
                    ? val === "true"
                      ? "bg-cyber-green/15 border-cyber-green text-cyber-green"
                      : "bg-cyber-red/15 border-cyber-red text-cyber-red"
                    : "border-glass-border text-cyber-muted hover:border-glass-hover"
                )}
              >
                {val === "true" ? "✅ Đúng" : "❌ Sai"}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MCQExercise({
  exercise,
  answer,
  onChange,
}: {
  exercise: Exercise;
  answer: string;
  onChange: (v: string) => void;
}) {
  const options = exercise.options ?? [];

  return (
    <div className="space-y-2">
      {options.map((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        return (
          <button
            key={i}
            onClick={() => onChange(letter)}
            className={cn(
              "w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg border text-sm transition-all",
              answer === letter
                ? "bg-cyber-accent/10 border-cyber-accent text-cyber-accent"
                : "glass border-glass-border text-cyber-text hover:border-cyber-accent/40"
            )}
          >
            <span
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border shrink-0",
                answer === letter
                  ? "border-cyber-accent bg-cyber-accent/20"
                  : "border-glass-border"
              )}
            >
              {letter}
            </span>
            {opt.replace(/^[A-Z][.)]\s*/, "")}
          </button>
        );
      })}
    </div>
  );
}

function MatchExercise({
  exercise,
  answer,
  onChange,
}: {
  exercise: Exercise;
  answer: string[];
  onChange: (v: string[]) => void;
}) {
  const items = exercise.items ?? [];
  const options = exercise.options ?? [];

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={item.id}
          className="flex items-center gap-3 glass rounded-lg px-4 py-3"
        >
          <span className="text-sm w-1/2 text-cyber-text">{item.text}</span>
          <select
            value={(answer[i] as string) ?? ""}
            onChange={(e) => {
              const next = [...(Array.isArray(answer) ? answer : [])];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="w-1/2 px-3 py-2 glass-input rounded text-sm text-cyber-text focus:outline-none focus:border-cyber-accent"
          >
            <option value="">-- Chọn --</option>
            {options.map((opt, j) => (
              <option key={j} value={opt} className="bg-cyber-card">
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

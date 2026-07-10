"use client";
import type { ExamQuestion } from "@/lib/exam/config";

interface ExamQuestionProps {
  q: ExamQuestion;
  value: string;
  index: number;
  onChange: (val: string) => void;
}

export default function ExamQuestion({ q, value, index, onChange }: ExamQuestionProps) {
  return (
    <div className="glass-enhanced rounded-xl p-4 sm:p-5 mb-4">
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 w-7 h-7 rounded-full bg-cyber-accent/20 text-cyber-accent text-sm font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-sm sm:text-base text-white leading-relaxed break-words">
          {q.question}
        </p>
        {q.type === "flag" && (
          <span className="shrink-0 text-[10px] uppercase tracking-wider text-yellow-400/70 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
            Flag
          </span>
        )}
      </div>

      {q.type === "choice" && q.options ? (
        <div className="space-y-2 ml-10">
          {q.options.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all border ${
                value === opt
                  ? "bg-cyber-accent/15 border-cyber-accent/40"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
                className="appearance-none w-4 h-4 rounded-full border-2 border-cyber-muted checked:border-cyber-accent checked:bg-cyber-accent transition-all"
              />
              <span className="text-sm text-cyber-text">{opt}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="ml-10">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Nhập flag..."
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all font-mono"
          />
        </div>
      )}
    </div>
  );
}

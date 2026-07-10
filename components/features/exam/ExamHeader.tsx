"use client";
import { motion } from "framer-motion";

interface ExamHeaderProps {
  mins: number;
  secs: number;
  tabSwitches: number;
  warning: string;
}

export default function ExamHeader({ mins, secs, tabSwitches, warning }: ExamHeaderProps) {
  const urgent = mins === 0 && secs <= 60;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8">
      <div className="flex items-center gap-3">
        <span className="text-sm text-cyber-muted">⏱ Thời gian</span>
        <motion.span
          key={`${mins}:${secs}`}
          initial={urgent ? { scale: 1.2 } : undefined}
          animate={urgent ? { scale: [1.2, 1, 1.2] } : undefined}
          transition={{ duration: 0.5, repeat: Infinity }}
          className={`text-2xl sm:text-3xl font-bold font-mono ${
            urgent ? "text-red-400" : "text-cyber-accent"
          }`}
        >
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </motion.span>
      </div>

      <div className="flex items-center gap-3">
        {tabSwitches > 0 && (
          <span className="text-xs text-red-400/80">
            ⚠️ {tabSwitches} lần rời tab
          </span>
        )}
        <span className="text-xs text-cyber-muted px-3 py-1 rounded-full border border-cyber-accent/20 bg-cyber-accent/5">
          Chế độ thi
        </span>
      </div>

      {warning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full text-center text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
        >
          {warning}
        </motion.div>
      )}
    </div>
  );
}

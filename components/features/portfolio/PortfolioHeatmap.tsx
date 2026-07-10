"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface Props {
  data: Record<string, number>;
}

function getColor(val: number): string {
  if (val === 0) return "bg-white/5";
  if (val <= 2) return "bg-cyber-accent/30";
  if (val <= 4) return "bg-cyber-accent/60";
  return "bg-cyber-accent";
}

export default function PortfolioHeatmap({ data }: Props) {
  const weeks = useMemo(() => {
    const result: { date: string; val: number }[][] = [];
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - 364);
    const startDay = start.getDay();

    let week: { date: string; val: number }[] = [];
    for (let i = 0; i < startDay; i++) week.push({ date: "", val: 0 });

    for (let i = 0; i < 365; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      week.push({ date: key, val: data[key] ?? 0 });
      if (week.length === 7) { result.push(week); week = []; }
    }
    if (week.length > 0) result.push(week);
    return result;
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass-enhanced rounded-xl p-4 sm:p-5 mb-8 overflow-x-auto"
    >
      <h2 className="text-sm font-semibold text-white mb-3">📊 Hoạt động học tập</h2>

      <div className="flex gap-[2px] min-w-[640px]">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day) => (
              <div
                key={day.date || `${wi}-empty`}
                className={`w-3 h-3 rounded-[2px] ${getColor(day.val)}`}
                title={day.date ? `${day.date}: ${day.val} bài` : ""}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2 text-[10px] text-cyber-muted">
        <span>Ít</span>
        <div className="w-3 h-3 rounded-[2px] bg-white/5" />
        <div className="w-3 h-3 rounded-[2px] bg-cyber-accent/30" />
        <div className="w-3 h-3 rounded-[2px] bg-cyber-accent/60" />
        <div className="w-3 h-3 rounded-[2px] bg-cyber-accent" />
        <span>Nhiều</span>
      </div>
    </motion.div>
  );
}

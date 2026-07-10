"use client";
import { motion } from "framer-motion";

interface Props {
  elo: number;
  ctfPoints: number;
  labsCompleted: number;
}

const items = [
  { key: "elo", label: "Elo Arena", accent: "text-cyber-accent", icon: "⚔️" },
  { key: "ctf", label: "CTF Points", accent: "text-cyber-green", icon: "🏴" },
  { key: "labs", label: "Lab giải", accent: "text-cyber-gold", icon: "💻" },
];

export default function PortfolioStats({ elo, ctfPoints, labsCompleted }: Props) {
  const values: Record<string, number> = { elo, ctf: ctfPoints, labs: labsCompleted };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-3 gap-4 mb-8"
    >
      {items.map((item) => (
        <div key={item.key} className="glass-enhanced rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">{item.icon}</div>
          <div className={`text-xl font-bold tabular-nums ${item.accent}`}>{values[item.key]}</div>
          <div className="text-xs text-cyber-muted mt-1">{item.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

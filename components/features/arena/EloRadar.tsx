"use client";
import { motion, AnimatePresence } from "framer-motion";

interface EloRadarProps {
  activePlayers: number;
}

export default function EloRadar({ activePlayers }: EloRadarProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-accent/10 border border-cyber-accent/20 text-xs"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-accent" />
        </span>
        <span className="text-cyber-muted">
          Đang có <span className="text-cyber-accent font-semibold">{activePlayers}</span> người cùng mức Elo đang tìm trận
        </span>
      </motion.div>
    </AnimatePresence>
  );
}

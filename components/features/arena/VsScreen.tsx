"use client";
import { motion } from "framer-motion";

interface VsScreenProps {
  player1Elo: number;
  player2Elo: number;
}

export function VsScreen({ player1Elo, player2Elo }: VsScreenProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center gap-4"
    >
      <motion.span
        className="text-6xl sm:text-8xl font-black"
        style={{
          background: "linear-gradient(135deg, #ff4444, #ff8800, #ff4444)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 30px rgba(255,68,68,0.6)) drop-shadow(0 0 60px rgba(255,136,0,0.3))",
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        VS
      </motion.span>
      <div className="flex items-center gap-4 sm:gap-8 text-white/80 text-sm sm:text-lg">
        <div className="text-right">
          <div className="font-bold text-cyber-accent">BẠN</div>
          <div className="text-xs sm:text-sm text-cyber-muted">Elo {player1Elo}</div>
        </div>
        <div className="text-cyber-muted text-xs sm:text-sm">⚔️</div>
        <div className="text-left">
          <div className="font-bold text-cyber-gold">ĐỐI THỦ</div>
          <div className="text-xs sm:text-sm text-cyber-muted">Elo {player2Elo}</div>
        </div>
      </div>
    </motion.div>
  );
}

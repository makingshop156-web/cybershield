"use client";
import { motion } from "framer-motion";
import { ENABLE_BOT_MODE, type GameMode } from "@/lib/arena/matchmaking";

interface ModeSelectorProps {
  elo: number;
  onSelect: (mode: GameMode) => void;
}

export default function ModeSelector({ elo, onSelect }: ModeSelectorProps) {
  return (
    <motion.div
      key="mode-select"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <motion.div
        className="text-6xl"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ⚔️
      </motion.div>
      <div>
        <h1 className="text-3xl font-bold gradient-text">Đấu Trường 1v1</h1>
        <p className="text-sm text-cyber-muted mt-2">Đối kháng thời gian thực — Ai tìm flag trước sẽ thắng</p>
      </div>
      <div className="glass-enhanced p-6 rounded-xl space-y-3 max-w-sm mx-auto">
        <div className="flex justify-between text-sm">
          <span className="text-cyber-muted">Elo của bạn</span>
          <span className="text-cyber-accent font-bold">{elo}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-cyber-muted">Thể thức</span>
          <span className="text-white">Tìm Flag (CTF)</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {ENABLE_BOT_MODE && (
          <button
            onClick={() => onSelect("bot")}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/40 hover:to-teal-500/40 text-white rounded-xl border border-emerald-500/40 transition-all text-base font-semibold flex items-center gap-2"
          >
            <span>🤖</span> Đấu với Máy
          </button>
        )}
        <button
          onClick={() => onSelect("pvp")}
          className="px-8 py-3 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-xl border border-cyber-accent/40 transition-all text-base font-semibold flex items-center gap-2"
        >
          <span>👥</span> Đấu với Người
        </button>
      </div>
    </motion.div>
  );
}

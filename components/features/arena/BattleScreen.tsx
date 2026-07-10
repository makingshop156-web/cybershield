"use client";
import { motion } from "framer-motion";

interface BattleScreenProps {
  player1Elo: number;
  player2Elo: number;
  myProgress: number;
  enemyProgress: number;
  flagInput: string;
  message: string;
  onFlagChange: (value: string) => void;
  onSubmitFlag: () => void;
}

function ProgressBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  const gradient =
    color === "accent"
      ? "from-cyber-accent to-cyan-400"
      : "from-cyber-gold to-orange-400";

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs text-cyber-muted">
        <span className="truncate mr-2">{label}</span>
        <span className="shrink-0">{Math.round(value)}%</span>
      </div>
      <div className="h-3 sm:h-4 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full origin-left`}
          animate={{ scaleX: value / 100 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

export function BattleScreen({
  player1Elo, player2Elo,
  myProgress, enemyProgress,
  flagInput, message,
  onFlagChange, onSubmitFlag,
}: BattleScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto px-2 sm:px-4 space-y-6 sm:space-y-8"
    >
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-bold gradient-text">⚔️ ĐẤU TRƯỜNG</h2>
        <p className="text-xs sm:text-sm text-cyber-muted">Tìm flag và nộp trước để chiến thắng!</p>
      </div>

      <ProgressBar
        label={`Bạn (${player1Elo} Elo)`}
        value={myProgress}
        color="accent"
      />

      <ProgressBar
        label={`Đối thủ (${player2Elo} Elo)`}
        value={enemyProgress}
        color="gold"
      />

      <div className="glass-enhanced p-4 sm:p-6 rounded-xl space-y-3 sm:space-y-4">
        <p className="text-xs sm:text-sm text-cyber-muted text-center">
          Tìm flag trong hệ thống và nộp bên dưới
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={flagInput}
            onChange={(e) => onFlagChange(e.target.value)}
            placeholder="FLAG{...}"
            className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 bg-black/30 border border-white/10 rounded-lg text-white text-sm placeholder:text-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-colors font-mono"
            onKeyDown={(e) => e.key === "Enter" && onSubmitFlag()}
          />
          <button
            onClick={onSubmitFlag}
            className="shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm font-medium"
          >
            Nộp
          </button>
        </div>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs text-center"
          >
            {message}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { useArenaMatch } from "@/lib/hooks/useArenaMatch";
import ArenaBattle from "./ArenaBattle";

interface ArenaLobbyProps {
  userId: string;
}

export default function ArenaLobby({ userId }: ArenaLobbyProps) {
  const { phase, match, elo, findMatch, cancel, leaveBattle } = useArenaMatch(userId);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      {phase === "idle" && (
        <motion.div
          key="idle"
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
          <button
            onClick={findMatch}
            className="px-8 py-3 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-xl border border-cyber-accent/40 transition-all text-base font-semibold"
          >
            🔍 Tìm trận
          </button>
        </motion.div>
      )}

      {phase === "searching" && (
        <motion.div
          key="searching"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            className="w-16 h-16 mx-auto rounded-full border-2 border-cyber-accent border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <div>
            <h2 className="text-xl font-semibold text-white">Đang tìm đối thủ...</h2>
            <p className="text-sm text-cyber-muted mt-1">Hệ thống đang ghép trận cho bạn</p>
          </div>
          <button
            onClick={cancel}
            className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 transition-all text-sm"
          >
            ✕ Hủy tìm trận
          </button>
        </motion.div>
      )}

      {phase === "matched" && (
        <motion.div
          key="matched"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <motion.div
            className="text-5xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            ✅
          </motion.div>
          <h2 className="text-xl font-semibold text-green-400">Đã tìm thấy đối thủ!</h2>
          <p className="text-sm text-cyber-muted">Đang chuẩn bị đấu trường...</p>
        </motion.div>
      )}

      {phase === "battle" && match && (
        <motion.div key="battle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
          <ArenaBattle match={match} userId={userId} onLeave={leaveBattle} />
        </motion.div>
      )}
    </div>
  );
}

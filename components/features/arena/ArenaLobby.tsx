"use client";
import ArenaErrorBoundary from "./ErrorBoundary";
import { motion } from "framer-motion";
import { useArenaMatch } from "@/lib/hooks/useArenaMatch";
import type { GameMode } from "@/lib/arena/matchmaking";
import ArenaBattle from "./ArenaBattle";
import ModeSelector from "./ModeSelector";
import EloRadar from "./EloRadar";

function Fallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
      <div className="text-5xl">⚠️</div>
      <h2 className="text-xl font-semibold text-cyber-muted">Có lỗi xảy ra</h2>
      <p className="text-sm text-cyber-muted/70">Vui lòng tải lại trang</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm"
      >
        Tải lại
      </button>
    </div>
  );
}

interface ArenaLobbyProps {
  userId: string;
}

function LobbyContent({ userId }: ArenaLobbyProps) {
  const { phase, match, elo, radar, findMatch, cancel, leaveBattle, busy, errorMsg } = useArenaMatch(userId);

  const handleSelectMode = (mode: GameMode) => {
    findMatch(mode);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      {phase === "mode-select" && (
        <ModeSelector elo={elo} onSelect={handleSelectMode} />
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
          <div className="flex justify-center">
            <EloRadar activePlayers={radar.activePlayers} />
          </div>
          <button
            onClick={cancel}
            disabled={busy}
            className="px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 transition-all text-sm disabled:opacity-50"
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

      {phase === "error" && (
        <motion.div
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="text-5xl">⚠️</div>
          <h2 className="text-xl font-semibold text-red-400">Lỗi kết nối</h2>
          <p className="text-sm text-cyber-muted">{errorMsg || "Không thể kết nối đến máy chủ"}</p>
          <button
            onClick={cancel}
            className="px-6 py-2.5 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm"
          >
            Thử lại
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default function ArenaLobby({ userId }: ArenaLobbyProps) {
  return (
    <ArenaErrorBoundary fallback={<Fallback />}>
      <LobbyContent userId={userId} />
    </ArenaErrorBoundary>
  );
}

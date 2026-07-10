"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { arenaService, type MatchData } from "@/lib/arena/arena-service";

interface ArenaBattleProps {
  match: MatchData;
  userId: string;
  onLeave: () => void;
}

export default function ArenaBattle({ match, userId, onLeave }: ArenaBattleProps) {
  const [phase, setPhase] = useState<"vs" | "countdown" | "battle" | "ended">("vs");
  const [countdown, setCountdown] = useState(3);
  const [flagInput, setFlagInput] = useState("");
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [enemyProgress, setEnemyProgress] = useState(0);
  const [myProgress, setMyProgress] = useState(0);
  const [message, setMessage] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);
  const isPlayer1 = match.player1Id === userId;

  useEffect(() => {
    const vsTimer = setTimeout(() => setPhase("countdown"), 1500);
    return () => clearTimeout(vsTimer);
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown === 0) {
      setPhase("battle");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== "battle") return;
    unsubRef.current = arenaService.subscribeMatch(match.id, (data: MatchData) => {
      if (data.status === "completed") {
        const iWon = data.flag_found_by === userId;
        setResult(iWon ? "win" : "lose");
        setPhase("ended");
      }
    });
    return () => { if (unsubRef.current) { unsubRef.current(); unsubRef.current = null; } };
  }, [phase, match.id, userId]);

  const simulateEnemyProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setEnemyProgress((p) => {
        if (p >= 100) return 100;
        return Math.min(100, p + Math.random() * 3);
      });
    }, 800);
  }, []);

  useEffect(() => {
    if (phase === "battle") simulateEnemyProgress();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase, simulateEnemyProgress]);

  const handleSubmitFlag = async () => {
    if (!flagInput.trim() || !match.flag) return;
    const result = await arenaService.submitFlag(match.id, userId, flagInput, match.flag);
    if (result && result.won) {
      setMyProgress(100);
      setResult("win");
      setPhase("ended");
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setMessage("Sai flag! Thử lại...");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "vs" && (
          <motion.div
            key="vs"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              className="text-8xl font-black"
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
            <div className="flex items-center gap-8 text-white/80 text-lg">
              <div className="text-right">
                <div className="font-bold text-cyber-accent">BẠN</div>
                <div className="text-sm text-cyber-muted">Elo {match.player1EloBefore}</div>
              </div>
              <div className="text-cyber-muted text-sm">⚔️</div>
              <div className="text-left">
                <div className="font-bold text-cyber-gold">ĐỐI THỦ</div>
                <div className="text-sm text-cyber-muted">Elo {match.player2EloBefore}</div>
              </div>
            </div>
          </motion.div>
        )}

        {phase === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <motion.span
              className="text-9xl font-black text-cyber-accent"
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ textShadow: "0 0 40px rgba(0,255,255,0.5)" }}
            >
              {countdown}
            </motion.span>
            <span className="text-sm text-cyber-muted mt-2">Chuẩn bị chiến đấu...</span>
          </motion.div>
        )}

        {phase === "battle" && (
          <motion.div
            key="battle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl mx-auto px-4 space-y-8"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold gradient-text">⚔️ ĐẤU TRƯỜNG</h2>
              <p className="text-sm text-cyber-muted">Tìm flag và nộp trước để chiến thắng!</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-cyber-muted">
                <span>Bạn ({match.player1EloBefore} Elo)</span>
                <span>{Math.round(myProgress)}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-accent to-cyan-400 rounded-full"
                  animate={{ width: `${myProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-cyber-muted">
                <span>Đối thủ ({match.player2EloBefore} Elo)</span>
                <span>{Math.round(enemyProgress)}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-gold to-orange-400 rounded-full"
                  animate={{ width: `${enemyProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <div className="glass-enhanced p-6 rounded-xl space-y-4">
              <p className="text-sm text-cyber-muted text-center">
                Tìm flag trong hệ thống và nộp bên dưới
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  placeholder="FLAG{...}"
                  className="flex-1 px-4 py-2.5 bg-black/30 border border-white/10 rounded-lg text-white text-sm placeholder:text-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-colors font-mono"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitFlag()}
                />
                <button
                  onClick={handleSubmitFlag}
                  className="px-5 py-2.5 bg-cyber-accent/20 hover:bg-cyber-accent/30 text-cyber-accent rounded-lg border border-cyber-accent/30 transition-all text-sm font-medium"
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
        )}

        {phase === "ended" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 text-center"
          >
            {result === "win" ? (
              <>
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <span className="text-7xl">🏆</span>
                </motion.div>
                <motion.h2
                  className="text-4xl font-black gradient-text"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  VICTORY
                </motion.h2>
                <motion.p
                  className="text-cyber-accent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  +{Math.abs(match.player1EloBefore - (isPlayer1 ? match.player1EloBefore + 16 : match.player2EloBefore + 16))} Elo
                </motion.p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ rotate: 10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <span className="text-7xl">💀</span>
                </motion.div>
                <motion.h2
                  className="text-4xl font-black text-red-400"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  DEFEAT
                </motion.h2>
                <motion.p
                  className="text-cyber-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  -{Math.abs(match.player1EloBefore - (isPlayer1 ? match.player1EloBefore - 16 : match.player2EloBefore - 16))} Elo
                </motion.p>
              </>
            )}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onLeave}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm"
            >
              ← Quay về sảnh
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

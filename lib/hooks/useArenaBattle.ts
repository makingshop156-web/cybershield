"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { arenaService, type MatchData } from "@/lib/arena/arena-service";
import { getBotSolveTime } from "@/lib/arena/matchmaking";

export type BattlePhase = "vs" | "countdown" | "battle" | "ended";

function isBotId(id: string): boolean {
  return id.startsWith("bot_");
}

export function useArenaBattle(match: MatchData, userId: string) {
  const [phase, setPhase] = useState<BattlePhase>("vs");
  const [countdown, setCountdown] = useState(3);
  const [flagInput, setFlagInput] = useState("");
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [enemyProgress, setEnemyProgress] = useState(0);
  const [myProgress, setMyProgress] = useState(0);
  const [message, setMessage] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);
  const mounted = useRef(true);

  const opponentId = match.player1Id === userId ? match.player2Id : match.player1Id;

  useEffect(() => {
    const vsTimer = setTimeout(() => { if (mounted.current) setPhase("countdown"); }, 1500);
    return () => { clearTimeout(vsTimer); };
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown === 0) { setPhase("battle"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== "battle") return;
    try {
      unsubRef.current = arenaService.subscribeMatch(match.id, (data: MatchData) => {
        if (!mounted.current) return;
        if (data.status === "completed") {
          const iWon = data.flag_found_by === userId;
          setResult(iWon ? "win" : "lose");
          setPhase("ended");
        }
      });
    } catch {
      // subscription failed — fall back to progress-based end
    }
    return () => { if (unsubRef.current) { unsubRef.current(); unsubRef.current = null; } };
  }, [phase, match.id, userId]);

  const simulateEnemyProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!mounted.current) return;
      setEnemyProgress((p) => Math.min(100, p + Math.random() * 3));
    }, 800);
  }, []);

  useEffect(() => {
    if (phase === "battle") simulateEnemyProgress();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [phase, simulateEnemyProgress]);

  // Bot auto-solve after random delay
  useEffect(() => {
    if (phase !== "battle" || !isBotId(opponentId)) return;
    const delay = getBotSolveTime();
    const t = setTimeout(() => {
      if (!mounted.current) return;
      setEnemyProgress(100);
      setResult("lose");
      setPhase("ended");
    }, delay);
    return () => clearTimeout(t);
  }, [phase, opponentId]);

  const submittingRef = useRef(false);

  const submitFlag = useCallback(async () => {
    try {
      if (submittingRef.current) return;
      if (!flagInput.trim() || !match.flag) return;
      submittingRef.current = true;
      const response = await arenaService.submitFlag(match.id, userId, flagInput, match.flag);
      if (!mounted.current) return;
      if (response?.won) {
        setMyProgress(100);
        setResult("win");
        setPhase("ended");
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setMessage("Sai flag! Thử lại...");
        setTimeout(() => { if (mounted.current) setMessage(""); }, 2000);
      }
    } catch {
      if (mounted.current) setMessage("Lỗi kết nối, thử lại...");
    } finally {
      submittingRef.current = false;
    }
  }, [flagInput, match.id, match.flag, userId]);

  const eloDiff = Math.abs(match.player1EloBefore - match.player2EloBefore);

  useEffect(() => () => { mounted.current = false; }, []);

  return {
    phase, countdown, flagInput, setFlagInput,
    result, enemyProgress, myProgress, message,
    submitFlag, eloDiff,
  };
}

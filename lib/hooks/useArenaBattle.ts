"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { arenaService, type MatchData } from "@/lib/arena/arena-service";

export type BattlePhase = "vs" | "countdown" | "battle" | "ended";

export function useArenaBattle(match: MatchData, userId: string) {
  const [phase, setPhase] = useState<BattlePhase>("vs");
  const [countdown, setCountdown] = useState(3);
  const [flagInput, setFlagInput] = useState("");
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [enemyProgress, setEnemyProgress] = useState(0);
  const [myProgress, setMyProgress] = useState(0);
  const [message, setMessage] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const unsubRef = useRef<(() => void) | null>(null);

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

  const submittingRef = useRef(false);

  const submitFlag = useCallback(async () => {
    if (submittingRef.current) return;
    if (!flagInput.trim() || !match.flag) return;
    submittingRef.current = true;
    const response = await arenaService.submitFlag(match.id, userId, flagInput, match.flag);
    submittingRef.current = false;
    if (response?.won) {
      setMyProgress(100);
      setResult("win");
      setPhase("ended");
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setMessage("Sai flag! Thử lại...");
      setTimeout(() => setMessage(""), 2000);
    }
  }, [flagInput, match.id, match.flag, userId]);

  const eloDiff = Math.abs(
    match.player1EloBefore - (match.player1Id === userId ? match.player1EloBefore + 16 : match.player2EloBefore + 16)
  );

  return {
    phase, countdown, flagInput, setFlagInput,
    result, enemyProgress, myProgress, message,
    submitFlag, eloDiff,
  };
}

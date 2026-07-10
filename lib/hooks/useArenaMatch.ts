"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { arenaService, type MatchData } from "@/lib/arena/arena-service";
import {
  ENABLE_BOT_MODE,
  type GameMode,
  type RadarState,
  subscribeRadar,
  startRadarSimulation,
  stopRadarSimulation,
  getBotSolveTime,
} from "@/lib/arena/matchmaking";

export type MatchPhase = "idle" | "mode-select" | "searching" | "matched" | "battle" | "error";

export function useArenaMatch(userId: string) {
  const [phase, setPhase] = useState<MatchPhase>("mode-select");
  const [match, setMatch] = useState<MatchData | null>(null);
  const [elo, setElo] = useState(1000);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [radar, setRadar] = useState<RadarState>({ activePlayers: 0 });
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const pollTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const botTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    const unsub = subscribeRadar((count) => {
      if (mounted.current) setRadar({ activePlayers: count });
    });
    return () => { mounted.current = false; unsub(); };
  }, []);

  useEffect(() => {
    arenaService.getOrCreateElo(userId).then((p) => {
      if (mounted.current) setElo(p.elo);
    });
  }, [userId]);

  const clear = useCallback(() => {
    if (pollTimer.current) { clearInterval(pollTimer.current); pollTimer.current = null; }
    if (botTimer.current) { clearTimeout(botTimer.current); botTimer.current = null; }
  }, []);

  useEffect(() => () => { clear(); stopRadarSimulation(); }, [clear]);

  const startBattle = useCallback(async (opponentId: string) => {
    clear();
    setPhase("matched");
    setTimeout(async () => {
      try {
        const matchData = await arenaService.createMatch(userId, opponentId);
        if (mounted.current) { setMatch(matchData); setPhase("battle"); setBusy(false); }
      } catch {
        if (mounted.current) { setErrorMsg("Không thể tạo trận đấu"); setPhase("error"); setBusy(false); }
      }
    }, 1000);
  }, [userId, clear]);

  const simulateBotBattle = useCallback(async () => {
    clear();
    setPhase("matched");
    setTimeout(async () => {
      try {
        const botId = "bot_" + Math.random().toString(36).substring(2, 8);
        const matchData = await arenaService.createMatch(userId, botId);
        if (mounted.current) { setMatch(matchData); setPhase("battle"); setBusy(false); }
      } catch {
        if (mounted.current) { setErrorMsg("Lỗi tạo trận bot"); setPhase("error"); setBusy(false); }
      }
    }, 1000);
  }, [userId, clear]);

  const findMatch = useCallback(async (mode: GameMode) => {
    if (busy) return;
    setBusy(true);
    setErrorMsg("");
    clear();
    setGameMode(mode);

    if (mode === "bot") {
      if (!ENABLE_BOT_MODE) {
        findMatch("pvp");
        return;
      }
      simulateBotBattle();
      return;
    }

    try {
      await arenaService.joinLobby(userId);
    } catch {
      if (mounted.current) { setErrorMsg("Không thể vào hàng chờ"); setPhase("error"); setBusy(false); }
      return;
    }

    setPhase("searching");
    startRadarSimulation();

    pollTimer.current = setInterval(async () => {
      try {
        const opponent = await arenaService.findOpponent(userId);
        if (opponent && mounted.current) {
          await arenaService.acceptMatch(opponent.id, userId);
          startBattle(opponent.userId);
        }
      } catch {
        // silently retry
      }
    }, 2000);

    botTimer.current = setTimeout(async () => {
      try {
        const botId = "bot_" + Math.random().toString(36).substring(2, 8);
        const botEntry = await arenaService.joinLobby(botId);
        if (botEntry) {
          const opponent = await arenaService.findOpponent(botId);
          if (opponent && mounted.current) {
            await arenaService.acceptMatch(botEntry.id, userId);
            startBattle(botId);
          }
        }
      } catch {
        // silently retry
      }
    }, 3000);
  }, [userId, clear, startBattle, simulateBotBattle, busy]);

  const cancel = useCallback(async () => {
    clear();
    stopRadarSimulation();
    try { await arenaService.leaveLobby(userId); } catch { /* ignore */ }
    setPhase("mode-select");
    setBusy(false);
    setErrorMsg("");
  }, [userId, clear]);

  const leaveBattle = useCallback(() => {
    setMatch(null);
    setPhase("mode-select");
    setBusy(false);
    setErrorMsg("");
    clear();
  }, [clear]);

  return { phase, match, elo, radar, gameMode, findMatch, cancel, leaveBattle, busy, errorMsg };
}

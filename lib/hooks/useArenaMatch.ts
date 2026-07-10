"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { arenaService, type MatchData } from "@/lib/arena/arena-service";

export type MatchPhase = "idle" | "searching" | "matched" | "battle";

export function useArenaMatch(userId: string) {
  const [phase, setPhase] = useState<MatchPhase>("idle");
  const [match, setMatch] = useState<MatchData | null>(null);
  const [elo, setElo] = useState(1000);
  const [busy, setBusy] = useState(false);
  const pollTimer = useRef<NodeJS.Timeout | null>(null);
  const botTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    arenaService.getOrCreateElo(userId).then((p) => setElo(p.elo));
  }, [userId]);

  const clear = useCallback(() => {
    if (pollTimer.current) { clearInterval(pollTimer.current); pollTimer.current = null; }
    if (botTimer.current) { clearTimeout(botTimer.current); botTimer.current = null; }
  }, []);

  const startBattle = useCallback(async (opponentId: string) => {
    clear();
    setPhase("matched");
    setTimeout(async () => {
      const matchData = await arenaService.createMatch(userId, opponentId);
      setMatch(matchData);
      setPhase("battle");
      setBusy(false);
    }, 1000);
  }, [userId, clear]);

  const findMatch = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    clear();
    await arenaService.joinLobby(userId);
    setPhase("searching");

    pollTimer.current = setInterval(async () => {
      const opponent = await arenaService.findOpponent(userId);
      if (opponent) {
        await arenaService.acceptMatch(opponent.id, userId);
        startBattle(opponent.userId);
      }
    }, 2000);

    botTimer.current = setTimeout(async () => {
      const botId = "bot_" + Math.random().toString(36).substring(2, 8);
      const botEntry = await arenaService.joinLobby(botId);
      if (botEntry) {
        const opponent = await arenaService.findOpponent(botId);
        if (opponent) {
          await arenaService.acceptMatch(botEntry.id, userId);
          startBattle(botId);
        }
      }
    }, 3000);
    // TODO: Monitor performance here — poll timers may stack on slow connections
  }, [userId, clear, startBattle, busy]);

  const cancel = useCallback(async () => {
    clear();
    await arenaService.leaveLobby(userId);
    setPhase("idle");
    setBusy(false);
  }, [userId, clear]);

  const leaveBattle = useCallback(() => {
    setMatch(null);
    setPhase("idle");
    setBusy(false);
    clear();
  }, [clear]);

  return { phase, match, elo, findMatch, cancel, leaveBattle, busy };
}

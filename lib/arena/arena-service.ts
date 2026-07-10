import { getSupabaseClient } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface ArenaPlayer {
  userId: string;
  elo: number;
  displayName?: string;
}

export interface MatchData {
  id: string;
  player1Id: string;
  player2Id: string;
  player1EloBefore: number;
  player2EloBefore: number;
  status: "in_progress" | "completed" | "cancelled";
  startedAt: string;
  flag?: string;
  flag_found_by?: string | null;
}

export interface LobbyEntry {
  id: string;
  userId: string;
  status: "waiting" | "matched" | "in_game" | "completed";
  opponentId: string | null;
  createdAt: string;
}

const ARENA_FLAGS = [
  "FLAG{arena_duel_master}",
  "FLAG{real_time_hacker}",
  "FLAG{cyber_gladiator}",
  "FLAG{pwned_in_seconds}",
  "FLAG{zero_day_duelist}",
];

function getRandomFlag(): string {
  return ARENA_FLAGS[Math.floor(Math.random() * ARENA_FLAGS.length)];
}

function calculateElo(ratingA: number, ratingB: number, won: boolean): [number, number] {
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 - expectedA;
  const kFactor = 32;
  const scoreA = won ? 1 : 0;
  const scoreB = won ? 0 : 1;
  return [ratingA + kFactor * (scoreA - expectedA), ratingB + kFactor * (scoreB - expectedB)];
}

export class ArenaService {
  private channel: RealtimeChannel | null = null;

  async getOrCreateElo(userId: string): Promise<ArenaPlayer> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("user_elo")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (error || !data) {
      const { data: newData, error: insertError } = await supabase
        .from("user_elo")
        .insert({ user_id: userId })
        .select()
        .single();
      if (insertError || !newData) return { userId, elo: 1000 };
      return { userId, elo: newData.elo, displayName: undefined };
    }
    return { userId, elo: data.elo, displayName: undefined };
  }

  async joinLobby(userId: string): Promise<LobbyEntry | null> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("lobby")
      .insert({ user_id: userId, status: "waiting" })
      .select()
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      userId: data.user_id,
      status: data.status,
      opponentId: data.opponent_id,
      createdAt: data.created_at,
    };
  }

  async leaveLobby(lobbyId: string): Promise<void> {
    const supabase = getSupabaseClient();
    await supabase.from("lobby").delete().eq("id", lobbyId);
  }

  async findOpponent(userId: string): Promise<LobbyEntry | null> {
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("lobby")
      .select("*")
      .eq("status", "waiting")
      .neq("user_id", userId)
      .limit(1)
      .single();
    if (!data) return null;
    return {
      id: data.id,
      userId: data.user_id,
      status: data.status,
      opponentId: data.opponent_id,
      createdAt: data.created_at,
    };
  }

  async acceptMatch(lobbyId: string, opponentId: string): Promise<boolean> {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("lobby")
      .update({ status: "matched", opponent_id: opponentId, matched_at: new Date().toISOString() })
      .eq("id", lobbyId)
      .eq("status", "waiting");
    return !error;
  }

  async createMatch(player1Id: string, player2Id: string): Promise<MatchData | null> {
    const supabase = getSupabaseClient();
    const p1 = await this.getOrCreateElo(player1Id);
    const p2 = await this.getOrCreateElo(player2Id);

    const { data, error } = await supabase
      .from("match_history")
      .insert({
        player1_id: player1Id,
        player2_id: player2Id,
        player1_elo_before: p1.elo,
        player2_elo_before: p2.elo,
        status: "in_progress",
      })
      .select()
      .single();
    if (error || !data) return null;

    return {
      id: data.id,
      player1Id: data.player1_id,
      player2Id: data.player2_id,
      player1EloBefore: data.player1_elo_before,
      player2EloBefore: data.player2_elo_before,
      status: data.status,
      startedAt: data.started_at,
      flag: getRandomFlag(),
    };
  }

  async submitFlag(matchId: string, userId: string, flag: string, correctFlag: string): Promise<{ won: boolean; eloChange: [number, number] } | null> {
    const supabase = getSupabaseClient();
    const won = flag.trim() === correctFlag.trim();
    if (!won) return null;

    const { data: match } = await supabase
      .from("match_history")
      .select("*")
      .eq("id", matchId)
      .single();
    if (!match || match.status !== "in_progress") return null;

    const isPlayer1 = match.player1_id === userId;
    const p1Elo = match.player1_elo_before;
    const p2Elo = match.player2_elo_before;
    const playerWon = isPlayer1;
    const eloChange = calculateElo(p1Elo, p2Elo, playerWon);

    await supabase
      .from("match_history")
      .update({
        winner_id: userId,
        player1_elo_after: eloChange[0],
        player2_elo_after: eloChange[1],
        status: "completed",
        flag_found_by: userId,
        ended_at: new Date().toISOString(),
      })
      .eq("id", matchId);

    await supabase.from("user_elo").upsert({
      user_id: match.player1_id,
      elo: eloChange[0],
      games_played: (await supabase.from("user_elo").select("games_played").eq("user_id", match.player1_id).single()).data
        ?.games_played
        ? 1
        : 1,
      wins: playerWon ? 1 : 0,
      losses: playerWon ? 0 : 1,
    });

    return { won: true, eloChange };
  }

  subscribeLobby(lobbyId: string, onMatch: (data: LobbyEntry) => void): void {
    this.cleanup();
    const supabase = getSupabaseClient();
    this.channel = supabase
      .channel(`arena-lobby-${lobbyId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "lobby", filter: `id=eq.${lobbyId}` },
        (payload) => {
          const newData = payload.new as LobbyEntry;
          if (newData.status === "matched" || newData.status === "in_game") {
            onMatch(newData);
          }
        }
      )
      .subscribe();
  }

  subscribeMatch(matchId: string, onUpdate: (data: MatchData) => void): void {
    const supabase = getSupabaseClient();
    supabase
      .channel(`arena-match-${matchId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "match_history", filter: `id=eq.${matchId}` },
        (payload) => {
          const raw = payload.new as Record<string, unknown>;
          onUpdate({
            id: String(raw.id ?? ""),
            player1Id: String(raw.player1_id ?? ""),
            player2Id: String(raw.player2_id ?? ""),
            player1EloBefore: Number(raw.player1_elo_before ?? 1000),
            player2EloBefore: Number(raw.player2_elo_before ?? 1000),
            status: String(raw.status ?? "in_progress") as MatchData["status"],
            startedAt: String(raw.started_at ?? ""),
            flag_found_by: raw.flag_found_by ? String(raw.flag_found_by) : null,
          });
        }
      )
      .subscribe();
  }

  cleanup(): void {
    if (this.channel) {
      this.channel.unsubscribe();
      this.channel = null;
    }
  }
}

export const arenaService = new ArenaService();

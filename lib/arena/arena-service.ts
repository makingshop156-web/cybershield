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

type MatchCallback = (data: MatchData) => void;

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

class LocalArenaStore {
  private elos: Map<string, number> = new Map();
  private lobby: LobbyEntry[] = [];
  private matches: Map<string, MatchData> = new Map();
  private matchSubs: Map<string, MatchCallback[]> = new Map();

  getElo(userId: string): number {
    if (!this.elos.has(userId)) this.elos.set(userId, 1000);
    return this.elos.get(userId)!;
  }

  setElo(userId: string, elo: number): void {
    this.elos.set(userId, elo);
  }

  joinLobby(userId: string): LobbyEntry {
    const existing = this.lobby.find((l) => l.userId === userId && l.status === "waiting");
    if (existing) return existing;
    const entry: LobbyEntry = {
      id: "local_" + Math.random().toString(36).substring(2, 10),
      userId,
      status: "waiting",
      opponentId: null,
      createdAt: new Date().toISOString(),
    };
    this.lobby.push(entry);
    return entry;
  }

  leaveLobby(userId: string): void {
    this.lobby = this.lobby.filter((l) => l.userId !== userId || l.status !== "waiting");
  }

  findOpponent(userId: string): LobbyEntry | null {
    const opponent = this.lobby.find((l) => l.userId !== userId && l.status === "waiting");
    return opponent ?? null;
  }

  acceptMatch(lobbyId: string, opponentId: string): boolean {
    const entry = this.lobby.find((l) => l.id === lobbyId);
    if (!entry || entry.status !== "waiting") return false;
    entry.status = "matched";
    entry.opponentId = opponentId;
    return true;
  }

  createMatch(player1Id: string, player2Id: string, flag: string): MatchData {
    const p1Elo = this.getElo(player1Id);
    const p2Elo = this.getElo(player2Id);
    const match: MatchData = {
      id: "match_" + Math.random().toString(36).substring(2, 10),
      player1Id,
      player2Id,
      player1EloBefore: p1Elo,
      player2EloBefore: p2Elo,
      status: "in_progress",
      startedAt: new Date().toISOString(),
      flag,
      flag_found_by: null,
    };
    this.matches.set(match.id, match);
    return match;
  }

  submitFlag(matchId: string, userId: string, flag: string, correctFlag: string): { won: boolean; eloChange: [number, number] } | null {
    const won = flag.trim() === correctFlag.trim();
    if (!won) return null;

    const match = this.matches.get(matchId);
    if (!match || match.status !== "in_progress") return null;

    const isPlayer1 = match.player1Id === userId;
    const p1Elo = match.player1EloBefore;
    const p2Elo = match.player2EloBefore;
    const playerWon = isPlayer1;
    const eloChange = calculateElo(p1Elo, p2Elo, playerWon);

    match.status = "completed";
    match.flag_found_by = userId;

    this.setElo(match.player1Id, eloChange[0]);
    this.setElo(match.player2Id, eloChange[1]);

    const subs = this.matchSubs.get(matchId) || [];
    subs.forEach((fn) => fn({ ...match }));

    this.lobby = this.lobby.filter(
      (l) => l.userId !== match.player1Id && l.userId !== match.player2Id
    );

    return { won: true, eloChange };
  }

  subscribeMatch(matchId: string, fn: MatchCallback): () => void {
    if (!this.matchSubs.has(matchId)) this.matchSubs.set(matchId, []);
    this.matchSubs.get(matchId)!.push(fn);
    return () => {
      const subs = this.matchSubs.get(matchId);
      if (subs) this.matchSubs.set(matchId, subs.filter((s) => s !== fn));
    };
  }
}

export class ArenaService {
  private channel: RealtimeChannel | null = null;
  private local: LocalArenaStore = new LocalArenaStore();
  private online: boolean | null = null;

  private async checkOnline(): Promise<boolean> {
    if (this.online !== null) return this.online;
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    this.online = !!(url && key);
    if (!this.online) console.log("[Arena] Offline mode — Supabase chưa cấu hình");
    return this.online;
  }

  async getOrCreateElo(userId: string): Promise<ArenaPlayer> {
    if (!(await this.checkOnline())) {
      return { userId, elo: this.local.getElo(userId) };
    }
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("user_elo").select("*").eq("user_id", userId).single();
    if (error || !data) {
      const { data: newData } = await supabase
        .from("user_elo").insert({ user_id: userId }).select().single();
      if (newData) return { userId, elo: newData.elo };
      return { userId, elo: 1000 };
    }
    return { userId, elo: data.elo };
  }

  async joinLobby(userId: string): Promise<LobbyEntry> {
    if (!(await this.checkOnline())) {
      return this.local.joinLobby(userId);
    }
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("lobby").insert({ user_id: userId, status: "waiting" }).select().single();
    if (error || !data) {
      console.warn("[Arena] Supabase lobby failed, fallback offline");
      return this.local.joinLobby(userId);
    }
    return { id: data.id, userId: data.user_id, status: data.status, opponentId: data.opponent_id, createdAt: data.created_at };
  }

  async leaveLobby(userIdOrId: string): Promise<void> {
    if (!(await this.checkOnline())) {
      this.local.leaveLobby(userIdOrId);
      return;
    }
    const supabase = getSupabaseClient();
    await supabase.from("lobby").delete().eq("user_id", userIdOrId);
  }

  async findOpponent(userId: string): Promise<LobbyEntry | null> {
    if (!(await this.checkOnline())) {
      return this.local.findOpponent(userId);
    }
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("lobby").select("*").eq("status", "waiting").neq("user_id", userId).limit(1).single();
    if (!data) return null;
    return { id: data.id, userId: data.user_id, status: data.status, opponentId: data.opponent_id, createdAt: data.created_at };
  }

  async acceptMatch(lobbyId: string, opponentId: string): Promise<boolean> {
    if (!(await this.checkOnline())) {
      return this.local.acceptMatch(lobbyId, opponentId);
    }
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("lobby").update({ status: "matched", opponent_id: opponentId, matched_at: new Date().toISOString() })
      .eq("id", lobbyId).eq("status", "waiting");
    return !error;
  }

  async createMatch(player1Id: string, player2Id: string): Promise<MatchData> {
    const flag = getRandomFlag();
    if (!(await this.checkOnline())) {
      return this.local.createMatch(player1Id, player2Id, flag);
    }
    const supabase = getSupabaseClient();
    const p1 = await this.getOrCreateElo(player1Id);
    const p2 = await this.getOrCreateElo(player2Id);
    const { data, error } = await supabase
      .from("match_history")
      .insert({ player1_id: player1Id, player2_id: player2Id, player1_elo_before: p1.elo, player2_elo_before: p2.elo, status: "in_progress" })
      .select().single();
    if (error || !data) {
      console.warn("[Arena] Supabase createMatch failed, fallback offline");
      return this.local.createMatch(player1Id, player2Id, flag);
    }
    return {
      id: data.id, player1Id: data.player1_id, player2Id: data.player2_id,
      player1EloBefore: data.player1_elo_before, player2EloBefore: data.player2_elo_before,
      status: data.status, startedAt: data.started_at, flag,
    };
  }

  async submitFlag(matchId: string, userId: string, flag: string, correctFlag: string): Promise<{ won: boolean; eloChange: [number, number] } | null> {
    const won = flag.trim() === correctFlag.trim();
    if (!won) return null;

    if (!(await this.checkOnline())) {
      return this.local.submitFlag(matchId, userId, flag, correctFlag);
    }

    const supabase = getSupabaseClient();
    const { data: match } = await supabase.from("match_history").select("*").eq("id", matchId).single();
    if (!match || match.status !== "in_progress") return null;

    const isPlayer1 = match.player1_id === userId;
    const p1Elo = match.player1_elo_before;
    const p2Elo = match.player2_elo_before;
    const eloChange = calculateElo(p1Elo, p2Elo, isPlayer1);

    await supabase.from("match_history").update({
      winner_id: userId, player1_elo_after: eloChange[0], player2_elo_after: eloChange[1],
      status: "completed", flag_found_by: userId, ended_at: new Date().toISOString(),
    }).eq("id", matchId);

    const { data: p1Row } = await supabase.from("user_elo").select("games_played,wins,losses").eq("user_id", match.player1_id).single();
    await supabase.from("user_elo").upsert({
      user_id: match.player1_id, elo: eloChange[0],
      games_played: (p1Row?.games_played ?? 0) + 1,
      wins: (p1Row?.wins ?? 0) + (isPlayer1 ? 1 : 0),
      losses: (p1Row?.losses ?? 0) + (isPlayer1 ? 0 : 1),
    });

    const { data: p2Row } = await supabase.from("user_elo").select("games_played,wins,losses").eq("user_id", match.player2_id).single();
    await supabase.from("user_elo").upsert({
      user_id: match.player2_id, elo: eloChange[1],
      games_played: (p2Row?.games_played ?? 0) + 1,
      wins: (p2Row?.wins ?? 0) + (isPlayer1 ? 0 : 1),
      losses: (p2Row?.losses ?? 0) + (isPlayer1 ? 1 : 0),
    });

    return { won: true, eloChange };
  }

  subscribeMatch(matchId: string, onUpdate: (data: MatchData) => void): () => void {
    const localUnsub = this.local.subscribeMatch(matchId, onUpdate);
    const supabase = getSupabaseClient();
    const ch = supabase
      .channel(`arena-match-${matchId}`)
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "match_history", filter: `id=eq.${matchId}` },
        (payload) => {
          const raw = payload.new as Record<string, unknown>;
          onUpdate({
            id: String(raw.id ?? ""), player1Id: String(raw.player1_id ?? ""),
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
    return () => { ch.unsubscribe(); localUnsub(); };
  }

  cleanup(): void {
    if (this.channel) { this.channel.unsubscribe(); this.channel = null; }
  }
}

export const arenaService = new ArenaService();

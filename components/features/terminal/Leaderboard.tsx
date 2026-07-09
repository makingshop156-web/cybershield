"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getStorageItem, setStorageItem } from "@/lib/utils";

interface LeaderboardEntry {
  name: string;
  score: number;
  flags: number;
  updatedAt: string;
}

const LB_STORAGE_KEY = "cybershield_leaderboard_v1";

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { name: "byte_hunter", score: 500, flags: 2, updatedAt: new Date().toISOString() },
  { name: "root_access", score: 350, flags: 2, updatedAt: new Date().toISOString() },
  { name: "hex_master", score: 250, flags: 1, updatedAt: new Date().toISOString() },
  { name: "pwn_student", score: 150, flags: 1, updatedAt: new Date().toISOString() },
  { name: "cyber_padawan", score: 100, flags: 1, updatedAt: new Date().toISOString() },
  { name: "net_runner", score: 0, flags: 0, updatedAt: new Date().toISOString() },
  { name: "shell_expert", score: 0, flags: 0, updatedAt: new Date().toISOString() },
];

interface LeaderboardProps {
  currentScore?: number;
  currentFlags?: number;
}

export function Leaderboard({ currentScore = 0, currentFlags = 0 }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [playerName, setPlayerName] = useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("leaderboard")
        .select("name, score, flags, updated_at")
        .order("score", { ascending: false })
        .limit(20);

      if (error) throw error;

      if (data && data.length > 0) {
        setEntries(
          data.map((e: any) => ({
            name: e.name,
            score: e.score,
            flags: e.flags,
            updatedAt: e.updated_at,
          }))
        );
      } else {
        // Fallback to local + mock
        const local = getStorageItem<LeaderboardEntry[]>(LB_STORAGE_KEY, []);
        const combined = [...MOCK_LEADERBOARD, ...local];
        const deduped = combined.filter(
          (e, i, arr) => arr.findIndex((x) => x.name === e.name) === i
        );
        setEntries(deduped.sort((a, b) => b.score - a.score));
      }
    } catch {
      const local = getStorageItem<LeaderboardEntry[]>(LB_STORAGE_KEY, []);
      const combined = [...MOCK_LEADERBOARD, ...local];
      const deduped = combined.filter(
        (e, i, arr) => arr.findIndex((x) => x.name === e.name) === i
      );
      setEntries(deduped.sort((a, b) => b.score - a.score));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const handleSubmitScore = async () => {
    if (!playerName.trim() || currentScore <= 0) return;

    const entry: LeaderboardEntry = {
      name: playerName.trim(),
      score: currentScore,
      flags: currentFlags,
      updatedAt: new Date().toISOString(),
    };

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("leaderboard").upsert(
        { name: entry.name, score: entry.score, flags: entry.flags, updated_at: entry.updatedAt },
        { onConflict: "name" }
      );
      if (error) throw error;
    } catch {
      // Save locally
      const local = getStorageItem<LeaderboardEntry[]>(LB_STORAGE_KEY, []);
      const existing = local.findIndex((e) => e.name === entry.name);
      if (existing >= 0) {
        local[existing] = entry;
      } else {
        local.push(entry);
      }
      setStorageItem(LB_STORAGE_KEY, local);
    }

    setSubmitted(true);
    setShowSubmit(false);
    await fetchLeaderboard();
  };

  const topScore = entries.length > 0 ? entries[0]!.score : 1;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span>🏆</span> Leaderboard
        </h3>
        {!submitted && currentScore > 0 && (
          <button
            onClick={() => setShowSubmit(!showSubmit)}
            className="text-xs px-3 py-1 rounded-lg bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent/20 transition-all"
          >
            {showSubmit ? "Hủy" : "Gửi điểm"}
          </button>
        )}
      </div>

      {/* Submit form */}
      <AnimatePresence>
        {showSubmit && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="flex gap-2 glass-enhanced rounded-lg p-3">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Tên của bạn..."
                maxLength={20}
                className="flex-1 glass-input rounded px-3 py-1.5 text-xs text-cyber-text focus:outline-none focus:border-cyber-accent"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitScore();
                }}
              />
              <button
                onClick={handleSubmitScore}
                disabled={!playerName.trim()}
                className="px-3 py-1.5 text-xs rounded-lg bg-cyber-accent/15 border border-cyber-accent/40 text-cyber-accent hover:bg-cyber-accent/25 disabled:opacity-40 transition-all"
              >
                Gửi 🚀
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Leaderboard rows */}
      {loading ? (
        <div className="text-center text-xs text-cyber-muted py-8">Đang tải...</div>
      ) : (
        <div className="space-y-1">
          {entries.length === 0 && (
            <div className="text-center text-xs text-cyber-muted py-8">Chưa có dữ liệu</div>
          )}
          {entries.map((entry, i) => {
            const pct = topScore > 0 ? (entry.score / topScore) * 100 : 0;
            return (
              <motion.div
                key={`${entry.name}-${i}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative overflow-hidden glass rounded-lg px-3 py-2"
              >
                {/* Background bar */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyber-accent/8 to-transparent transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />

                <div className="relative flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                      i === 0
                        ? "bg-cyber-gold/20 text-cyber-gold"
                        : i === 1
                        ? "bg-cyber-muted/20 text-cyber-muted"
                        : i === 2
                        ? "bg-amber-600/20 text-amber-600"
                        : "bg-glass-white text-cyber-muted"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 truncate font-medium">{entry.name}</span>
                  <span className="text-cyber-accent font-bold tabular-nums">
                    {entry.score}
                  </span>
                  <span className="text-cyber-muted text-[10px]">
                    {entry.flags}f
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

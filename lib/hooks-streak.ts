/**
 * Duolingo-style Streak system with Supabase sync.
 */
"use client";
import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getStorageItem, setStorageItem, getTodayISO, getYesterdayISO } from "@/lib/utils";

interface StreakData {
  streak: number;
  lastStudyDate: string;
  longestStreak: number;
  todayActive: boolean;
}

const STREAK_KEY = "cybershield_streak_v2";

const DEFAULT_STREAK: StreakData = {
  streak: 0,
  lastStudyDate: "",
  longestStreak: 0,
  todayActive: false,
};

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>(DEFAULT_STREAK);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const local = getStorageItem<StreakData>(STREAK_KEY, DEFAULT_STREAK);
    const today = getTodayISO();

    // Check if streak is still valid
    if (local.lastStudyDate === today) {
      local.todayActive = true;
    } else if (local.lastStudyDate === getYesterdayISO()) {
      local.todayActive = false;
    } else if (local.lastStudyDate && local.lastStudyDate !== today) {
      // Streak broken
      local.streak = 0;
      local.todayActive = false;
    }

    setStreak(local);
    setLoaded(true);
  }, []);

  const markActive = useCallback(async () => {
    const today = getTodayISO();
    const yesterday = getYesterdayISO();

    setStreak((prev) => {
      let newStreak = prev.streak;

      if (prev.lastStudyDate === today) {
        // Already counted today
        return { ...prev, todayActive: true };
      }

      if (prev.lastStudyDate === yesterday) {
        newStreak = prev.streak + 1;
      } else if (!prev.lastStudyDate) {
        newStreak = 1;
      } else {
        newStreak = 1; // Streak broken, restart
      }

      const newData: StreakData = {
        streak: newStreak,
        lastStudyDate: today,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        todayActive: true,
      };

      setStorageItem(STREAK_KEY, newData);

      // Try to sync to Supabase
      try {
        const supabase = getSupabaseClient();
        supabase.from("streaks").upsert(
          {
            user_id: "anonymous",
            streak: newStreak,
            last_study_date: today,
            longest_streak: newData.longestStreak,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      } catch {
        // Silently fail — local storage is primary
      }

      return newData;
    });
  }, []);

  return { streak, loaded, markActive };
}

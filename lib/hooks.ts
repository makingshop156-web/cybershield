"use client";
import { useState, useEffect, useCallback } from "react";
import type { UserProgress } from "@/types";
import { modules } from "@/lib/data";
import { getStorageItem, setStorageItem, getTodayISO, getYesterdayISO } from "@/lib/utils";
import { ENABLE_AUTH } from "@/lib/auth/config";
import { useAuth } from "@/lib/hooks/useAuth";

const STORAGE_KEY = "cybershield_progress_v2";
const SPEEDRUN_KEY = "cybershield_speedrun_v2";

function createDefaultProgress(): UserProgress {
  return {
    completedLessons: [],
    streak: 0,
    lastStudyDate: "",
    badges: [],
  };
}

const MODULE_BADGE_MAP: Record<string, string> = {
  "module-1": "module_1",
  "module-2": "module_2",
  "module-3": "module_3",
  "module-4": "module_4",
};

function computeBadges(completed: string[], streak: number): string[] {
  const badges: string[] = [];
  if (completed.length >= 1) badges.push("first_lesson");
  if (completed.length >= 3) badges.push("speedrun");
  if (streak >= 7) badges.push("week_streak");
  if (streak >= 30) badges.push("month_streak");
  for (const mod of modules) {
    const badgeId = MODULE_BADGE_MAP[mod.id];
    if (badgeId && mod.lessons.every((l) => completed.includes(l.id))) badges.push(badgeId);
  }
  const allLessonIds = modules.flatMap((m) => m.lessons.map((l) => l.id));
  if (allLessonIds.length > 0 && allLessonIds.every((id) => completed.includes(id))) badges.push("all_modules");
  return Array.from(new Set(badges));
}

export function useProgress(): {
  progress: UserProgress;
  loaded: boolean;
  completeLesson: (lessonId: string) => void;
  resetProgress: () => void;
} {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(createDefaultProgress);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ENABLE_AUTH && !user) { setProgress(createDefaultProgress()); setLoaded(true); return; }
    try {
      const saved = getStorageItem<UserProgress | null>(STORAGE_KEY, null);
      if (saved) setProgress(saved);
    } catch { /* use default */ }
    setLoaded(true);
  }, [user]);

  useEffect(() => {
    if (loaded) setStorageItem(STORAGE_KEY, progress);
  }, [progress, loaded]);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const updated = [...prev.completedLessons, lessonId];
      const today = getTodayISO();
      let newStreak = prev.streak;
      if (prev.lastStudyDate === today) { /* already counted */ }
      else if (prev.lastStudyDate === getYesterdayISO()) newStreak = prev.streak + 1;
      else newStreak = 1;
      return { completedLessons: updated, streak: newStreak, lastStudyDate: today, badges: computeBadges(updated, newStreak) };
    });
  }, []);

  const resetProgress = useCallback(() => {
    const defaults = createDefaultProgress();
    setProgress(defaults);
    setStorageItem(STORAGE_KEY, defaults);
  }, []);

  return { progress, loaded, completeLesson, resetProgress };
}

export function useSpeedrun(): [boolean, () => void] {
  const [speedrun, setSpeedrun] = useState(false);
  useEffect(() => { setSpeedrun(getStorageItem(SPEEDRUN_KEY, false)); }, []);
  const toggleSpeedrun = useCallback(() => {
    setSpeedrun((prev) => { const next = !prev; setStorageItem(SPEEDRUN_KEY, next); return next; });
  }, []);
  return [speedrun, toggleSpeedrun];
}

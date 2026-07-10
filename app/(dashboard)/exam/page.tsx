"use client";
import { useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { useProgress } from "@/lib/hooks";
import ExamPage from "@/components/features/exam/ExamPage";

function getUserId(): string {
  try {
    if (typeof window === "undefined") return "guest";
    const stored = localStorage.getItem("cybershield-user-id");
    if (stored) return stored;
    const id = "user_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("cybershield-user-id", id);
    return id;
  } catch {
    return "guest_" + Math.random().toString(36).substring(2, 10);
  }
}

export default function ExamRoute() {
  const { progress, loaded } = useProgress();
  const userId = useMemo(() => getUserId(), []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-cyber-muted">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar
        streak={progress.streak}
        badges={progress.badges.length}
        completed={progress.completedLessons.length}
        total={progress.completedLessons.length}
      />
      <div className="max-w-4xl mx-auto px-4 pb-24 pt-8">
        <ExamPage userId={userId} />
      </div>
    </div>
  );
}

"use client";
import { useMemo } from "react";
import { modules, advancedModules } from "@/lib/data";
import type { Lesson } from "@/types";

export function useLessonData(lessonId: string | string[] | undefined): {
  lesson: Lesson | null;
  notFound: boolean;
} {
  const lesson = useMemo<Lesson | null>(() => {
    if (!lessonId || typeof lessonId !== "string") return null;
    for (const mod of modules) {
      for (const l of mod.lessons) {
        if (l.id === lessonId) return l;
      }
    }
    for (const mod of advancedModules) {
      for (const l of mod.lessons) {
        if (l.id === lessonId) return l;
      }
    }
    return null;
  }, [lessonId]);

  return { lesson, notFound: lesson === null };
}

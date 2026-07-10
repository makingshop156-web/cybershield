"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { EXAM_QUESTIONS, EXAM_DURATION_MINUTES, ENABLE_EXAM_MODE } from "@/lib/exam/config";
import { gradeExam, type ExamResult } from "@/lib/exam/exam-service";

export type ExamPhase = "idle" | "running" | "submitting" | "done";

export function useExam(userId: string) {
  const [phase, setPhase] = useState<ExamPhase>("idle");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [warning, setWarning] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "sent" | "failed">("idle");
  const visRef = useRef(false);

  const start = useCallback(() => {
    if (!ENABLE_EXAM_MODE) return;
    setPhase("running");
    setAnswers({});
    setResult(null);
    setTabSwitches(0);
    setWarning("");
    setEmailStatus("idle");
  }, []);

  const setAnswer = useCallback((qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  }, []);

  // Anti-cheat: detect tab switches
  useEffect(() => {
    if (phase !== "running") return;
    const handler = () => {
      if (document.hidden) {
        visRef.current = true;
        setTabSwitches((n) => n + 1);
        setWarning("⚠️ Phát hiện rời tab! Đây có thể bị coi là gian lận.");
        setTimeout(() => setWarning(""), 4000);
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [phase]);

  const submit = useCallback(async () => {
    if (phase !== "running") return;
    setPhase("submitting");
    const result = gradeExam(answers);
    setResult(result);
    setPhase("done");

    try {
      const res = await fetch("/api/exam/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, score: result.score, total: result.total, passed: result.passed }),
      });
      if (res.ok) setEmailStatus("sent");
      else setEmailStatus("failed");
    } catch {
      setEmailStatus("failed");
    }
  }, [phase, answers, userId]);

  // Auto-submit when time expires
  const expiredRef = useRef(false);
  const expire = useCallback(() => {
    if (expiredRef.current || phase !== "running") return;
    expiredRef.current = true;
    submit();
  }, [phase, submit]);

  return {
    phase, answers, result, tabSwitches, warning, emailStatus,
    questions: EXAM_QUESTIONS,
    duration: EXAM_DURATION_MINUTES,
    start, setAnswer, submit, expire,
  };
}

"use client";
import { useState, useCallback, useRef } from "react";
import { EXAM_QUESTIONS, EXAM_DURATION_MINUTES, ENABLE_EXAM_MODE } from "@/lib/exam/config";
import { gradeExam, type ExamResult } from "@/lib/exam/exam-service";

export type ExamPhase = "idle" | "running" | "submitting" | "done";

export function useExam(userId: string) {
  const [phase, setPhase] = useState<ExamPhase>("idle");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ExamResult | null>(null);

  const start = useCallback(() => {
    if (!ENABLE_EXAM_MODE) return;
    setPhase("running");
    setAnswers({});
    setResult(null);
  }, []);

  const setAnswer = useCallback((qId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  }, []);

  const doSubmit = useCallback((forceZero: boolean) => {
    if (phase !== "running") return;
    setPhase("submitting");
    const r = forceZero
      ? { score: 0, total: EXAM_QUESTIONS.length, passed: false, answers: [] }
      : gradeExam(answers);
    setResult(r);
    setPhase("done");
  }, [phase, answers]);

  const submit = useCallback(() => doSubmit(false), [doSubmit]);
  const forceSubmit = useCallback(() => doSubmit(true), [doSubmit]);

  const expiredRef = useRef(false);
  const expire = useCallback(() => {
    if (expiredRef.current || phase !== "running") return;
    expiredRef.current = true;
    doSubmit(false);
  }, [phase, doSubmit]);

  return {
    phase, answers, result,
    questions: EXAM_QUESTIONS,
    duration: EXAM_DURATION_MINUTES,
    start, setAnswer, submit, forceSubmit, expire,
  };
}

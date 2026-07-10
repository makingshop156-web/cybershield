import { PASS_SCORE, EXAM_QUESTIONS } from "./config";

export interface ExamResult {
  score: number;
  total: number;
  passed: boolean;
  answers: { questionId: string; correct: boolean }[];
}

export function gradeExam(answers: Record<string, string>): ExamResult {
  const result = EXAM_QUESTIONS.map((q) => ({
    questionId: q.id,
    correct: q.answer.trim().toLowerCase() === (answers[q.id] ?? "").trim().toLowerCase(),
  }));
  const score = result.filter((r) => r.correct).length;
  const total = EXAM_QUESTIONS.length;
  return { score, total, passed: (score / total) * 100 >= PASS_SCORE, answers: result };
}

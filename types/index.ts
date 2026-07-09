// ─── Core Domain Types ───────────────────────────────────────

export interface Module {
  id: string;
  title: string;
  description: string;
  goal: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  analogy: string;
  content: string;
  estMinutes: number;
  order: number;
  exercise: Exercise;
}

export type ExerciseType =
  | "fill-blank"
  | "ordering"
  | "true-false"
  | "multiple-choice"
  | "match";

export interface Exercise {
  type: ExerciseType;
  question: string;
  options?: string[];
  items?: { id: string; text: string }[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface GlossaryEntry {
  term: string;
  simple: string;
  example: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// ─── User Progress Types ─────────────────────────────────────

export interface UserProgress {
  completedLessons: string[];
  streak: number;
  lastStudyDate: string;
  badges: string[];
}

// ─── Terminal Types ──────────────────────────────────────────

export interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

export interface LabDefinition {
  id: string;
  title: string;
  description: string;
  command: string;
  output: TerminalLine[];
}

// ─── UI Component Types ──────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
  duration?: number;
}

// ─── Framer Motion Variants ──────────────────────────────────

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

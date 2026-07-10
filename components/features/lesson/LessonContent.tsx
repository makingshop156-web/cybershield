"use client";
import { motion } from "framer-motion";
import { glossary } from "@/lib/data";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { GlossaryEntry } from "@/types";

function renderWithGlossary(text: string, entries: GlossaryEntry[]): React.ReactNode {
  const sorted = [...entries].sort((a, b) => b.term.length - a.term.length);
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let found = false;
    for (const entry of sorted) {
      const idx = remaining.indexOf(entry.term);
      if (idx >= 0) {
        if (idx > 0) {
          parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
        }
        parts.push(
          <span
            key={key++}
            className="tooltip-container text-cyber-accent border-b border-dotted border-cyber-accent/40 cursor-help"
          >
            {entry.term}
            <span className="tooltip-text">
              <strong>{entry.term}:</strong> {entry.simple}
              <br />
              <em className="text-cyber-muted text-[11px]">VD: {entry.example}</em>
            </span>
          </span>
        );
        remaining = remaining.slice(idx + entry.term.length);
        found = true;
        break;
      }
    }
    if (!found) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }
  }
  return <>{parts}</>;
}

interface LessonContentProps {
  content: string;
  glossaryOn: boolean;
}

export function LessonContent({ content, glossaryOn }: LessonContentProps) {
  return (
    <ErrorBoundary>
      <motion.div
        layout
        className="glass-enhanced rounded-xl p-4 sm:p-6 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="text-sm space-y-3">
          {content.split("\n").map((line, i) => {
            const rendered = glossaryOn ? renderWithGlossary(line, glossary) : line;

            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-lg font-bold text-cyber-text mt-6 mb-3 first:mt-0">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-base font-semibold text-cyber-accent mt-4 mb-2">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("| ") || line.startsWith("|---")) {
              return (
                <p key={i} className="text-sm text-cyber-muted font-mono">{line}</p>
              );
            }
            if (line.startsWith("```")) return null;

            if (line.startsWith("- **")) {
              const match = line.match(/- \*\*(.+?)\*\*[—–-]?\s*(.*)/);
              if (match) {
                return (
                  <div key={i} className="flex items-start gap-2 my-1">
                    <span className="text-cyber-green mt-1 shrink-0">▸</span>
                    <span>
                      <strong className="text-cyber-text">{match[1]}</strong>
                      {match[2] && <> — {match[2]}</>}
                    </span>
                  </div>
                );
              }
              return <div key={i} className="text-sm my-1">{line}</div>;
            }
            if (line.trim() === "") return <div key={i} className="h-2" />;
            if (glossaryOn && typeof rendered !== "string") {
              return <div key={i} className="text-sm leading-relaxed">{rendered}</div>;
            }
            return <div key={i} className="text-sm leading-relaxed">{line}</div>;
          })}
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}

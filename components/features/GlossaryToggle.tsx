"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlossaryToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function GlossaryToggle({ enabled, onToggle }: GlossaryToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all duration-200 shrink-0",
        enabled
          ? "bg-cyber-accent/15 border-cyber-accent text-cyber-accent"
          : "border-glass-border text-cyber-muted hover:border-cyber-accent/40 hover:text-cyber-text"
      )}
    >
      <span className="text-sm">{enabled ? "📖" : "📕"}</span>
      <span className="hidden sm:inline">
        {enabled ? "Đang giải thích" : "Giải thích thuật ngữ"}
      </span>
    </motion.button>
  );
}

"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DocSection } from "./config";

interface DocsSidebarProps {
  sections: DocSection[];
  activeId: string;
  onSelect: (id: string) => void;
  open: boolean;
  onToggle: () => void;
}

export function DocsSidebar({ sections, activeId, onSelect, open, onToggle }: DocsSidebarProps) {
  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-50 p-2.5 glass-enhanced rounded-xl sm:hidden"
        aria-label="Toggle docs menu"
      >
        <div className="w-5 h-0.5 bg-cyber-muted mb-1 rounded" />
        <div className="w-5 h-0.5 bg-cyber-muted mb-1 rounded" />
        <div className="w-5 h-0.5 bg-cyber-muted rounded" />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed sm:sticky top-14 sm:top-20 left-0 z-40 sm:z-0",
          "w-64 h-[calc(100vh-5rem)] glass-enhanced border-r border-white/5",
          "transform transition-transform duration-300 ease-out",
          "sm:translate-x-0 overflow-y-auto",
          open ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => { onSelect(sec.id); onToggle(); }}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200",
                activeId === sec.id
                  ? "bg-cyber-accent/10 text-cyber-accent border-l-2 border-cyber-accent"
                  : "text-cyber-muted hover:text-cyber-text hover:bg-white/5"
              )}
            >
              {sec.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}

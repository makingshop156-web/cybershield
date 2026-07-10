"use client";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const BLOCKED_KEYS = new Set(["F12"]);
const BLOCKED_COMBOS = [
  { ctrl: true, shift: true, key: "I" },
  { ctrl: true, shift: true, key: "J" },
  { ctrl: true, key: "U" },
  { ctrl: true, shift: true, key: "C" },
];

export default function LockdownWrapper({ children }: Props) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (BLOCKED_KEYS.has(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    for (const combo of BLOCKED_COMBOS) {
      if (
        e.ctrlKey === !!combo.ctrl &&
        e.shiftKey === !!combo.shift &&
        e.key.toUpperCase() === combo.key
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
  };

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  );
}

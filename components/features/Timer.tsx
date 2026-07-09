"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimerProps {
  minutes: number;
  onTimeUp?: () => void;
}

export function Timer({ minutes, onTimeUp }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const toggle = useCallback(() => {
    if (running) {
      clearTimer();
      setRunning(false);
    } else {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setRunning(false);
            onTimeUp?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [running, clearTimer, onTimeUp]);

  const reset = useCallback(() => {
    clearTimer();
    setSecondsLeft(minutes * 60);
    setRunning(false);
  }, [minutes, clearTimer]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const expired = secondsLeft === 0;
  const progress = 1 - secondsLeft / (minutes * 60);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border transition-all shrink-0",
        expired
          ? "bg-cyber-red/10 border-cyber-red/30 text-cyber-red"
          : running
          ? "bg-cyber-accent/10 border-cyber-accent/30 text-cyber-accent"
          : "border-glass-border text-cyber-muted"
      )}
    >
      <span className="relative">
        ⏱
        {running && (
          <motion.span
            className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-cyber-accent rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0 }}
          />
        )}
      </span>
      <span className="font-mono tabular-nums w-10 text-center">
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
      {!expired && (
        <>
          <button
            onClick={toggle}
            className="hover:text-cyber-text transition-colors"
            aria-label={running ? "Tạm dừng" : "Bắt đầu"}
          >
            {running ? "⏸" : "▶"}
          </button>
          <button
            onClick={reset}
            className="hover:text-cyber-text transition-colors"
            aria-label="Đặt lại"
          >
            ↺
          </button>
        </>
      )}
    </motion.div>
  );
}

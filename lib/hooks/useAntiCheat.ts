"use client";
import { useState, useRef, useCallback, useEffect } from "react";

const MAX_STRIKES = 3;

export function useAntiCheat(onForceSubmit: () => void) {
  const [strikes, setStrikes] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [locked, setLocked] = useState(false);
  const strikesRef = useRef(0);

  const recordStrike = useCallback(() => {
    strikesRef.current += 1;
    setStrikes(strikesRef.current);
    setShowWarning(true);
    if (strikesRef.current >= MAX_STRIKES) {
      setLocked(true);
      setShowWarning(false);
      onForceSubmit();
    }
  }, [onForceSubmit]);

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
  }, []);

  const reset = useCallback(() => {
    strikesRef.current = 0;
    setStrikes(0);
    setShowWarning(false);
    setLocked(false);
  }, []);

  useEffect(() => {
    if (locked) return;
    const onVisChange = () => {
      if (document.hidden) recordStrike();
    };
    const onBlur = () => recordStrike();
    document.addEventListener("visibilitychange", onVisChange);
    window.addEventListener("blur", onBlur);
    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      window.removeEventListener("blur", onBlur);
    };
  }, [locked, recordStrike]);

  return { strikes, showWarning, locked, dismissWarning, reset };
}

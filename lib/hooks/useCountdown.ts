"use client";
import { useState, useEffect, useRef } from "react";

export function useCountdown(minutes: number) {
  const endRef = useRef<number | null>(null);
  const [remaining, setRemaining] = useState(minutes * 60);

  useEffect(() => {
    if (endRef.current !== null) return;
    endRef.current = Date.now() + minutes * 60 * 1000;

    const tick = () => {
      const left = Math.max(0, Math.floor((endRef.current! - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) return;
      requestAnimationFrame(tick);
    };
    tick();
  }, [minutes]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const expired = remaining <= 0;

  return { remaining, mins, secs, expired };
}

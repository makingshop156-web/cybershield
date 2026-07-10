"use client";
import { motion } from "framer-motion";

interface CountdownScreenProps {
  count: number;
}

export function CountdownScreen({ count }: CountdownScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center"
    >
      <motion.span
        className="text-7xl sm:text-9xl font-black text-cyber-accent"
        key={count}
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ textShadow: "0 0 40px rgba(0,255,255,0.5)" }}
      >
        {count}
      </motion.span>
      <span className="text-sm text-cyber-muted mt-2">Chuẩn bị chiến đấu...</span>
    </motion.div>
  );
}

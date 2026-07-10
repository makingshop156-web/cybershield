"use client";
import { motion } from "framer-motion";

interface ResultScreenProps {
  result: "win" | "lose";
  eloDiff: number;
  onLeave: () => void;
}

export function ResultScreen({ result, eloDiff, onLeave }: ResultScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 sm:gap-6 text-center px-4"
    >
      {result === "win" ? (
        <>
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <span className="text-5xl sm:text-7xl">🏆</span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-black gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            VICTORY
          </motion.h2>
          <motion.p
            className="text-cyber-accent text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            +{eloDiff} Elo
          </motion.p>
        </>
      ) : (
        <>
          <motion.div
            initial={{ rotate: 10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <span className="text-5xl sm:text-7xl">💀</span>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl font-black text-red-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            DEFEAT
          </motion.h2>
          <motion.p
            className="text-cyber-muted text-sm sm:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            -{eloDiff} Elo
          </motion.p>
        </>
      )}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onLeave}
        className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm"
      >
        ← Quay về sảnh
      </motion.button>
    </motion.div>
  );
}

"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  show: boolean;
  strikes: number;
  maxStrikes: number;
  onDismiss: () => void;
}

export default function AntiCheatModal({ show, strikes, maxStrikes, onDismiss }: Props) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-enhanced rounded-2xl p-8 max-w-sm w-full mx-4 text-center space-y-4 border-red-500/40"
            style={{ borderColor: "rgba(239,68,68,0.4)" }}
          >
            <div className="text-5xl">⚠️</div>
            <h2 className="text-xl font-bold text-red-400">Cảnh báo: Bạn đã rời khỏi phòng thi!</h2>
            <p className="text-sm text-cyber-muted leading-relaxed">
              Hành vi này được coi là gian lận.
              Sau <strong className="text-red-400">{maxStrikes - strikes}</strong> lần cảnh báo nữa,
              bài thi sẽ tự động nộp với điểm 0.
            </p>
            <div className="flex justify-center gap-1.5">
              {Array.from({ length: maxStrikes }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${i < strikes ? "bg-red-500" : "bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={onDismiss}
              className="px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl border border-red-500/30 transition-all text-sm font-semibold"
            >
              Quay lại phòng thi
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

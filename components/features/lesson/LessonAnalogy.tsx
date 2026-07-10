"use client";
import { motion } from "framer-motion";

interface LessonAnalogyProps {
  analogy: string;
}

export function LessonAnalogy({ analogy }: LessonAnalogyProps) {
  return (
    <motion.div
      layout
      className="glass-enhanced rounded-xl p-4 mb-6 border border-amber-500/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">💡</span>
        <div>
          <div className="text-xs text-cyber-gold font-medium mb-1 uppercase tracking-wider">
            ẨN DỤ THỰC TẾ
          </div>
          <div className="text-sm text-cyber-text/90 whitespace-pre-line leading-relaxed">
            {analogy}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

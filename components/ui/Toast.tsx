"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Toast as ToastType } from "@/lib/hooks/useToast";

const ICONS: Record<string, string> = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

const BORDERS: Record<string, string> = {
  success: "border-cyber-green/30",
  error: "border-cyber-red/30",
  warning: "border-cyber-gold/30",
  info: "border-cyber-accent/30",
};

const BG: Record<string, string> = {
  success: "bg-cyber-green/5",
  error: "bg-cyber-red/5",
  warning: "bg-cyber-gold/5",
  info: "bg-cyber-accent/5",
};

interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={() => onRemove(toast.id)}
            className={`pointer-events-auto cursor-pointer rounded-xl px-4 py-3 border text-sm backdrop-blur-md ${BG[toast.type]} ${BORDERS[toast.type]} shadow-lg`}
          >
            <div className="flex items-center gap-2.5">
              <span className="shrink-0">{ICONS[toast.type]}</span>
              <span className="text-white/90">{toast.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

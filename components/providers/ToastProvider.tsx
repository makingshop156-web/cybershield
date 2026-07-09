"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ToastMessage } from "@/types";

interface ToastContextValue {
  toast: (msg: Omit<ToastMessage, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const typeStyles: Record<ToastMessage["type"], string> = {
  success: "border-cyber-green/30 bg-cyber-green/10",
  error: "border-cyber-red/30 bg-cyber-red/10",
  info: "border-cyber-accent/30 bg-cyber-accent/10",
  warning: "border-cyber-gold/30 bg-cyber-gold/10",
};

const typeIcons: Record<ToastMessage["type"], string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (msg: Omit<ToastMessage, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const toast: ToastMessage = { ...msg, id };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => removeToast(id), msg.duration ?? 4000);
    },
    [removeToast]
  );

  const toast: ToastContextValue["toast"] = useCallback(
    (msg) => addToast(msg),
    [addToast]
  );

  const success = useCallback(
    (title: string, description?: string) =>
      addToast({ type: "success", title, description }),
    [addToast]
  );

  const error = useCallback(
    (title: string, description?: string) =>
      addToast({ type: "error", title, description }),
    [addToast]
  );

  const info = useCallback(
    (title: string, description?: string) =>
      addToast({ type: "info", title, description }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col-reverse gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto px-4 py-3 rounded-lg border shadow-gloss backdrop-blur-md min-w-[300px] max-w-md",
                typeStyles[t.type]
              )}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-sm mt-0.5">{typeIcons[t.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-cyber-text">{t.title}</p>
                  {t.description && (
                    <p className="text-xs text-cyber-muted mt-0.5 leading-relaxed">
                      {t.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-cyber-muted hover:text-cyber-text text-sm shrink-0 -mr-1"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

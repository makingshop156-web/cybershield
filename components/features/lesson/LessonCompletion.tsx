"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LessonCompletion() {
  const router = useRouter();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-enhanced rounded-xl p-6 text-center border border-cyber-green/20"
    >
      <motion.div
        className="text-4xl mb-3"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
      >
        ✅
      </motion.div>
      <div className="text-cyber-green font-semibold mb-1 text-lg">
        Bài học đã hoàn thành!
      </div>
      <p className="text-sm text-cyber-muted mb-4">
        Tiếp tục lộ trình của bạn nào!
      </p>
      <Button variant="primary" size="md" onClick={() => router.push("/roadmap")}>
        ← Quay lại lộ trình
      </Button>
    </motion.div>
  );
}

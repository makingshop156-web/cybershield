"use client";
import { motion } from "framer-motion";
import type { ExamResult } from "@/lib/exam/exam-service";
import { PASS_SCORE } from "@/lib/exam/config";

interface ExamResultProps {
  result: ExamResult;
  emailStatus: "idle" | "sent" | "failed";
}

export default function ExamResultView({ result, emailStatus }: ExamResultProps) {
  const pct = Math.round((result.score / result.total) * 100);
  const passed = pct >= PASS_SCORE;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 max-w-lg mx-auto"
    >
      <div className="text-6xl">{passed ? "🎉" : "😔"}</div>
      <h2 className={`text-2xl font-bold ${passed ? "text-green-400" : "text-red-400"}`}>
        {passed ? "CHÚC MỪNG!" : "RẤT TIẾC"}
      </h2>
      <p className="text-sm text-cyber-muted">
        {passed
          ? "Bạn đã vượt qua kỳ thi và nhận được chứng chỉ!"
          : "Bạn chưa đạt điểm yêu cầu. Hãy ôn tập và thử lại!"}
      </p>

      <div className="glass-enhanced rounded-xl p-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-cyber-muted">Điểm số</span>
          <span className="text-cyber-accent font-bold font-mono">{result.score}/{result.total}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-cyber-muted">Phần trăm</span>
          <span className={`font-bold font-mono ${passed ? "text-green-400" : "text-red-400"}`}>
            {pct}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-cyber-muted">Yêu cầu đỗ</span>
          <span className="text-white font-mono">{PASS_SCORE}%</span>
        </div>

        {passed && (
          <div className="mt-4 p-4 border border-cyber-accent/30 rounded-lg bg-cyber-accent/5">
            <p className="text-xs text-cyber-muted">Trạng thái chứng chỉ</p>
            <p className="text-sm text-cyber-accent mt-1">
              {emailStatus === "sent"
                ? "✅ Chứng chỉ đã được gửi qua email"
                : emailStatus === "failed"
                ? "⚠️ Đã lưu kết quả, chứng chỉ sẽ được gửi sau"
                : "⏳ Đang gửi chứng chỉ..."}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

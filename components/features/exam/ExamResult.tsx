"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { ExamResult } from "@/lib/exam/exam-service";
import { PASS_SCORE } from "@/lib/exam/config";
import { useAuth } from "@/lib/hooks/useAuth";
import { createDefaultCert } from "@/lib/certificate/config";
import CertificateModal from "@/components/features/certificate/CertificateModal";

interface ExamResultProps {
  result: ExamResult;
  userName: string;
}

export default function ExamResultView({ result, userName }: ExamResultProps) {
  const [showCert, setShowCert] = useState(false);
  const pct = Math.round((result.score / result.total) * 100);
  const passed = pct >= PASS_SCORE;

  const certData = passed
    ? createDefaultCert(userName, "Khóa học Cơ bản về Bảo mật CyberShield", result.score, result.total)
    : null;

  return (
    <>
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
            ? "Bạn đã vượt qua kỳ thi!"
            : "Bạn chưa đạt điểm yêu cầu. Hãy ôn tập và thử lại!"}
        </p>

        <div className="glass-enhanced rounded-xl p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-cyber-muted">Điểm số</span>
            <span className="text-cyber-accent font-bold font-mono">{result.score}/{result.total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cyber-muted">Phần trăm</span>
            <span className={`font-bold font-mono ${passed ? "text-green-400" : "text-red-400"}`}>{pct}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cyber-muted">Yêu cầu đỗ</span>
            <span className="text-white font-mono">{PASS_SCORE}%</span>
          </div>
        </div>

        {passed && certData && (
          <button
            onClick={() => setShowCert(true)}
            className="px-8 py-3 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-xl border border-cyber-accent/40 transition-all text-base font-semibold"
          >
            🏆 Xem chứng chỉ
          </button>
        )}
      </motion.div>

      {certData && (
        <CertificateModal
          data={certData}
          open={showCert}
          onClose={() => setShowCert(false)}
        />
      )}
    </>
  );
}

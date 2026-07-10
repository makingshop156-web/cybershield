"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioCert } from "@/lib/portfolio/config";
import { formatDate } from "@/lib/certificate/config";
import CertificatePreview from "@/components/features/certificate/CertificatePreview";
import CertificateModal from "@/components/features/certificate/CertificateModal";
import { createDefaultCert } from "@/lib/certificate/config";

interface Props {
  certificates: PortfolioCert[];
}

export default function PortfolioTrophyRoom({ certificates }: Props) {
  const [selected, setSelected] = useState<PortfolioCert | null>(null);

  const modalData = selected
    ? createDefaultCert(selected.recipientName, selected.title)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-sm font-semibold text-white mb-3">🏆 Tủ kính Chứng chỉ</h2>

      {certificates.length === 0 ? (
        <div className="glass-enhanced rounded-xl p-8 text-center">
          <p className="text-4xl mb-3">📜</p>
          <p className="text-sm text-cyber-muted">Chưa có chứng chỉ nào</p>
          <p className="text-xs text-cyber-muted/60 mt-1">Hoàn thành khóa học hoặc thi chứng chỉ để hiển thị</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setSelected(cert)}
              className="glass-enhanced rounded-xl p-4 text-left hover:border-cyber-accent/40 transition-all text-left border border-glass-border"
            >
              <p className="text-sm text-white font-semibold line-clamp-1">{cert.title}</p>
              <p className="text-xs text-cyber-muted mt-1">{cert.recipientName}</p>
              <div className="flex justify-between items-center mt-2 text-[10px] text-cyber-muted/60">
                <span>{formatDate(cert.issueDate)}</span>
                <span className="font-mono">{cert.hashId.slice(0, 12)}...</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && modalData && (
        <CertificateModal
          data={modalData}
          open={!!selected}
          onClose={() => setSelected(null)}
        />
      )}
    </motion.div>
  );
}

"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import CertificatePreview from "./CertificatePreview";
import type { CertificateData } from "@/lib/certificate/config";
import { ENABLE_CERT_DOWNLOAD } from "@/lib/certificate/config";

interface CertModalProps {
  data: CertificateData;
  open: boolean;
  onClose: () => void;
}

export default function CertificateModal({ data, open, onClose }: CertModalProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!certRef.current || !ENABLE_CERT_DOWNLOAD) return;
    setDownloading(true);
    try {
      const blob = await toPng(certRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#faf8f5",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `certificate-${data.hashId}.png`;
      link.href = blob;
      link.click();
    } catch {
      // fallback
    }
    setDownloading(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-[820px]"
            onClick={(e) => e.stopPropagation()}
          >
            <CertificatePreview ref={certRef} data={data} />

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-6 py-2.5 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-xl border border-cyber-accent/40 transition-all text-sm font-semibold disabled:opacity-50"
              >
                {downloading ? "Đang tải..." : "📥 Tải xuống chứng chỉ"}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-cyber-muted rounded-xl border border-white/10 transition-all text-sm"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

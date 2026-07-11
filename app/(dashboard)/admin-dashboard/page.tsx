"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { AdminRoute } from "@/components/features/auth/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/useToast";
import {
  createDefaultCert,
  type CertificateData,
  ENABLE_CERT_DOWNLOAD,
} from "@/lib/certificate/config";
import CertificatePreview from "@/components/features/certificate/CertificatePreview";

function AdminContent() {
  const { user } = useAuth();
  const toast = useToast();
  const certRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [course, setCourse] = useState(
    "Khóa học Cơ bản về Bảo mật CyberShield"
  );
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleIssue = () => {
    if (!name.trim()) {
      toast.warning("Nhập tên người nhận");
      return;
    }
    if (!course.trim()) {
      toast.warning("Nhập tên chứng chỉ");
      return;
    }
    const data = createDefaultCert(name.trim(), course.trim());
    setCert(data);
    toast.success("Chứng chỉ đã được tạo!");
  };

  const handleDownload = async () => {
    if (!certRef.current || !ENABLE_CERT_DOWNLOAD) return;
    setDownloading(true);
    try {
      await document.fonts.ready;
      const { toPng } = await import("html-to-image");
      const blob = await toPng(certRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#fcf9f5",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = `certificate-${cert?.hashId ?? "preview"}.png`;
      link.href = blob;
      link.click();
    } catch {
      toast.error("Không thể tải chứng chỉ");
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-[70vh] max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
        <p className="text-sm text-cyber-muted mt-2">
          Quản trị hệ thống CyberShield
        </p>
      </div>

      <div className="glass-enhanced rounded-xl p-4 flex items-center gap-3">
        <span className="text-xs text-cyber-muted">Đang đăng nhập:</span>
        <span className="text-sm text-cyber-accent font-semibold">
          {user?.email}
        </span>
        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          {user?.role}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 glass-enhanced rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            📜 Cấp chứng chỉ
          </h2>
          <p className="text-xs text-cyber-muted">
            Nhập thông tin và phát hành chứng chỉ ngay lập tức.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-cyber-muted mb-1">
                Tên người nhận
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-cyber-muted mb-1">
                Tên chứng chỉ
              </label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                placeholder="Tên khóa học"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
              />
            </div>
            <button
              onClick={handleIssue}
              className="w-full py-2.5 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-lg border border-cyber-accent/40 transition-all text-sm font-semibold"
            >
              🏆 Phát hành
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col items-center justify-center space-y-4">
          {cert ? (
            <>
              <div className="w-full max-w-full overflow-x-auto">
                <CertificatePreview ref={certRef} data={cert} />
              </div>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="px-6 py-2.5 bg-gradient-to-r from-cyber-accent/30 to-purple-500/30 hover:from-cyber-accent/50 hover:to-purple-500/50 text-white rounded-xl border border-cyber-accent/40 transition-all text-sm font-semibold disabled:opacity-50"
              >
                {downloading ? "Đang tải..." : "📥 Tải xuống chứng chỉ"}
              </button>
            </>
          ) : (
            <div className="text-center text-cyber-muted text-sm">
              <p className="text-4xl mb-3">📜</p>
              <p>Nhập thông tin và bấm Phát hành</p>
              <p className="text-xs mt-1">để xem trước chứng chỉ</p>
            </div>
          )}
        </div>
      </div>

      <div className="glass-enhanced rounded-xl p-4 text-sm text-cyber-muted space-y-2">
        <p>
          📊 Quyền hạn:{" "}
          {user?.role === "OWNER" ? "Toàn quyền (God Mode)" : "Quản trị"}
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}

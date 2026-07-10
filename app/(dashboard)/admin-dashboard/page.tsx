"use client";
import { AdminRoute } from "@/components/features/auth/ProtectedRoute";
import { useAuth } from "@/lib/hooks/useAuth";
import { useToast } from "@/lib/hooks/useToast";
import { authService } from "@/lib/auth/auth-service";
import { useState } from "react";

function AdminContent() {
  const { user } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleMint = async () => {
    if (!email.trim()) { toast.warning("Nhập email cần cấp chứng chỉ"); return; }
    setSending(true);
    const res = await authService.mintCertificate(email, user?.id ?? "");
    setSending(false);
    if (!res.ok) { toast.error(res.error ?? "Lỗi khi cấp chứng chỉ"); return; }
    if (res.emailSent) toast.success("Chứng chỉ đã gửi qua email thành công!");
    else toast.warning("Đã lưu kết quả, chứng chỉ sẽ được gửi sau");
  };

  return (
    <div className="min-h-[70vh] max-w-lg mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
        <p className="text-sm text-cyber-muted mt-2">Quản trị hệ thống CyberShield</p>
      </div>

      <div className="glass-enhanced rounded-xl p-4 flex items-center gap-3">
        <span className="text-xs text-cyber-muted">Đang đăng nhập:</span>
        <span className="text-sm text-cyber-accent font-semibold">{user?.email}</span>
        <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
          {user?.role}
        </span>
      </div>

      {user?.role === "OWNER" && (
        <div className="glass-enhanced rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            👑 God Mode — Mint Certificate
          </h2>
          <p className="text-xs text-cyber-muted">
            Cấp chứng chỉ trực tiếp cho bất kỳ email nào mà không cần qua bài thi.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-all"
            />
            <button
              onClick={handleMint}
              disabled={sending}
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 hover:from-yellow-500/50 hover:to-orange-500/50 text-white rounded-lg border border-yellow-500/40 transition-all text-sm font-semibold whitespace-nowrap disabled:opacity-50"
            >
              {sending ? "Đang cấp..." : "Mint Certificate 🏆"}
            </button>
          </div>
        </div>
      )}

      <div className="glass-enhanced rounded-xl p-4 text-sm text-cyber-muted space-y-2">
        <p>📊 Thống kê hệ thống đang được xây dựng.</p>
        <p>🔧 Quyền hạn hiện tại: {user?.role === "OWNER" ? "Toàn quyền (God Mode)" : user?.role === "ADMIN" ? "Quản trị" : "Không xác định"}</p>
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

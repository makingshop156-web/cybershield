"use client";
import { forwardRef } from "react";
import type { CertificateData } from "@/lib/certificate/config";
import { formatDate } from "@/lib/certificate/config";

interface CertProps {
  data: CertificateData;
}

const CertificatePreview = forwardRef<HTMLDivElement, CertProps>(({ data }, ref) => {
  const pct = data.score != null && data.total != null ? Math.round((data.score / data.total) * 100) : null;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[600px] mx-auto bg-[#0a0e17] rounded-2xl p-[3px]"
      style={{
        background: "linear-gradient(135deg, #00ff41, #00b8ff, #00ff41, #7000ff)",
        backgroundSize: "300% 300%",
        boxShadow: "0 0 40px rgba(0,255,65,0.15), 0 0 80px rgba(0,184,255,0.1)",
      }}
    >
      <div className="bg-[#0d1117] rounded-2xl p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, #00ff41 0%, transparent 50%), radial-gradient(circle at 75% 75%, #00b8ff 0%, transparent 50%)",
        }} />

        <div className="relative z-10 text-center space-y-5">
          <pre className="text-[8px] sm:text-[10px] leading-tight text-[#00ff41] font-mono tracking-wider select-none" style={{ lineHeight: 1.2 }}>
{`  ██████  ██▓   ▓█████▄  ██▓▓█████ ██▀███
▒██    ▒ ▓██▒   ▒██▀ ██▌▓██▒▓█   ▀▓██ ▒ ██▒
░ ▓██▄   ▒██░   ░██   █▌▒██▒▒███  ▓██ ░▄█ ▒
  ▒   ██▒▒██░   ░▓█▄   ▌░██░▒▓█  ▄▒██▀▀█▄
▒██████▒▒░██████▒░▒████▓ ░██░░▒████░██▓ ▒██▒
▒ ▒▓▒ ▒ ░░ ▒░▓  ░ ▒▒▓  ▒ ░▓  ░░ ▒░░ ▒▓ ░▒▓░
░ ░▒  ░ ░░ ░ ▒  ░ ░ ▒  ▒  ▒ ░ ░ ░  ░ ░▒ ░ ▒░
░  ░  ░    ░ ░    ░ ░  ░  ▒ ░   ░    ░░   ░
      ░      ░  ░   ░     ░     ░  ░  ░`}
          </pre>

          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#00ff41]/60 font-mono">Chứng chỉ điện tử</p>
            <h2 className="text-lg sm:text-xl font-bold text-white font-sans">{data.courseName}</h2>
          </div>

          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto" />

          <div className="space-y-1">
            <p className="text-[11px] text-[#8b949e] font-mono">Cấp cho</p>
            <p className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-wide">{data.recipientName}</p>
          </div>

          {pct != null && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/20">
              <span className="text-[11px] text-[#8b949e] font-mono">Kết quả:</span>
              <span className="text-sm font-bold text-[#00ff41] font-mono">{data.score}/{data.total} ({pct}%)</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-6 text-[10px] font-mono text-[#8b949e]">
            <span>Ngày: {formatDate(data.issueDate)}</span>
            <span className="w-px h-3 bg-[#30363d]" />
            <span>ID: {data.hashId}</span>
          </div>

          <div className="pt-2 border-t border-[#21262d]">
            <p className="text-[9px] text-[#484f58] font-mono">cybershield-nu-one.vercel.app</p>
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";
export default CertificatePreview;

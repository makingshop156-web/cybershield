"use client";
import { forwardRef } from "react";
import type { CertificateData } from "@/lib/certificate/config";
import { formatDate } from "@/lib/certificate/config";

interface CertProps {
  data: CertificateData;
}

const CERT_W = 800;
const CERT_H = 565;
const RATIO = CERT_W / CERT_H;

function GoldSeal() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fce181" />
          <stop offset="50%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#goldGrad)" strokeWidth="2" />
      <circle cx="32" cy="32" r="27" fill="none" stroke="url(#goldGrad)" strokeWidth="0.8" strokeDasharray="2.5 2.5" />
      <text x="32" y="24" textAnchor="middle" fill="url(#goldGrad)" fontSize="7" fontWeight="bold" fontFamily="serif">CYBER</text>
      <text x="32" y="34" textAnchor="middle" fill="url(#goldGrad)" fontSize="9" fontWeight="bold" fontFamily="serif">SHIELD</text>
      <text x="32" y="46" textAnchor="middle" fill="url(#goldGrad)" fontSize="6" fontFamily="serif">★ SEAL ★</text>
    </svg>
  );
}

function DecorativeBorder() {
  return (
    <svg
      className="absolute inset-0 pointer-events-none w-full h-full"
      width={CERT_W}
      height={CERT_H}
      viewBox={`0 0 ${CERT_W} ${CERT_H}`}
      preserveAspectRatio="none"
    >
      <rect x="8" y="8" width={CERT_W - 16} height={CERT_H - 16} fill="none" stroke="#d4a017" strokeWidth="1.5" rx="2" />
      <rect x="14" y="14" width={CERT_W - 28} height={CERT_H - 28} fill="none" stroke="#d4a017" strokeWidth="0.5" rx="1" strokeDasharray="4 3" />
      <path d="M 24 24 L 48 24 L 48 48" fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d={`M ${CERT_W - 24} 24 L ${CERT_W - 48} 24 L ${CERT_W - 48} 48`} fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d={`M 24 ${CERT_H - 24} L 48 ${CERT_H - 24} L 48 ${CERT_H - 48}`} fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d={`M ${CERT_W - 24} ${CERT_H - 24} L ${CERT_W - 48} ${CERT_H - 24} L ${CERT_W - 48} ${CERT_H - 48}`} fill="none" stroke="#d4a017" strokeWidth="1.5" />
    </svg>
  );
}

function SignatureBlock() {
  return (
    <div className="flex flex-col items-end" style={{ fontFamily: "'Inter', sans-serif" }}>
      <svg width="140" height="32" viewBox="0 0 140 32" className="mb-0.5">
        <path
          d="M5 26 C20 8, 38 28, 52 14 C60 6, 72 22, 82 12 C90 6, 102 24, 110 16 C118 10, 128 22, 134 16"
          fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round" style={{ filter: "blur(0.2px)" }}
        />
      </svg>
      <p className="text-[9px] font-semibold text-[#555] tracking-wide">Founder & CEO of Cybershield</p>
    </div>
  );
}

const CertificatePreview = forwardRef<HTMLDivElement, CertProps>(({ data }, ref) => {
  const pct = data.score != null && data.total != null ? Math.round((data.score / data.total) * 100) : null;

  return (
    <div
      ref={ref}
      className="relative mx-auto overflow-hidden bg-[#faf8f5]"
      style={{
        width: "100%",
        maxWidth: `${CERT_W}px`,
        aspectRatio: `${RATIO}`,
        fontFamily: "'Playfair Display', 'Georgia', serif",
      }}
    >
      <DecorativeBorder />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-12 py-8 text-center">
        <GoldSeal />

        <p className="text-[10px] tracking-[0.25em] text-[#b8860b] uppercase font-medium mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Certificate of Excellence
        </p>

        <h1 className="text-xl font-bold text-[#1a1a2e] mt-2 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {data.courseName}
        </h1>

        <div className="w-20 h-[1.5px] bg-[#d4a017] mx-auto my-3" />

        <p className="text-[11px] text-[#666] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          This is to proudly certify that
        </p>

        <p className="text-2xl font-bold text-[#1a1a2e] my-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {data.recipientName}
        </p>

        <p className="text-[11px] text-[#666] leading-relaxed max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
          has successfully completed the rigorous requirements of the above-named program,
          demonstrating exceptional proficiency in cybersecurity fundamentals.
        </p>

        {pct != null && (
          <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-[#fdf6e3] border border-[#d4a017]/30 rounded-full">
            <span className="text-[10px] text-[#8b6914]" style={{ fontFamily: "'Inter', sans-serif" }}>Final Score:</span>
            <span className="text-xs font-bold text-[#b8860b]">{data.score}/{data.total} ({pct}%)</span>
          </div>
        )}

        <div className="flex items-center gap-6 mt-3 text-[10px] text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <div className="text-center">
            <p className="font-semibold text-[#555]">Issue Date</p>
            <p>{formatDate(data.issueDate)}</p>
          </div>
          <div className="w-px h-6 bg-[#ddd]" />
          <div className="text-center">
            <p className="font-semibold text-[#555]">Certificate ID</p>
            <p className="font-mono text-[9px]">{data.hashId}</p>
          </div>
        </div>

        <div className="w-full mt-3 pt-3 border-t border-[#e0d5c1] flex justify-end">
          <SignatureBlock />
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";
export default CertificatePreview;

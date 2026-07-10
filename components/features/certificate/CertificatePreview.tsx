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

function Logo() {
  return (
    <svg width="80" height="28" viewBox="0 0 80 28">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <path d="M8 4 L20 2 L32 4 L30 16 L20 24 L10 16 Z" fill="none" stroke="url(#logoGrad)" strokeWidth="1.2" />
      <path d="M20 8 L20 18" fill="none" stroke="url(#logoGrad)" strokeWidth="1.2" />
      <circle cx="20" cy="20" r="1.5" fill="#b8860b" />
      <text x="42" y="16" fill="#1a1a2e" fontSize="9" fontWeight="bold" fontFamily="'Playfair Display', serif" letterSpacing="2">CYBERSHIELD</text>
      <text x="42" y="24" fill="#b8860b" fontSize="6" fontFamily="'Inter', sans-serif" letterSpacing="3">ACADEMY</text>
    </svg>
  );
}

function GoldSeal() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fce181" />
          <stop offset="50%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="none" stroke="url(#goldGrad)" strokeWidth="1.8" />
      <circle cx="30" cy="30" r="25" fill="none" stroke="url(#goldGrad)" strokeWidth="0.7" strokeDasharray="2.5 2.5" />
      <text x="30" y="22" textAnchor="middle" fill="url(#goldGrad)" fontSize="6.5" fontWeight="bold" fontFamily="serif">CYBER</text>
      <text x="30" y="31" textAnchor="middle" fill="url(#goldGrad)" fontSize="8" fontWeight="bold" fontFamily="serif">SHIELD</text>
      <text x="30" y="43" textAnchor="middle" fill="url(#goldGrad)" fontSize="5.5" fontFamily="serif">★ SEAL ★</text>
    </svg>
  );
}

function DecorativeBorder() {
  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full" width={CERT_W} height={CERT_H} viewBox={`0 0 ${CERT_W} ${CERT_H}`} preserveAspectRatio="none">
      <rect x="8" y="8" width={CERT_W - 16} height={CERT_H - 16} fill="none" stroke="#d4a017" strokeWidth="1.5" rx="2" />
      <rect x="14" y="14" width={CERT_W - 28} height={CERT_H - 28} fill="none" stroke="#d4a017" strokeWidth="0.5" rx="1" strokeDasharray="4 3" />
      <path d="M 24 24 L 48 24 L 48 48" fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d={`M ${CERT_W - 24} 24 L ${CERT_W - 48} 24 L ${CERT_W - 48} 48`} fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d={`M 24 ${CERT_H - 24} L 48 ${CERT_H - 24} L 48 ${CERT_H - 48}`} fill="none" stroke="#d4a017" strokeWidth="1.5" />
      <path d={`M ${CERT_W - 24} ${CERT_H - 24} L ${CERT_W - 48} ${CERT_H - 24} L ${CERT_W - 48} ${CERT_H - 48}`} fill="none" stroke="#d4a017" strokeWidth="1.5" />
    </svg>
  );
}

function FounderSignature() {
  return (
    <div className="flex flex-col items-end">
      <svg width="160" height="44" viewBox="0 0 160 44" className="mb-1">
        <defs>
          <filter id="inkBleed"><feGaussianBlur stdDeviation="0.3" /></filter>
        </defs>
        <g filter="url(#inkBleed)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 31 C12 26, 16 20, 20 16 C24 12, 26 18, 22 24 C18 30, 14 34, 12 36"
            stroke="#1a1a2e" strokeWidth="1.6" />
          <path d="M22 36 C26 30, 30 18, 34 12 C38 6, 42 16, 38 24 C34 32, 30 38, 28 40"
            stroke="#1a1a2e" strokeWidth="1.4" />
          <path d="M38 36 C44 28, 50 14, 56 10 C62 6, 64 16, 58 24 C52 32, 46 38, 44 40"
            stroke="#1a1a2e" strokeWidth="1.8" />
          <path d="M56 34 C62 28, 70 16, 76 12 C82 8, 84 18, 78 26 C72 34, 66 40, 64 42"
            stroke="#1a1a2e" strokeWidth="1.3" />
          <path d="M76 36 C82 30, 90 18, 96 14 C102 10, 104 20, 98 28 C92 36, 86 42, 84 44"
            stroke="#1a1a2e" strokeWidth="1.5" />
          <path d="M96 34 C102 28, 110 16, 116 12 C122 8, 124 18, 118 26 C112 34, 106 40, 104 42"
            stroke="#1a1a2e" strokeWidth="1.2" />
          <path d="M116 36 C122 30, 130 20, 136 16 C142 12, 144 22, 138 28 C132 34, 126 38, 124 40"
            stroke="#1a1a2e" strokeWidth="1.7" />
          <path d="M136 34 C140 28, 146 18, 150 14 C154 10, 156 16, 152 22 C148 28, 144 32, 142 34"
            stroke="#1a1a2e" strokeWidth="1.1" />
        </g>
      </svg>
      <div className="w-[160px] h-px bg-[#333] mb-1" />
      <p className="text-[8px] font-semibold text-[#555] tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
        FOUNDER & CEO, CYBERSHIELD
      </p>
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

      <div className="absolute inset-0 flex flex-col items-center px-12 py-7 text-center">
        <Logo />
        <GoldSeal />

        <p className="text-[10px] tracking-[0.25em] text-[#b8860b] uppercase font-medium mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          Certificate of Excellence
        </p>

        <h1 className="text-lg font-bold text-[#1a1a2e] mt-1 leading-tight" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {data.courseName}
        </h1>

        <div className="w-16 h-[1.5px] bg-[#d4a017] mx-auto my-1.5" />

        <p className="text-[10px] text-[#666] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
          This is to proudly certify that
        </p>

        <p className="text-xl font-bold text-[#1a1a2e] my-1" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {data.recipientName}
        </p>

        <p className="text-[10px] text-[#666] leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          has successfully completed the rigorous requirements of the above-named program,
          demonstrating exceptional proficiency in cybersecurity fundamentals.
        </p>

        {pct != null && (
          <div className="inline-flex items-center gap-2 mt-1.5 px-3 py-0.5 bg-[#fdf6e3] border border-[#d4a017]/30 rounded-full">
            <span className="text-[9px] text-[#8b6914]" style={{ fontFamily: "'Inter', sans-serif" }}>Final Score:</span>
            <span className="text-[11px] font-bold text-[#b8860b]">{data.score}/{data.total} ({pct}%)</span>
          </div>
        )}

        <div className="flex items-center gap-5 mt-1.5 text-[9px] text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <div className="text-center">
            <p className="font-semibold text-[#555]">Issue Date</p>
            <p>{formatDate(data.issueDate)}</p>
          </div>
          <div className="w-px h-5 bg-[#ddd]" />
          <div className="text-center">
            <p className="font-semibold text-[#555]">Certificate ID</p>
            <p className="font-mono text-[8px]">{data.hashId}</p>
          </div>
        </div>

        <div className="flex-1" />

        <div className="w-full flex justify-end">
          <FounderSignature />
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";
export default CertificatePreview;

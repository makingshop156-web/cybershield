"use client";
import { forwardRef, useState } from "react";
import type { CertificateData } from "@/lib/certificate/config";
import { formatDate } from "@/lib/certificate/config";

interface CertProps {
  data: CertificateData;
}

const W = 842;
const H = 595;

function LogoMark() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#b8860b] flex items-center justify-center text-white text-[10px] font-bold tracking-widest">CS</div>
        <div>
          <p className="text-[11px] font-bold text-[#1a1a2e] tracking-[0.15em]" style={{ fontFamily: "'Playfair Display', serif" }}>CYBERSHIELD</p>
          <p className="text-[6px] text-[#b8860b] tracking-[0.3em]" style={{ fontFamily: "'Inter', sans-serif" }}>CERTIFICATION BOARD</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src="/logo.svg"
      alt="Cybershield Logo"
      className="max-h-14 object-contain"
      onError={() => setErr(true)}
    />
  );
}

function GoldSeal() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="gs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fce181" />
          <stop offset="50%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#gs)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke="url(#gs)" strokeWidth="0.6" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="23" fill="none" stroke="url(#gs)" strokeWidth="0.3" />
      <text x="32" y="23" textAnchor="middle" fill="url(#gs)" fontSize="7" fontWeight="bold" fontFamily="serif">CYBER</text>
      <text x="32" y="33" textAnchor="middle" fill="url(#gs)" fontSize="9" fontWeight="bold" fontFamily="serif">SHIELD</text>
      <text x="32" y="47" textAnchor="middle" fill="url(#gs)" fontSize="5" fontFamily="serif">★ SEAL ★</text>
    </svg>
  );
}

function DecorBorder() {
  return (
    <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <rect x="10" y="10" width={W - 20} height={H - 20} fill="none" stroke="#d4a017" strokeWidth="1.2" rx="3" />
      <rect x="18" y="18" width={W - 36} height={H - 36} fill="none" stroke="#d4a017" strokeWidth="0.4" rx="2" strokeDasharray="5 4" />
      <path d="M 28 28 L 56 28 L 56 56" fill="none" stroke="#d4a017" strokeWidth="1.2" />
      <path d={`M ${W - 28} 28 L ${W - 56} 28 L ${W - 56} 56`} fill="none" stroke="#d4a017" strokeWidth="1.2" />
      <path d={`M 28 ${H - 28} L 56 ${H - 28} L 56 ${H - 56}`} fill="none" stroke="#d4a017" strokeWidth="1.2" />
      <path d={`M ${W - 28} ${H - 28} L ${W - 56} ${H - 28} L ${W - 56} ${H - 56}`} fill="none" stroke="#d4a017" strokeWidth="1.2" />
    </svg>
  );
}

function CeoSignature() {
  return (
    <div className="flex flex-col items-end">
      <svg width="180" height="52" viewBox="0 0 180 52" className="-mb-1">
        <defs>
          <filter id="ink"><feGaussianBlur stdDeviation="0.3" /></filter>
        </defs>
        <g filter="url(#ink)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 8 38 C 14 32, 18 20, 24 14 C 30 8, 34 12, 30 18 C 26 24, 20 30, 16 36 C 14 39, 12 41, 10 43"
            stroke="#1a1a2e" strokeWidth="2.4" />
          <path d="M 16 20 C 22 16, 30 12, 38 14 C 42 15, 44 18, 42 20 C 40 22, 36 22, 34 20"
            stroke="#1a1a2e" strokeWidth="1.6" />
          <path d="M 36 18 C 44 14, 54 10, 60 14 C 64 16.5, 62 22, 56 26 C 50 30, 42 32, 38 30"
            stroke="#1a1a2e" strokeWidth="2" />
          <path d="M 62 14 C 70 10, 80 8, 86 12 C 90 14.5, 88 20, 82 24 C 76 28, 68 30, 64 28"
            stroke="#1a1a2e" strokeWidth="1.5" />
          <path d="M 84 14 C 92 10, 102 8, 108 12 C 112 14.5, 110 20, 104 24 C 98 28, 90 30, 86 28"
            stroke="#1a1a2e" strokeWidth="1.8" />
          <path d="M 106 14 C 112 10, 120 8, 126 12 C 130 14.5, 128 20, 124 24 C 120 28, 114 30, 110 28"
            stroke="#1a1a2e" strokeWidth="1.3" />
          <path d="M 54 6 C 58 4, 62 2, 64 4" stroke="#1a1a2e" strokeWidth="1.4" />
          <path d="M 126 14 C 134 10, 144 8, 150 14 C 154 18, 152 26, 146 32 C 140 38, 132 42, 128 40"
            stroke="#1a1a2e" strokeWidth="2.2" />
          <path d="M 150 14 C 156 10, 164 8, 170 12 C 174 14.5, 172 20, 166 24"
            stroke="#1a1a2e" strokeWidth="1" />
        </g>
      </svg>
      <div className="w-[180px] h-px bg-gradient-to-r from-transparent via-[#1a1a2e] to-[#1a1a2e]" />
      <p className="text-[7px] font-semibold text-[#1a1a2e] tracking-[0.25em] mt-1 uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
        Founder &amp; CEO: Tới
      </p>
      <p className="text-[6px] text-[#888] tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
        Cybershield Certification Board
      </p>
    </div>
  );
}

const CertificatePreview = forwardRef<HTMLDivElement, CertProps>(({ data }, ref) => {
  const pct = data.score != null && data.total != null ? Math.round((data.score / data.total) * 100) : null;

  return (
    <div
      ref={ref}
      className="relative mx-auto overflow-hidden bg-[#fcf9f5]"
      style={{
        width: "100%",
        maxWidth: `${W}px`,
        aspectRatio: `${W / H}`,
        fontFamily: "'Playfair Display', 'Georgia', serif",
      }}
    >
      <DecorBorder />
      <div className="absolute inset-0 flex flex-col px-14 py-8">
        <div className="flex items-start justify-between">
          <LogoMark />
          <GoldSeal />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center -mt-4">
          <p className="text-[9px] tracking-[0.3em] text-[#b8860b] uppercase font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            Certificate of Excellence
          </p>

          <h1 className="text-lg font-bold text-[#1a1a2e] mt-1 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.courseName}
          </h1>

          <div className="w-16 h-[1.5px] bg-[#d4a017] mx-auto my-2" />

          <p className="text-[10px] text-[#666] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            This is to proudly certify that
          </p>

          <p className="text-[22px] font-bold text-[#1a1a2e] my-1.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            {data.recipientName}
          </p>

          <p className="text-[10px] text-[#666] leading-relaxed max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
            has successfully completed the rigorous requirements of the above-named program,
            demonstrating exceptional proficiency in cybersecurity fundamentals.
          </p>

          {pct != null && (
            <div className="inline-flex items-center gap-2 mt-2 px-4 py-1 bg-[#fdf6e3] border border-[#d4a017]/30 rounded-full">
              <span className="text-[9px] text-[#8b6914]" style={{ fontFamily: "'Inter', sans-serif" }}>Final Score:</span>
              <span className="text-[11px] font-bold text-[#b8860b]">{data.score}/{data.total} ({pct}%)</span>
            </div>
          )}

          <div className="flex items-center gap-6 mt-2 text-[9px] text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>
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
        </div>

        <div className="flex justify-end">
          <CeoSignature />
        </div>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";
export default CertificatePreview;

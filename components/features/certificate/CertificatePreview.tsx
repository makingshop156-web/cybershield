"use client";
import { forwardRef } from "react";
import type { CertificateData } from "@/lib/certificate/config";
import { formatDate } from "@/lib/certificate/config";

interface CertProps {
  data: CertificateData;
}

const GoldSeal = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
    <defs>
      <radialGradient id="goldGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fce181" />
        <stop offset="50%" stopColor="#d4a017" />
        <stop offset="100%" stopColor="#b8860b" />
      </radialGradient>
      <filter id="goldShadow">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#d4a017" floodOpacity="0.4" />
      </filter>
    </defs>
    <circle cx="40" cy="40" r="38" fill="none" stroke="url(#goldGrad)" strokeWidth="2" filter="url(#goldShadow)" />
    <circle cx="40" cy="40" r="34" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="3 3" />
    <text x="40" y="30" textAnchor="middle" fill="url(#goldGrad)" fontSize="9" fontWeight="bold" fontFamily="serif">CYBER</text>
    <text x="40" y="42" textAnchor="middle" fill="url(#goldGrad)" fontSize="11" fontWeight="bold" fontFamily="serif">SHIELD</text>
    <text x="40" y="55" textAnchor="middle" fill="url(#goldGrad)" fontSize="8" fontFamily="serif">★ SEAL ★</text>
  </svg>
);

const CertificatePreview = forwardRef<HTMLDivElement, CertProps>(({ data }, ref) => {
  const pct = data.score != null && data.total != null ? Math.round((data.score / data.total) * 100) : null;

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[640px] mx-auto bg-white rounded-lg overflow-hidden"
      style={{
        boxShadow: "0 4px 40px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)",
        fontFamily: "'Playfair Display', 'Georgia', serif",
      }}
    >
      {/* Decorative border */}
      <div className="absolute inset-0 pointer-events-none" style={{
        border: "8px solid transparent",
        borderImage: "linear-gradient(135deg, #b8860b 0%, #fce181 25%, #d4a017 50%, #fce181 75%, #b8860b 100%) 1",
      }} />
      <div className="absolute inset-[14px] pointer-events-none border border-[#d4a017]/30 rounded-[2px]" />

      {/* Corner ornaments */}
      <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#d4a017]/50" />
      <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#d4a017]/50" />
      <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#d4a017]/50" />
      <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#d4a017]/50" />

      <div className="relative z-10 px-10 sm:px-14 py-12 text-center">
        {/* Gold seal */}
        <div className="flex justify-center mb-6">
          <GoldSeal />
        </div>

        <p className="text-xs sm:text-sm tracking-[0.3em] text-[#b8860b] uppercase font-sans font-medium mb-4">
          Certificate of Excellence
        </p>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e] mb-2" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {data.courseName}
        </h1>

        <div className="w-24 h-[2px] bg-gradient-to-r from-[#d4a017] via-[#fce181] to-[#d4a017] mx-auto my-5" />

        <p className="text-sm text-[#666] font-sans leading-relaxed max-w-md mx-auto">
          This is to proudly certify that
        </p>

        <p className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] my-4" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
          {data.recipientName}
        </p>

        <p className="text-sm text-[#666] font-sans leading-relaxed max-w-lg mx-auto">
          has successfully completed the rigorous requirements of the above-named program,
          demonstrating exceptional proficiency in cybersecurity fundamentals and ethical hacking methodologies.
        </p>

        {pct != null && (
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 bg-[#fdf6e3] border border-[#d4a017]/30 rounded-full">
            <span className="text-xs text-[#8b6914] font-sans">Final Score:</span>
            <span className="text-sm font-bold text-[#b8860b]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {data.score}/{data.total} ({pct}%)
            </span>
          </div>
        )}

        <div className="flex items-center justify-center gap-8 mt-8 text-xs text-[#888] font-sans">
          <div className="text-center">
            <p className="font-bold text-[#555] mb-1">Issue Date</p>
            <p>{formatDate(data.issueDate)}</p>
          </div>
          <div className="w-px h-8 bg-[#ddd]" />
          <div className="text-center">
            <p className="font-bold text-[#555] mb-1">Certificate ID</p>
            <p className="font-mono text-[10px]">{data.hashId}</p>
          </div>
        </div>

        {/* Signature line */}
        <div className="mt-8 pt-6 border-t border-[#e0d5c1]">
          <div className="flex justify-center mb-1">
            <svg width="160" height="36" viewBox="0 0 160 36" className="opacity-50">
              <path d="M10 28 C30 10, 50 30, 70 18 C80 12, 90 22, 100 16 C110 10, 120 26, 130 20 C140 14, 150 24, 155 18"
                fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round" style={{ filter: "blur(0.3px)" }} />
            </svg>
          </div>
          <p className="text-xs font-bold text-[#555] font-sans">Founder & Lead Instructor</p>
          <p className="text-[10px] text-[#999] font-sans">CyberShield Academy</p>
        </div>

        <p className="mt-6 text-[9px] text-[#bbb] font-sans tracking-wide">
          cybershield-nu-one.vercel.app &bull; Verified Digital Certificate
        </p>
      </div>
    </div>
  );
});

CertificatePreview.displayName = "CertificatePreview";
export default CertificatePreview;

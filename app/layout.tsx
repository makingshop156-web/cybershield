import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
  preload: true,
  fallback: ["JetBrains Mono", "monospace"],
});

export const metadata: Metadata = {
  title: "CyberShield — Học Bảo Mật Từ Số 0",
  description:
    "Nền tảng học Cybersecurity cho người mới bắt đầu. Lộ trình từ Zero đến Hero, thực hành lab ảo, kiến thức bảo mật thực chiến.",
  keywords: [
    "cybersecurity",
    "học bảo mật",
    "zero to hero",
    "an toàn thông tin",
    "hacking",
    "bảo mật mạng",
  ],
  authors: [{ name: "CyberShield Team" }],
  openGraph: {
    title: "CyberShield — Học Bảo Mật Từ Số 0",
    description:
      "Nền tảng học Cybersecurity cho người mới bắt đầu. Lộ trình từ Zero đến Hero.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="font-sans antialiased bg-cyber-bg text-cyber-text min-h-screen">
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
        <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

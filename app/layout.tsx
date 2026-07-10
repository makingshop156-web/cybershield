import type { Metadata } from "next";
import { Inter, Fira_Code, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthProvider } from "@/lib/hooks/useAuth";

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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
  preload: true,
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
      className={`${inter.variable} ${firaCode.variable} ${playfair.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0e17" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="CyberShield" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="CyberShield" />
      </head>
      <body className="font-sans antialiased bg-cyber-bg text-cyber-text min-h-screen">
        <div className="fixed inset-0 bg-grid pointer-events-none z-0" />
        <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0" />
        <div className="relative z-10">
          <AuthProvider><ToastProvider>{children}</ToastProvider></AuthProvider>
        </div>
      </body>
    </html>
  );
}

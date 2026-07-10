"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { useProgress } from "@/lib/hooks";
import { DocsSidebar } from "@/components/features/docs/DocsSidebar";
import { DOCS_SECTIONS } from "@/components/features/docs/config";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-cyber-accent text-xs font-mono">
      {children}
    </code>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto p-4 bg-black/40 border border-white/5 rounded-xl text-xs font-mono leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

export default function DocsPage() {
  const { progress, loaded } = useProgress();
  const [activeId, setActiveId] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const offsets = DOCS_SECTIONS.map((sec) => {
        const el = document.getElementById(`sec-${sec.id}`);
        return { id: sec.id, top: el?.getBoundingClientRect().top ?? Infinity };
      });
      const current = offsets.find((o) => o.top > 80) ?? offsets[offsets.length - 1];
      if (current) setActiveId(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyber-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalLessons = 0;
  const completed = progress.completedLessons.length;

  return (
    <div className="min-h-screen">
      <TopBar
        streak={progress.streak}
        badges={progress.badges.length}
        completed={completed}
        total={totalLessons}
      />
      <div className="max-w-6xl mx-auto px-4 pt-6 flex gap-6 relative">
        <DocsSidebar
          sections={DOCS_SECTIONS}
          activeId={activeId}
          onSelect={setActiveId}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 min-w-0 pb-24 pl-0 sm:pl-4 space-y-24">
          {/* Overview */}
          <motion.section id="sec-overview" className="scroll-mt-24" {...fadeUp}>
            <h1 className="text-3xl font-bold gradient-text mb-4">Giới thiệu</h1>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              CyberShield là nền tảng học bảo mật mạng từ thực hành. Thay vì đọc lý thuyết khô khan, bạn
              tương tác trực tiếp với terminal ảo, giải CTF, và đấu rank trong đấu trường 1v1. Hệ thống
              được thiết kế theo mô hình gamification: mỗi bài học là một cấp độ, mỗi module là một
              chương, và đấu trường là nơi kiểm tra kỹ năng thực chiến.
            </p>
            <div className="glass-enhanced rounded-xl p-6 flex flex-col sm:flex-row gap-6">
              <div className="flex-1 text-center p-4">
                <div className="text-2xl mb-1">📚</div>
                <div className="text-lg font-bold text-white">19+</div>
                <div className="text-xs text-cyber-muted">Bài học</div>
              </div>
              <div className="flex-1 text-center p-4 border-t sm:border-t-0 sm:border-l border-white/5">
                <div className="text-2xl mb-1">⚔️</div>
                <div className="text-lg font-bold text-white">1v1</div>
                <div className="text-xs text-cyber-muted">Đấu trường real-time</div>
              </div>
              <div className="flex-1 text-center p-4 border-t sm:border-t-0 sm:border-l border-white/5">
                <div className="text-2xl mb-1">🏴</div>
                <div className="text-lg font-bold text-white">3+</div>
                <div className="text-xs text-cyber-muted">CTF flag ẩn</div>
              </div>
            </div>
          </motion.section>

          {/* Architecture */}
          <motion.section id="sec-architecture" className="scroll-mt-24" {...fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">Kiến trúc hệ thống</h2>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Nền tảng được xây dựng trên Next.js 14 (App Router) với kiến trúc server-client phân tách
              rõ ràng. Terminal ảo chạy hoàn toàn phía client — không cần WebSocket hay backend —
              sử dụng virtual filesystem mô phỏng môi trường Linux.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Frontend", value: "Next.js 14 + Framer Motion", icon: "⚛️" },
                { label: "Database", value: "Supabase (PostgreSQL)", icon: "🗄️" },
                { label: "Deploy", value: "Vercel Edge Network", icon: "🌐" },
              ].map((item) => (
                <div key={item.label} className="glass-enhanced rounded-xl p-4 text-center">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <div className="text-xs text-cyber-muted">{item.label}</div>
                  <div className="text-sm font-medium text-white mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
            <CodeBlock
              code={`cybershield/
├── app/              # Next.js App Router pages
│   ├── (dashboard)/  # Protected routes (roadmap, arena, lab)
│   └── layout.tsx    # Root layout with PWA meta
├── components/       # UI components
│   ├── features/     # Business-specific (terminal, arena)
│   └── ui/           # Primitives (Button, Toast)
├── lib/              # Data fetching, hooks, services
│   ├── hooks/        # Custom React hooks
│   └── supabase/     # Supabase client singleton
└── supabase/         # SQL migration scripts`}
            />
          </motion.section>

          {/* Terminal */}
          <motion.section id="sec-terminal" className="scroll-mt-24" {...fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">Hướng dẫn Terminal ảo</h2>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Terminal ảo mô phỏng môi trường Linux với hơn 30 lệnh cơ bản. Bạn có thể khám phá
              hệ thống tập tin, tìm flag ẩn, và thực hành các kỹ thuật leo thang đặc quyền.
            </p>
            <div className="glass-enhanced rounded-xl p-5 mb-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">Lệnh cơ bản</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {[
                  ["ls", "Liệt kê file trong thư mục"],
                  ["cd", "Chuyển thư mục"],
                  ["cat", "Xem nội dung file"],
                  ["pwd", "In đường dẫn hiện tại"],
                  ["sudo -i", "Leo thang lên root"],
                  ["find", "Tìm kiếm file theo tên"],
                ].map(([cmd, desc]) => (
                  <div key={cmd} className="flex items-center gap-2 text-sm">
                    <InlineCode>{cmd}</InlineCode>
                    <span className="text-cyber-muted text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-enhanced rounded-xl p-5 mb-4">
              <h3 className="text-sm font-semibold text-white mb-2">CTF flag ẩn trong hệ thống</h3>
              <p className="text-xs text-cyber-muted leading-relaxed">
                Hệ thống chứa 3 flag ẩn tại các vị trí: <InlineCode>/home/learner/secret.txt</InlineCode>,
                <InlineCode>/root/flag.txt</InlineCode> (cần sudo), và trong log
                <InlineCode>/var/log/auth.log</InlineCode>. Thu thập đủ flag để mở khoá thành tựu.
              </p>
            </div>
            <CodeBlock
              code={`# Khám phá thư mục home
cd /home/learner && ls -la

# Xem flag đầu tiên
cat secret.txt

# Leo thang lên root
sudo -i

# Tìm flag trong hệ thống
find / -name "flag*" 2>/dev/null`}
            />
          </motion.section>

          {/* Arena */}
          <motion.section id="sec-arena" className="scroll-mt-24" {...fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">Cyber Arena 1v1</h2>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Đấu trường 1v1 là chế độ đối kháng thời gian thực. Hai người chơi được ghép ngẫu nhiên,
              cùng giải một thử thách CTF. Ai nộp flag đúng trước sẽ chiến thắng và nhận điểm Elo.
            </p>
            <div className="glass-enhanced rounded-xl p-5 mb-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">Luật & Cách tính Elo</h3>
              <ul className="space-y-2 text-sm text-cyber-muted">
                {[
                  "Mỗi người chơi bắt đầu với 1000 Elo",
                  "Thắng +32 Elo (gặp đối thủ ngang rank)",
                  "Thua -32 Elo. Chênh lệch rank càng cao, biến động càng thấp",
                  "Bỏ trận bị trừ gấp đôi điểm",
                  "Công thức Elo chuẩn: K-factor = 32",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyber-accent shrink-0">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <CodeBlock
              code={`Elo Formula:
  Expected(A) = 1 / (1 + 10^((EloB - EloA) / 400))
  NewElo(A) = EloA + 32 * (ScoreA - Expected(A))

  Score = 1 if win, 0 if lose`}
            />
          </motion.section>

          {/* CTF & Roadmap */}
          <motion.section id="sec-ctf-roadmap" className="scroll-mt-24" {...fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">CTF & Lộ trình</h2>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Hệ thống lộ trình được chia làm 2 cấp độ: Cơ bản (6 module) và Nâng cao (6 module).
              Mỗi bài học gồm 4 phần: ẩn dụ thực tế, kiến thức, lệnh terminal, và trắc nghiệm.
              Hoàn thành bài học để nhận badge và mở khoá module tiếp theo.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-enhanced rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Cơ bản</h3>
                <ul className="space-y-2 text-sm text-cyber-muted">
                  {["Nhập môn & Cơ bản", "Mạng máy tính", "Hệ điều hành Linux", "Bảo mật cơ bản", "Mật mã & Hash", "An toàn Web"].map((m) => (
                    <li key={m} className="flex items-center gap-2">
                      <span className="text-cyber-green">✓</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-enhanced rounded-xl p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Nâng cao</h3>
                <ul className="space-y-2 text-sm text-cyber-muted">
                  {["Lập trình nền tảng", "Mạng chuyên sâu", "Linux nâng cao", "Bảo mật chuyên sâu", "Penetration Testing", "SOC & Mã hoá"].map((m) => (
                    <li key={m} className="flex items-center gap-2">
                      <span className="text-cyber-gold">▸</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Modules */}
          <motion.section id="sec-modules" className="scroll-mt-24" {...fadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">Cấu trúc Module</h2>
            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
              Trang tài liệu này được thiết kế như một module độc lập. Bạn có thể bật/tắt hiển thị
              trên thanh navigation bằng biến config <InlineCode>DOCS_ENABLED</InlineCode> trong
              <InlineCode>components/features/docs/config.ts</InlineCode>.
            </p>
            <CodeBlock
              code={`// components/features/docs/config.ts
export const DOCS_ENABLED = true;  // Toggle docs link in navbar
export const DOCS_SECTIONS = [     // Sidebar sections
  { id: "overview", label: "Tổng quan" },
  { id: "architecture", label: "Kiến trúc hệ thống" },
  // ...
];`}
            />
            <p className="text-sm text-cyber-muted leading-relaxed mt-4">
              Tương tự, các tính năng khác như Terminal, Arena, CTF cũng được cấu trúc theo module
              riêng, mỗi module có service layer, hooks, và components riêng biệt — dễ dàng mở rộng
              hoặc thay thế mà không ảnh hưởng đến hệ thống chính.
            </p>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

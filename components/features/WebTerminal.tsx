"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/GlassCard";
import type { TerminalLine, LabDefinition } from "@/types";

const LABS: LabDefinition[] = [
  {
    id: "ping",
    title: "Ping — Gọi thử Internet",
    description: "Gửi gói tin đến google.com để kiểm tra kết nối.",
    command: "ping google.com",
    output: [
      { text: "Pinging google.com [142.250.1.1] with 32 bytes of data:", type: "output" },
      { text: "Reply from 142.250.1.1: bytes=32 time=14ms TTL=117", type: "output" },
      { text: "Reply from 142.250.1.1: bytes=32 time=15ms TTL=117", type: "output" },
      { text: "Reply from 142.250.1.1: bytes=32 time=13ms TTL=117", type: "output" },
      { text: "Reply from 142.250.1.1: bytes=32 time=16ms TTL=117", type: "output" },
      { text: "", type: "output" },
      { text: "Ping statistics for 142.250.1.1:", type: "output" },
      { text: "    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)", type: "output" },
      { text: "Approximate round trip times:", type: "output" },
      { text: "    Minimum = 13ms, Maximum = 16ms, Average = 14ms", type: "output" },
      { text: "", type: "output" },
      { text: "✅ Kết nối thành công! Google.com đang online.", type: "system" },
    ],
  },
  {
    id: "tracert",
    title: "Tracert — Xem đường đi",
    description: "Xem gói tin đi qua những chặng nào đến đích.",
    command: "tracert google.com",
    output: [
      { text: "Tracing route to google.com [142.250.1.1]", type: "output" },
      { text: "over a maximum of 30 hops:", type: "output" },
      { text: "", type: "output" },
      { text: "  1   1ms   1ms   1ms  192.168.1.1 [Router nhà bạn]", type: "output" },
      { text: "  2   5ms   4ms   5ms  10.0.0.1 [ISP - Nhà mạng]", type: "output" },
      { text: "  3  10ms   9ms  11ms  72.14.194.1 [Trạm trung chuyển]", type: "output" },
      { text: "  4  13ms  13ms  14ms  142.250.1.1 [Google Server]", type: "output" },
      { text: "", type: "output" },
      { text: "✅ Gói tin đi qua 4 chặng để đến Google.", type: "system" },
    ],
  },
  {
    id: "whois",
    title: "Whois — Tra thông tin domain",
    description: "Xem thông tin đăng ký của một tên miền.",
    command: "whois google.com",
    output: [
      { text: "Domain Name: GOOGLE.COM", type: "output" },
      { text: "Registry Domain ID: 2138514_DOMAIN_COM-VRSN", type: "output" },
      { text: "Registrar: MarkMonitor Inc.", type: "output" },
      { text: "Creation Date: 1997-09-15T04:00:00Z", type: "output" },
      { text: "Expiration Date: 2028-09-14T04:00:00Z", type: "output" },
      { text: "Name Server: NS1.GOOGLE.COM, NS2.GOOGLE.COM, NS3.GOOGLE.COM", type: "output" },
      { text: "", type: "output" },
      { text: "✅ Google.com đã được đăng ký từ năm 1997!", type: "system" },
    ],
  },
  {
    id: "nslookup",
    title: "NSLookup — Tra địa chỉ IP",
    description: "Xem DNS trả về IP nào cho một tên miền.",
    command: "nslookup google.com",
    output: [
      { text: "Server:  dns.google", type: "output" },
      { text: "Address:  8.8.8.8", type: "output" },
      { text: "", type: "output" },
      { text: "Name:    google.com", type: "output" },
      { text: "Addresses:  2a00:1450:4010:c0b::1a", type: "output" },
      { text: "           142.250.1.1", type: "output" },
      { text: "", type: "output" },
      { text: "✅ DNS trả về IP 142.250.1.1 cho google.com", type: "system" },
    ],
  },
  {
    id: "nmap-port-scan",
    title: "Nmap — Quét cổng",
    description: "Quét các cổng mở trên máy chủ web.",
    command: "nmap -sS -p 1-1000 scanme.org",
    output: [
      { text: "Starting Nmap 7.94 (https://nmap.org)", type: "output" },
      { text: "Nmap scan report for scanme.org (45.33.32.156)", type: "output" },
      { text: "Host is up (0.11s latency).", type: "output" },
      { text: "", type: "output" },
      { text: "PORT     STATE    SERVICE", type: "output" },
      { text: "22/tcp   OPEN     SSH", type: "output" },
      { text: "80/tcp   OPEN     HTTP (Web)", type: "output" },
      { text: "443/tcp  OPEN     HTTPS (Web bảo mật)", type: "output" },
      { text: "9929/tcp OPEN     nping-echo", type: "output" },
      { text: "", type: "output" },
      { text: "✅ Tìm thấy 4 cổng mở! Cổng 80 và 443 là web, cổng 22 là SSH.", type: "system" },
    ],
  },
  {
    id: "wireshark",
    title: "Wireshark — Bắt gói tin",
    description: "Mô phỏng bắt gói tin HTTP để xem nội dung.",
    command: "tcpdump -X -c 5",
    output: [
      { text: "tcpdump: listening on eth0, link-type EN10MB (Ethernet)", type: "output" },
      { text: "", type: "output" },
      { text: "11:22:33.444 192.168.1.5 > 142.250.1.1: HTTP GET /", type: "output" },
      { text: "  GET / HTTP/1.1", type: "output" },
      { text: "  Host: google.com", type: "output" },
      { text: "  User-Agent: curl/7.68.0", type: "output" },
      { text: "", type: "output" },
      { text: "11:22:33.555 142.250.1.1 > 192.168.1.5: HTTP 200 OK", type: "output" },
      { text: "  HTTP/1.1 200 OK", type: "output" },
      { text: "  Content-Type: text/html; charset=UTF-8", type: "output" },
      { text: "  Set-Cookie: NID=...", type: "output" },
      { text: "", type: "output" },
      { text: "⚠️ Cookie và dữ liệu trong HTTP là chữ thường, có thể đọc được!", type: "system" },
      { text: "🔒 Đây là lý do HTTPS quan trọng.", type: "system" },
    ],
  },
  {
    id: "password-check",
    title: "Kiểm tra mật khẩu",
    description: "Mô phỏng kiểm tra độ mạnh của mật khẩu.",
    command: "check-password-strength P@ssw0rd",
    output: [
      { text: "Checking password strength...", type: "output" },
      { text: "Password: P@ssw0rd", type: "output" },
      { text: "", type: "output" },
      { text: "  Length:       8 characters   ⚠️ (Tối thiểu 12)", type: "output" },
      { text: "  Uppercase:    ✅ Có", type: "output" },
      { text: "  Lowercase:    ✅ Có", type: "output" },
      { text: "  Numbers:      ✅ Có", type: "output" },
      { text: "  Special char: ✅ Có", type: "output" },
      { text: "  Common word:  ❌ 'P@ssw0rd' là biến thể của 'password'", type: "output" },
      { text: "", type: "output" },
      { text: "OVERALL: ⭐⭐✩✩✩ YẾU", type: "system" },
      { text: "💡 Dùng câu dài: 'ToiY3uMeoConCuaToi@2024'", type: "system" },
    ],
  },
  {
    id: "email-header",
    title: "Phân tích Email Header",
    description: "Xem header email để phát hiện phishing.",
    command: "check-email-header suspicious@email",
    output: [
      { text: "=== PHÂN TÍCH EMAIL HEADER ===", type: "output" },
      { text: "", type: "output" },
      { text: "From: ngan-hang-abc@secure-verify.com", type: "output" },
      { text: "To: nguoi-dung@gmail.com", type: "output" },
      { text: "Subject: TAI KHOAN BAN SAP BI KHOA!", type: "output" },
      { text: "", type: "output" },
      { text: "Received: from mail.hacker.ru (185.220.101.1)", type: "output" },
      { text: "SPF: ❌ FAIL | DKIM: ❌ FAIL | DMARC: ❌ FAIL", type: "output" },
      { text: "", type: "output" },
      { text: "⚠️ Email từ NGA (hacker.ru), không phải ngân hàng!", type: "system" },
      { text: "🔴 PHISHING: Xóa ngay, không nhấp link!", type: "system" },
    ],
  },
  {
    id: "firewall",
    title: "Firewall — Chặn xâm nhập",
    description: "Mô phỏng cấu hình iptables chặn IP lạ.",
    command: "iptables -A INPUT -s 10.0.0.5 -j DROP",
    output: [
      { text: "# Current firewall rules:", type: "output" },
      { text: "Chain INPUT (policy ACCEPT)", type: "output" },
      { text: "ACCEPT     all   anywhere      anywhere     (established)", type: "output" },
      { text: "DROP       all   10.0.0.5      anywhere     [BLOCKED]", type: "output" },
      { text: "ACCEPT     tcp   anywhere      anywhere     dpt:22 (SSH)", type: "output" },
      { text: "ACCEPT     tcp   anywhere      anywhere     dpt:80 (HTTP)", type: "output" },
      { text: "ACCEPT     tcp   anywhere      anywhere     dpt:443 (HTTPS)", type: "output" },
      { text: "LOG        all   10.0.0.0/24   anywhere     [LOGGING]", type: "output" },
      { text: "", type: "output" },
      { text: "✅ Đã chặn IP 10.0.0.5 thành công!", type: "system" },
    ],
  },
];

export function WebTerminal() {
  const [activeLab, setActiveLab] = useState(LABS[0]!.id);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [running, setRunning] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runLab = useCallback(() => {
    const lab = LABS.find((l) => l.id === activeLab);
    if (!lab || running) return;

    setRunning(true);
    setLines([{ text: `$ ${lab.command}`, type: "input" }]);

    lab.output.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, (i + 1) * 250);
    });

    setTimeout(
      () => setRunning(false),
      (lab.output.length + 1) * 250 + 300
    );
  }, [activeLab, running]);

  const lab = LABS.find((l) => l.id === activeLab);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lab list */}
      <div className="lg:col-span-1 space-y-2">
        <div className="text-xs text-cyber-muted mb-2 uppercase tracking-wider font-medium">
          Bài Lab
        </div>
        <div className="space-y-1.5">
          {LABS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setActiveLab(l.id);
                setLines([]);
              }}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all",
                activeLab === l.id
                  ? "bg-cyber-accent/10 border-cyber-accent/50"
                  : "glass border-glass-border hover:border-cyber-accent/30"
              )}
            >
              <div className="font-medium text-cyber-text truncate">
                {l.title}
              </div>
              <div className="text-xs text-cyber-muted mt-0.5 line-clamp-2">
                {l.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div className="lg:col-span-2">
        <div className="bg-black/80 backdrop-blur-sm rounded-xl border border-glass-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 glass border-b border-glass-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-red" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-gold" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-green" />
              <span className="text-xs text-cyber-muted ml-2 font-mono">
                {lab ? `lab@cybershield:~$ ${lab.command}` : "terminal"}
              </span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={runLab}
              disabled={running}
              className="text-xs px-3 py-1 rounded bg-cyber-green/15 text-cyber-green border border-cyber-green/30 hover:bg-cyber-green/25 disabled:opacity-30 transition-all"
            >
              {running ? (
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 border-2 border-cyber-green border-t-transparent rounded-full animate-spin" />
                  Đang chạy...
                </span>
              ) : (
                "▶ Chạy"
              )}
            </motion.button>
          </div>

          <div className="p-4 font-mono text-xs leading-relaxed min-h-[340px] max-h-[420px] overflow-y-auto scrollbar-thin bg-[#050505]">
            {lines.length === 0 && (
              <div className="text-cyber-muted/50 animate-pulse">
                <span className="text-cyber-green">┌──(lab@cybershield)-[~]</span>
                <br />
                <span className="text-cyber-green">└─$</span> Nhấn &quot;Chạy&quot; để bắt đầu lab...
              </div>
            )}
            <AnimatePresence mode="popLayout">
              {lines.map((line, i) => (
                <motion.div
                  key={`${i}-${line.text.slice(0, 10)}`}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "leading-relaxed",
                    line.type === "input" && "text-cyber-green",
                    line.type === "error" && "text-cyber-red",
                    line.type === "system" && "text-cyber-accent"
                  )}
                >
                  {line.text}
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
        </div>

        <GlassPanel className="mt-4">
          <p className="text-xs text-cyber-muted leading-relaxed">
            <strong className="text-cyber-accent">💡 Mẹo:</strong> Môi trường mô phỏng.
            Mỗi lab mô phỏng lệnh thực tế trong Cybersecurity. Bấm &quot;Chạy&quot; để xem kết quả.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}

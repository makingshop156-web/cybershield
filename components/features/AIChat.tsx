"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  text: string;
}

const RESPONSES: Record<string, string> = {
  default:
    "Chào bạn! Mình là trợ lý học Cybersecurity. Hỏi bất cứ điều gì về bài học, mình sẽ giải thích bằng ví dụ đời thường nhé! 😊",
  ip: "IP giống như số nhà của bạn! Mỗi thiết bị kết nối Internet đều có một địa chỉ riêng. Khi gửi thư, bạn cần ghi đúng số nhà thì thư mới tới được. 😄",
  hacker:
    "Hacker 'mũ trắng' giống như người thử khóa cửa nhà bạn để tìm điểm yếu và báo cho bạn. Hacker 'mũ đen' là kẻ lợi dụng điểm yếu đó để trộm đồ.",
  password:
    "Mật khẩu mạnh giống như ổ khóa tốt. '123456' là để cửa mở toang. Một câu dài như 'HomNayToiDiHoc@7h' khó bẻ gãy hơn nhiều!",
  virus:
    "Virus máy tính giống virus cảm cúm — lây từ máy sang máy. Phòng bệnh: đừng mở file lạ hay click link đáng ngờ, giống như rửa tay thường xuyên vậy!",
  firewall:
    "Firewall là bảo vệ tòa nhà. Nó kiểm tra từng người ra vào, chỉ cho phép người có phép. Không có firewall, cửa nhà bạn luôn mở cho bất kỳ ai!",
  encryption:
    "Mã hóa giống như viết thư bằng mật ngữ. Chỉ người có 'sổ dịch' mới đọc được. HTTPS là 'ổ khóa xanh' trên trình duyệt — bảo vệ thư từ của bạn.",
};

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: RESPONSES.default ?? "" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");

    const lower = text.toLowerCase();
    let reply = RESPONSES.default ?? "Mình chưa hiểu câu hỏi, bạn giải thích thêm nhé!";
    for (const [key, val] of Object.entries(RESPONSES)) {
      if (key !== "default" && lower.includes(key)) {
        reply = val;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    }, 600 + Math.random() * 400);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 w-80 h-96 glass-strong rounded-xl shadow-gloss flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyber-green relative">
                  <span className="absolute inset-0 rounded-full bg-cyber-green animate-ping opacity-50" />
                </span>
                <span className="text-sm font-medium">🤖 Hỏi ngu không chửi</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-cyber-muted hover:text-cyber-text text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed",
                      msg.role === "user"
                        ? "bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-text"
                        : "bg-glass-white border border-glass-border text-cyber-text"
                    )}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-glass-border shrink-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Hỏi bất cứ điều gì..."
                  className="flex-1 px-3 py-1.5 text-xs glass-input rounded-lg text-cyber-text placeholder-cyber-muted/50 focus:outline-none focus:border-cyber-accent/50 transition-colors"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="px-3 py-1.5 bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent text-xs rounded-lg hover:bg-cyber-accent/20 disabled:opacity-30 transition-all shrink-0"
                >
                  Gửi
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-cyber-accent2 to-cyber-accent text-white text-lg shadow-lg hover:shadow-xl transition-shadow z-50 flex items-center justify-center"
      >
        💬
      </motion.button>
    </>
  );
}

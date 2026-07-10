export const ENABLE_EXAM_MODE = true;
export const EXAM_DURATION_MINUTES = 30;
export const PASS_SCORE = 70;
export const EXAM_TITLE = "Chứng chỉ CyberShield — Cơ bản về Bảo mật";

export interface ExamQuestion {
  id: string;
  type: "choice" | "flag";
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: "q1", type: "choice",
    question: "Kỹ thuật nào sau đây được dùng để khai thác lỗ hổng SQL Injection?",
    options: ["Tiêm mã độc vào input", "Đánh cắp session cookie", "Giả mạo địa chỉ IP", "Tấn công từ chối dịch vụ"],
    answer: "Tiêm mã độc vào input",
  },
  {
    id: "q2", type: "choice",
    question: "Cổng (port) mặc định của dịch vụ SSH là?",
    options: ["21", "22", "23", "443"],
    answer: "22",
  },
  {
    id: "q3", type: "choice",
    question: "Công cụ nào dùng để quét lỗ hổng bảo mật web?",
    options: ["Nmap", "Burp Suite", "Wireshark", "Metasploit"],
    answer: "Burp Suite",
  },
  {
    id: "q4", type: "choice",
    question: "OAuth 2.0 được dùng để làm gì?",
    options: ["Mã hóa dữ liệu", "Xác thực phân quyền", "Quét virus", "Nén file"],
    answer: "Xác thực phân quyền",
  },
  {
    id: "q5", type: "flag",
    question: "Giải mã base64 sau: RkxBR3t3M2JfNHI0XzNfZzBtM19oNHhfcjNkfQ==",
    answer: "FLAG{web_4r4_3_g0m3_h4x_r3d}",
  },
  {
    id: "q6", type: "choice",
    question: "HTTP status code 403 nghĩa là gì?",
    options: ["OK", "Not Found", "Forbidden", "Internal Server Error"],
    answer: "Forbidden",
  },
  {
    id: "q7", type: "choice",
    question: "CSRF là viết tắt của?",
    options: ["Cross-Site Request Forgery", "Central Security Response Framework", "Cryptographic Secure Random Function", "Client-Server Resource Flag"],
    answer: "Cross-Site Request Forgery",
  },
  {
    id: "q8", type: "choice",
    question: "Phương pháp bảo vệ dữ liệu nhạy cảm khi lưu trữ?",
    options: ["Mã hóa (Encryption)", "Nén (Compression)", "Sao lưu (Backup)", "Đánh chỉ mục (Index)"],
    answer: "Mã hóa (Encryption)",
  },
  {
    id: "q9", type: "choice",
    question: "CVE là viết tắt của?",
    options: ["Common Vulnerabilities and Exposures", "Cyber Virtual Environment", "Critical Vulnerability Engine", "Central Validation Engine"],
    answer: "Common Vulnerabilities and Exposures",
  },
  {
    id: "q10", type: "flag",
    question: "Tìm flag trong chuỗi: 48656c6c6f5f46726f6d5f486578",
    answer: "FLAG{hello_from_hex}",
  },
];

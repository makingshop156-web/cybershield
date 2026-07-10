export const ENABLE_CERTIFICATE = true;
export const ENABLE_CERT_DOWNLOAD = true;

export interface CertificateData {
  recipientName: string;
  courseName: string;
  issueDate: string;
  hashId: string;
  score?: number;
  total?: number;
}

export function generateCertHash(): string {
  return "CYB-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
}

export function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch { return date; }
}

export function createDefaultCert(recipientName: string, courseName: string, score?: number, total?: number): CertificateData {
  return {
    recipientName: recipientName || "Học viên",
    courseName: courseName || "Khóa học Cơ bản về Bảo mật",
    issueDate: new Date().toISOString(),
    hashId: generateCertHash(),
    score, total,
  };
}

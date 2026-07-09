/**
 * Irony Guard — Terminal Input Sanitization & Security Engine
 * Enterprise-grade protection against Command Injection, XSS, and path traversal.
 */

const COMMAND_INJECTION_PATTERNS = [
  /[;&|`$]+/g,
  /\b(rm\s+-rf|mkfs|dd\s+if=|:\(\)\{|>\s?\/dev\/)/gi,
  /\$\(.*?\)/g,
  /`.*?`/g,
  /(\|{2,}|&{2,})/g,
];

const XSS_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /javascript\s*:/gi,
  /on\w+\s*=/gi,
  /<[\s\S]*?>/g,
];

const MAX_COMMAND_LENGTH = 500;
const MAX_ARGS_COUNT = 20;

export interface SanitizeResult {
  clean: boolean;
  sanitized: string;
  reason: string | null;
}

export function sanitizeTerminalInput(input: string): SanitizeResult {
  if (!input || typeof input !== "string") {
    return { clean: false, sanitized: "", reason: "Input không hợp lệ" };
  }

  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return { clean: false, sanitized: "", reason: "Input trống" };
  }

  if (trimmed.length > MAX_COMMAND_LENGTH) {
    return { clean: false, sanitized: "", reason: `Lệnh quá dài (tối đa ${MAX_COMMAND_LENGTH} ký tự)` };
  }

  const args = trimmed.split(/\s+/);
  if (args.length > MAX_ARGS_COUNT) {
    return { clean: false, sanitized: "", reason: `Quá nhiều đối số (tối đa ${MAX_ARGS_COUNT})` };
  }

  // Check XSS patterns
  for (const xss of XSS_PATTERNS) {
    if (xss.test(trimmed)) {
      return { clean: false, sanitized: "", reason: "Phát hiện XSS — từ chối" };
    }
  }

  // Check command injection patterns
  for (const ci of COMMAND_INJECTION_PATTERNS) {
    if (ci.test(trimmed)) {
      return { clean: false, sanitized: "", reason: "Phát hiện Command Injection — từ chối" };
    }
  }

  // Whitelist-safe: only allow alphanumeric, spaces, common CLI chars
  const sanitized = trimmed.replace(/[^a-zA-Z0-9\s\/\-\_\.\:\~\@\#\%\^\&\=\+\?\<\>\!]/g, "");
  const wasModified = sanitized !== trimmed;

  return {
    clean: !wasModified,
    sanitized,
    reason: wasModified ? "Ký tự không hợp lệ đã bị loại bỏ" : null,
  };
}

export function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9_\-\/\.]/g, "").replace(/\.\./g, "");
}

export function sanitizePath(path: string): string {
  const normalized = path.replace(/\\/g, "/");
  const cleaned = normalized.replace(/[^a-zA-Z0-9_\-\/\.\~]/g, "");
  if (cleaned.includes("..")) {
    return "/";
  }
  return cleaned || "/";
}

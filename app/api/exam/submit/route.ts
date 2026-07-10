import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_MD6eAmKo_7LkwtFb2MEpPiWMScfpwCL6J");

function certEmail(score: number, total: number, passed: boolean) {
  const pct = Math.round((score / total) * 100);
  const emoji = passed ? "🎉" : "😔";
  const title = passed
    ? "CHÚC MỪNG! BẠN ĐÃ ĐẠT CHỨNG CHỈ"
    : "RẤT TIẾC! BẠN CHƯA ĐẠT CHỨNG CHỈ";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0e17;font-family:'Courier New',monospace;">
<table width="100%" style="background:#0a0e17;padding:40px 20px;">
<tr><td align="center">
<table style="max-width:560px;width:100%;background:linear-gradient(135deg,#0d1117,#161b22);border:1px solid #00ff4133;border-radius:12px;padding:32px;">
<tr><td align="center" style="padding-bottom:24px;">
<pre style="color:#00ff41;font-size:13px;line-height:1.4;margin:0;">
  ██████  ██▓   ▓█████▄  ██▓▓█████ ██▀███
▒██    ▒ ▓██▒   ▒██▀ ██▌▓██▒▓█   ▀▓██ ▒ ██▒
░ ▓██▄   ▒██░   ░██   █▌▒██▒▒███  ▓██ ░▄█ ▒
  ▒   ██▒▒██░   ░▓█▄   ▌░██░▒▓█  ▄▒██▀▀█▄
▒██████▒▒░██████▒░▒████▓ ░██░░▒████░██▓ ▒██▒
▒ ▒▓▒ ▒ ░░ ▒░▓  ░ ▒▒▓  ▒ ░▓  ░░ ▒░░ ▒▓ ░▒▓░
░ ░▒  ░ ░░ ░ ▒  ░ ░ ▒  ▒  ▒ ░ ░ ░  ░ ░▒ ░ ▒░
░  ░  ░    ░ ░    ░ ░  ░  ▒ ░   ░    ░░   ░
      ░      ░  ░   ░     ░     ░  ░  ░
</pre>
</td></tr>
<tr><td align="center" style="font-size:32px;padding:8px 0;">${emoji}</td></tr>
<tr><td align="center" style="color:#00ff41;font-size:22px;font-weight:bold;padding:8px 0 16px;">${title}</td></tr>
<tr><td align="center" style="padding:16px 0;">
<table style="background:#0a0e17;border:1px solid #30363d;border-radius:8px;padding:20px;width:100%;">
<tr><td align="center" style="color:#8b949e;font-size:13px;padding-bottom:8px;">KẾT QUẢ BÀI THI</td></tr>
<tr><td align="center" style="color:#00ff41;font-size:36px;font-weight:bold;">${score}/${total}</td></tr>
<tr><td align="center" style="color:#8b949e;font-size:13px;padding-top:4px;">${pct}%</td></tr>
</table>
</td></tr>
${passed ? `
<tr><td align="center" style="padding:20px 0 8px;">
<div style="border:2px solid #00ff41;border-radius:12px;padding:24px;background:linear-gradient(180deg,#00ff4108,#00ff4104);">
<p style="color:#00ff41;font-size:16px;font-weight:bold;margin:0 0 8px;">🏆 CHỨNG CHỈ ĐIỆN TỬ</p>
<p style="color:#8b949e;font-size:13px;margin:0;line-height:1.6;">
Chứng nhận học viên đã hoàn thành<br>
<strong style="color:#e6edf3;">Khóa học Cơ bản về Bảo mật CyberShield</strong><br>
với kết quả <strong style="color:#00ff41;">${score}/${total}</strong> (${pct}%)<br><br>
<span style="font-size:11px;">ID: CYB-${Date.now().toString(36).toUpperCase()}</span>
</p>
</div>
</td></tr>
` : `
<tr><td align="center" style="padding:20px 0;">
<p style="color:#8b949e;font-size:13px;margin:0;line-height:1.6;">
Hãy ôn tập lại kiến thức và thử lại nhé!<br>
<strong style="color:#00ff41;">CyberShield</strong> luôn đồng hành cùng bạn.
</p>
</td></tr>
`}
<tr><td align="center" style="padding-top:20px;border-top:1px solid #21262d;">
<p style="color:#484f58;font-size:11px;margin:0;">
CyberShield — Học Bảo Mật Từ Số 0<br>
cybershield-nu-one.vercel.app
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const { userId, score, total, passed } = await req.json();
    if (!userId || typeof score !== "number" || typeof total !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const email = `${userId}@cybershield.local`;
    const subject = passed
      ? "🎉 Chúc mừng! Bạn đã đạt chứng chỉ CyberShield"
      : "📝 Kết quả bài thi CyberShield";

    const { error } = await resend.emails.send({
      from: "CyberShield <noreply@cybershield.local>",
      to: [email],
      subject,
      html: certEmail(score, total, passed),
    });

    if (error) {
      console.error("Resend error:", error.message);
      return NextResponse.json({ ok: true, email: "failed" });
    }

    return NextResponse.json({ ok: true, email: "sent" });
  } catch (err) {
    console.error("Exam submit error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: true, email: "failed" });
  }
}

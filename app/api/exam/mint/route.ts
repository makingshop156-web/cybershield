import { NextResponse } from "next/server";
import { getServerSession, requireRole } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { user } = getServerSession(req);
    if (!requireRole(user, ["OWNER"])) {
      return NextResponse.json({ error: "Forbidden — OWNER role required" }, { status: 403 });
    }

    const { score, total } = await req.json();
    if (typeof score !== "number" || typeof total !== "number" || total < 1) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

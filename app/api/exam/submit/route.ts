import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { user } = getServerSession(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

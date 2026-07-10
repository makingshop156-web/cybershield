import { OWNER_EMAILS } from "./config";

export interface ServerUser {
  id: string;
  email: string;
  role: string;
}

export function getServerSession(req: Request): { user: ServerUser | null } {
  const userId = req.headers.get("x-user-id") || "";
  const email = req.headers.get("x-user-email") || "";
  const role = req.headers.get("x-user-role") || "USER";
  if (!userId) return { user: null };
  return { user: { id: userId, email, role } };
}

export function requireRole(user: ServerUser | null, allowedRoles: string[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}

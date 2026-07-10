import type { Role } from "./config";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: Role;
}

export interface AuthSession {
  user: AuthUser;
  expiresAt: number;
}

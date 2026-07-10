export const ENABLE_AUTH = true;

export const SESSION_KEY = "cybershield-session";
export const USERS_KEY = "cybershield-users";

export type Role = "USER" | "ADMIN" | "OWNER";

export const OWNER_EMAILS: string[] = [
  "admin@cybershield.local",
  "tuan123@gmail.com",
];

export function isOwnerEmail(email: string): boolean {
  return OWNER_EMAILS.includes(email.toLowerCase().trim());
}

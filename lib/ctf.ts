/**
 * CyberShield CTF — Capture The Flag Configuration
 * Each flag is hidden in the virtual filesystem for learners to find.
 */

export interface CtfFlag {
  id: string;
  name: string;
  flag: string;
  hint: string;
  path: string;
  description: string;
  points: number;
}

export interface CtfSubmission {
  flagId: string;
  playerName: string;
  submittedAt: string;
  correct: boolean;
}

export const CTF_FLAGS: CtfFlag[] = [
  {
    id: "ctf_secret",
    name: "Secret File",
    flag: "FLAG{hidden_in_plain_sight}",
    hint: "Look for hidden files in your home directory",
    path: "/home/learner/secret.txt",
    description: "Tìm file ẩn trong thư mục home — dùng ls -la",
    points: 100,
  },
  {
    id: "ctf_root",
    name: "Root Flag",
    flag: "FLAG{you_found_the_root_flag}",
    hint: "You need root privileges to access this flag",
    path: "/root/flag.txt",
    description: "Leo thang lên root (sudo -i) và tìm flag trong /root",
    points: 250,
  },
  {
    id: "ctf_auth",
    name: "Auth Log Analysis",
    flag: "FLAG{brute_force_detected}",
    hint: "Check the auth log for brute force attempts",
    path: "/var/log/auth.log-analysis",
    description: "Phân tích auth.log — có flag ẩn trong log brute-force",
    points: 150,
  },
];

export function validateFlag(input: string, flagId: string): boolean {
  const flag = CTF_FLAGS.find((f) => f.id === flagId);
  if (!flag) return false;
  return input.trim() === flag.flag;
}

export function getFlagById(id: string): CtfFlag | undefined {
  return CTF_FLAGS.find((f) => f.id === id);
}

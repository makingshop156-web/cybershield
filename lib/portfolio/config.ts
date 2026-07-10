export const ENABLE_PUBLIC_PORTFOLIO = true;
export const PORTFOLIO_VISIBILITY_KEY = "cybershield-portfolio-public";
export const SOCIAL_LINKS_KEY = "cybershield-social-links";

export interface SocialLinks {
  facebookUrl: string;
  tiktokUrl: string;
}

export const defaultSocialLinks: SocialLinks = {
  facebookUrl: "",
  tiktokUrl: "",
};

export function validateSocialUrl(key: keyof SocialLinks, value: string): boolean {
  if (!value.trim()) return true;
  switch (key) {
    case "facebookUrl":
      return /^https?:\/\/(www\.)?(facebook\.com|fb\.com)\/.+/i.test(value);
    case "tiktokUrl":
      return /^https?:\/\/(www\.)?tiktok\.com\/@.+/i.test(value);
    default:
      return false;
  }
}

export interface PortfolioData {
  username: string;
  displayName: string;
  avatarInitial: string;
  topBadge: string;
  elo: number;
  ctfPoints: number;
  labsCompleted: number;
  heatmap: Record<string, number>;
  certificates: PortfolioCert[];
  socialLinks: SocialLinks;
}

export interface PortfolioCert {
  id: string;
  title: string;
  recipientName: string;
  issueDate: string;
  hashId: string;
}

export function generateHeatmapData(): Record<string, number> {
  const data: Record<string, number> = {};
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    data[key] = Math.random() < 0.6 ? Math.floor(Math.random() * 5) + 1 : 0;
  }
  return data;
}

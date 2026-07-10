export const ENABLE_PUBLIC_PORTFOLIO = true;
export const PORTFOLIO_VISIBILITY_KEY = "cybershield-portfolio-public";

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
